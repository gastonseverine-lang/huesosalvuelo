import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import { getAuth, GoogleAuthProvider, browserLocalPersistence, setPersistence, onAuthStateChanged, signInWithPopup, signInWithRedirect, getRedirectResult, signOut } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js';
import { getFirestore, collection, doc, query, orderBy, limit, onSnapshot, runTransaction, serverTimestamp } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js';

const firebaseConfig={
  projectId:'atapia-f0323',
  appId:'1:298355156178:web:4b9d5de6eec1149668f90b',
  storageBucket:'atapia-f0323.firebasestorage.app',
  apiKey:'AIzaSyDlZxNo1Ygp4msY1Yrex_UUE2NEiml96ck',
  authDomain:'atapia-f0323.firebaseapp.com',
  messagingSenderId:'298355156178'
};

const app=initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app),provider=new GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
provider.addScope('profile');provider.addScope('email');auth.languageCode='es';
const $=id=>document.getElementById(id);
let currentUser=null,pendingScore=null,ownScore=0,unsubscribeRanking=null;
let authMessageTimer=0;
const AUTH_RESUME_KEY='huesosGoogleResumeV1';

function cleanText(value,max=14){return String(value||'Tu mascota').replace(/[<>]/g,'').trim().slice(0,max)||'Tu mascota';}
function notify(message){
  const box=$('authMessage');if(box){clearTimeout(authMessageTimer);box.textContent=message;box.classList.remove('hidden','error');box.classList.toggle('error',message.includes('⚠️'));authMessageTimer=setTimeout(()=>box.classList.add('hidden'),6500);}
  if(!$('game').classList.contains('hidden')&&typeof window.showToast==='function')window.showToast(message);
}
function setAuthBusy(busy){$('googleSignIn').disabled=busy;$('rankingLogin').disabled=busy;if($('endingGoogleLogin'))$('endingGoogleLogin').disabled=busy;if($('pauseGoogleLogin'))$('pauseGoogleLogin').disabled=busy;}

async function login(){
  setAuthBusy(true);
  const resume=window.captureGoogleResumeState?.();
  try{await setPersistence(auth,browserLocalPersistence);notify('Abriendo Google… el juego queda en pausa.');await signInWithPopup(auth,provider);notify('✓ Sesión iniciada · volvés exactamente donde estabas.');}
  catch(error){
    if(['auth/popup-blocked','auth/operation-not-supported-in-this-environment'].includes(error.code)){if(resume)sessionStorage.setItem(AUTH_RESUME_KEY,JSON.stringify(resume));notify('El navegador abrió el acceso seguro… tu partida queda guardada.');await signInWithRedirect(auth,provider);return;}
    console.error('Ingreso con Google',error.code||error);
    if(error.code!=='auth/popup-closed-by-user'){const messages={'auth/operation-not-allowed':'⚠️ Falta habilitar Google en Firebase','auth/unauthorized-domain':'⚠️ Este dominio todavía no está autorizado','auth/network-request-failed':'⚠️ Revisá tu conexión e intentá nuevamente','auth/web-storage-unsupported':'⚠️ El navegador bloqueó el acceso. Abrí el juego en Chrome o Safari.'};notify(messages[error.code]||'⚠️ No se pudo iniciar sesión. Intentá nuevamente.');}
  }finally{setAuthBusy(false);}
}
function restoreGameAfterGoogle(){let saved=null;try{saved=JSON.parse(sessionStorage.getItem(AUTH_RESUME_KEY)||'null');}catch{}if(!saved)return;sessionStorage.removeItem(AUTH_RESUME_KEY);setTimeout(()=>window.restoreGoogleResumeState?.(saved),50);}

async function saveScore(entry){
  if(!currentUser){pendingScore=entry;sessionStorage.setItem('huesosPendingScore',JSON.stringify(entry));$('scoreLoginPrompt')?.classList.remove('hidden');notify('🏆 Podés guardar este puntaje con Google');return;}
  const safe={nickname:cleanText(entry.nickname),score:Math.max(0,Math.min(99999999,Math.round(entry.score||0))),mission:[1,2,3].includes(entry.mission)?entry.mission:1,character:cleanText(entry.character,24),bones:Math.max(0,Math.round(entry.bones||0)),coins:Math.max(0,Math.round(entry.coins||0))};
  const ref=doc(db,'huesosLeaderboard',currentUser.uid);
  try{
    await runTransaction(db,async transaction=>{const previous=await transaction.get(ref);if(previous.exists()&&Number(previous.data().score)>=safe.score){ownScore=Number(previous.data().score);return;}transaction.set(ref,{...safe,updatedAt:serverTimestamp()});ownScore=safe.score;});
    notify(`🏆 Récord guardado: ${Math.max(ownScore,safe.score)} puntos`);renderOwn();
  }catch(error){console.error('No se pudo guardar el ranking',error);notify('⚠️ No se pudo guardar el récord');}
}

function renderOwn(){
  $('rankingOwn').classList.toggle('hidden',!currentUser);
  if(currentUser)$('rankingOwn').textContent=ownScore?`Tu mejor récord: ${ownScore.toLocaleString('es-AR')} puntos`:'Jugá una partida para registrar tu primer récord';
}
function renderRanking(snapshot){
  const rows=snapshot.docs.map(item=>item.data());
  $('rankingList').innerHTML=rows.length?rows.map(row=>`<li><div><b>${cleanText(row.nickname)}</b><small>${cleanText(row.character,24)} · Misión ${[1,2,3].includes(row.mission)?row.mission:1} · 🦴 ${Number(row.bones||0)} · 🪙 ${Number(row.coins||0)}</small></div><strong>${Number(row.score||0).toLocaleString('es-AR')}</strong></li>`).join(''):'<li class="ranking-empty">Todavía no hay récords. ¡Podés ser el primero!</li>';
  if(currentUser){const own=snapshot.docs.find(item=>item.id===currentUser.uid);ownScore=own?Number(own.data().score||0):ownScore;renderOwn();}
}
function listenRanking(){
  if(unsubscribeRanking)return;
  const top=query(collection(db,'huesosLeaderboard'),orderBy('score','desc'),limit(10));
  unsubscribeRanking=onSnapshot(top,renderRanking,error=>{$('rankingList').innerHTML='<li class="ranking-empty">No se pudo cargar el ranking.</li>';console.error('Ranking no disponible',error);});
}

$('googleSignIn').addEventListener('click',login);
$('rankingLogin').addEventListener('click',login);
$('endingGoogleLogin')?.addEventListener('click',login);
$('pauseGoogleLogin')?.addEventListener('click',login);
$('googleSignOut').addEventListener('click',()=>signOut(auth));
$('rankingBtn').addEventListener('click',()=>{$('rankingModal').classList.remove('hidden');listenRanking();});
$('rankingClose').addEventListener('click',()=>$('rankingModal').classList.add('hidden'));
$('rankingModal').addEventListener('click',event=>{if(event.target===$('rankingModal'))$('rankingModal').classList.add('hidden');});
window.addEventListener('keydown',event=>{if(event.key==='Escape')$('rankingModal').classList.add('hidden');});
window.addEventListener('huesos-score',event=>saveScore(event.detail));

onAuthStateChanged(auth,user=>{
  currentUser=user;$('googleSignIn').classList.toggle('hidden',!!user);$('accountStatus').classList.toggle('hidden',!user);$('rankingLogin').classList.toggle('hidden',!!user);$('pauseGoogleLogin')?.classList.toggle('hidden',!!user);if(user)$('scoreLoginPrompt')?.classList.add('hidden');renderOwn();
  if(user){listenRanking();notify('✓ Sesión iniciada · tu correo permanece privado');let savedPending=null;try{savedPending=JSON.parse(sessionStorage.getItem('huesosPendingScore')||'null');}catch{}const score=pendingScore||savedPending;pendingScore=null;sessionStorage.removeItem('huesosPendingScore');if(score)saveScore(score);}restoreGameAfterGoogle();
});
setPersistence(auth,browserLocalPersistence).then(()=>getRedirectResult(auth)).catch(error=>{console.error('Ingreso con Google',error);notify('⚠️ No se pudo completar el acceso con Google.');});
