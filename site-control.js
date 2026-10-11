import {initializeApp,getApps,getApp} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import {getFirestore,doc,onSnapshot,setDoc,serverTimestamp,Timestamp} from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js';

const firebaseConfig={projectId:'atapia-f0323',appId:'1:298355156178:web:4b9d5de6eec1149668f90b',storageBucket:'atapia-f0323.firebasestorage.app',apiKey:'AIzaSyDlZxNo1Ygp4msY1Yrex_UUE2NEiml96ck',authDomain:'atapia-f0323.firebaseapp.com',messagingSenderId:'298355156178'};
const app=getApps().length?getApp():initializeApp(firebaseConfig),db=getFirestore(app);
const defaults={mission1:true,mission2:true,missionSpecial:true,mission3:true};
window.huesosMissionFlags={...defaults};

function selectedMissionKey(){const selected=document.querySelector('.dog-choice.selected');return selected?.dataset.hero&&selected.dataset.hero!=='dog'?'missionSpecial':'mission1';}
function applyAvailability(){
  const flags=window.huesosMissionFlags,start=document.getElementById('startBtn'),mission2=document.getElementById('mission2Shortcut'),forest=document.getElementById('forestShortcut');
  const key=selectedMissionKey();if(start){start.disabled=flags[key]===false;start.title=start.disabled?'Esta misión está temporalmente en preparación':'';}
  [mission2,document.getElementById('mission2Btn')].forEach(button=>{if(button){button.disabled=flags.mission2===false;button.title=button.disabled?'Esta misión está temporalmente en preparación':'';}});
  if(forest){forest.disabled=flags.mission3===false;forest.title=forest.disabled?'Esta misión está temporalmente en preparación':'';}
  document.querySelectorAll('#specialChoices .special-choice').forEach(button=>{button.classList.toggle('mission-off',flags.missionSpecial===false);button.setAttribute('aria-disabled',flags.missionSpecial===false?'true':'false');});
}
onSnapshot(doc(db,'huesosConfig','site'),snapshot=>{window.huesosMissionFlags={...defaults,...(snapshot.exists()?snapshot.data():{})};applyAvailability();window.dispatchEvent(new CustomEvent('huesos-config',{detail:window.huesosMissionFlags}));},error=>{console.warn('Configuración remota no disponible; se mantienen las misiones activas.',error.code||error);applyAvailability();});
new MutationObserver(applyAvailability).observe(document.getElementById('setup')||document.body,{subtree:true,attributes:true,attributeFilter:['class']});

const sessionKey='huesosSessionIdV1',startedKey='huesosSessionStartedV1';let sessionId=sessionStorage.getItem(sessionKey),started=Number(sessionStorage.getItem(startedKey));
if(!sessionId){sessionId=crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(16).slice(2)}`;started=Date.now();sessionStorage.setItem(sessionKey,sessionId);sessionStorage.setItem(startedKey,String(started));}
function currentMission(){const game=document.getElementById('game');if(!game||game.classList.contains('hidden'))return 0;const level=document.getElementById('level')?.textContent||'';if(level.includes('BOSQUE'))return 4;if(level.includes('AIRE'))return 3;if(game.classList.contains('mission-two'))return 2;return 1;}
function nickname(){return(document.getElementById('fixedCharacterName')?.textContent||document.getElementById('dogName')?.value||'Invitado').trim().slice(0,28)||'Invitado';}
async function heartbeat(){if(document.visibilityState==='hidden')return;const ref=doc(db,'huesosSessions',sessionId);try{await setDoc(ref,{nickname:nickname(),mission:currentMission(),device:matchMedia('(pointer:coarse)').matches?'Móvil':'Escritorio',page:location.pathname.slice(0,80),startedAt:Timestamp.fromMillis(started),lastSeen:serverTimestamp()},{merge:true});}catch(error){console.warn('Actividad no registrada',error.code||error);}}
heartbeat();setInterval(heartbeat,20000);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')heartbeat();});window.addEventListener('huesos-score',heartbeat);
