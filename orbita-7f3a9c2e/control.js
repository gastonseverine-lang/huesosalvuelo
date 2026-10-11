import {initializeApp,getApps,getApp} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import {getAuth,browserLocalPersistence,setPersistence,onAuthStateChanged,signInWithEmailAndPassword,signOut} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js';
import {getFirestore,collection,doc,query,orderBy,limit,onSnapshot,setDoc,updateDoc,serverTimestamp,getCountFromServer} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js';

const firebaseConfig={projectId:'atapia-f0323',appId:'1:298355156178:web:4b9d5de6eec1149668f90b',storageBucket:'atapia-f0323.firebasestorage.app',apiKey:'AIzaSyDlZxNo1Ygp4msY1Yrex_UUE2NEiml96ck',authDomain:'atapia-f0323.firebaseapp.com',messagingSenderId:'298355156178'};
const app=getApps().length?getApp():initializeApp(firebaseConfig),auth=getAuth(app),db=getFirestore(app),$=id=>document.getElementById(id);
const defaults={mission1:true,mission2:true,missionSpecial:true,mission3:true};
const configRef=doc(db,'huesosConfig','site');
let sessionRows=[],totalSessions=0,unsubscribeConfig=null,unsubscribeSessions=null;

const escapeText=value=>String(value||'Invitado').replace(/[<>&"']/g,'').slice(0,28);
const dateValue=value=>value?.toDate?.()||null;
const startOfToday=()=>{const d=new Date();d.setHours(0,0,0,0);return d;};
function relative(date){if(!date)return'Sin datos';const seconds=Math.max(0,Math.round((Date.now()-date.getTime())/1000));if(seconds<10)return'ahora';if(seconds<60)return`hace ${seconds}s`;const mins=Math.floor(seconds/60);if(mins<60)return`hace ${mins} min`;const hours=Math.floor(mins/60);return`hace ${hours} h`;}
function formatEntry(date){if(!date)return'—';return date.toLocaleDateString('es-AR')===new Date().toLocaleDateString('es-AR')?`Hoy ${date.toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'})}`:date.toLocaleString('es-AR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'});}
function missionName(value){return{0:'Portada',1:'Misión 1 · Cosecha',2:'Misión 2 · OVNI',3:'Especial · Cielos',4:'Misión 3 · Mike'}[Number(value)]||'Portada';}
function setMessage(text){$('loginMessage').textContent=text;}

$('loginForm').addEventListener('submit',async event=>{event.preventDefault();setMessage('');$('loginButton').disabled=true;try{await setPersistence(auth,browserLocalPersistence);await signInWithEmailAndPassword(auth,$('loginEmail').value.trim(),$('loginPassword').value);}catch(error){console.error('Acceso privado',error.code||error);setMessage('No se pudo ingresar. Revisá los datos e intentá nuevamente.');}finally{$('loginButton').disabled=false;$('loginPassword').value='';}});
$('logoutButton').addEventListener('click',()=>signOut(auth));
$('refreshButton').addEventListener('click',()=>{renderSessions();refreshTotal();});

function listenConfig(){
  unsubscribeConfig?.();
  unsubscribeConfig=onSnapshot(configRef,async snapshot=>{if(!snapshot.exists()){await setDoc(configRef,{...defaults,updatedAt:serverTimestamp()});return;}const data={...defaults,...snapshot.data()};document.querySelectorAll('#missionControls input').forEach(input=>{input.checked=data[input.dataset.key]!==false;input.disabled=false;});$('saveState').textContent='Sincronizado';},error=>{console.error('Configuración no disponible',error);$('saveState').textContent='Sin acceso';});
}
document.querySelectorAll('#missionControls input').forEach(input=>input.addEventListener('change',async()=>{const previous=!input.checked;$('saveState').textContent='Guardando…';input.disabled=true;try{await updateDoc(configRef,{[input.dataset.key]:input.checked,updatedAt:serverTimestamp()});}catch(error){input.checked=previous;$('saveState').textContent='No se guardó';console.error('Cambio de misión',error);}finally{input.disabled=false;}}));

function renderChart(todayRows){const hours=Array(24).fill(0);todayRows.forEach(row=>{const date=dateValue(row.startedAt);if(date)hours[date.getHours()]++;});const max=Math.max(1,...hours);$('chartTotal').textContent=`${todayRows.length} hoy`;$('activityChart').innerHTML=hours.map((count,hour)=>`<div class="chart-bar" title="${hour}:00 · ${count} entradas"><i style="height:${Math.max(3,count/max*100)}%"></i>${hour%3===0?`<span>${String(hour).padStart(2,'0')}</span>`:''}</div>`).join('');}
function renderSessions(){
  const now=Date.now(),today=startOfToday(),online=sessionRows.filter(row=>{const date=dateValue(row.lastSeen);return date&&now-date.getTime()<75000;}),todayRows=sessionRows.filter(row=>{const date=dateValue(row.startedAt);return date&&date>=today}),latest=sessionRows[0],body=$('sessionsBody');
  $('onlineCount').textContent=online.length.toLocaleString('es-AR');$('todayCount').textContent=todayRows.length.toLocaleString('es-AR');$('totalCount').textContent=Math.max(totalSessions,sessionRows.length).toLocaleString('es-AR');$('lastActivity').textContent=relative(dateValue(latest?.lastSeen));renderChart(todayRows);
  body.innerHTML=sessionRows.length?sessionRows.slice(0,16).map(row=>{const last=dateValue(row.lastSeen),isOnline=last&&now-last.getTime()<75000;return`<tr><td><span class="player">${escapeText(row.nickname)}</span></td><td>${formatEntry(dateValue(row.startedAt))}</td><td>${relative(last)}</td><td><span class="status ${isOnline?'online':''}">${isOnline?'Jugando':'Sin actividad'}</span></td><td>${missionName(row.mission)}</td><td>${escapeText(row.device||'—')}</td></tr>`;}).join(''):'<tr><td colspan="6" class="empty">Todavía no hay actividad registrada.</td></tr>';
}
async function listenSessions(){
  unsubscribeSessions?.();const recent=query(collection(db,'huesosSessions'),orderBy('lastSeen','desc'),limit(500));
  unsubscribeSessions=onSnapshot(recent,snapshot=>{sessionRows=snapshot.docs.map(item=>({id:item.id,...item.data()}));renderSessions();},error=>{console.error('Sesiones no disponibles',error);$('sessionsBody').innerHTML='<tr><td colspan="6" class="empty">No se pudo cargar la actividad.</td></tr>';});
  refreshTotal();
}
async function refreshTotal(){try{const total=await getCountFromServer(collection(db,'huesosSessions'));totalSessions=total.data().count;renderSessions();}catch(error){console.error('Conteo no disponible',error);$('totalCount').textContent='—';}}
setInterval(renderSessions,15000);
onAuthStateChanged(auth,user=>{if(user){$('loginView').classList.add('hidden');$('dashboardView').classList.remove('hidden');listenConfig();listenSessions();}else{$('dashboardView').classList.add('hidden');$('loginView').classList.remove('hidden');unsubscribeConfig?.();unsubscribeSessions?.();unsubscribeConfig=unsubscribeSessions=null;}});
setPersistence(auth,browserLocalPersistence).catch(error=>console.error('Persistencia',error));
