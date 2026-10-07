const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const $ = id => document.getElementById(id);

const bg = new Image(), dogsImg = new Image(), dogAnimImg = new Image(), naturalDogsImg = new Image(), naturalCastImg = new Image(), objectsImg = new Image(), pirateImg = new Image(), playerMouseImg = new Image(), helicopterImg = new Image(), heroFlightBg = new Image(), heroFlightAtlas = new Image(), heroFlightBirdImg = new Image(), heroDragonImg = new Image(), heroTerrainImg = new Image(), fedeImg = new Image(), carnivorousPlantImg = new Image();
const naturalDogImgs = Array.from({length:4},()=>new Image());
const dogPersonalityImgs = Array.from({length:4},()=>new Image());
const forestLevelImgs=Array.from({length:5},()=>new Image()),forestObjectsImg=new Image(),forestFlamingoImg=new Image(),forestMikeImg=new Image(),forestMikeJumpImg=new Image(),wildlifeFlightImg=new Image(),forestNatureImg=new Image(),forestBatImg=new Image(),forestBranchImg=new Image(),forestProduceImg=new Image(),mission1CrowImg=new Image();
const mission2Bg=new Image(),mission2LevelImgs=Array.from({length:4},()=>new Image()),rescuePlaneImg=new Image(),alienUfoImg=new Image(),spaceHazardsImg=new Image(),mission2PowerupsImg=new Image(),mission2CombatImg=new Image();
bg.src = 'assets/background.png';
dogsImg.src = 'assets/dogs.png';
dogAnimImg.src = 'assets/dogs-animated.png';
naturalDogsImg.src = 'assets/dogs-natural-v2.png';
[
  'assets/dog-mike-run-normalized-v2.png',
  'assets/dog-ninna-run-normalized-v2.png',
  'assets/dog-kaiser-run-normalized-v2.png',
  'assets/dog-landa-run-normalized-v2.png'
].forEach((src,i)=>naturalDogImgs[i].src=src);
[
  'assets/dog-mike-personality-v1-raw.png',
  'assets/dog-ninna-personality-v1-raw.png',
  'assets/dog-kaiser-personality-v1-raw.png',
  'assets/dog-landa-personality-v1-raw.png'
].forEach((src,i)=>dogPersonalityImgs[i].src=src);
forestLevelImgs.forEach((img,i)=>img.src=`assets/mission4-level${i+1}-v1.png`);forestObjectsImg.src='assets/mission4-objects-v1.png';forestFlamingoImg.src='assets/mission4-flamingo-v1.png';forestMikeImg.src='assets/dog-mike-forest-v2.png';forestMikeJumpImg.src='assets/dog-mike-forest-jump-v3.png';wildlifeFlightImg.src='assets/wildlife-flight-v2.png';forestNatureImg.src='assets/forest-platforms-collectibles-v2.png';forestBatImg.src='assets/forest-bat-v2.png';forestBranchImg.src='assets/forest-branch-v2.png';forestProduceImg.src='assets/forest-produce-v2.png';mission1CrowImg.src='assets/mission1-crow-v2.png';
naturalCastImg.src = 'assets/cast-natural-v1.png';
objectsImg.src = 'assets/objects.png';
pirateImg.src = 'assets/pirate-mouse.png';
playerMouseImg.src = 'assets/player-mouse-balloon-v2.png';
fedeImg.src = 'assets/fede-helper-v2.png';
carnivorousPlantImg.src = 'assets/carnivorous-plant-v1.png';
heroFlightBg.src = 'assets/hero-flight-castle-v1.png';
heroFlightAtlas.src = 'assets/hero-flight-atlas-v1.png';
heroFlightBirdImg.src = 'assets/hero-flight-bird-v1.png';
heroDragonImg.src = 'assets/hero-dragon-atlas-v2.png';
heroTerrainImg.src = 'assets/hero-mountain-terrain-v2.png';
helicopterImg.src = 'assets/ninja-helicopter.png';
mission2Bg.src='assets/mission2-level5.webp';mission2LevelImgs.forEach((img,i)=>img.src=`assets/mission2-level${i+1}.webp`);rescuePlaneImg.src='assets/rescue-plane.png';alienUfoImg.src='assets/alien-ufo.png';spaceHazardsImg.src='assets/space-hazards.png';mission2PowerupsImg.src='assets/mission2-powerups.png';mission2CombatImg.src='assets/mission2-combat-v2.png';

const breeds = ['Mike · Caniche blanco', 'Ninna · Border Collie', 'Kaiser · Labrador', 'La dulce Landa'];
const CHARACTER_NAMES={dog:['Mike','Ninna','Kaiser','Landa'],cat:'Clemente',mouse:'Rayo'};
const DOG_TRAITS=[
  {name:'Mike · El ladrador',detail:'Ladra con entusiasmo y avisa cuando está atento',speed:1,jump:1,toy:1},
  {name:'Ninna · Mente veloz',detail:'La más inteligente y rápida; salta alto y reacciona enseguida',speed:1.32,jump:1.24,toy:1},
  {name:'Kaiser · Súper juguetón',detail:'Ama los juguetes, mueve la cola y gana más puntos al atraparlos',speed:1.08,jump:1.04,toy:1.5},
  {name:'La dulce Landa · Loquita feliz',detail:'Saca la lengua, mueve la cabeza, las orejas y la cola',speed:1.08,jump:1.06,toy:1.1}
];
const HERO_UNLOCK_KEY='huesosHeroesUnlockedV1';
const FOREST_UNLOCK_KEY='huesosMikeForestUnlockedV1';
const PROGRESS_KEY='huesosAdventureProgressV2';
const MISSIONS=[
  {id:1,name:'El Parque',description:'Recuperá la gran cosecha de huesos.',levels:5,objective:'5000 puntos por ruta',mechanic:'correr, saltar y atrapar',rewards:['estrellas','personajes']},
  {id:2,name:'Rescate Aéreo',description:'Volá con Clemente para rescatar a Rayo.',levels:5,objective:'abrir el camino y vencer al OVNI',mechanic:'volar y disparar',rewards:['estrellas','equipo completo']},
  {id:4,name:'Mike perdido en el bosque',description:'Encontrá el flamenco rojo y ayudá a Mike a regresar a casa.',levels:5,objective:'seguir las pistas del camino',mechanic:'correr, saltar y explorar',rewards:['flamenco favorito','regreso a casa']}
];
const LEVEL_TARGET = 5000;
const CAT_BALL_STYLES=[
  {main:'#ff654f',stripe:'#ffd84e',glow:'#ff9a62'},
  {main:'#39bfff',stripe:'#dff8ff',glow:'#55ddff'},
  {main:'#9a5cf5',stripe:'#f0dcff',glow:'#c58cff'},
  {main:'#48cf78',stripe:'#e8ff9d',glow:'#75ec9a'},
  {main:'#ffc83d',stripe:'#ff704e',glow:'#fff09a'}
];
const climates = [
  { label: '☀️ Día soleado', toast: '¡MAÑANA SOLEADA!', tint: 'rgba(255,220,90,.04)' },
  { label: '🍂 Viento de otoño', toast: '¡VIENTO DE OTOÑO!', tint: 'rgba(255,151,59,.10)' },
  { label: '🌧️ Lluvia juguetona', toast: '¡LLEGÓ LA LLUVIA!', tint: 'rgba(42,89,150,.18)' },
  { label: '❄️ Nieve brillante', toast: '¡AVENTURA NEVADA!', tint: 'rgba(218,245,255,.17)' },
  { label: '⚡ Noche tormentosa', toast: '¡TORMENTA NINJA!', tint: 'rgba(12,24,75,.45)' }
];

let selectedDog = 0, selectedHero='dog', state = 'setup', score = 0, levelScore = 0, level = 1, lives = 3, energy = 3, time = 90;
let dogInvuln = 0;
let last = 0, spawnClock = 0, prizeClock = 0, toyClock = 0, surpriseClock = 0, pirateClock = 0, items = [], hazards = [], groundHazards = [], carnivorousPlants = [], shots = [], weather = [];
let dogX = .5, dogMoving = false, dogMovePulse = 0, keys = {}, bossHP = 20, ratHP = 100, bossX = .72, bossDir = 1, bossShot = 0;
let dogIdleTime=0,dogPersonalityNext=2.2;
let pirateX = .18, pirateDir = 1, flash = 0, fireCooldown = 0, impactParticles = [], endingStage = 'result', raf;
let slowTimer = 0, stunTimer = 0, tailDragTimer = 0;
let pirateY = .29, pirateTargetX = .5, pirateZigClock = 0;
let ratDefeat = 0, catDefeat = 0, victoryTimer = 0, ratCrashX = .18, ratCrashY = .29, catCrashX = .72;
let jumpY = 0, jumpVelocity = 0, crouchTimer = 0;
let powerClock = 0, powerTimer = 0, powerUps = [];
let stompEffects = [];
let blackAmmo = 0, aimDir = 1, heroFacingDir = 1, blackShots = [];
let netTimer = 0;
let doubleTimer = 0, sizeTimer = 0, dogSizeMode = 'normal', catStealTimer = 0, catStealAmount = 0;
let catBalls=[],catBallClock=7,catBallThrowTimer=0,catBallThrowSide=1,playBallTimer=0,playBallBarkClock=0;
let dogFireTimer=0,dogFireSide=1,dogKickTimer=0,dogKickSide=1;
let mission=1,spaceLevel=1,planeX=.5,planeY=.76,spaceObjects=[],spaceBones=[],spaceSpawn=0,spaceInvuln=0,spaceDistance=0,spaceDuration=42,spaceFireCooldown=0,alienHP=40,alienX=.5,alienDir=1,alienShot=0,lastGameWon=false;
let heartDrops=[],mission1HeartSpawned=false,mission2HeartSpawned=false,mission1HeartClock=12,mission2HeartClock=12;
let spaceBoxes=[],catApples=[],spaceEggs=[],eggExplosions=[],spaceBoxClock=8,catAssistTimer=0,catAppleClock=0,eggClock=0,planeBank=0,planePitch=0,planeKick=0,planeLastX=.5,planeLastY=.76;
let spaceDestroyed=0,mission2ResumeRequested=false;
let cinematicRaf=0,cinematicStartedAt=0,cinematicSceneIndex=-1,cinematicMission=1,cinematicDone=null;
let cinematicDuration=20;
let combo=0,maxCombo=0,comboTimer=0,comboDisplayTimer=0,floatingTexts=[],runCollected=0,runBonuses=0,runDamage=0,newRecordEarned=false,currentStars=0;
let tutorialStep=0,tutorialMission=1,tutorialClock=0,tutorialObstacleSeen=false;
let fedeClock=0,fedeVisibleTimer=0,fedeAppearances=0,fedeSide=1,fedeDialogue='',trampolines=[];
let birds=[],birdClock=7;
let heroFlightLevel=1,heroFlightCoins=0,heroFlightTotalCoins=0,heroFlightX=.24,heroFlightY=.5,heroFlightVY=0,heroFlightObjects=[],heroFlightCoinClock=0,heroFlightHazardClock=0,heroFlightCloverClock=0,heroFlightImmunity=0,heroFlightInvuln=0,heroFlightDistance=0,heroFlightLightning=0,heroFlightScroll=0,heroFuel=100,heroFuelClock=0,heroBoxClock=0,heroShots=[],heroShotCooldown=0,heroBananaTimer=0,dragonHP=10000,dragonX=.82,dragonY=.34,dragonFireClock=0,dragonHitTimer=0,heroHeartClock=0,heroHeartSpawned=false,heroHeartLevels=new Set();
let lifeCountdownToken=0;
const forestConfig=[
  {name:'Parque bajo la lluvia',climate:'🌧️ Tarde lluviosa',duration:54,spawn:1.75,pool:['log','puddle'],intro:'Saltá los charcos y los troncos mojados.'},
  {name:'Sendero del arroyo',climate:'🌿 Bosque del arroyo',duration:58,spawn:1.5,pool:['log','puddle','snail'],intro:'Los caracoles recorren el sendero.'},
  {name:'Valle de hongos',climate:'🍄 Hongos encantados',duration:62,spawn:1.3,pool:['snail','thorn','mushroom'],intro:'Los hongos rojos te impulsan hacia arriba.'},
  {name:'Barranco de tormenta',climate:'⛈️ Bosque de tormenta',duration:66,spawn:1.08,pool:['log','thorn','snail','puddle'],intro:'El viento acelera todos los peligros.'},
  {name:'Laberinto de las huellas',climate:'🌙 El camino a casa',duration:78,spawn:.96,pool:['thorn','snail','log','mushroom'],intro:'Recordá la pista y elegí el sendero correcto.'}
];
let forestLevel=1,forestDistance=0,forestObjects=[],forestSpawn=0,forestClues=0,forestCorrectRoute=0,forestClueSpawned=false,forestChoiceActive=false,forestPower='',forestPowerTimer=0,forestInvuln=0,forestVictory=0,forestVictoryStarted=0;
let forestPlatforms=[],forestCollectibles=[],forestBats=[],forestPlatformClock=0,forestBatClock=0,forestDogY=.79,forestOnPlatform=false,forestTransition=0,forestAmbienceClock=0,forestLeaves=[],forestExitTimer=0,forestNextLevel=0;
const FOREST_EXIT_DURATION=2.8;
function activeCharacterName(){return selectedHero==='dog'?CHARACTER_NAMES.dog[selectedDog]:CHARACTER_NAMES[selectedHero];}
function fedeLines(){const name=activeCharacterName();return [`¡Soy Fede! ¡${name}, te traje un trompo saltarín!`,`¡Vamos, ${name}! Mirá los objetos y confiá en vos.`,`¡Qué buen salto, ${name}! ¡Vamos por más!`,`¡No aflojes, ${name}! El próximo hueso es tuyo.`,`¡Usá mi trampolín para pasar la planta, ${name}!`,`¡Estoy con vos, ${name}!`,`¡Seguí adelante, ${name}! ¡Lo estás haciendo genial!`];}

const MISSION2_SAVE_KEY='huesosMission2SaveV1';
const MISSION2_UNLOCK_KEY='huesosMission2UnlockedV1';
const AUDIO_SETTINGS_KEY='huesosAudioSettingsV1';
const spaceLevelConfig=[
  {name:'☁️ Escuela entre nubes',duration:40,spawn:.98,speed:.17,box:8,pool:['bomb','net'],objective:'Aprendé a pilotar y completá la ruta',intro:'Una ruta amable para dominar el avión.'},
  {name:'🌄 Arcos del atardecer',duration:44,spawn:.86,speed:.19,box:7,pool:['bomb','net','fireball'],objective:'Atravesá los arcos y apagá las bolas de fuego',intro:'Las primeras bolas de fuego necesitan 5 impactos.'},
  {name:'☄️ Cinturón de asteroides',duration:46,spawn:.76,speed:.21,box:7,pool:['bomb','net','asteroid','fireball'],objective:'Abrí camino entre rocas y asteroides',intro:'Los asteroides resisten 2 impactos. Disparar ahora importa más.'},
  {name:'⭐ Frontera de estrellas',duration:48,spawn:.67,speed:.235,box:6,pool:['bomb','net','asteroid','mine','fireball','star'],objective:'Sobreviví a la ruta estelar más veloz',intro:'Las estrellas resisten 4 impactos. Buscá cajas sorpresa.'},
  {name:'👽 Arena extraterrestre',duration:82,spawn:.72,speed:.235,box:5.5,pool:['bomb','net','asteroid','mine','fireball','star'],objective:'Derrotá al extraterrestre y rescatá a Rayo',intro:'El jefe necesita 40 impactos. Clemente es tu mejor aliado.'}
];
const heroFlightConfig=[
  {name:'🏰 Castillo del amanecer',climate:'☀️ Cielo dorado',target:20,duration:58,speed:.19,hazard:6.2,hazards:['bird'],wind:.02,intro:'Seguí las monedas entre las torres del castillo.'},
  {name:'🌇 Valle del atardecer',climate:'🌤️ Viento de altura',target:25,duration:62,speed:.225,hazard:5.2,hazards:['bird','stork','peak'],wind:.045,intro:'Subí para pasar los picos y esquivá las cigüeñas.'},
  {name:'🌙 Reino de las estrellas',climate:'🌙 Noche estrellada',target:30,duration:66,speed:.255,hazard:4.4,hazards:['bird','stork','plane','peak','stormCloud'],wind:.07,intro:'Avionetas, montañas y nubes eléctricas cierran el paso.'},
  {name:'⛈️ Castillo de la tormenta',climate:'⛈️ Tormenta eléctrica',target:35,duration:72,speed:.285,hazard:3.5,hazards:['bird','stork','plane','peak','volcano','stormCloud'],wind:.12,intro:'El rayo avisa; esquivá volcanes y movete antes de la descarga.'},
  {name:'🌋 Guarida del dragón',climate:'🐉 Tormenta de fuego',target:40,duration:88,speed:.32,hazard:2.7,hazards:['bird','stork','plane','peak','volcano','stormCloud'],wind:.2,intro:'Juntá monedas, recargá combustible y derrotá al dragón.'}
];

class GameAudio {
  constructor() { const saved=JSON.parse(localStorage.getItem(AUDIO_SETTINGS_KEY)||'null')||{};this.ctx=null;this.master=null;this.musicBus=null;this.effectsBus=null;this.musicVolume=saved.music??.85;this.effectsVolume=saved.effects??.85;this.musicTimer=null;this.step=0;this.muted=false;this.engineOsc=null;this.engineGain=null;this.enginePan=null;this.windSource=null;this.windGain=null;this.lastFlightX=0;this.lastFlightY=0;this.flightCueAt=0; }
  start() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
      this.master=this.ctx.createGain();this.musicBus=this.ctx.createGain();this.effectsBus=this.ctx.createGain();this.master.gain.value=.4;this.musicBus.gain.value=this.musicVolume;this.effectsBus.gain.value=this.effectsVolume;this.musicBus.connect(this.master);this.effectsBus.connect(this.master);this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') this.ctx.resume();
    if (!this.musicTimer) this.musicTimer = setInterval(() => {
      if (state === 'cinematic' && !this.muted) {
        const themes={
          1:{notes:[392,523.25,659.25,587.33],type:'triangle',volume:.075},
          2:{notes:[146.83,174.61,220,207.65],type:'sine',volume:.095,mystery:true},
          3:{notes:[261.63,329.63,392,523.25],type:'triangle',volume:.075},
          4:{notes:[164.81,196,155.56,207.65],type:'sine',volume:.09,mystery:true}
        },theme=themes[cinematicMission]||themes[1],index=this.step++%theme.notes.length,note=theme.notes[index];
        this.tone(note,.3,theme.type,theme.volume,0,'music');
        if(theme.mystery&&index%2===0)this.tone(note/2,.55,'sine',.045,.03,'music');
      } else if (state === 'playing' && !this.muted) {
        const songs = [[261.63,329.63,392,523.25],[293.66,349.23,440,587.33],[220,293.66,369.99,440],[329.63,392,493.88,659.25],[196,246.94,293.66,392]],forestSongs=[[392,493.88,587.33,659.25,587.33,493.88],[349.23,440,523.25,659.25,523.25,440],[293.66,392,440,587.33,440,392],[261.63,329.63,392,493.88,392,329.63],[220,293.66,369.99,440,369.99,293.66]];
        const songIndex=mission===2?spaceLevel-1:mission===3?heroFlightLevel-1:mission===4?forestLevel-1:level-1,sequence=mission===4?forestSongs[songIndex]:songs[songIndex],note=sequence[this.step++%sequence.length],dragonTheme=mission===3&&heroFlightLevel===5;this.tone(dragonTheme?note*.48:mission===3?note*.75:mission===4?note:note,dragonTheme?.32:mission===4?.27:.18,dragonTheme?'sine':mission===3?'sawtooth':mission===4?'triangle':'triangle',dragonTheme?.12:mission===2?.11:mission===3?.105:mission===4?.068:.085,0,'music');if(mission===4&&this.step%3===0)this.tone(note*.5,.36,'sine',.028,.04,'music');if(mission===3&&this.step%4===0)this.tone(dragonTheme?note*.72:note*1.5,dragonTheme?.48:.32,dragonTheme?'sawtooth':'triangle',dragonTheme?.07:.055,.05,'music');
      }
    }, 330);
  }
  tone(freq, duration = .12, type = 'sine', volume = .1, delay = 0, channel='effects') {
    if (!this.ctx || this.muted) return;
    const t = this.ctx.currentTime + delay, osc = this.ctx.createOscillator(), gain = this.ctx.createGain();
    osc.type = type; osc.frequency.setValueAtTime(freq, t); gain.gain.setValueAtTime(.001, t);
    gain.gain.exponentialRampToValueAtTime(volume, t + .015); gain.gain.exponentialRampToValueAtTime(.001, t + duration);
    osc.connect(gain);gain.connect(channel==='music'?this.musicBus:this.effectsBus);osc.start(t);osc.stop(t+duration+.02);
  }
  panTone(freq,pan=0,duration=.12,volume=.08){
    if(!this.ctx||this.muted)return;const t=this.ctx.currentTime,osc=this.ctx.createOscillator(),gain=this.ctx.createGain(),panner=this.ctx.createStereoPanner?.();osc.type='triangle';osc.frequency.setValueAtTime(freq,t);gain.gain.setValueAtTime(.001,t);gain.gain.exponentialRampToValueAtTime(volume,t+.012);gain.gain.exponentialRampToValueAtTime(.001,t+duration);osc.connect(gain);if(panner){gain.connect(panner);panner.pan.value=Math.max(-1,Math.min(1,pan));panner.connect(this.effectsBus);}else gain.connect(this.effectsBus);osc.start(t);osc.stop(t+duration+.02);
  }
  noise(duration = .15, volume = .08) {
    if (!this.ctx || this.muted) return;
    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * duration, this.ctx.sampleRate), data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource(), gain = this.ctx.createGain();
    src.buffer = buffer; gain.gain.setValueAtTime(volume, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, this.ctx.currentTime + duration);
    src.connect(gain);gain.connect(this.effectsBus);src.start();
  }
  naturalBark(pitch=190,double=false) {
    if(!this.ctx||this.muted)return;
    const burst=(delay,p)=>{
      const t=this.ctx.currentTime+delay,duration=.16,buffer=this.ctx.createBuffer(1,Math.ceil(this.ctx.sampleRate*duration),this.ctx.sampleRate),data=buffer.getChannelData(0);
      for(let i=0;i<data.length;i++){const attack=Math.min(1,i/(this.ctx.sampleRate*.012)),release=Math.pow(1-i/data.length,2.2);data[i]=(Math.random()*2-1)*attack*release;}
      const noise=this.ctx.createBufferSource(),filter=this.ctx.createBiquadFilter(),noiseGain=this.ctx.createGain(),voice=this.ctx.createOscillator(),voiceGain=this.ctx.createGain();
      noise.buffer=buffer;filter.type='bandpass';filter.frequency.setValueAtTime(p*2.35,t);filter.Q.value=1.35;noiseGain.gain.setValueAtTime(.001,t);noiseGain.gain.exponentialRampToValueAtTime(.18,t+.012);noiseGain.gain.exponentialRampToValueAtTime(.001,t+duration);
      voice.type='sawtooth';voice.frequency.setValueAtTime(p,t);voice.frequency.exponentialRampToValueAtTime(p*.54,t+duration);voiceGain.gain.setValueAtTime(.001,t);voiceGain.gain.exponentialRampToValueAtTime(.095,t+.014);voiceGain.gain.exponentialRampToValueAtTime(.001,t+duration);
      noise.connect(filter);filter.connect(noiseGain);noiseGain.connect(this.effectsBus);voice.connect(voiceGain);voiceGain.connect(this.effectsBus);noise.start(t);voice.start(t);noise.stop(t+duration+.02);voice.stop(t+duration+.02);
    };
    burst(0,pitch);if(double)burst(.22,pitch*1.08);
  }
  fx(name) {
    const sounds = {
      start: () => [261,329,392,523].forEach((f,i) => this.tone(f,.2,'triangle',.14,i*.1)),
      story: () => [392,494,587].forEach((f,i) => this.tone(f,.18,'triangle',.1,i*.08)),
      catch: () => { this.tone(660,.09,'sine',.12); this.tone(880,.12,'sine',.1,.06); },
      prize: () => [523,659,784,1047].forEach((f,i) => this.tone(f,.18,'triangle',.14,i*.07)),
      miss: () => this.tone(180,.12,'sine',.05),
      splash: () => { this.noise(.28,.17); this.tone(110,.25,'sine',.14); },
      slow: () => [310,260,210].forEach((f,i) => this.tone(f,.2,'sine',.09,i*.08)),
      freeze: () => { this.noise(.18,.08); [880,660,440].forEach((f,i) => this.tone(f,.14,'sine',.09,i*.05)); },
      pop: () => { this.noise(.12,.2); this.tone(90,.18,'square',.12); },
      jump: () => { this.tone(330,.08,'sine',.08); this.tone(520,.12,'triangle',.08,.05); },
      toy: () => [440,660,880].forEach((f,i) => this.tone(f,.12,'triangle',.1,i*.055)),
      tick: () => { this.tone(155,.09,'square',.08); this.tone(125,.12,'square',.07,.07); },
      power: () => [392,523,659,784,1047].forEach((f,i) => this.tone(f,.2,'triangle',.13,i*.055)),
      shield: () => { this.noise(.1,.08); this.tone(980,.12,'sine',.12); },
      stomp: () => { this.tone(125,.08,'square',.12); this.tone(620,.13,'triangle',.11,.05); },
      weapon: () => [180,270,405].forEach((f,i) => this.tone(f,.14,'sawtooth',.09,i*.06)),
      darkThrow: () => { this.tone(115,.13,'sawtooth',.1); this.noise(.09,.055); },
      surprise: () => [440,554,659,880].forEach((f,i)=>this.tone(f,.16,'triangle',.11,i*.055)),
      thief: () => { this.noise(.22,.11);[330,247,196].forEach((f,i)=>this.tone(f,.18,'sawtooth',.09,i*.08)); },
      net: () => { this.noise(.18,.075);[210,170,135].forEach((f,i)=>this.tone(f,.13,'square',.065,i*.06)); },
      bark: () => this.naturalBark(190,false),
      playBark: () => this.naturalBark(225,true),
      catMeow: () => { this.tone(620,.12,'sine',.115);this.tone(470,.18,'sine',.1,.09);this.tone(540,.1,'triangle',.07,.23); },
      kick: () => { this.tone(145,.07,'square',.13);this.noise(.07,.09);this.tone(520,.1,'triangle',.08,.045); },
      flea: () => { this.tone(440,.055,'square',.07);this.tone(690,.07,'triangle',.08,.045); },
      bird: () => { this.tone(1180,.05,'sine',.055);this.tone(1540,.045,'triangle',.045,.055);this.tone(1320,.055,'sine',.04,.11); },
      crow: () => { this.tone(310,.12,'sawtooth',.06);this.tone(235,.15,'triangle',.045,.09); },
      bat: () => { this.noise(.08,.035);this.tone(1760,.04,'sine',.035);this.tone(1450,.05,'sine',.03,.06); },
      forestBirds: () => { this.tone(1260,.045,'sine',.035);this.tone(1680,.05,'triangle',.032,.07);this.tone(1420,.045,'sine',.028,.15); },
      fruit: () => { this.tone(620,.065,'sine',.08);this.tone(930,.11,'triangle',.075,.05); },
      coin: () => { this.tone(920,.06,'sine',.09);this.tone(1320,.1,'triangle',.075,.045); },
      clover: () => [392,523,659,784,1047].forEach((f,i)=>this.tone(f,.2,'triangle',.12,i*.05)),
      lightning: () => { this.noise(.5,.22);this.tone(62,.55,'sawtooth',.15); },
      fuel: () => { this.tone(240,.12,'square',.08);this.tone(360,.16,'triangle',.1,.08);this.tone(520,.2,'sine',.08,.16); },
      dragon: () => { this.noise(.35,.15);[98,82,65].forEach((f,i)=>this.tone(f,.42,'sawtooth',.12,i*.1)); },
      dragonFire: () => { this.noise(.32,.2);this.tone(72,.38,'sawtooth',.15); },
      heroShot: () => { this.panTone(410,.45,.08,.1);this.panTone(720,.72,.1,.07); },
      gust: () => { this.noise(.28,.12);this.panTone(210,Math.random()*2-1,.24,.08); },
      fede: () => { this.panTone(980,-.6,.07,.08);this.panTone(1240,-.25,.08,.07);[523,659,784,1047].forEach((f,i)=>this.tone(f,.12,'triangle',.09,.12+i*.05)); },
      trampoline: () => [330,494,659,988].forEach((f,i)=>this.tone(f,.16,'sine',.11,i*.045)),
      mystery: () => { [220,185,146.83].forEach((f,i)=>this.tone(f,.32,'sine',.075,i*.1,'music')); },
      adventureIntro: () => [392,523,659].forEach((f,i)=>this.tone(f,.2,'triangle',.085,i*.08,'music')),
      homeIntro: () => [330,392,523,659].forEach((f,i)=>this.tone(f,.22,'sine',.075,i*.075,'music')),
      apple: () => { this.tone(510,.055,'triangle',.045); this.tone(720,.07,'sine',.035,.03); },
      egg: () => { this.tone(420,.06,'triangle',.07);this.tone(610,.08,'sine',.055,.035); },
      eggBoom: () => { this.noise(.18,.16);this.tone(95,.22,'sawtooth',.12); },
      salvo: () => [260,330,415].forEach((f,i)=>this.panTone(f,i-1,.1,.07)),
      crate: () => [392,587,784].forEach((f,i)=>this.tone(f,.15,'triangle',.1,i*.055)),
      hit: () => { this.tone(130,.12,'sawtooth',.12); this.tone(90,.18,'sawtooth',.08,.08); },
      combo: () => [440,587,740].forEach((f,i)=>this.tone(f,.11,'triangle',.09,i*.045)),
      record: () => [523,659,784,988,1318].forEach((f,i)=>this.tone(f,.24,'triangle',.14,i*.07)),
      unlock: () => [392,523,659,784,1047].forEach((f,i)=>this.tone(f,.28,'triangle',.14,i*.09)),
      level: () => [392,523,659,784].forEach((f,i) => this.tone(f,.24,'triangle',.13,i*.12)),
      lose: () => [330,247,196].forEach((f,i) => this.tone(f,.3,'sine',.11,i*.16)),
      win: () => [523,659,784,1047,1318].forEach((f,i) => this.tone(f,.3,'triangle',.15,i*.1))
    };
    sounds[name]?.();
  }
  engine(active,horizontal=0,vertical=0){
    if(!this.ctx)return;
    if(active&&!this.engineOsc){const osc=this.ctx.createOscillator(),gain=this.ctx.createGain(),filter=this.ctx.createBiquadFilter(),pan=this.ctx.createStereoPanner?.();osc.type='sawtooth';osc.frequency.value=86;filter.type='lowpass';filter.frequency.value=330;gain.gain.value=.001;osc.connect(filter);if(pan){filter.connect(pan);pan.connect(gain);}else filter.connect(gain);gain.connect(this.effectsBus);osc.start();gain.gain.exponentialRampToValueAtTime(.065,this.ctx.currentTime+.28);this.engineOsc=osc;this.engineGain=gain;this.enginePan=pan||null;}
    if(active&&this.engineOsc){const moving=Math.min(1,Math.abs(horizontal)+Math.abs(vertical));this.engineOsc.frequency.setTargetAtTime(86-vertical*38+Math.abs(horizontal)*10,this.ctx.currentTime,.055);this.engineGain.gain.setTargetAtTime(.06+moving*.025,this.ctx.currentTime,.08);if(this.enginePan)this.enginePan.pan.setTargetAtTime(horizontal*.78,this.ctx.currentTime,.06);const now=performance.now();if(now-this.flightCueAt>190&&(horizontal!==this.lastFlightX||vertical!==this.lastFlightY)&&(horizontal||vertical)){this.panTone(vertical<0?690:vertical>0?185:horizontal<0?330:430,horizontal*.9,.13,.085);this.flightCueAt=now;}this.lastFlightX=horizontal;this.lastFlightY=vertical;}
    if(!active&&this.engineOsc){const osc=this.engineOsc,gain=this.engineGain;gain.gain.setTargetAtTime(.001,this.ctx.currentTime,.06);setTimeout(()=>{try{osc.stop();}catch{}},260);this.engineOsc=null;this.engineGain=null;this.enginePan=null;this.lastFlightX=0;this.lastFlightY=0;}
  }
  wind(active,intensity=.35){
    if(!this.ctx)return;
    if(active&&!this.windSource){const length=this.ctx.sampleRate*2,buffer=this.ctx.createBuffer(1,length,this.ctx.sampleRate),data=buffer.getChannelData(0);for(let i=0;i<length;i++)data[i]=(Math.random()*2-1)*(.55+.45*Math.sin(i*.0007));const source=this.ctx.createBufferSource(),filter=this.ctx.createBiquadFilter(),gain=this.ctx.createGain();source.buffer=buffer;source.loop=true;filter.type='bandpass';filter.frequency.value=720;filter.Q.value=.55;gain.gain.value=.001;source.connect(filter);filter.connect(gain);gain.connect(this.effectsBus);source.start();gain.gain.exponentialRampToValueAtTime(.025+intensity*.08,this.ctx.currentTime+.25);this.windSource=source;this.windGain=gain;}
    if(active&&this.windGain)this.windGain.gain.setTargetAtTime(.025+intensity*.08,this.ctx.currentTime,.18);
    if(!active&&this.windSource){const source=this.windSource,gain=this.windGain;gain.gain.setTargetAtTime(.001,this.ctx.currentTime,.08);setTimeout(()=>{try{source.stop();}catch{}},320);this.windSource=null;this.windGain=null;}
  }
  setVolume(channel,value){const level=Math.max(0,Math.min(1,value));if(channel==='music'){this.musicVolume=level;if(this.musicBus)this.musicBus.gain.value=level;}else{this.effectsVolume=level;if(this.effectsBus)this.effectsBus.gain.value=level;}localStorage.setItem(AUDIO_SETTINGS_KEY,JSON.stringify({music:this.musicVolume,effects:this.effectsVolume}));}
  toggle(){this.muted=!this.muted;if(this.master)this.master.gain.value=this.muted?0:.4;return this.muted;}
}
const audio = new GameAudio();

function closeStory() {
  $('storyIntro').classList.add('hidden');
  $('setup').classList.remove('hidden');
}

$('storyNext').onclick = () => {
  audio.start(); audio.fx('story');
  closeStory();
};

const cinematicStories={
  1:[
    {image:'assets/story-opening.png',title:'¡Atrapá los huesos!',text:'Corré y juntalos antes de que el viento se los lleve.',actors:['dog','prop:🦴','prop:🦴']},
    {image:'assets/background.png',title:'¡Saltá las trampas!',text:'Esquivá bombuchas, redes, garrapatas y pelotas.',actors:['dog','mouse','prop:💦']},
    {image:'assets/background.png',title:'¡Usá tus poderes!',text:'Guardá huesos negros y buscá la inmunidad dorada.',actors:['dog','prop:✨','prop:🎁']},
    {image:'assets/story-opening.png',title:'¡La batalla final!',text:'Saltá, dispará y recuperá la gran cosecha.',actors:['dog','cat','mouse']}
  ],
  2:[
    {image:'assets/mission2-concept.png',title:'¡Se llevaron al Ratón!',text:'El OVNI escapó. Sus amigos salen al rescate.',actors:['ufo','mouse','prop:⚡']},
    {image:'assets/mission2-level1.webp',title:'¡Todos al avión!',text:'Volá entre las nubes y esquivá los peligros.',actors:['plane','prop:☁️','dog']},
    {image:'assets/mission2-level3.webp',title:'¡Abrí el camino!',text:'Dispará huesos y activá las cajas sorpresa.',actors:['plane','prop:🔥','prop:📦']},
    {image:'assets/mission2-level5.webp',title:'¡Rescatemos a nuestro amigo!',text:'Vencemos juntos. Nadie queda atrás.',actors:['plane','ufo','mouse']}
  ],
  3:[
    {image:'assets/mission2-level5.webp',title:'¡Ratón, saltá!',text:'El último hueso rompe la cápsula y nuestro amigo queda libre.',actors:['ufo','mouse','prop:✨']},
    {image:'assets/mission2-level1.webp',title:'¡Volvemos juntos!',text:'Los tres amigos emprenden el viaje de regreso a casa.',actors:['plane','mouse','cat']},
    {image:'assets/story-friendship.png',title:'¡Hogar, dulce hogar!',text:'Una gran comida celebra el rescate y la amistad.',actors:['dog','cat','mouse']},
    {image:'assets/story-opening.png',title:'Una nueva misión nos espera',text:'Ahora el Gato y el Ratón también están listos para la aventura.',actors:['dog','cat','mouse','prop:⭐']}
  ],
  4:[
    {image:'assets/story-friendship.png',title:'¡Los huesos están a salvo!',text:'Los amigos celebran… pero una sombra cruza el cielo.',actors:['dog','cat','mouse','prop:🦴']},
    {image:'assets/mission2-concept.png',title:'¡Se llevaron a Rayo!',text:'El perro y Clemente despegan sin perder un segundo.',actors:['ufo','mouse','plane']}
  ],
  5:[
    {image:'assets/hero-flight-castle-v1.png',title:'¡Una ruta secreta se abrió!',text:'El nuevo amigo despega hacia cinco cielos desconocidos.',actors:['dog','prop:🪙','prop:🪙']},
    {image:'assets/hero-flight-castle-v1.png',title:'¡Seguí el camino dorado!',text:'Juntá monedas y subí o bajá con cada impulso.',actors:['dog','prop:🪙','prop:🍀']},
    {image:'assets/hero-flight-castle-v1.png',title:'¡Cuidado en el aire!',text:'Pájaros, cigüeñas y avionetas cruzan tu ruta.',actors:['dog','prop:🐦','prop:✈️']},
    {image:'assets/hero-flight-castle-v1.png',title:'¡Atravesá la gran tormenta!',text:'El trébol dorado te protege del viento y los relámpagos.',actors:['dog','prop:🍀','prop:⚡']}
  ],
  6:[
    {image:'assets/mission4-level1-v1.png',title:'Mike salió bajo la lluvia',text:'Su flamenco rojo favorito quedó olvidado en el parque.',actors:['dog','prop:🦩','prop:🌧️']},
    {image:'assets/mission4-level2-v1.png',title:'El sendero desapareció',text:'Siguiendo el juguete, Mike entró demasiado profundo en el bosque.',actors:['dog','prop:🌲','prop:🐾']},
    {image:'assets/mission4-level3-v1.png',title:'¡Ayudemos a Mike!',text:'Saltá peligros, abrí cajas y reuní las huellas que marcan el regreso.',actors:['dog','prop:🍄','prop:🎁']},
    {image:'assets/mission4-level5-v1.png',title:'Encontrá el camino a casa',text:'La última pista revela cuál de los tres senderos es el verdadero.',actors:['dog','prop:🐾','prop:🏠']}
  ]
};
function renderCinematicScene(index){
  const scene=cinematicStories[cinematicMission][index];if(!scene)return;cinematicSceneIndex=index;
  const specialReplay=(cinematicMission===1||cinematicMission===5)&&selectedHero!=='dog',sceneImage=cinematicMission===1&&specialReplay&&scene.image==='assets/story-opening.png'?'assets/background.png':scene.image;
  let actors=scene.actors.map(actor=>specialReplay&&actor==='dog'?selectedHero:actor);
  if(specialReplay){const heroIndex=actors.indexOf(selectedHero);actors=actors.filter((actor,i)=>i===heroIndex||actor!==selectedHero);}
  $('cinematicImage').src=sceneImage;$('cinematicTitle').textContent=scene.title;$('cinematicText').textContent=scene.text;$('cinematicScene').textContent=`ESCENA ${index+1} DE ${cinematicStories[cinematicMission].length}`;
  $('cinematicActors').innerHTML=actors.map((actor,i)=>{if(actor.startsWith('prop:'))return`<span class="cine-actor prop actor-${i}">${actor.slice(5)}</span>`;const dogStyle=actor==='dog'?` style="--dog-pos:${selectedDog*100/3}%"`:'',playerClass=specialReplay&&actor===selectedHero?' player-hero':'';return`<span class="cine-actor ${actor}${playerClass} actor-${i}"${dogStyle}></span>`;}).join('');
  $('missionCinematic').classList.remove('scene-0','scene-1','scene-2','scene-3');$('missionCinematic').classList.add(`scene-${index}`);
  $('cinematicMission').textContent=cinematicMission===1?'MISIÓN 1 · EL PARQUE':cinematicMission===2?'MISIÓN 2 · RESCATE AÉREO':cinematicMission===3?'EPÍLOGO · REGRESO A CASA':cinematicMission===5?'AVENTURA AÉREA · CINCO CIELOS':cinematicMission===6?'NUEVA HISTORIA · MIKE PERDIDO':'TRANSICIÓN · ALGO APARECIÓ EN EL CIELO';
  const image=$('cinematicImage'),copy=document.querySelector('.cinematic-copy');image.style.animation='none';copy.style.animation='none';void image.offsetHeight;image.style.animation='cinematicCamera 5s ease-out both';copy.style.animation='cinematicCopy .5s both';audio.fx(cinematicMission===2||cinematicMission===4?'mystery':cinematicMission===3?'homeIntro':'adventureIntro');if(cinematicMission===5)audio.fx('gust');
}
function finishMissionCinematic(){
  if(state!=='cinematic')return;cancelAnimationFrame(cinematicRaf);$('missionCinematic').classList.add('hidden');state='setup';const done=cinematicDone;cinematicDone=null;done?.();
}
function updateMissionCinematic(now){
  if(state!=='cinematic')return;const elapsed=Math.min(cinematicDuration,(now-cinematicStartedAt)/1000),scenes=cinematicStories[cinematicMission].length,scene=Math.min(scenes-1,Math.floor(elapsed/(cinematicDuration/scenes)));if(scene!==cinematicSceneIndex)renderCinematicScene(scene);
  $('cinematicProgress').style.width=`${elapsed/cinematicDuration*100}%`;$('cinematicTime').textContent=`${Math.max(0,Math.ceil(cinematicDuration-elapsed))} s`;
  if(elapsed>=cinematicDuration){finishMissionCinematic();return;}cinematicRaf=requestAnimationFrame(updateMissionCinematic);
}
function playMissionCinematic(which,onDone){
  cancelAnimationFrame(raf);cancelAnimationFrame(cinematicRaf);audio.start();audio.engine(false);audio.wind(false);audio.step=0;mission=which;state='cinematic';cinematicMission=which;cinematicDone=onDone;cinematicSceneIndex=-1;
  $('setup').classList.add('hidden');$('ending').classList.add('hidden');$('mission2Intro').classList.add('hidden');$('mission2Briefing').classList.add('hidden');$('game').classList.add('hidden');$('missionCinematic').classList.toggle('space',which!==1);$('missionCinematic').classList.remove('hidden');
  cinematicDuration=which===5?20:which===6?16:which===4?7.5:which===2?8:which===1?12:16;cinematicStartedAt=performance.now();renderCinematicScene(0);$('cinematicProgress').style.width='0%';$('cinematicTime').textContent=`${Math.ceil(cinematicDuration)} s`;cinematicRaf=requestAnimationFrame(updateMissionCinematic);
}
$('cinematicSkip').onclick=finishMissionCinematic;

function getAdventureProgress(){try{return JSON.parse(localStorage.getItem(PROGRESS_KEY)||'null')||{best:{1:0,2:0,3:0},stars:{1:0,2:0,3:0}};}catch{return{best:{1:0,2:0,3:0},stars:{1:0,2:0,3:0}};}}
function updateMenuProgress(){const p=getAdventureProgress(),best=Math.max(p.best?.[1]||0,p.best?.[2]||0,p.best?.[3]||0,p.best?.[4]||0),stars=Math.max(p.stars?.[1]||0,p.stars?.[2]||0,p.stars?.[3]||0,p.stars?.[4]||0);$('menuBest').textContent=`🏆 Mejor puntaje: ${best.toLocaleString('es-AR')} · ${'★'.repeat(stars)}${'☆'.repeat(3-stars)}`;}
function resetRunStats(){combo=0;maxCombo=0;comboTimer=0;comboDisplayTimer=0;floatingTexts=[];runCollected=0;runBonuses=0;runDamage=0;newRecordEarned=false;currentStars=0;$('comboHud').classList.add('hidden');}
function saveMissionResult(won){
  const p=getAdventureProgress(),previous=p.best?.[mission]||0;newRecordEarned=score>previous;if(newRecordEarned)p.best[mission]=score;
  currentStars=won?1:0;if(won&&score>=(mission===1?13500:mission===3?12000:7500))currentStars++;if(won&&(mission===1?maxCombo>=5:lives===3))currentStars++;
  p.stars[mission]=Math.max(p.stars?.[mission]||0,currentStars);localStorage.setItem(PROGRESS_KEY,JSON.stringify(p));updateMenuProgress();return{best:p.best[mission]||score,stars:currentStars};
}
function addFloatingText(text,x,y,color='#fff5a8'){floatingTexts.push({text,x,y,life:1,color});}
function resetCombo(){combo=0;comboTimer=0;comboDisplayTimer=0;$('comboHud').classList.add('hidden');}
function updateComboTimers(dt){comboTimer=Math.max(0,comboTimer-dt);comboDisplayTimer=Math.max(0,comboDisplayTimer-dt);if(comboDisplayTimer===0)$('comboHud').classList.add('hidden');if(combo>0&&comboTimer===0)resetCombo();}
function rewardCatch(base,x,y,label=''){combo++;comboTimer=2.4;maxCombo=Math.max(maxCombo,combo);const multiplier=Math.min(4,1+Math.floor(combo/3)),double=doubleTimer>0?2:1,points=base*multiplier*double;score+=points;levelScore+=points;runCollected++;if(base>100)runBonuses++;addFloatingText(`+${points}`,x,y,base>100?'#ffd84e':'#ffffff');if([3,6,9,12].includes(combo)){comboDisplayTimer=.8;$('comboHud').classList.remove('hidden');$('comboValue').textContent=`COMBO ×${combo}`;$('comboBonus').textContent=`PUNTOS ×${multiplier}`;audio.fx('combo');showToast(`🔥 ¡COMBO ×${combo}! +${points}`);}else if(label)showToast(`${label} +${points}`);return points;}
function startTutorial(which){tutorialMission=which;tutorialStep=0;tutorialClock=0;tutorialObstacleSeen=false;showTutorial(which===1?'↔':'✈️','MOVETE',which===1?'Arrastrá o usá ← → / A D':'Arrastrá o usá las flechas');}
function showTutorial(icon,title,text){$('tutorialIcon').textContent=icon;$('tutorialTitle').textContent=title;$('tutorialText').textContent=text;$('tutorialCoach').classList.remove('hidden');}
function finishTutorialStep(){tutorialStep++;tutorialClock=0;$('tutorialCoach').classList.add('hidden');}
function updateTutorial(dt){
  tutorialClock+=dt;if(tutorialMission!==mission)return;
  const moved=mission===1?dogMoving:Math.abs(planeBank)>.08||Math.abs(planePitch)>.08;
  if(tutorialStep===0&&moved){finishTutorialStep();setTimeout(()=>{if(state==='playing'&&tutorialStep===1)showTutorial(mission===1?'🦴':'💥',mission===1?'ATRAPÁ EL HUESO':'DISPARÁ','Toque o Espacio = acción');},350);}
  if(mission===1&&tutorialStep===2&&tutorialObstacleSeen)$('tutorialCoach').classList.remove('hidden');
  if(mission===2&&tutorialStep===2&&tutorialClock>3){finishTutorialStep();}
}
function tutorialAction(kind){
  if(tutorialMission!==mission)return;
  if(tutorialStep===1&&((mission===1&&kind==='catch')||(mission===2&&kind==='fire'))){finishTutorialStep();if(mission===2)setTimeout(()=>{if(state==='playing'&&tutorialStep===2)showTutorial('📦','ABRÍ LAS CAJAS','Disparales para activar poderes');},450);}
  if(tutorialStep===2&&kind==='jump')finishTutorialStep();
}

function heroesUnlocked(){return localStorage.getItem(HERO_UNLOCK_KEY)==='true';}
function selectHero(type,dogIndex=selectedDog){
  selectedHero=type;if(type==='dog')selectedDog=dogIndex;
  document.querySelectorAll('.dog-choice').forEach(button=>{const active=button.dataset.hero===selectedHero&&(selectedHero!=='dog'||Number(button.dataset.dog)===selectedDog);button.classList.toggle('selected',active);button.setAttribute('aria-checked',active);});
  const fixedName=type==='dog'?CHARACTER_NAMES.dog[selectedDog]:CHARACTER_NAMES[type];$('dogName').value=fixedName;$('fixedCharacterName').textContent=fixedName;
}
function renderCharacterChoices(){
  $('dogChoices').innerHTML='';
  breeds.forEach((name,i)=>{const b=document.createElement('button');b.className='dog-choice';b.dataset.hero='dog';b.dataset.dog=i;b.setAttribute('role','radio');b.innerHTML=`<div class="dog-thumb" style="background-position:${i*100/3}% 0%"></div><strong>${name}</strong><small>${DOG_TRAITS[i].detail}</small>`;b.title=DOG_TRAITS[i].detail;b.onclick=()=>selectHero('dog',i);$('dogChoices').appendChild(b);});
  const unlocked=heroesUnlocked();$('unlockedCharacters').classList.toggle('hidden',!unlocked);$('specialChoices').innerHTML='';
  if(unlocked)[['cat','Clemente'],['mouse','Rayo']].forEach(([type,name])=>{const b=document.createElement('button');b.className='dog-choice special-choice';b.dataset.hero=type;b.setAttribute('role','radio');b.innerHTML=`<div class="dog-thumb special-thumb ${type}"></div><strong>${name}</strong><small>${type==='cat'?'GATO NINJA':'RATÓN PIRATA'}</small>`;b.onclick=()=>selectHero(type);$('specialChoices').appendChild(b);});
  selectHero(selectedHero,selectedDog);
}
renderCharacterChoices();
function refreshForestShortcut(){const unlocked=localStorage.getItem(FOREST_UNLOCK_KEY)==='true';$('forestShortcut').classList.toggle('hidden',!unlocked);}
refreshForestShortcut();
function playForestStory(){selectedHero='dog';selectedDog=0;audio.start();playMissionCinematic(6,beginForestAdventure);}
$('forestShortcut').onclick=playForestStory;
const forestDemo=Number(new URLSearchParams(location.search).get('forestDemo')||0);if(forestDemo>=1&&forestDemo<=5)setTimeout(()=>{const params=new URLSearchParams(location.search);localStorage.setItem(FOREST_UNLOCK_KEY,'true');closeStory();beginForestAdventure();if(forestDemo>1){forestLevel=forestDemo;startForestLevel();}if(params.get('forestChoice')==='1'){forestDistance=.99;time=.15;}if(params.get('forestBat')==='1'){forestBats.push({x:.78,y:.56,speed:.035,phase:0,size:1.08});forestBatClock=99;}if(params.get('forestBranch')==='1'){const platform={x:.67,y:.57,width:.24,short:false,speed:params.get('forestFall')==='1'?.42:0,phase:0};forestPlatforms.push(platform);forestCollectibles.push({x:.62,y:.465,kind:2,speed:platform.speed,phase:0,platform},{x:.72,y:.465,kind:3,speed:platform.speed,phase:2,platform});forestPlatformClock=99;if(params.get('forestLand')==='1'){dogX=platform.x;forestDogY=forestPlatformTop(platform);forestOnPlatform=true;jumpVelocity=0;}}if(params.get('forestSlow')==='1'){forestPower='slowmo';forestPowerTimer=15;}},80);

$('startBtn').onclick = () => { audio.start();lastGameWon=false;score = 0;lives = 3;energy=3;resetRunStats();if(selectedHero!=='dog'){heroFlightLevel=1;heroFlightTotalCoins=0;playMissionCinematic(5,beginHeroFlight);return;}mission=1;level = 1;levelScore = 0;blackAmmo=0;mission1HeartSpawned=false;mission1HeartClock=10+Math.random()*8;heartDrops=[];playMissionCinematic(1,()=>startLevel(true)); };
$('soundBtn').onclick = () => {
  const muted = audio.toggle(); $('soundBtn').textContent = muted ? '🔇' : '🔊'; $('soundBtn').classList.toggle('muted',muted);
  $('soundBtn').setAttribute('aria-label',muted ? 'Activar música y efectos' : 'Silenciar música y efectos');
};
$('pauseBtn').onclick=toggleGamePause;
$('resumeBtn').onclick=resumeGame;
$('restartMission2LevelBtn').onclick=()=>{hidePauseOverlay();mission===2?startMission2Level():mission===3?startHeroFlightLevel(false):mission===4?startForestLevel():startLevel(false);};
$('exitMission2Btn').onclick=exitGameToMenu;
const syncVolumeControls=()=>{const music=Math.round(audio.musicVolume*100),effects=Math.round(audio.effectsVolume*100);$('musicVolume').value=music;$('effectsVolume').value=effects;$('musicVolumeValue').textContent=`${music}%`;$('effectsVolumeValue').textContent=`${effects}%`;};
$('musicVolume').oninput=e=>{audio.start();audio.setVolume('music',e.target.value/100);$('musicVolumeValue').textContent=`${e.target.value}%`;};
$('effectsVolume').oninput=e=>{audio.start();audio.setVolume('effects',e.target.value/100);$('effectsVolumeValue').textContent=`${e.target.value}%`;};
$('modalBtn').onclick = () => {
  const action = $('modalBtn').dataset.action; $('modal').classList.add('hidden');
  if (action === 'next') { level++; levelScore = 0; startLevel(true); }
  else if (action === 'retry') startLevel(false);
  else if(action==='spaceNext'){spaceLevel++;startMission2Level();}
  else if(action==='heroNext'){heroFlightLevel++;startHeroFlightLevel(true);}
  else if(action==='forestNext'){forestLevel++;startForestLevel();}
  else if(action==='forestRestart')beginForestAdventure();
  else restartWholeGame();
};
function showHeroUnlock(){
  localStorage.setItem(HERO_UNLOCK_KEY,'true');localStorage.setItem(FOREST_UNLOCK_KEY,'true');renderCharacterChoices();refreshForestShortcut();state='ended';endingStage='unlock';
  $('ending').classList.remove('hidden','lose');$('ending').classList.add('win','farewell','unlock');
  $('endingIcon').textContent='⭐';$('endingTitle').textContent='¡NUEVOS AMIGOS DESBLOQUEADOS!';
  $('endingText').textContent='Clemente y Rayo se suman al equipo. Sus aventuras aéreas quedan desbloqueadas y una nueva historia de Mike está por comenzar.';
  $('endingMoral').textContent='Después del rescate del OVNI, una tarde lluviosa llevará a Mike a descubrir un bosque lleno de pistas.';$('endingMoral').classList.remove('hidden');
  $('endingScore').textContent='🐱 CLEMENTE  +  🐭 RAYO  +  🌧️ MIKE';$('resultStats').classList.add('hidden');$('newRecord').classList.add('hidden');$('endingActions').classList.remove('hidden');$('replayBtn').classList.add('hidden');$('menuBtn').classList.remove('hidden');$('endingBtn').innerHTML='Seguir la historia de Mike <span>▶</span>';audio.fx('unlock');
}
$('endingBtn').onclick = () => {
  if (endingStage === 'result') {
    if(mission===3){restartWholeGame();return;}
    if(mission===4){restartWholeGame();return;}
    if(mission===1&&lastGameWon){playMissionCinematic(2,()=>beginMission2(false));return;}
    if(!lastGameWon){replayCurrentMission();return;}
    if(mission===2){playMissionCinematic(3,showHeroUnlock);return;}
    endingStage = 'farewell'; $('ending').classList.add('farewell');
    $('endingIcon').textContent = '🧺'; $('endingTitle').textContent = 'EL MEJOR PREMIO FUE LA AMISTAD';
    $('endingText').textContent = `Después del rescate, ${petName()}, Rayo y Clemente regresaron a casa. Invitaron al extraterrestre a compartir un gran almuerzo y descubrieron que hasta una aventura entre planetas puede terminar con un nuevo amigo.`;
    $('endingMoral').textContent = 'Cuando compartimos y escuchamos al otro, hasta un rival puede convertirse en un gran amigo. ¡Siempre hay lugar para uno más en la mesa!';
    $('endingMoral').classList.remove('hidden');
    $('endingBtn').innerHTML = 'Jugar otra vez <span>▶</span>';
  } else if(endingStage==='unlock'){
    $('ending').classList.add('hidden');$('ending').classList.remove('win','farewell','unlock');playForestStory();
  } else {
    restartWholeGame();
  }
};
$('replayBtn').onclick=replayCurrentMission;
$('menuBtn').onclick=()=>{cancelAnimationFrame(raf);audio.engine(false);audio.wind(false);state='setup';$('ending').classList.add('hidden');$('ending').classList.remove('win','lose','farewell','unlock');$('game').classList.add('hidden');$('game').classList.remove('mission-two','hero-flight','forest-mission');$('setup').classList.remove('hidden');updateMenuProgress();refreshForestShortcut();};
function replayCurrentMission(){
  $('ending').classList.add('hidden');$('ending').classList.remove('win','lose','farewell','unlock');lastGameWon=false;score=0;lives=3;energy=3;resetRunStats();
  if(mission===2){spaceLevel=1;mission2HeartSpawned=false;mission2HeartClock=10+Math.random()*8;startMission2Level();}
  else if(mission===3){heroFlightLevel=1;heroFlightTotalCoins=0;heroHeartLevels=new Set();startHeroFlightLevel(true);}
  else if(mission===4){beginForestAdventure();}
  else{mission=1;level=1;levelScore=0;blackAmmo=0;mission1HeartSpawned=false;mission1HeartClock=10+Math.random()*8;startLevel(true);}
}
function getMission2Save(){try{return JSON.parse(localStorage.getItem(MISSION2_SAVE_KEY)||'null');}catch{return null;}}
function petName(){return selectedHero==='dog'?CHARACTER_NAMES.dog[selectedDog]:CHARACTER_NAMES[selectedHero];}
function saveMission2Progress(){if(mission!==2)return;localStorage.setItem(MISSION2_SAVE_KEY,JSON.stringify({spaceLevel,score,lives,energy,selectedDog,selectedHero,dogName:petName()}));refreshMission2Shortcut();}
function clearMission2Save(){localStorage.removeItem(MISSION2_SAVE_KEY);refreshMission2Shortcut();}
function refreshMission2Shortcut(){const saved=getMission2Save(),unlocked=localStorage.getItem(MISSION2_UNLOCK_KEY)==='true',button=$('mission2Shortcut');button.classList.toggle('hidden',!saved||!unlocked);if(saved&&unlocked)button.textContent=`🚀 Continuar Misión 2 · Nivel ${saved.spaceLevel}`;}
function beginMission2(resume=false){
  audio.start();audio.engine(false);state='setup';$('mission2Intro').classList.add('hidden');mission=2;lastGameWon=false;mission2ResumeRequested=resume;const saved=resume?getMission2Save():null;
  if(saved){spaceLevel=Math.max(1,Math.min(5,saved.spaceLevel||1));score=saved.score||0;lives=Math.max(1,saved.lives||3);energy=Math.max(1,Math.min(3,saved.energy||3));selectedDog=Math.max(0,Math.min(3,saved.selectedDog||0));selectedHero=heroesUnlocked()&&['cat','mouse'].includes(saved.selectedHero)?saved.selectedHero:'dog';$('dogName').value=saved.dogName||'';renderCharacterChoices();}
  else{spaceLevel=1;lives=3;energy=3;score=resume?0:score;catAssistTimer=0;mission2HeartSpawned=false;mission2HeartClock=10+Math.random()*8;heartDrops=[];}
  if(!saved)resetRunStats();$('mission2Briefing').classList.add('hidden');startMission2Level();
}
$('briefingStartBtn').onclick=()=>{$('mission2Briefing').classList.add('hidden');startMission2Level();};
$('mission2Btn').onclick=()=>playMissionCinematic(2,()=>beginMission2(false));
$('mission2Shortcut').onclick=()=>{if(getMission2Save())beginMission2(true);};

function restartWholeGame(){
  cancelAnimationFrame(raf);lifeCountdownToken++;audio.engine(false);audio.wind(false);mission=1;lastGameWon=false;state='setup';score=0;levelScore=0;level=1;lives=3;energy=3;blackAmmo=0;heartDrops=[];mission1HeartSpawned=false;mission2HeartSpawned=false;mission1HeartClock=10+Math.random()*8;mission2HeartClock=10+Math.random()*8;
  $('ending').classList.add('hidden');$('ending').classList.remove('win','lose','farewell');$('endingMoral').classList.add('hidden');$('missionCinematic').classList.add('hidden');$('mission2Intro').classList.add('hidden');$('mission2Briefing').classList.add('hidden');$('lifeCountdown').classList.add('hidden');$('game').classList.remove('damage-shake');hidePauseOverlay();$('game').classList.add('hidden');$('game').classList.remove('mission-two','hero-flight','forest-mission');$('alienBar').classList.add('hidden');$('pauseBtn').classList.add('hidden');$('missionObjective').classList.add('hidden');$('setup').classList.add('hidden');$('storyIntro').classList.remove('hidden');refreshMission2Shortcut();refreshForestShortcut();
}
function toggleGamePause(){if(state==='playing')pauseGame();else if(state==='gamePaused')resumeGame();}
function pauseGame(){if(state!=='playing')return;state='gamePaused';audio.engine(false);audio.wind(false);syncVolumeControls();const flight=mission===2||mission===3;$('pauseIcon').textContent=mission===3?(selectedHero==='cat'?'🚁':'🎈'):flight?'✈️':'🐾';$('pauseKicker').textContent=mission===3?'AVENTURA AÉREA':`MISIÓN ${mission}`;$('pauseTitle').textContent=flight?'Vuelo en pausa':'Aventura en pausa';$('effectsVolumeLabel').textContent=flight?'🔊 Efectos y viento':'🔊 Efectos';$('resumeBtn').innerHTML=(flight?'Continuar vuelo':'Continuar aventura')+' <span>▶</span>';$('pauseOverlay').classList.remove('hidden');}
function hidePauseOverlay(){$('pauseOverlay').classList.add('hidden');}
function resumeGame(){if(state!=='gamePaused')return;hidePauseOverlay();state='playing';last=performance.now();if(mission===2)audio.engine(true);if(mission===3){audio.engine(selectedHero==='cat');audio.wind(true,heroFlightConfig[heroFlightLevel-1].wind+.18);}cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);}
function exitGameToMenu(){lifeCountdownToken++;audio.engine(false);audio.wind(false);hidePauseOverlay();cancelAnimationFrame(raf);state='setup';$('lifeCountdown').classList.add('hidden');$('game').classList.remove('damage-shake');$('game').classList.add('hidden');$('game').classList.remove('mission-two','hero-flight','forest-mission');$('pauseBtn').classList.add('hidden');$('missionObjective').classList.add('hidden');$('setup').classList.remove('hidden');refreshMission2Shortcut();refreshForestShortcut();}

window.captureGoogleResumeState=()=>({
  state,mission,selectedDog,selectedHero,dogName:$('dogName').value,score,levelScore,level,lives,energy,time,blackAmmo,dogX,bossHP,ratHP,spaceLevel,spaceDistance,spaceDestroyed,heroFlightLevel,heroFlightCoins,heroFlightTotalCoins,heroFuel,forestLevel,forestDistance,forestClues,forestCorrectRoute,lastGameWon,endingStage,
  endingVisible:!$('ending').classList.contains('hidden'),gameVisible:!$('game').classList.contains('hidden')
});
window.restoreGoogleResumeState=saved=>{
  if(!saved)return;const savedNumber=(value,fallback)=>Number.isFinite(Number(value))?Number(value):fallback;selectedDog=Math.max(0,Math.min(3,saved.selectedDog||0));selectedHero=['dog','cat','mouse'].includes(saved.selectedHero)?saved.selectedHero:'dog';$('dogName').value=saved.dogName||'';renderCharacterChoices();score=savedNumber(saved.score,0);levelScore=savedNumber(saved.levelScore,0);lives=Math.max(0,savedNumber(saved.lives,3));energy=Math.max(0,Math.min(3,savedNumber(saved.energy,3)));time=Math.max(1,savedNumber(saved.time,90));blackAmmo=Math.max(0,savedNumber(saved.blackAmmo,0));dogX=Math.max(.055,Math.min(.945,savedNumber(saved.dogX,.5)));lastGameWon=!!saved.lastGameWon;endingStage=saved.endingStage||'result';
  $('storyIntro').classList.add('hidden');$('setup').classList.add('hidden');$('ending').classList.add('hidden');
  if(saved.endingVisible){mission=[1,2,3,4].includes(saved.mission)?saved.mission:1;populateMissionResult(lastGameWon,lastGameWon?'':'La aventura quedó guardada.',mission===1?'El equipo recuperó los huesos y volvió a reunirse.':mission===2?'Rayo está a salvo. ¡El equipo vuelve unido a casa!':mission===4?'Mike encontró su flamenco rojo y volvió a casa.':`${selectedHero==='cat'?'Clemente':'Rayo'} completó la aventura aérea.`);showToast('✓ VOLVISTE AL MISMO RESULTADO · PUNTAJE GUARDADO');return;}
  if(!saved.gameVisible){state='setup';$('setup').classList.remove('hidden');showToast('✓ REGRESASTE AL MENÚ QUE DEJASTE');return;}
  mission=[1,2,3,4].includes(saved.mission)?saved.mission:1;
  if(mission===1){level=Math.max(1,Math.min(5,savedNumber(saved.level,1)));bossHP=Math.max(0,savedNumber(saved.bossHP,20));ratHP=Math.max(0,savedNumber(saved.ratHP,100));startLevel(false);}
  else if(mission===2){spaceLevel=Math.max(1,Math.min(5,Number(saved.spaceLevel)||1));startMission2Level();spaceDistance=Number(saved.spaceDistance)||0;spaceDestroyed=Number(saved.spaceDestroyed)||0;}
  else if(mission===3){heroFlightLevel=Math.max(1,Math.min(5,Number(saved.heroFlightLevel)||1));heroFlightCoins=Math.max(0,Number(saved.heroFlightCoins)||0);heroFlightTotalCoins=Math.max(0,Number(saved.heroFlightTotalCoins)||0);startHeroFlightLevel(false);heroFuel=Math.max(1,Number(saved.heroFuel)||100);}
  else{forestLevel=Math.max(1,Math.min(5,Number(saved.forestLevel)||1));forestClues=Math.max(0,Number(saved.forestClues)||0);forestCorrectRoute=Math.max(0,Math.min(2,Number(saved.forestCorrectRoute)||0));startForestLevel();forestDistance=Math.max(0,Math.min(1,Number(saved.forestDistance)||0));}
  score=savedNumber(saved.score,0);levelScore=savedNumber(saved.levelScore,0);lives=Math.max(0,savedNumber(saved.lives,3));energy=Math.max(0,Math.min(3,savedNumber(saved.energy,3)));time=Math.max(1,savedNumber(saved.time,90));blackAmmo=Math.max(0,savedNumber(saved.blackAmmo,0));updateHUD();showToast('✓ PARTIDA RECUPERADA · SEGUÍS DONDE ESTABAS');if(saved.state==='gamePaused')pauseGame();
};

function startLevel(resetProgress = true) {
  audio.engine(false);audio.wind(false);mission=1;$('game').classList.remove('mission-two','hero-flight','forest-mission','damage-shake');document.querySelector('.score-pill small').textContent='PUNTOS';$('game').classList.toggle('flying-hero',selectedHero!=='dog');$('lifeCountdown').classList.add('hidden');$('alienBar').classList.add('hidden');$('pauseBtn').classList.remove('hidden');$('missionObjective').classList.add('hidden');
  state = 'playing';dogInvuln=1.2; if (resetProgress) {levelScore = 0;energy=3;lives=3;}
  time = 90; items = []; hazards = []; groundHazards = []; carnivorousPlants=[]; birds=[];birdClock=4+Math.random()*4;shots = []; heartDrops=[]; catBalls=[];catBallClock=5+Math.random()*5;catBallThrowTimer=0;playBallTimer=0;playBallBarkClock=0;dogFireTimer=0;dogKickTimer=0;spawnClock = 0; prizeClock = 0; toyClock = 0; surpriseClock=4+Math.random()*3; pirateClock = 1.5;
  fedeClock=4.5+Math.random()*2;fedeVisibleTimer=0;fedeAppearances=0;fedeDialogue='';trampolines=[];
  powerClock=7+Math.random()*5; powerTimer=0; powerUps=[];
  stompEffects=[];
  blackShots=[]; aimDir=1;
  netTimer=0;
  doubleTimer=0;sizeTimer=0;dogSizeMode='normal';catStealTimer=0;catStealAmount=0;
  if (resetProgress) { bossHP = 20; ratHP = 100; }
  bossShot = 0; fireCooldown = 0; flash = 0; impactParticles = []; pirateX = level % 2 ? .18 : .82; pirateY = .29;
  pirateTargetX = dogX; pirateZigClock = 0; slowTimer = 0; stunTimer = 0; tailDragTimer = 0;
  jumpY = 0; jumpVelocity = 0; crouchTimer = 0;
  ratDefeat = 0; catDefeat = 0; victoryTimer = 0; ratCrashX = pirateX; ratCrashY = pirateY; catCrashX = bossX; makeWeather();
  $('setup').classList.add('hidden'); $('game').classList.remove('hidden');
  $('bossBar').classList.toggle('hidden',level < 5); $('actionBtn').classList.remove('hidden');
  const flyingHero=selectedHero!=='dog';$('actionBtn').textContent=flyingHero?'¡VOLA!':level < 5 ? '¡SALTA!' : '¡HUESO!';$('specialFireBtn').classList.toggle('hidden',!flyingHero||(level<5&&blackAmmo<=0));$('specialFireBtn').textContent=level===5?'🦴':`🖤${blackAmmo}`;
  const touchHint=$('touchHint');touchHint.textContent=flyingHero?'Tocá varias veces para volar · esquivá los peligros':level<5?'☝️ Tocá para saltar · deslizá ↓ para agacharte':matchMedia('(pointer:coarse)').matches?'☝️ Toque dispara · deslizá ↑ salta · ↓ agacha':'↑ salta · ↓ agacha · Espacio dispara';touchHint.style.animation='none';void touchHint.offsetHeight;touchHint.style.animation='touchHintAway .8s 4s forwards';
  $('climateLabel').textContent = climates[level - 1].label;
  resize(); updateHUD(); last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(loop);
  audio.fx(level === 1 ? 'start' : 'level');if(level>=3)audio.fx('catMeow');const levelIntroductions=['🦴 ATRAPÁ Y ARMÁ TU COMBO','🟣 NUEVO: HUESOS TRAVIESOS','😼 NUEVO: PELOTAS Y PLANTAS CARNÍVORAS','🎁 NUEVO: PODERES COMBINADOS','⚡ BATALLA FINAL'];showToast(level===1&&selectedHero==='dog'?`🐾 ${DOG_TRAITS[selectedDog].name.toUpperCase()}`:levelIntroductions[level-1]);if(level===1)startTutorial(1);else $('tutorialCoach').classList.add('hidden');
}

function makeWeather() {
  weather = Array.from({length: level === 1 ? 18 : 70}, () => ({x:Math.random(),y:Math.random(),s:.35+Math.random()*1.1,phase:Math.random()*Math.PI*2,hue:Math.floor(Math.random()*4)}));
}
function resize() {
  const r = canvas.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1,2);
  canvas.width = r.width*d; canvas.height = r.height*d; ctx.setTransform(d,0,0,d,0,0); canvas.w = r.width; canvas.h = r.height;
}
addEventListener('resize',resize);
addEventListener('keydown',e => {
  const key=e.key.toLowerCase();keys[key]=true;
  if((key==='p'||key==='escape')&&(state==='playing'||state==='gamePaused')){e.preventDefault();if(!e.repeat)toggleGamePause();return;}
  if(key==='arrowleft'||key==='a')aimDir=-1;if(key==='arrowright'||key==='d')aimDir=1;
  if((key==='arrowdown'||key==='s')&&(mission===1||mission===4)&&state==='playing'){e.preventDefault();if(selectedHero==='dog'&&(mission===4?jumpVelocity===0:jumpY===0))crouchTimer=Math.max(crouchTimer,.7);}
  if(key==='arrowup'&&mission===1&&level===5){e.preventDefault();jump();}
  if((key==='arrowup'||key==='w')&&mission===3&&heroFlightLevel===5){e.preventDefault();if(!e.repeat)flapHeroFlight();}
  if(key==='f'&&mission===3){e.preventDefault();fireHeroFlight();}
  else if(key==='f'&&mission===1&&selectedHero!=='dog'){e.preventDefault();specialHeroFire();}
  if(e.code==='Space'){e.preventDefault();primaryAction();}
});
addEventListener('keyup',e => keys[e.key.toLowerCase()] = false);
function hold(btn,key) {
  const el = $(btn);
  ['pointerdown','pointerenter'].forEach(ev => el.addEventListener(ev,e => { if (e.buttons || ev === 'pointerdown') keys[key] = true; }));
  ['pointerup','pointercancel','pointerleave'].forEach(ev => el.addEventListener(ev,() => keys[key] = false));
}
hold('leftBtn','arrowleft'); hold('rightBtn','arrowright'); hold('actionBtn','fire');
$('leftBtn').addEventListener('pointerdown',()=>aimDir=-1);$('rightBtn').addEventListener('pointerdown',()=>aimDir=1);
$('actionBtn').addEventListener('pointerdown',() => { if(mission===2||mission===4||level<5||selectedHero!=='dog')primaryAction(); });
$('specialFireBtn').addEventListener('pointerdown',()=>mission===3?(heroFlightLevel===5?flapHeroFlight():fireHeroFlight()):specialHeroFire());
canvas.addEventListener('pointermove',e => { if (e.buttons || e.pointerType === 'touch') { const r = canvas.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;if(mission===2){planeX=Math.max(.1,Math.min(.9,x));planeY=Math.max(.42,Math.min(.88,y));}else if(mission===3){if(Math.abs(x-heroFlightX)>.004)heroFacingDir=x<heroFlightX?-1:1;heroFlightX=Math.max(.08,Math.min(.92,x));}else if(playBallTimer<=0){if(Math.abs(x-dogX)>.004)aimDir=x<dogX?-1:1;dogX = Math.max(.06,Math.min(.94,x));dogMovePulse = .65;} } });

let touchPointer = null, touchStartX = 0, touchStartY = 0;
canvas.addEventListener('pointerdown', e => {
  if (e.pointerType !== 'touch' || state !== 'playing') return;
  e.preventDefault(); touchPointer = e.pointerId; touchStartX = e.clientX; touchStartY = e.clientY;
  canvas.setPointerCapture?.(e.pointerId);
  const r = canvas.getBoundingClientRect(), nextX = Math.max(.06,Math.min(.94,(e.clientX-r.left)/r.width));
  if(mission===2){planeX=Math.max(.1,Math.min(.9,nextX));planeY=Math.max(.42,Math.min(.88,(e.clientY-r.top)/r.height));}else if(mission===3){heroFacingDir=nextX<heroFlightX?-1:1;heroFlightX=Math.max(.08,Math.min(.92,nextX));}else if(playBallTimer<=0){aimDir = nextX < dogX ? -1 : 1; dogX = nextX; dogMovePulse = .65;}
});
canvas.addEventListener('pointerup', e => {
  if (e.pointerType !== 'touch' || e.pointerId !== touchPointer) return;
  e.preventDefault(); touchPointer = null;
  const moved = Math.hypot(e.clientX-touchStartX,e.clientY-touchStartY);
  if (moved < 28) {
    primaryAction();
  } else if((mission===1||mission===4)&&touchStartY-e.clientY>45&&Math.abs(e.clientX-touchStartX)<90)jump();
  else if((mission===1||mission===4)&&e.clientY-touchStartY>45&&Math.abs(e.clientX-touchStartX)<90&&selectedHero==='dog'&&(mission===4?jumpVelocity===0:jumpY===0)){crouchTimer=1.35;showToast('👇 ¡AGACHADO!');}
});
canvas.addEventListener('pointercancel',e => { if(e.pointerId===touchPointer)touchPointer=null; });

function loop(now) { if (state !== 'playing') return; const dt = Math.min((now-last)/1000,.035); last = now; update(dt); draw(); raf = requestAnimationFrame(loop); }
function update(dt) {
  if(mission===2){updateMission2(dt);return;}
  if(mission===3){updateHeroFlight(dt);return;}
  if(mission===4){updateForest(dt);return;}
  if (victoryTimer > 0) {
    victoryTimer += dt; ratDefeat += dt; catDefeat += dt; animateWeather(dt); updateParticles(dt); updateHUD();
    if (victoryTimer > 4.2) endGame(true);
    return;
  }
  powerTimer=Math.max(0,powerTimer-dt);doubleTimer=Math.max(0,doubleTimer-dt);catStealTimer=Math.max(0,catStealTimer-dt);catBallThrowTimer=Math.max(0,catBallThrowTimer-dt);dogFireTimer=Math.max(0,dogFireTimer-dt);dogKickTimer=Math.max(0,dogKickTimer-dt);crouchTimer=Math.max(0,crouchTimer-dt);dogInvuln=Math.max(0,dogInvuln-dt);updateComboTimers(dt);updateTutorial(dt);
  if(playBallTimer>0){playBallTimer=Math.max(0,playBallTimer-dt);playBallBarkClock-=dt;if(playBallBarkClock<=0){playBallBarkClock=.58+Math.random()*.34;audio.fx('playBark');}}
  if(sizeTimer>0){sizeTimer=Math.max(0,sizeTimer-dt);if(sizeTimer===0)dogSizeMode='normal';}
  updatePowerUps(dt);updateLifeHeart(dt);
  slowTimer = Math.max(0,slowTimer-dt); stunTimer = Math.max(0,stunTimer-dt); tailDragTimer = Math.max(0,tailDragTimer-dt); netTimer=Math.max(0,netTimer-dt);
  if (jumpY < 0 || jumpVelocity < 0) { const flyingHero=selectedHero!=='dog';jumpVelocity += (flyingHero ? .72 : 1.9)*dt; jumpY += jumpVelocity*dt;if(flyingHero&&jumpY<-.58){jumpY=-.58;jumpVelocity=Math.max(0,jumpVelocity);}if (jumpY >= 0) { jumpY=0; jumpVelocity=0; } }
  const movementFactor = stunTimer > 0 || netTimer>0 || playBallTimer>0 ? 0 : playerCrouching() ? .3 : slowTimer > 0 ? .38 : 1;
  const speed = (.56 + level*.025) * movementFactor * (selectedHero==='dog'?DOG_TRAITS[selectedDog].speed:1);
  dogMovePulse = Math.max(0,dogMovePulse-dt); dogMoving = playBallTimer<=0&&!!(keys.arrowleft || keys.a || keys.arrowright || keys.d || dogMovePulse>0);
  const personalityIdle=selectedHero==='dog'&&!dogMoving&&jumpY===0&&!playerCrouching()&&playBallTimer<=0&&netTimer<=0&&stunTimer<=0&&dogFireTimer<=0;
  if(personalityIdle){dogIdleTime+=dt;if(dogIdleTime>=dogPersonalityNext){if(selectedDog===0)audio.naturalBark(270,true);else if(selectedDog===2)audio.naturalBark(205,false);dogPersonalityNext+=5.2;}}else{dogIdleTime=0;dogPersonalityNext=2.2;}
  if (keys.arrowleft || keys.a) dogX -= speed*dt; if (keys.arrowright || keys.d) dogX += speed*dt;
  dogX = Math.max(.055,Math.min(.945,dogX)); time -= dt; fireCooldown -= dt; flash = Math.max(0,flash-dt*2.8); animateWeather(dt); updateParticles(dt);
  if (level === 5 && selectedHero==='dog' && (keys[' '] || keys.fire) && fireCooldown <= 0) throwBone();
  if (time <= 0) { if (level === 5) endGame(false,'La batalla cerró por hoy. ¡Podés volver a intentarlo!'); else loseLife('¡El reloj pidió una pausa para recargar!'); return; }
  updateFede(dt);updatePirate(dt);if(level<5)updateCatch(dt);else updateBoss(dt);updateBlackShots(dt);updateCatBalls(dt);updateHazards(dt);updateBirds(dt);updateHUD();
}

function primaryAction(){if(mission===2){fireSpaceBone();return;}if(mission===3){heroFlightLevel===5?fireHeroFlight():flapHeroFlight();return;}if(mission===4){forestChoiceActive?chooseForestRoute():jump();return;}if(netTimer>0||playBallTimer>0)return;if(selectedHero!=='dog'){flapSpecialHero();return;}if(level===5)throwBone();else if(blackAmmo>0)throwBlackBone();else jump();}

function flapSpecialHero(){
  if(state!=='playing'||mission!==1||selectedHero==='dog'||stunTimer>0||netTimer>0||playBallTimer>0)return;
  jumpVelocity=-.34;jumpY=Math.min(jumpY,-.025);audio.fx(selectedHero==='cat'?'salvo':'jump');tutorialAction('jump');
}
function specialHeroFire(){
  if(state!=='playing'||mission!==1||selectedHero==='dog')return;
  if(level===5)throwBone();else if(blackAmmo>0)throwBlackBone();
}

function jump() {
  if(selectedHero!=='dog'){flapSpecialHero();return;}
  if (state!=='playing' || (mission!==1&&mission!==4) || stunTimer>0 || netTimer>0 || playBallTimer>0 || jumpVelocity!==0 || (mission===1&&jumpY<0)) return;
  crouchTimer=0;jumpVelocity=-1.02*DOG_TRAITS[selectedDog].jump;if(mission===4)forestOnPlatform=false; audio.fx('jump');if(selectedDog===1)addFloatingText('SALTO ALTO',dogX,dogGroundY()-.16,'#fff176');tutorialAction('jump');
}

function playerCrouching(){return selectedHero==='dog'&&jumpY===0&&(crouchTimer>0||keys.arrowdown||keys.s);}

function updateFede(dt){
  fedeVisibleTimer=Math.max(0,fedeVisibleTimer-dt);
  if(fedeAppearances<Math.min(4,2+Math.floor(level/2))){
    fedeClock-=dt;
    if(fedeClock<=0){
      const lines=fedeLines();fedeAppearances++;fedeSide=Math.random()<.5?-1:1;fedeDialogue=lines[Math.floor(Math.random()*lines.length)];fedeVisibleTimer=5.8;fedeClock=18+Math.random()*8;
      const startX=fedeSide<0?.08:.92,targetX=Math.max(.16,Math.min(.84,dogX+(Math.random()-.5)*.28)),kind=fedeAppearances%2===0?'boostBall':'trampoline';
      trampolines.push({x:startX,y:.5,targetX,landed:false,life:18,rot:0,vx:(targetX-startX)/1.15,vy:-.05,kind});
      audio.fx('fede');showToast(`👦 ${fedeDialogue}`);
    }
  }
  for(let i=trampolines.length-1;i>=0;i--){
    const t=trampolines[i];t.life-=dt;t.rot+=dt*(t.landed?1:8);
    if(!t.landed){t.x+=t.vx*dt;t.y+=t.vy*dt;t.vy+=.72*dt;if(t.y>=.87){t.x=t.targetX;t.y=.87;t.landed=true;t.vx=0;t.vy=0;burst(t.x,t.y,'#69e3ff',16);audio.fx('trampoline');}}
    if(t.landed&&Math.abs(dogX-t.x)<.07&&jumpY>-.055&&jumpVelocity>=0&&playBallTimer<=0&&netTimer<=0&&stunTimer<=0){
      jumpVelocity=t.kind==='boostBall'?-1.46:-1.34;jumpY=-.035;t.life=0;burst(t.x,t.y,'#ffe16b',30);audio.fx('trampoline');showToast(t.kind==='boostBall'?'⚽ ¡LA PELOTA ESPECIAL DE FEDE TE IMPULSA!':'🌀 ¡EL TRAMPOLÍN DE FEDE TE LANZA AL CIELO!');tutorialAction('jump');
    }
    if(t.life<=0)trampolines.splice(i,1);
  }
}

function throwBlackBone(){
  if(state!=='playing'||level>=5||blackAmmo<=0||netTimer>0||playBallTimer>0)return;
  blackAmmo--;dogFireTimer=.28;dogFireSide=aimDir;blackShots.push({x:dogX+aimDir*.035,y:dogGroundY()+jumpY-.015,vx:aimDir*.88,vy:-.025,rot:0});audio.fx('darkThrow');showToast(`¡HUESO NEGRO! QUEDAN ${blackAmmo}`);
}

function updateBlackShots(dt){
  for(let i=blackShots.length-1;i>=0;i--){
    const s=blackShots[i];s.x+=s.vx*dt;s.y+=s.vy*dt;s.rot+=dt*10;
    let hit=false,hitBall=null;
    for(let j=catBalls.length-1;j>=0;j--){const ball=catBalls[j],radius=.025*(ball.size||1);if(Math.abs(s.x-ball.x)<.04+radius&&Math.abs(s.y-ball.y)<.075+radius){hitBall=catBalls.splice(j,1)[0];hit=true;break;}}
    if(hitBall){blackShots.splice(i,1);destroyCatBall(hitBall,'🦴 ¡PELOTA DESTRUIDA! +100');if(levelScore>=LEVEL_TARGET){winLevel();return;}continue;}
    for(let j=hazards.length-1;j>=0;j--){const b=hazards[j];if(Math.abs(s.x-b.x)<.06&&Math.abs(s.y-b.y)<.1){hazards.splice(j,1);hit=true;break;}}
    if(!hit)for(let j=groundHazards.length-1;j>=0;j--){const tick=groundHazards[j];if(Math.abs(s.x-tick.x)<.065&&Math.abs(s.y-tick.y)<.12){groundHazards.splice(j,1);hit=true;break;}}
    if(!hit)for(let j=carnivorousPlants.length-1;j>=0;j--){const plant=carnivorousPlants[j],scale=Math.min(3.2,plant.scale||1);if(Math.abs(s.x-plant.x)<.065*scale&&Math.abs(s.y-(plant.y-.07*scale))<.13*scale){carnivorousPlants.splice(j,1);hit=true;showToast('🌿 ¡PLANTA CARNÍVORA DESTRUIDA!');break;}}
    if(hit){blackShots.splice(i,1);score+=100;levelScore+=100;burst(s.x,s.y,'#a779ff',22);audio.fx('stomp');showToast('💥 ¡PELIGRO DESTRUIDO! +100');if(level<5&&levelScore>=LEVEL_TARGET){winLevel();return;}continue;}
    if(s.x<-.08||s.x>1.08){blackShots.splice(i,1);}
  }
}

function updatePowerUps(dt) {
  powerClock-=dt;
  if(powerClock<=0 && powerUps.length===0) {
    powerClock=18+Math.random()*8;
    powerUps.push({x:.1+Math.random()*.8,y:-.1,vy:.23+level*.012,rot:0});
  }
  for(let i=powerUps.length-1;i>=0;i--) {
    const p=powerUps[i]; p.y+=p.vy*dt; p.rot+=dt*2.2;
    const dogCenter=dogGroundY()+jumpY;
    if(Math.abs(p.y-dogCenter)<.11 && Math.abs(p.x-dogX)<Math.max(.07,dogCatchRadius())) {
      powerUps.splice(i,1); powerTimer=10; slowTimer=0; stunTimer=0; tailDragTimer=0; netTimer=0;
      burst(dogX,dogCenter,'#ffd84e',34); audio.fx('power'); showToast('⚡ ¡SUPERPODER! 10 SEGUNDOS');
    } else if(p.y>1.06) powerUps.splice(i,1);
  }
}

function updateLifeHeart(dt){
  const inSpace=mission===2;
  if(inSpace){
    if(!mission2HeartSpawned&&energy<3){mission2HeartClock-=dt;if(mission2HeartClock<=0){mission2HeartSpawned=true;heartDrops.push({space:true,x:.14+Math.random()*.72,y:.5+Math.random()*.28,z:.03,speed:.16});showToast('⚡ ¡APARECIÓ UNA CÁPSULA DE ENERGÍA!');}}
  }else if(!mission1HeartSpawned&&energy<3){
    mission1HeartClock-=dt;if(mission1HeartClock<=0){mission1HeartSpawned=true;heartDrops.push({space:false,x:.12+Math.random()*.76,y:-.1,vy:.19,rot:0});showToast('⚡ ¡APARECIÓ UNA CÁPSULA DE ENERGÍA!');}
  }
  for(let i=heartDrops.length-1;i>=0;i--){const heart=heartDrops[i];
    if(heart.space){heart.z+=heart.speed*dt;if(heart.z>.86&&Math.abs(heart.x-planeX)<.11&&Math.abs(heart.y-planeY)<.12){heartDrops.splice(i,1);energy=Math.min(3,energy+1);burst(planeX,planeY,'#62e7ff',28);audio.fx('prize');showToast('⚡ ¡ENERGÍA RECUPERADA!');}else if(heart.z>1.08)heartDrops.splice(i,1);
    }else{heart.y+=heart.vy*dt;heart.rot+=dt*2.4;const dogCenter=dogGroundY()+jumpY;if(Math.abs(heart.y-dogCenter)<.11&&Math.abs(heart.x-dogX)<Math.max(.07,dogCatchRadius())){heartDrops.splice(i,1);energy=Math.min(3,energy+1);burst(dogX,dogCenter,'#62e7ff',28);audio.fx('prize');showToast('⚡ ¡ENERGÍA RECUPERADA!');}else if(heart.y>1.06)heartDrops.splice(i,1);}
  }
}

function updateCatch(dt) {
  spawnClock -= dt; prizeClock += dt; toyClock += dt; surpriseClock-=dt;
  if (spawnClock <= 0) {
    spawnClock = Math.max(.28,.92-level*.11);
    const roll = Math.random(), type = roll < .08 ? 'blackBone' : level >= 2 && roll < .17 ? 'stun' : level >= 2 && roll < .31 ? 'slow' : 'bone';
    items.push({type,x:.08+Math.random()*.84,y:-.08,vy:.20+level*.035+Math.random()*.07,rot:Math.random()*6});
  }
  if (prizeClock > Math.max(8,12-level*.5)) { prizeClock = 0; items.push({type:'prize',x:.12+Math.random()*.76,y:-.1,vy:.18+level*.01,rot:0}); }
  if (toyClock > Math.max(4.5,7-level*.35)) {
    toyClock=0; const toys=['toyBall','toyRope','toyFrisbee'];
    items.push({type:toys[Math.floor(Math.random()*toys.length)],x:.1+Math.random()*.8,y:-.1,vy:.21+level*.018,rot:Math.random()*6});
  }
  if(surpriseClock<=0){surpriseClock=9+Math.random()*6;items.push({type:'surprise',x:.12+Math.random()*.76,y:-.1,vy:.18+level*.012,rot:0});}
  for (let i=items.length-1;i>=0;i--) {
    const o=items[i]; o.y += o.vy*dt; o.rot += dt*1.5;
    const dogCenter=dogGroundY()+jumpY, caught=Math.abs(o.y-dogCenter)<.105 && Math.abs(o.x-dogX)<dogCatchRadius();
    if (caught) {
      if(o.type==='blackBone'){
        blackAmmo++;runCollected++;audio.fx('weapon');showToast(`🖤 ¡HUESO NEGRO ACUMULADO! ×${blackAmmo}`);
      } else if (o.type === 'slow') {
        if(powerTimer>0){audio.fx('shield');showToast('¡EL ESCUDO DESTRUYÓ LA TRAMPA!');}
        else {resetCombo();slowTimer = 5; tailDragTimer = 5; audio.fx('slow'); showToast('🟣 ¡HUESO LENTO! 5s');}
      } else if (o.type === 'stun') {
        if(powerTimer>0){audio.fx('shield');showToast('¡EL ESCUDO DESTRUYÓ LA TRAMPA!');}
        else {resetCombo();stunTimer = 3; tailDragTimer = 3; audio.fx('freeze'); showToast('🔵 ¡PATAS CONGELADAS! 3s');}
      } else if (o.type.startsWith('toy')) {
        const playful=selectedHero==='dog'&&selectedDog===2,toyPoints=selectedHero==='dog'?Math.round(200*DOG_TRAITS[selectedDog].toy):200;rewardCatch(toyPoints,o.x,o.y,playful?'🎾 ¡KAISER QUIERE JUGAR!':'🧸 ¡JUGUETE!');audio.fx('toy');if(playful){dogKickTimer=.52;dogKickSide=Math.random()<.5?-1:1;jumpVelocity=Math.min(jumpVelocity,-.42);audio.naturalBark(205,false);}tutorialAction('catch');
      } else if(o.type==='surprise') {
        runBonuses++;runCollected++;resolveSurprise();
      } else {
        rewardCatch(o.type==='prize'?300:100,o.x,o.y,o.type==='prize'?'🎁 ¡PREMIO!':'🦴 ¡HUESO!');audio.fx(o.type==='prize'?'prize':'catch');tutorialAction('catch');
      }
      items.splice(i,1); if (levelScore>=LEVEL_TARGET) { winLevel(); return; }
    } else if (o.y>1.05) { items.splice(i,1); if (o.type==='bone'){audio.fx('miss');resetCombo();} }
  }
}

function resolveSurprise(effect) {
  const effects=['double','thief','puppy','giant','normal'];
  effect=effect||effects[Math.floor(Math.random()*effects.length)];audio.fx('surprise');
  if(effect==='double'){doubleTimer=12;showToast('🎁 ¡HUESOS ×2 DURANTE 12s!');}
  else if(effect==='thief'){
    catStealAmount=Math.floor(score*.30);const levelLoss=Math.floor(levelScore*.30);score=Math.max(0,score-catStealAmount);levelScore=Math.max(0,levelScore-levelLoss);catStealTimer=2.6;audio.fx('thief');showToast(`😼 ¡EL GATO ROBÓ ${catStealAmount} PUNTOS!`);
  } else if(effect==='puppy'){dogSizeMode='puppy';sizeTimer=12;showToast('🐶 ¡MODO CACHORRO! 12s');}
  else if(effect==='giant'){dogSizeMode='giant';sizeTimer=12;showToast('🐕 ¡PERRO GIGANTE! 12s');}
  else {dogSizeMode='normal';sizeTimer=0;showToast('✨ ¡VOLVISTE AL TAMAÑO NORMAL!');}
  burst(dogX,dogGroundY()+jumpY,effect==='thief'?'#ff6650':'#ffd84e',30);
}

function updatePirate(dt) {
  if (level===5 && ratHP<=0) { ratDefeat += dt; return; }
  const speed=.09+level*.025, minX=.08, maxX=.92;
  if (level === 5) {
    pirateZigClock -= dt;
    if (pirateZigClock <= 0) {
      pirateZigClock = .35 + Math.random()*.7;
      pirateTargetX = Math.max(minX,Math.min(maxX,dogX + (Math.random()-.5)*.55));
    }
    pirateDir = Math.sign(pirateTargetX-pirateX) || pirateDir;
    pirateX += pirateDir*(.20+Math.random()*.07)*dt;
    if (Math.abs(pirateTargetX-pirateX)<.025) pirateZigClock=0;
    pirateY = .25 + Math.sin(performance.now()/165)*.075 + Math.sin(performance.now()/63)*.025;
  } else {
    pirateX+=pirateDir*speed*dt;
    if (pirateX>maxX || pirateX<minX) { pirateDir*=-1; pirateX=Math.max(minX,Math.min(maxX,pirateX)); }
  }
  pirateClock-=dt;
  if (pirateClock<=0) {
    pirateClock=Math.max(.72,2.65-level*.32)+Math.random()*.45;
    const type=Math.random()<Math.min(.1+level*.045,.34)?'net':'water';
    hazards.push({type,x:pirateX,y:pirateY,vy:.25+level*.035,vx:(dogX-pirateX)*(.04+level*.012),spin:0,hp:type==='water'?1:3});
    if(level>=2&&tutorialMission===1&&tutorialStep===2&&!tutorialObstacleSeen){tutorialObstacleSeen=true;showTutorial('⬆','SALTÁ EL PELIGRO','Toque o Espacio para saltar');}
  }
}
function updateCatBalls(dt){
  catBallClock-=dt;
  if(catBallClock<=0&&catBalls.length<2){
    catBallClock=Math.max(7,13-level*.75)+Math.random()*5;catBallThrowSide=Math.random()<.5?1:-1;catBallThrowTimer=1.8;
    const fromLeft=catBallThrowSide===1,size=.62+Math.random()*.76,ball={x:fromLeft?-.08:1.08,y:0,vx:catBallThrowSide*(.09+level*.011+Math.random()*.012),vy:.015,rot:Math.random()*6,bounces:0,bouncePower:.09+Math.random()*.03,rolling:false,kicked:false,kickGrace:0,size,style:Math.floor(Math.random()*CAT_BALL_STYLES.length)};
    ball.y=catBallFloorY(ball)-.018;catBalls.push(ball);
    audio.fx('catMeow');showToast('😼 ¡MIAU! PATEÁ LA PELOTA PARA DEFENDERTE');
  }
  for(let i=catBalls.length-1;i>=0;i--){
    const ball=catBalls[i],floor=catBallFloorY(ball);ball.kickGrace=Math.max(0,(ball.kickGrace||0)-dt);ball.x+=ball.vx*dt;ball.rot+=ball.vx*dt*(37/Math.max(.62,ball.size||1));
    if(ball.rolling){ball.y=floor;ball.vy=0;ball.vx*=Math.pow(.996,dt*60);}
    else{ball.y+=ball.vy*dt;ball.vy+=.58*dt;if(ball.y>=floor){ball.y=floor;ball.bounces++;if(ball.bouncePower>.052){ball.vy=-ball.bouncePower;ball.bouncePower*=.68;audio.fx('tick');burst(ball.x,ball.y,CAT_BALL_STYLES[ball.style||0].main,4);}else{ball.rolling=true;ball.vy=0;}}}
    if(ball.kicked&&resolveKickedBallDefense(ball)){if(level<5&&levelScore>=LEVEL_TARGET){winLevel();return;}}
    const dogY=dogGroundY()+jumpY-.015;
    const ballRadius=.025*(ball.size||1);
    if(ball.kickGrace<=0&&Math.abs(ball.x-dogX)<Math.max(.045,dogCatchRadius()*.58)+ballRadius*.55&&Math.abs(ball.y-dogY)<.075+ballRadius){
      if(powerTimer>0){catBalls.splice(i,1);destroyCatBall(ball,'⚡ ¡PELOTA DESTRUIDA CON EL ESCUDO! +100');if(level<5&&levelScore>=LEVEL_TARGET){winLevel();return;}continue;}
      kickCatBall(ball);continue;
    }
    if(ball.x<-.14||ball.x>1.14)catBalls.splice(i,1);
  }
}
function kickCatBall(ball){
  dogKickSide=ball.x<dogX?-1:1;dogKickTimer=.34;ball.kicked=true;ball.kickGrace=.38;ball.rolling=false;ball.vx=dogKickSide*(.34+level*.025);ball.vy=-.2;ball.bouncePower=.075;ball.x=dogX+dogKickSide*Math.max(.06,dogCatchRadius()*.7);burst(ball.x,ball.y,CAT_BALL_STYLES[ball.style||0].main,18);audio.fx('kick');showToast('🐾 ¡PATADA! LA PELOTA ES TU DEFENSA');
}
function resolveKickedBallDefense(ball){
  const hitHazard=hazards.findIndex(target=>Math.abs(target.x-ball.x)<.075&&Math.abs(target.y-ball.y)<.105);
  if(hitHazard>=0){const target=hazards.splice(hitHazard,1)[0];rewardCatch(100,ball.x,ball.y,target.type==='net'?'⚽ ¡RED DESTRUIDA!':'⚽ ¡BOMBUCHA DESTRUIDA!');burst(ball.x,ball.y,'#fff1a1',24);audio.fx('stomp');return true;}
  const hitTick=groundHazards.findIndex(target=>Math.abs(target.x-ball.x)<.085&&Math.abs(target.y-ball.y)<.11);
  if(hitTick>=0){const pest=groundHazards.splice(hitTick,1)[0];rewardCatch(100,ball.x,ball.y,`⚽ ¡${pest.type==='flea'?'PULGA':'GARRAPATA'} ELIMINADA!`);burst(ball.x,ball.y,'#ffd84e',24);audio.fx('stomp');return true;}
  const hitPlant=carnivorousPlants.findIndex(target=>{const scale=Math.min(3.2,target.scale||1);return Math.abs(target.x-ball.x)<.075*scale+.025&&Math.abs((target.y-.055*scale)-ball.y)<.13*scale;});
  if(hitPlant>=0){carnivorousPlants.splice(hitPlant,1);rewardCatch(200,ball.x,ball.y,'⚽ ¡PLANTA CARNÍVORA DERRIBADA!');burst(ball.x,ball.y,'#73e15d',30);audio.fx('stomp');return true;}
  const hitTrap=items.findIndex(target=>(target.type==='slow'||target.type==='stun')&&Math.abs(target.x-ball.x)<.075&&Math.abs(target.y-ball.y)<.1);
  if(hitTrap>=0){items.splice(hitTrap,1);rewardCatch(100,ball.x,ball.y,'⚽ ¡TRAMPA DESTRUIDA!');burst(ball.x,ball.y,'#9edfff',24);audio.fx('stomp');return true;}
  return false;
}
function catBallFloorY(ball){const w=canvas.w||innerWidth,h=canvas.h||innerHeight,size=dogRenderSize(w,h),radius=25*(ball?.size||1);return Math.min(.945,dogGroundY()+size*.39/h-radius/h);}
function destroyCatBall(ball,message){const style=CAT_BALL_STYLES[ball.style||0];score+=100;levelScore+=100;burst(ball.x,ball.y,style.main,26);audio.fx('pop');showToast(message);}
function updateHazards(dt) {
  for (let i=hazards.length-1;i>=0;i--) {
    const b=hazards[i]; b.y+=b.vy*dt; b.x+=b.vx*dt; b.spin+=dt*3;
    const dogHitY=dogGroundY()+jumpY-.01,dogHitX=Math.max(.04,dogCatchRadius()*.78);
    if (Math.abs(b.y-dogHitY)<.058 && Math.abs(b.x-dogX)<dogHitX) {
      hazards.splice(i,1);
      if(powerTimer>0){burst(b.x,b.y,'#ffd84e',20);audio.fx('shield');showToast(`⚡ ¡${b.type==='net'?'RED':'BOMBUCHA'} DESTRUIDA!`);continue;}
      if(b.type==='net'){resetCombo();netTimer=5;audio.fx('net');showToast('🕸️ ¡ATRAPADO EN LA RED! 5s');continue;}
      if(dogSizeMode==='giant'){dogSizeMode='puppy';sizeTimer=10;burst(dogX,dogHitY,'#ffcf54',30);audio.fx('shield');showToast('🐕 ¡EL GIGANTE TE PROTEGIÓ! AHORA SOS CACHORRO');continue;}
      flash=1; loseLife('¡Una bombucha de agua te empapó!'); return;
    }
    if (b.y>.91) {
      if(b.type==='net'){burst(b.x,.9,'#d8c5a4',7);hazards.splice(i,1);continue;}
      const plantChance=level>=2?.15+level*.04:.13,tickChance=.12+level*.08,roll=Math.random();
      if(roll<plantChance&&carnivorousPlants.length<3){
        const baseScale=.78+Math.random()*.28;carnivorousPlants.push({x:Math.max(.06,Math.min(.94,b.x)),y:plantGroundY(),phase:Math.random()*6,biteCooldown:0,baseScale,scale:baseScale,age:0,growthStage:0});
        burst(b.x,.87,'#63d95d',24);audio.fx('surprise');showToast('🌱 ¡LA BOMBUCHA SE VOLVIÓ UNA PLANTA CARNÍVORA!');
      } else if (roll<plantChance+tickChance) {
        const dir=b.x<.5?1:-1;
        const type=Math.random()<.46?'flea':'tick';
        groundHazards.push({type,x:Math.max(.03,Math.min(.97,b.x)),y:.88,baseY:.88,dir,speed:.11+level*.035+Math.random()*.025,phase:Math.random()*6});
        burst(b.x,.88,'#67dfff',10); audio.fx(type==='flea'?'flea':'tick'); showToast(type==='flea'?'¡PULGA SALTARINA! ¡PISALA!':'¡GARRAPATA! ¡SALTÁ!');
      } else burst(b.x,.9,'#53d7ff',6);
      hazards.splice(i,1);
    }
  }
  for (let i=groundHazards.length-1;i>=0;i--) {
    const tick=groundHazards[i];tick.type=tick.type||'tick';tick.x+=tick.dir*tick.speed*dt;tick.phase+=dt*(tick.type==='flea'?5.5+level*.35:9+level);tick.y=tick.type==='flea'?(tick.baseY||.88)-Math.abs(Math.sin(tick.phase))*.105:(tick.baseY||.88);
    if (tick.x<-.06||tick.x>1.06) { groundHazards.splice(i,1); continue; }
    const dogCenter=dogGroundY()+jumpY-.01;
    if (Math.abs(tick.x-dogX)<.065&&Math.abs(tick.y-dogCenter)<.085) {
      groundHazards.splice(i,1);
      const pestName=tick.type==='flea'?'PULGA':'GARRAPATA';
      if(powerTimer>0){burst(tick.x,tick.y,'#ffd84e',18);audio.fx('shield');showToast(`⚡ ¡${pestName} ELIMINADA!`);continue;}
      if(dogSizeMode==='giant'){dogSizeMode='puppy';sizeTimer=10;burst(dogX,tick.y,'#ffcf54',28);audio.fx('shield');showToast(`🐕 ¡EL GIGANTE TE PROTEGIÓ DE LA ${pestName}!`);continue;}
      if(jumpVelocity>0 && jumpY<-.015) {
        score+=100; levelScore+=100; jumpVelocity=-.45; jumpY=Math.min(jumpY,-.04);
        stompEffects.push({x:tick.x,y:tick.y-.025,vy:-.24,life:.65,rot:0});
        burst(tick.x,tick.y,'#ffd84e',20);audio.fx('stomp');showToast(`🦴 ¡${pestName} APLASTADA! +100`);
        if(level<5&&levelScore>=LEVEL_TARGET){winLevel();return;}
        continue;
      }
      if(jumpY>-.035){flash=1;loseLife(`¡Una ${pestName.toLowerCase()} te alcanzó! Saltá y caé encima para aplastarla.`);return;}
      groundHazards.push(tick);
    }
  }
  for(let i=carnivorousPlants.length-1;i>=0;i--){const plant=carnivorousPlants[i];plant.phase+=dt*(2.4+level*.2);plant.age=(plant.age||0)+dt;plant.y=plantGroundY();plant.biteCooldown=Math.max(0,plant.biteCooldown-dt);const nextStage=Math.floor(plant.age/15);if(nextStage>(plant.growthStage||0)){plant.growthStage=nextStage;plant.scale=Math.min(3.2,(plant.baseScale||.9)*Math.pow(1.4,nextStage));burst(plant.x,plant.y-.08*plant.scale,'#7ff05f',24);addFloatingText('¡CRECIÓ 40%!',plant.x,plant.y-.11*plant.scale,'#d9ff7a');audio.fx('surprise');}
    const close=Math.abs(plant.x-dogX)<.06*Math.min(3.2,plant.scale||1)+.02,requiredJump=-Math.min(.36,.09+Math.max(0,(plant.scale||1)-1)*.085);
    if(close&&powerTimer>0){carnivorousPlants.splice(i,1);rewardCatch(200,plant.x,plant.y,'⚡ ¡PODER DORADO CONTRA LA PLANTA!');burst(plant.x,plant.y-.06,'#ffe66d',34);audio.fx('shield');if(level<5&&levelScore>=LEVEL_TARGET){winLevel();return;}continue;}
    if(close&&jumpY>requiredJump&&plant.biteCooldown<=0){plant.biteCooldown=1.5;dogX=Math.max(.055,Math.min(.945,dogX+(dogX<plant.x?-.085:.085)));flash=1;loseLife('¡La planta carnívora cerró el camino! Usá un hueso negro, una pelota, el superpoder o el trompo de Fede.');return;}
  }
}
function plantGroundY(){return Math.min(.94,dogGroundY()+.08);}

function updateBirds(dt){
  birdClock-=dt;
  if(birdClock<=0&&birds.length<2){
    const dir=Math.random()<.5?1:-1,kind=Math.random()<.28?'crow':'bird';
    birds.push({x:dir>0?-.09:1.09,y:.61+Math.random()*.16,baseY:0,dir,speed:(kind==='crow'?.13:.115)+level*.018+Math.random()*.035,size:(kind==='crow'?1.08:.78)+Math.random()*.3,phase:Math.random()*Math.PI*2,kind});
    birds[birds.length-1].baseY=birds[birds.length-1].y;
    birdClock=Math.max(5.8,12.5-level*.8)+Math.random()*5;
    audio.fx(kind==='crow'?'crow':'bird');
  }
  for(let i=birds.length-1;i>=0;i--){
    const bird=birds[i];bird.x+=bird.dir*bird.speed*dt;bird.phase+=dt*(9+level*.7);bird.y=bird.baseY+Math.sin(bird.phase*.62)*.025;
    if(bird.x<-.14||bird.x>1.14){birds.splice(i,1);continue;}
    if(playerCrouching())continue;
    const dogCenter=dogGroundY()+jumpY-.015,hitX=Math.max(.047,dogCatchRadius()*.62),hitY=.057+(bird.size-1)*.015;
    if(Math.abs(bird.x-dogX)>=hitX||Math.abs(bird.y-dogCenter)>=hitY)continue;
    birds.splice(i,1);
    if(powerTimer>0){rewardCatch(150,bird.x,bird.y,bird.kind==='crow'?'⚡ ¡CUERVO CONVERTIDO EN HUESO!':'⚡ ¡PÁJARO CONVERTIDO EN HUESO!');burst(bird.x,bird.y,'#ffd84e',24);audio.fx('shield');if(level<5&&levelScore>=LEVEL_TARGET){winLevel();return;}continue;}
    if(jumpVelocity>0&&jumpY<-.02&&dogCenter<bird.y+.035){
      jumpVelocity=-.45;jumpY=Math.min(jumpY,-.04);rewardCatch(250,bird.x,bird.y,bird.kind==='crow'?'🦴 ¡CUERVO CONVERTIDO EN HUESO!':'🦴 ¡PÁJARO CONVERTIDO EN HUESO!');stompEffects.push({x:bird.x,y:bird.y-.02,vy:-.25,life:.72,rot:0});burst(bird.x,bird.y,'#fff0a8',28);audio.fx('stomp');if(level<5&&levelScore>=LEVEL_TARGET){winLevel();return;}continue;
    }
    if(dogSizeMode==='giant'){dogSizeMode='puppy';sizeTimer=10;burst(dogX,dogCenter,'#ffcf54',28);audio.fx('shield');showToast('🐕 ¡EL GIGANTE TE PROTEGIÓ DEL PÁJARO!');continue;}
    flash=1;loseLife('¡Un pájaro te chocó en pleno vuelo! Saltá y caé encima para convertirlo en hueso.');return;
  }
}

function throwBone() {
  if (state!=='playing' || level<5 || fireCooldown>0 || netTimer>0) return;
  const type=blackAmmo>0?'blackBone':'bone';if(type==='blackBone')blackAmmo--;
  fireCooldown=.13;dogFireTimer=.28;dogFireSide=0;shots.push({type,x:dogX,y:.75+jumpY,vy:-.82,rot:0}); audio.fx(type==='blackBone'?'darkThrow':'bark');
}
function updateBoss(dt) {
  if (bossHP<=0) catDefeat += dt;
  if (bossHP>0) { bossX+=bossDir*.19*dt; if (bossX>.92 || bossX<.54) { bossDir*=-1; bossX=Math.max(.54,Math.min(.92,bossX)); } }
  bossShot+=dt; if (bossHP>0 && bossShot>1.55) { bossShot=0; shots.push({type:'yarn',x:bossX,y:.3,vy:.34,vx:(dogX-bossX)*.18,rot:0,hp:3}); }
  shots.forEach(s=>{s.y+=s.vy*dt;s.x+=(s.vx||0)*dt;s.rot+=dt*7;});resolveBossProjectileClashes();
  for (let i=shots.length-1;i>=0;i--) {
    const s=shots[i];
    if(s.type==='bone'||s.type==='blackBone'){
      let ballHit=-1;for(let j=catBalls.length-1;j>=0;j--){const ball=catBalls[j],radius=.025*(ball.size||1);if(Math.abs(s.x-ball.x)<.045+radius&&Math.abs(s.y-ball.y)<.22+radius){ballHit=j;break;}}
      if(ballHit>=0){const ball=catBalls.splice(ballHit,1)[0];shots.splice(i,1);destroyCatBall(ball,'🦴 ¡PELOTA DESTRUIDA! +100');continue;}
    }
    if ((s.type==='bone'||s.type==='blackBone') && ratHP>0 && s.y<.4 && s.y>.15 && Math.abs(s.x-pirateX)<.075) {
      const damage=s.type==='blackBone'?3:1;shots.splice(i,1); ratHP=Math.max(0,ratHP-damage); score+=100*damage; levelScore+=100*damage; audio.fx('hit'); burst(pirateX,.28,s.type==='blackBone'?'#a779ff':'#53d7ff',s.type==='blackBone'?24:12);
      if (ratHP===0) { ratCrashX=pirateX; ratCrashY=pirateY; ratDefeat=.001; audio.fx('pop'); showToast('¡GLOBO PINCHADO! EL RATÓN ESTÁ BIEN'); burst(pirateX,pirateY,'#ffd84e',28); } else if (ratHP%10===0) showToast(`RATÓN: ${ratHP}`);
      if (ratHP<=0 && bossHP<=0) { startVictorySequence(); return; }
      continue;
    }
    if ((s.type==='bone'||s.type==='blackBone') && bossHP>0 && s.y<.43 && s.y>.14 && Math.abs(s.x-bossX)<.095) {
      const damage=s.type==='blackBone'?3:1;shots.splice(i,1); bossHP=Math.max(0,bossHP-damage); score+=100*damage; levelScore+=100*damage; audio.fx('hit'); burst(bossX,.3,s.type==='blackBone'?'#a779ff':'#ff6650',s.type==='blackBone'?26:12);
      if (bossHP===0) { catCrashX=bossX; catDefeat=.001; showToast('¡ATERRIZAJE FORZOSO! EL GATO ESTÁ BIEN'); burst(bossX,.3,'#ffd84e',32); } else showToast(`¡GOLPE! FALTAN ${bossHP}`);
      if (ratHP<=0 && bossHP<=0) { startVictorySequence(); return; }
      continue;
    }
    const dogHitY=dogGroundY()+jumpY-.01,dogHitX=Math.max(.042,dogCatchRadius()*.78);
    if (s.type==='yarn'&&Math.abs(s.y-dogHitY)<.052&&Math.abs(s.x-dogX)<dogHitX) {
      shots.splice(i,1);
      if(powerTimer>0){burst(s.x,s.y,'#ffd84e',18);audio.fx('shield');showToast('⚡ ¡OVILLO DESTRUIDO!');continue;}
      audio.fx('hit'); loseLife('¡El ovillo ninja te alcanzó!'); return;
    }
    if (s.y<-.1||s.y>1.05) shots.splice(i,1);
  }
}
function resolveBossProjectileClashes(){
  for(const projectile of [...shots]){
    if(projectile.type!=='bone'&&projectile.type!=='blackBone')continue;const damage=projectile.type==='blackBone'?3:1;
    const hazardIndex=hazards.findIndex(h=>Math.abs(projectile.x-h.x)<.065&&Math.abs(projectile.y-h.y)<.09);
    if(hazardIndex>=0){const hazard=hazards[hazardIndex];hazard.hp=(hazard.hp??(hazard.type==='water'?1:3))-damage;shots.splice(shots.indexOf(projectile),1);burst(hazard.x,hazard.y,hazard.type==='water'?'#4ddcff':'#f3e3c1',hazard.hp<=0?22:10);audio.fx(hazard.hp<=0?'pop':'hit');if(hazard.hp<=0){hazards.splice(hazardIndex,1);score+=100;levelScore+=100;showToast(hazard.type==='water'?'💦 ¡BOMBUCHA DESTRUIDA!':'🕸️ ¡RED DESTRUIDA!');}else showToast(`🕸️ RED: FALTA${hazard.hp===1?'':'N'} ${hazard.hp} GOLPE${hazard.hp===1?'':'S'}`);continue;}
    const yarn=shots.find(target=>target!==projectile&&target.type==='yarn'&&Math.abs(projectile.x-target.x)<.07&&Math.abs(projectile.y-target.y)<.09);
    if(yarn){yarn.hp=(yarn.hp??3)-damage;shots.splice(shots.indexOf(projectile),1);burst(yarn.x,yarn.y,'#ff78ad',yarn.hp<=0?22:10);audio.fx(yarn.hp<=0?'pop':'hit');if(yarn.hp<=0){shots.splice(shots.indexOf(yarn),1);score+=100;levelScore+=100;showToast('🧶 ¡OVILLO DESTRUIDO!');}else showToast(`🧶 OVILLO: FALTA${yarn.hp===1?'':'N'} ${yarn.hp} GOLPE${yarn.hp===1?'':'S'}`);}
  }
}

function startVictorySequence() {
  if (victoryTimer > 0) return;
  victoryTimer = .001; hazards = []; groundHazards = []; carnivorousPlants=[]; shots = [];
  showToast('¡TODOS ESTÁN A SALVO!'); audio.fx('level');
}

function beginHeroFlight(){mission=3;heroFlightLevel=1;heroFlightTotalCoins=0;heroHeartLevels=new Set();score=0;lives=3;energy=3;resetRunStats();startHeroFlightLevel(true);}
function startHeroFlightLevel(resetCoins=true){
  const cfg=heroFlightConfig[heroFlightLevel-1];mission=3;state='playing';if(resetCoins){heroFlightCoins=0;lives=3;heroHeartClock=8+Math.random()*Math.max(6,cfg.duration-22);}heroHeartSpawned=heroHeartLevels.has(heroFlightLevel);time=cfg.duration;heroFlightX=.18;heroFlightY=.5;heroFlightVY=0;heroFlightObjects=[];heroShots=[];heroFlightCoinClock=.7;heroFlightHazardClock=cfg.hazard;heroFlightCloverClock=10+Math.random()*7;heroFuelClock=7+Math.random()*3;heroBoxClock=8+Math.random()*4;heroFuel=100;heroShotCooldown=0;heroBananaTimer=0;heroFlightImmunity=0;heroFlightInvuln=3;heroFlightDistance=0;heroFlightLightning=0;heroFlightScroll=0;dragonHP=10000;dragonX=.82;dragonY=.34;dragonFireClock=2.3;dragonHitTimer=0;impactParticles=[];floatingTexts=[];flash=0;
  document.querySelector('.score-pill small').textContent='MONEDAS';$('setup').classList.add('hidden');$('game').classList.remove('hidden','mission-two','forest-mission','damage-shake');$('game').classList.add('hero-flight','flying-hero');$('bossBar').classList.add('hidden');$('alienBar').classList.toggle('hidden',heroFlightLevel!==5);if(heroFlightLevel===5){$('alienBar').querySelector('span').innerHTML='🐉 DRAGÓN DE FUEGO <b id="alienCount">10.000</b>';audio.fx('dragon');}$('pauseBtn').classList.remove('hidden');$('actionBtn').classList.remove('hidden');$('actionBtn').textContent=heroFlightLevel===5?'¡TIRÁ!':'¡VOLÁ!';$('actionBtn').setAttribute('aria-label',heroFlightLevel===5?'Disparar al dragón':'Subir');$('specialFireBtn').classList.toggle('hidden',heroFlightLevel!==5);$('specialFireBtn').textContent='↑';$('specialFireBtn').setAttribute('aria-label','Subir');$('missionObjective').classList.remove('hidden');$('missionObjective').textContent=heroFlightLevel===5?`OBJETIVO · CAUSÁ 10.000 PUNTOS AL DRAGÓN`:`OBJETIVO · JUNTÁ ${cfg.target} MONEDAS`;$('climateLabel').textContent=cfg.climate;$('tutorialCoach').classList.add('hidden');
  const hint=$('touchHint');hint.textContent=heroFlightLevel===5?'↑/W: subir · ESPACIO/toque: disparar':'ESPACIO o toque: subir · soltá: bajar · ← → moverte';hint.style.animation='none';void hint.offsetHeight;hint.style.animation='touchHintAway .8s 5s forwards';resize();updateHUD();last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);audio.engine(selectedHero==='cat');audio.wind(true,cfg.wind+.18);audio.fx('level');showToast(`NIVEL ${heroFlightLevel} · ${cfg.intro}`);
}
function flapHeroFlight(){if(state!=='playing'||mission!==3)return;heroFlightVY=selectedHero==='mouse'?-.39:-.47;audio.fx(selectedHero==='cat'?'salvo':'jump');}
function fireHeroFlight(){if(state!=='playing'||mission!==3||heroFlightLevel!==5||heroShotCooldown>0)return;heroShotCooldown=.28;if(heroBananaTimer>0){heroShots.push({kind:'apple',damage:400,x:heroFlightX+.06,y:heroFlightY-.025,vx:.82,life:1.7,rot:0},{kind:'banana',damage:400,x:heroFlightX+.06,y:heroFlightY+.035,vx:.78,life:1.7,rot:0});}else heroShots.push({kind:'bone',damage:400,x:heroFlightX+.06,y:heroFlightY,vx:.78,life:1.7,rot:0});audio.fx('heroShot');}
function spawnHeroCoinTrail(){
  const count=3+Math.floor(Math.random()*3),baseY=.25+Math.random()*.48,wave=Math.random()<.55;for(let i=0;i<count;i++)heroFlightObjects.push({type:'coin',x:1.07+i*.075,y:Math.max(.16,Math.min(.82,baseY+(wave?Math.sin(i*.9)*.075:0))),speed:heroFlightConfig[heroFlightLevel-1].speed,phase:Math.random()*6,size:.74+Math.random()*.22});
}
function spawnHeroHazard(){
  const cfg=heroFlightConfig[heroFlightLevel-1],type=cfg.hazards[Math.floor(Math.random()*cfg.hazards.length)],size=type==='bird'?.78+Math.random()*.38:type==='stork'?1.05+Math.random()*.22:type==='peak'||type==='volcano'?1.05+Math.random()*.28:type==='stormCloud'?.9+Math.random()*.2:.9+Math.random()*.2;
  const groundHazard=type==='peak'||type==='volcano',y=groundHazard?.82:type==='stormCloud'?.2+Math.random()*.2:.2+Math.random()*.6,speed=(groundHazard?cfg.speed*.82:cfg.speed)+(type==='plane'?.11:type==='stork'?.045:0)+Math.random()*.045;heroFlightObjects.push({type,x:1.12,y,speed,phase:Math.random()*4,size,striking:false});
}
function updateHeroFlight(dt){
  const cfg=heroFlightConfig[heroFlightLevel-1];time-=dt;heroFlightDistance=Math.min(1,1-time/cfg.duration);heroFlightImmunity=Math.max(0,heroFlightImmunity-dt);heroFlightInvuln=Math.max(0,heroFlightInvuln-dt);heroFlightLightning=Math.max(0,heroFlightLightning-dt);heroShotCooldown=Math.max(0,heroShotCooldown-dt);heroBananaTimer=Math.max(0,heroBananaTimer-dt);dragonHitTimer=Math.max(0,dragonHitTimer-dt);heroFuel=Math.max(0,heroFuel-dt*(100/15));flash=Math.max(0,flash-dt*3.2);heroFlightScroll+=dt*(.055+heroFlightLevel*.018);updateComboTimers(dt);
  const horizontal=(keys.arrowright||keys.d?1:0)-(keys.arrowleft||keys.a?1:0),minY=selectedHero==='mouse'?.23:.16,maxY=selectedHero==='mouse'?.79:.86;if(horizontal)heroFacingDir=Math.sign(horizontal);heroFlightX=Math.max(.08,Math.min(.92,heroFlightX+horizontal*dt*.48));heroFlightVY+=(selectedHero==='mouse'?.46:.62)*dt;if(heroFlightLevel===5&&(keys.arrowup||keys.w))heroFlightVY=Math.max(selectedHero==='mouse'?-.39:-.47,heroFlightVY-dt*1.25);if(heroFlightLevel===5&&(keys[' ']||keys.fire))fireHeroFlight();const gust=Math.sin(performance.now()/430+heroFlightLevel)*cfg.wind;heroFlightY+=heroFlightVY*dt+gust*dt*.12;if(heroFlightY>=maxY){damageHeroFlight('ground');return;}heroFlightY=Math.max(minY,heroFlightY);if(heroFlightY<=minY&&heroFlightVY<0)heroFlightVY=.02;if(heroFuel<=0){damageHeroFlight('fuel');return;}
  audio.engine(selectedHero==='cat',horizontal,Math.max(-1,Math.min(1,heroFlightVY*2)));audio.wind(true,cfg.wind+.2);
  heroFlightCoinClock-=dt;if(heroFlightCoinClock<=0){heroFlightCoinClock=Math.max(.85,1.65-heroFlightLevel*.09)+Math.random()*.7;spawnHeroCoinTrail();}
  heroFlightHazardClock-=dt;if(heroFlightHazardClock<=0){heroFlightHazardClock=cfg.hazard+Math.random()*1.35;spawnHeroHazard();if(heroFlightLevel===5&&Math.random()<.32)spawnHeroHazard();}
  heroFlightCloverClock-=dt;if(heroFlightCloverClock<=0&&heroFlightImmunity<=0){heroFlightCloverClock=16+Math.random()*10;heroFlightObjects.push({type:'clover',x:1.08,y:.23+Math.random()*.55,speed:cfg.speed*.82,phase:0,size:1});showToast('🍀 ¡APARECIÓ EL TRÉBOL DORADO!');}
  heroFuelClock-=dt;if(heroFuelClock<=0){heroFuelClock=9+Math.random()*3;heroFlightObjects.push({type:'fuel',x:1.08,y:.24+Math.random()*.48,speed:cfg.speed*.78,phase:0,size:1});showToast('⛽ ¡RECARGA DE COMBUSTIBLE EN CAMINO!');}
  heroBoxClock-=dt;if(heroBoxClock<=0){heroBoxClock=15+Math.random()*8;heroFlightObjects.push({type:'flightBox',x:1.08,y:.22+Math.random()*.5,speed:cfg.speed*.76,phase:0,size:1});}
  if(!heroHeartSpawned){heroHeartClock-=dt;if(heroHeartClock<=0){heroHeartSpawned=true;heroHeartLevels.add(heroFlightLevel);heroFlightObjects.push({type:'flightCharge',x:1.08,y:.22+Math.random()*.52,speed:cfg.speed*.72,phase:0,size:1});audio.fx('prize');showToast('🔋 ¡APARECIÓ UNA SUPERRECARGA!');}}
  if(heroFlightLevel===5){dragonY=.31+Math.sin(performance.now()/680)*.16;dragonFireClock-=dt;if(dragonFireClock<=0){dragonFireClock=1.45+Math.random()*1.2;heroFlightObjects.push({type:'dragonFire',x:dragonX-.08,y:dragonY+.04,speed:.46+Math.random()*.08,phase:0,size:1});audio.fx('dragonFire');}}
  if(heroFlightLevel>=4&&Math.random()<dt*(heroFlightLevel===5?.1:.06)){heroFlightLightning=.28;flash=.75;audio.fx('lightning');}
  for(let i=heroFlightObjects.length-1;i>=0;i--){const o=heroFlightObjects[i];o.x-=o.speed*dt;o.phase+=dt*(o.type==='bird'?10:o.type==='stormCloud'?3.1:4.5);if(o.type==='bird')o.y+=Math.sin(o.phase)*dt*.035;const dx=Math.abs(o.x-heroFlightX),dy=Math.abs(o.y-heroFlightY),hitX=o.type==='plane'?.115:o.type==='stork'?.1:.075,hitY=o.type==='plane'?.085:.095;
    const strike=o.type==='stormCloud'&&Math.sin(o.phase)>.62;if(o.type==='stormCloud'&&strike&&!o.striking){audio.fx('lightning');heroFlightLightning=.18;}o.striking=strike;
    const groundType=o.type==='peak'||o.type==='volcano',peakHit=groundType&&dx<.115&&heroFlightY>(.47+dx/.115*.28),cloudHit=o.type==='stormCloud'&&((dx<.095&&dy<.075)||(strike&&dx<.048&&heroFlightY>o.y+.035&&heroFlightY<o.y+.34)),regularHit=!groundType&&o.type!=='stormCloud'&&dx<(o.type==='dragonFire'?.065:hitX)&&dy<(o.type==='dragonFire'?.07:hitY);
    if(peakHit||cloudHit||regularHit){heroFlightObjects.splice(i,1);if(o.type==='coin'){heroFlightCoins++;heroFlightTotalCoins++;score+=100;runCollected++;addFloatingText('+1 MONEDA',o.x,o.y,'#ffe66d');burst(o.x,o.y,'#ffd84e',15);audio.fx('coin');if(heroFlightCoins>=cfg.target&&(heroFlightLevel<5||dragonHP<=0)){winHeroFlightLevel();return;}continue;}if(o.type==='flightCharge'){lives=Math.min(3,lives+1);heroFuel=100;burst(o.x,o.y,'#62e7ff',34);addFloatingText('SUPERRECARGA',o.x,o.y,'#8ff6ff');audio.fx('prize');showToast('🔋 ¡COMBUSTIBLE Y RECARGAS AL MÁXIMO!');continue;}if(o.type==='clover'){heroFlightImmunity=9;burst(o.x,o.y,'#8cff64',34);audio.fx('clover');showToast('🍀 ¡INMUNIDAD DORADA! 9 SEGUNDOS');continue;}if(o.type==='fuel'){heroFuel=100;score+=200;burst(o.x,o.y,'#59f2ff',22);audio.fx('fuel');showToast('⛽ ¡COMBUSTIBLE COMPLETO! +200');continue;}if(o.type==='flightBox'){const lucky=Math.random();if(lucky<.48){heroBananaTimer=15;showToast('🍎🍌 ¡BANANADA DOBLE! 15s');}else if(lucky<.7){heroFlightImmunity=8;showToast('🎁 ¡ESCUDO SORPRESA! 8s');}else if(lucky<.88){heroFuel=100;showToast('🎁 ¡TANQUE LLENO!');}else{score+=1000;showToast('🎁 ¡BONUS DE 1.000 PUNTOS!');}burst(o.x,o.y,'#ffdc69',30);audio.fx('surprise');continue;}if(heroFlightImmunity>0){score+=150;burst(o.x,o.y,'#ffe66d',28);audio.fx('shield');showToast('🍀 ¡OBSTÁCULO DESINTEGRADO!');continue;}if(heroFlightInvuln<=0){damageHeroFlight(o.type);return;}}
    if(o.x<-.15)heroFlightObjects.splice(i,1);
  }
  for(let i=heroShots.length-1;i>=0;i--){const shot=heroShots[i];shot.x+=shot.vx*dt;shot.life-=dt;shot.rot+=dt*9;if(heroFlightLevel===5&&dragonHP>0&&Math.abs(shot.x-dragonX)<.115&&Math.abs(shot.y-dragonY)<.17){heroShots.splice(i,1);dragonHP=Math.max(0,dragonHP-shot.damage);dragonHitTimer=.22;score+=shot.damage;addFloatingText(`-${shot.damage}`,dragonX,dragonY,'#fff176');burst(dragonX,dragonY,'#ffcf4d',18);audio.fx('hit');if(dragonHP<=0){score+=2500;audio.fx('win');showToast('🐉 ¡10.000 PUNTOS! DRAGÓN DERROTADO');winHeroFlightLevel();return;}continue;}if(shot.x>1.1||shot.life<=0)heroShots.splice(i,1);}
  updateParticles(dt);updateHUD();if(time<=0&&state==='playing'){damageHeroFlight('time');}
}
function damageHeroFlight(type){
  if(state!=='playing'||heroFlightInvuln>0)return;const labels={bird:'¡Un pájaro rozó el vehículo!',stork:'¡La cigüeña se acercó demasiado!',plane:'¡La avioneta cerró el paso!',peak:'¡El vehículo rozó un pico nevado!',volcano:'¡El volcán lanzó lava al paso!',stormCloud:'¡La nube eléctrica descargó cerca!',dragonFire:'¡La llamarada bajó el combustible!',ground:'¡Volaste muy cerca de las montañas!',fuel:'¡El tanque necesita una recarga!',time:'¡Se terminó el tiempo de la ruta!'},reason=labels[type]||'¡El viento desvió el vuelo!';
  if(type==='time'){endHeroFlight(false,'La ruta cerró por hoy. ¡Podés volver a intentarlo!');return;}heroFlightInvuln=2;runDamage++;resetCombo();flash=1;if(type!=='fuel')heroFuel=Math.max(0,heroFuel-34);if(type==='ground'){heroFlightY=.56;heroFlightVY=-.2;}const depleted=heroFuel<=0;updateHUD();audio.fx('fuel');
  if(!depleted){showToast(`⚡ IMPACTO ABSORBIDO · ${Math.max(1,Math.ceil(heroFuel*.15))}s DE COMBUSTIBLE`);return;}
  lives--;if(lives>0)heroFuel=100;updateHUD();audio.engine(false);audio.wind(false);
  beginLifeCountdown(reason,()=>{if(lives<=0)endHeroFlight(false,'Las tres recargas se tomaron un descanso. ¡La próxima salida ya está lista!');else resumeHeroAfterEnergy();},false,true);
}
function resumeHeroAfterEnergy(){state='playing';last=performance.now();heroFlightInvuln=Math.max(heroFlightInvuln,2);audio.engine(selectedHero==='cat');audio.wind(true,heroFlightConfig[heroFlightLevel-1].wind+.18);cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);}
function winHeroFlightLevel(){
  if(state!=='playing')return;state='paused';audio.engine(false);audio.wind(false);audio.fx('level');if(heroFlightLevel<5){const next=heroFlightConfig[heroFlightLevel];showModal('🪙',`¡Cielo ${heroFlightLevel} superado!`,`Juntaste ${heroFlightCoins} monedas en ${heroFlightConfig[heroFlightLevel-1].name}.\nPróximo escenario: ${next.name}\n${next.intro}`,`Volar al nivel ${heroFlightLevel+1}`,'heroNext');}else endHeroFlight(true);
}
function endHeroFlight(won,reason=''){
  state='ended';lastGameWon=won;audio.engine(false);audio.wind(false);cancelAnimationFrame(raf);$('game').classList.add('hidden');$('pauseBtn').classList.add('hidden');$('missionObjective').classList.add('hidden');populateMissionResult(won,reason,`${selectedHero==='cat'?'Clemente':'Rayo'} atravesó los cinco cielos y reunió ${heroFlightTotalCoins} monedas.`);$('endingBtn').innerHTML='Volver al inicio <span>▶</span>';
}

const spaceNames=spaceLevelConfig.map(level=>level.name);
function beginForestAdventure(){
  mission=4;selectedHero='dog';selectedDog=0;forestLevel=1;forestClues=0;forestCorrectRoute=Math.floor(Math.random()*3);score=0;lives=3;energy=3;resetRunStats();startForestLevel();
}
function startForestLevel(){
  const cfg=forestConfig[forestLevel-1];mission=4;state='playing';selectedHero='dog';selectedDog=0;time=cfg.duration;forestDistance=0;forestObjects=[];forestPlatforms=[];forestCollectibles=[];forestBats=[];forestLeaves=[];forestSpawn=.8;forestPlatformClock=1.6;forestBatClock=4.5;forestAmbienceClock=1.2;forestDogY=.79;forestOnPlatform=false;forestTransition=.72;forestExitTimer=0;forestNextLevel=0;forestClueSpawned=false;forestChoiceActive=false;forestPower='';forestPowerTimer=0;forestInvuln=1.5;forestVictory=0;forestVictoryStarted=0;dogX=.2;jumpY=0;jumpVelocity=0;crouchTimer=0;dogMoving=false;dogMovePulse=0;aimDir=1;flash=0;impactParticles=[];
  $('setup').classList.add('hidden');$('ending').classList.add('hidden');$('game').classList.remove('hidden','mission-two','hero-flight','flying-hero','damage-shake');$('game').classList.add('forest-mission');document.querySelector('.score-pill small').textContent='PUNTOS';$('bossBar').classList.add('hidden');$('alienBar').classList.add('hidden');$('pauseBtn').classList.remove('hidden');$('actionBtn').classList.remove('hidden');$('actionBtn').textContent='¡SALTA!';$('specialFireBtn').classList.add('hidden');$('missionObjective').classList.remove('hidden');$('missionObjective').textContent=forestLevel===5?'OBJETIVO · SEGUÍ LA PISTA Y ELEGÍ EL CAMINO A CASA':`OBJETIVO · RAMAS, FRUTAS Y ${cfg.name.toUpperCase()}`;$('climateLabel').textContent=cfg.climate;$('touchHint').textContent='← → corré · Espacio salta · ↓ agachate';$('tutorialCoach').classList.add('hidden');
  resize();updateForestHUD();last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);audio.fx(forestLevel===1?'mystery':'level');showToast(`🌲 ${cfg.name.toUpperCase()} · ${cfg.intro}`);
}
function spawnForestObject(){
  const cfg=forestConfig[forestLevel-1];let type=cfg.pool[Math.floor(Math.random()*cfg.pool.length)];if(Math.random()<.22)type='mystery';const y=type==='mystery'?.58:type==='mushroom'?.77:.805;forestObjects.push({type,x:1.08,y,phase:Math.random()*6,size:.82+Math.random()*.25,speed:(.18+forestLevel*.025)*(type==='snail'?.72:1)});
}
function spawnForestPlatform(){
  const short=Math.random()<.42,y=.49+Math.random()*.19,speed=.13+forestLevel*.012,width=short?.16:.24,platform={x:1.14,y,width,short,speed,phase:Math.random()*6};forestPlatforms.push(platform);
  const produceCount=Math.random()<.55?2:1;
  for(let i=0;i<produceCount;i++){const kind=2+Math.floor(Math.random()*4),offset=(i-(produceCount-1)/2)*Math.min(.085,width*.45);forestCollectibles.push({x:platform.x+offset,y:forestPlatformTop(platform)-.07,kind,speed,phase:Math.random()*6,platform});}
}
function spawnForestBat(){
  forestBats.push({x:1.12,y:.42+Math.random()*.27,speed:.18+forestLevel*.018+Math.random()*.035,phase:Math.random()*8,size:.82+Math.random()*.25});audio.fx('bat');
}
function forestCrouching(){return jumpVelocity===0&&(crouchTimer>0||keys.arrowdown||keys.s);}
const FOREST_NATURE_RECTS=[
  [0,180,490,320],[515,180,300,330],[830,210,170,280],[1020,180,160,340],
  [1200,155,140,390],[1350,220,185,290],[1560,160,240,350],[1830,170,330,350]
];
function drawForestNature(kind,x,y,width){const r=FOREST_NATURE_RECTS[kind];if(!r||!forestNatureImg.complete||!forestNatureImg.naturalWidth)return;const height=width*r[3]/r[2];ctx.drawImage(forestNatureImg,r[0],r[1],r[2],r[3],x-width/2,y-height/2,width,height);}
function drawForestBranch(x,y,width){if(!forestBranchImg.complete||!forestBranchImg.naturalWidth)return;const iw=forestBranchImg.naturalWidth,ih=forestBranchImg.naturalHeight,sx=iw*.02,sy=ih*.18,sw=iw*.94,sh=ih*.52,height=width*sh/sw;ctx.drawImage(forestBranchImg,sx,sy,sw,sh,x-width/2,y-height/2,width,height);}
function forestPlatformTop(p){const w=canvas.w||innerWidth,h=canvas.h||innerHeight,pw=Math.min(w*.34,360)*(p.short?.72:1),branchHeight=pw*(.52*(forestBranchImg.naturalHeight||1024))/(.94*(forestBranchImg.naturalWidth||1792));return p.y-(branchHeight*.4)/h;}
function drawForestProduce(kind,x,y,width){if(!forestProduceImg.complete||!forestProduceImg.naturalWidth)return;const cellW=forestProduceImg.naturalWidth/2,cellH=forestProduceImg.naturalHeight/2,index=Math.max(0,Math.min(3,kind-2)),sx=(index%2)*cellW,sy=Math.floor(index/2)*cellH;ctx.drawImage(forestProduceImg,sx,sy,cellW,cellH,x-width/2,y-width/2,width,width);}
const FOREST_MIKE_RECTS=[[0,0,340,724],[370,0,350,724],[740,0,360,724],[1100,0,335,724],[1420,0,350,724],[1760,0,412,724]];
function drawForestMike(frame,x,groundY,width){const r=FOREST_MIKE_RECTS[frame]||FOREST_MIKE_RECTS[0];if(!forestMikeImg.complete||!forestMikeImg.naturalWidth)return;const scale=width/r[2],height=r[3]*scale,anchor=(frame===4?510:frame===5?505:515)*scale;ctx.drawImage(forestMikeImg,r[0],r[1],r[2],r[3],x-width/2,groundY-anchor,width,height);}
function drawForestJumpMike(x,groundY,width){if(!forestMikeJumpImg.complete||!forestMikeJumpImg.naturalWidth){drawForestMike(2,x,groundY,width);return;}const size=width*1.18;ctx.drawImage(forestMikeJumpImg,x-size/2,groundY-size*.78,size,size);}
const WILDLIFE_RECTS=[
  [0,0,270,724],[270,0,260,724],[530,0,270,724],
  [810,0,260,724],[1090,0,270,724],
  [1430,150,155,420],[1585,250,275,310],[1845,250,327,340]
];
function drawWildlife(frame,x,y,width){const r=WILDLIFE_RECTS[frame]||WILDLIFE_RECTS[0];if(!wildlifeFlightImg.complete||!wildlifeFlightImg.naturalWidth)return;const height=width*r[3]/r[2];ctx.drawImage(wildlifeFlightImg,r[0],r[1],r[2],r[3],x-width/2,y-height/2,width,height);}
function forestFrame(type){return{log:0,puddle:1,mushroom:2,snail:3,thorn:4,mystery:5,clue:6,sign:7}[type]??0;}
function updateForest(dt){
  const cfg=forestConfig[forestLevel-1];forestInvuln=Math.max(0,forestInvuln-dt);forestPowerTimer=Math.max(0,forestPowerTimer-dt);forestTransition=Math.max(0,forestTransition-dt*.86);crouchTimer=Math.max(0,crouchTimer-dt);if(forestPowerTimer===0)forestPower='';flash=Math.max(0,flash-dt*3);updateParticles(dt);updateComboTimers(dt);
  if(forestVictory>0){forestVictory=(performance.now()-forestVictoryStarted)/1000;if(forestVictory>3.2)endForest(true);updateForestHUD();return;}
  if(forestExitTimer>0){forestExitTimer=Math.max(0,forestExitTimer-dt);dogMoving=true;dogMovePulse=.3;dogX=Math.min(.64,dogX+dt*.1);forestDistance=1;if(Math.random()<dt*7)forestLeaves.push({x:1.03,y:.05+Math.random()*.7,vy:.04+Math.random()*.08,vx:-.12-Math.random()*.08,rot:Math.random()*6,spin:(Math.random()-.5)*5,size:.45+Math.random()*.55});for(let i=forestLeaves.length-1;i>=0;i--){const leaf=forestLeaves[i];leaf.x+=leaf.vx*dt;leaf.y+=leaf.vy*dt;leaf.rot+=leaf.spin*dt;if(leaf.y>1.08||leaf.x<-.1)forestLeaves.splice(i,1);}if(forestExitTimer===0){forestLevel=forestNextLevel;startForestLevel();return;}updateForestHUD();return;}
  forestAmbienceClock-=dt;if(forestAmbienceClock<=0){forestAmbienceClock=3.8+Math.random()*5;audio.fx('forestBirds');}
  const worldDt=dt*(forestPower==='slowmo'?.42:1),boost=forestPower==='speed'?1.35:1,crouch=forestCrouching(),movement=(keys.arrowright||keys.d?1:0)-(keys.arrowleft||keys.a?1:0);if(movement)aimDir=Math.sign(movement);dogX=Math.max(.09,Math.min(.88,dogX+movement*dt*.48*boost*(crouch?.34:1)));dogMovePulse=Math.max(0,dogMovePulse-dt);dogMoving=!!movement||dogMovePulse>0;
  if(forestChoiceActive){updateForestHUD();return;}
  time-=worldDt;forestDistance=Math.max(0,Math.min(1,forestDistance+worldDt/cfg.duration));
  forestSpawn-=worldDt;if(forestSpawn<=0){forestSpawn=cfg.spawn*(.76+Math.random()*.48);spawnForestObject();}
  forestPlatformClock-=worldDt;if(forestPlatformClock<=0){forestPlatformClock=Math.max(3.2,5.6-forestLevel*.35)+Math.random()*2.2;spawnForestPlatform();}
  forestBatClock-=worldDt;if(forestLevel>=2&&forestBatClock<=0){forestBatClock=Math.max(3,6.5-forestLevel*.45)+Math.random()*2.5;spawnForestBat();}
  if(Math.random()<worldDt*5)forestLeaves.push({x:Math.random(),y:-.05,vy:.06+Math.random()*.08,vx:-.035-Math.random()*.05,rot:Math.random()*6,spin:(Math.random()-.5)*4,size:.45+Math.random()*.55});
  for(let i=forestLeaves.length-1;i>=0;i--){const leaf=forestLeaves[i];leaf.x+=leaf.vx*worldDt;leaf.y+=leaf.vy*worldDt;leaf.rot+=leaf.spin*worldDt;if(leaf.y>1.08||leaf.x<-.1)forestLeaves.splice(i,1);}
  let supporting=null;
  for(let i=forestPlatforms.length-1;i>=0;i--){const p=forestPlatforms[i];p.x-=p.speed*worldDt;p.phase+=worldDt*2.1;if(p.x<-.28){forestPlatforms.splice(i,1);continue;}const top=forestPlatformTop(p);if(Math.abs(dogX-p.x)<p.width*.52&&Math.abs(forestDogY-top)<.028&&jumpVelocity===0)supporting=p;}
  if(forestOnPlatform&&!supporting){forestOnPlatform=false;jumpVelocity=.04;}
  const previousY=forestDogY;if(jumpVelocity!==0||(!forestOnPlatform&&forestDogY<.79)){jumpVelocity+=1.9*dt;forestDogY+=jumpVelocity*dt;}
  if(jumpVelocity>0){for(const p of forestPlatforms){const top=forestPlatformTop(p);if(previousY<=top+.015&&forestDogY>=top&&Math.abs(dogX-p.x)<p.width*.52){forestDogY=top;jumpVelocity=0;forestOnPlatform=true;supporting=p;audio.fx('stomp');break;}}}
  if(forestOnPlatform&&supporting)forestDogY=forestPlatformTop(supporting);
  if(forestDogY>=.79){forestDogY=.79;jumpVelocity=0;forestOnPlatform=false;}jumpY=forestDogY-.79;
  for(let i=forestCollectibles.length-1;i>=0;i--){const fruit=forestCollectibles[i];fruit.x-=fruit.speed*worldDt;fruit.y=forestPlatformTop(fruit.platform)-.07;fruit.phase+=worldDt*3;if(Math.abs(fruit.x-dogX)<.055&&Math.abs(fruit.y-forestDogY)<.1){forestCollectibles.splice(i,1);score+=180;runCollected++;burst(fruit.x,fruit.y,'#ffe066',22);audio.fx('fruit');showToast(`🍎 ¡COSECHA DEL BOSQUE! +180`);continue;}if(fruit.x<-.12)forestCollectibles.splice(i,1);}
  for(let i=forestBats.length-1;i>=0;i--){const bat=forestBats[i];bat.x-=bat.speed*worldDt;bat.phase+=worldDt*(8+forestLevel);bat.y+=Math.sin(bat.phase*.7)*worldDt*.04;if(bat.x<-.14){forestBats.splice(i,1);continue;}if(crouch)continue;if(Math.abs(bat.x-dogX)<.06&&Math.abs(bat.y-forestDogY)<.07){forestBats.splice(i,1);if(forestPower==='shield'){score+=150;burst(bat.x,bat.y,'#ffe066',24);audio.fx('shield');showToast('✨ ¡EL ESCUDO AHUYENTÓ AL MURCIÉLAGO!');}else{damageForest('bat');return;}}}
  if(!forestClueSpawned&&forestDistance>.3){forestClueSpawned=true;forestObjects.push({type:'clue',x:1.05,y:.54,phase:0,size:1,speed:.16+forestLevel*.02,route:forestCorrectRoute});}
  for(let i=forestObjects.length-1;i>=0;i--){const o=forestObjects[i];o.x-=o.speed*worldDt;o.phase+=worldDt*(o.type==='snail'?5:3);const dx=Math.abs(o.x-dogX),dy=Math.abs(o.y-forestDogY),hitY=(o.type==='mystery'||o.type==='clue') ? 0.14 : 0.095,hit=dx<(o.type==='puddle' ? 0.075 : 0.065)*(o.size||1)&&dy<hitY;
    if(hit){forestObjects.splice(i,1);if(o.type==='clue'){forestClues++;score+=300;runCollected++;burst(o.x,o.y,'#ffd84e',28);audio.fx('prize');showToast(`🐾 PISTA ENCONTRADA · BUSCÁ ${['LA LUNA','EL PUENTE','EL FAROL'][forestCorrectRoute]}`);continue;}if(o.type==='mystery'){const r=Math.random();forestPower=r<.25?'shield':r<.5?'jump':r<.72?'speed':'slowmo';forestPowerTimer=forestPower==='slowmo'?15:9;score+=250;runBonuses++;burst(o.x,o.y,forestPower==='slowmo'?'#79e7ff':'#ffe36e',30);audio.fx(forestPower==='slowmo'?'slow':'surprise');showToast(forestPower==='shield'?'🎁 ¡ESCUDO DEL BOSQUE!':forestPower==='jump'?'🎁 ¡SÚPER SALTO!':forestPower==='speed'?'🎁 ¡PATAS VELOCES!':'⏳ ¡RELOJ DEL BOSQUE! TODO VA LENTO 15s');continue;}if(o.type==='mushroom'){jumpVelocity=forestPower==='jump'?-1.38:-1.12;forestOnPlatform=false;score+=180;burst(o.x,o.y,'#ff7568',20);audio.fx('trampoline');continue;}if(forestPower==='shield'){score+=120;burst(o.x,o.y,'#fff176',22);audio.fx('shield');continue;}damageForest(o.type);return;}
    if(o.x<-.14)forestObjects.splice(i,1);
  }
  if(time<=0||forestDistance>=1){if(forestLevel<5){forestExitTimer=FOREST_EXIT_DURATION;forestNextLevel=forestLevel+1;forestObjects=[];forestPlatforms=[];forestCollectibles=[];forestBats=[];forestDogY=.79;forestOnPlatform=false;jumpY=0;jumpVelocity=0;audio.fx('level');showToast(`🍃 MIKE AVANZA HACIA ${forestConfig[forestLevel].name.toUpperCase()}`);}else{forestChoiceActive=true;dogX=.5;forestDogY=.79;showToast(`🐾 ELEGÍ: ${['LA LUNA','EL PUENTE','EL FAROL'][forestCorrectRoute]}`);}}
  updateForestHUD();
}
function damageForest(type){
  if(forestInvuln>0)return;forestInvuln=1.8;energy--;runDamage++;flash=1;resetCombo();audio.fx(type==='puddle'?'splash':'hit');if(energy>0){showToast(`⚡ MIKE SE SACUDIÓ · ENERGÍA ${energy}/3`);updateForestHUD();return;}lives--;energy=3;updateForestHUD();beginLifeCountdown('El bosque sorprendió a Mike.',()=>{if(lives<=0)endForest(false,'Mike necesita descansar antes de volver al bosque.');else{state='playing';last=performance.now();forestInvuln=2;raf=requestAnimationFrame(loop);}},false,true);
}
function chooseForestRoute(){
  if(!forestChoiceActive)return;const route=dogX<.39?0:dogX>.61?2:1;if(route===forestCorrectRoute){forestChoiceActive=false;forestVictory=.01;forestVictoryStarted=performance.now();score+=2500;audio.fx('win');showToast('🦩 ¡MIKE ENCONTRÓ SU FLAMENCO Y EL CAMINO A CASA!');}else{state='paused';audio.fx('slow');showModal('🌲','Ese sendero vuelve al bosque',`Mike siguió ${['la luna','el puente','el farol'][route]}, pero la pista señalaba ${['la luna','el puente','el farol'][forestCorrectRoute]}.\nLa aventura de Mike comienza nuevamente.`,'Volver a buscar el camino','forestRestart');}
}
function endForest(won,reason=''){
  state='ended';cancelAnimationFrame(raf);lastGameWon=won;$('game').classList.add('hidden');$('pauseBtn').classList.add('hidden');$('missionObjective').classList.add('hidden');populateMissionResult(won,reason,won?'Mike encontró su flamenco rojo, siguió las huellas correctas y regresó a casa bajo un cielo lleno de estrellas.':'Mike todavía no encontró el camino, pero sus amigos lo esperan para intentarlo otra vez.');$('endingBtn').innerHTML=won?'Volver al inicio <span>▶</span>':'Intentar nuevamente <span>▶</span>';
}
function updateForestHUD(){updateHUD();}
function paintForestBackground(img,progress,w,h,alpha=1){if(!img?.complete||!img.naturalWidth)return false;const sw=img.naturalWidth*.74,maxX=img.naturalWidth-sw,eased=Math.max(0,Math.min(1,progress));ctx.save();ctx.globalAlpha=alpha;ctx.drawImage(img,maxX*eased,0,sw,img.naturalHeight,0,0,w,h);ctx.restore();return true;}
function drawForest(){
  const w=canvas.w,h=canvas.h,t=performance.now()/1000,img=forestLevelImgs[forestLevel-1],exitMix=forestExitTimer>0?1-forestExitTimer/FOREST_EXIT_DURATION:0,pan=Math.min(1,forestDistance*.96+.025*Math.sin(t*.16));ctx.clearRect(0,0,w,h);if(!paintForestBackground(img,pan,w,h)){ctx.fillStyle='#315f4b';ctx.fillRect(0,0,w,h);}if(forestExitTimer>0&&forestNextLevel){const nextImg=forestLevelImgs[forestNextLevel-1],fade=exitMix*exitMix*(3-2*exitMix);paintForestBackground(nextImg,Math.min(.16,exitMix*.16),w,h,fade);}
  ctx.save();ctx.globalAlpha=.22;for(let i=0;i<16;i++){const x=((i*137-t*(12+forestLevel*2))%(w+180))-90,y=h*(.2+(i%5)*.11)+Math.sin(t*.7+i)*12;ctx.fillStyle=i%2?'#fff7b8':'#c9f8d1';ctx.beginPath();ctx.arc(x,y,2+(i%3),0,Math.PI*2);ctx.fill();}ctx.restore();
  if(forestLevel===1||forestLevel===4){ctx.strokeStyle=forestLevel===4?'rgba(206,226,255,.62)':'rgba(220,240,255,.48)';ctx.lineWidth=2;for(let i=0;i<55;i++){const x=(i*97-t*(forestLevel===4?310:190))%(w+120),y=(i*53+t*170)%h;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-18,y+30);ctx.stroke();}}
  forestPlatforms.forEach(p=>{const pw=Math.min(w*.34,360)*(p.short?.72:1);ctx.save();ctx.translate(p.x*w,p.y*h);ctx.shadowColor='rgba(18,50,31,.3)';ctx.shadowBlur=12;drawForestBranch(0,0,pw);ctx.restore();});
  forestObjects.forEach(o=>{ctx.save();ctx.translate(o.x*w,o.y*h);if(o.type==='snail')ctx.translate(0,Math.sin(o.phase)*3);if(o.type==='clue'){ctx.shadowColor='#ffd84e';ctx.shadowBlur=24;}const size=Math.min(150,w*.12)*(o.size||1);drawAtlasN(forestObjectsImg,forestFrame(o.type),8,0,-size*.18,size,size*1.8);ctx.shadowBlur=0;ctx.restore();});
  forestCollectibles.forEach(fruit=>{const size=Math.min(82,w*.07);ctx.save();ctx.translate(fruit.x*w,fruit.y*h+Math.sin(fruit.phase)*5);ctx.shadowColor='#ffe56d';ctx.shadowBlur=18;drawForestProduce(fruit.kind,0,0,size);ctx.restore();});
  forestBats.forEach(bat=>{const size=Math.min(128,w*.1)*(bat.size||1),wingBeat=1+Math.sin(bat.phase)*.1;ctx.save();ctx.translate(bat.x*w,bat.y*h);ctx.scale(-1,wingBeat);ctx.rotate(Math.sin(bat.phase*.35)*.06);ctx.shadowColor='rgba(12,20,30,.38)';ctx.shadowBlur=10;if(forestBatImg.complete&&forestBatImg.naturalWidth)ctx.drawImage(forestBatImg,-size/2,-size/2,size,size);ctx.restore();});
  if(forestChoiceActive){const labels=['LUNA','PUENTE','FAROL'],xs=[.27,.5,.73];xs.forEach((x,i)=>{ctx.save();ctx.translate(x*w,h*.68);const near=Math.abs(dogX-x)<.13,s=Math.min(190,w*.15);ctx.globalAlpha=near?1:.72;ctx.shadowColor=near?'#ffe66d':'transparent';ctx.shadowBlur=near?28:0;drawAtlasN(forestObjectsImg,7,8,0,-s*.2,s,s*1.8);ctx.shadowBlur=0;ctx.fillStyle='#fff';ctx.strokeStyle='#17345e';ctx.lineWidth=6;ctx.font=`900 ${Math.max(16,w*.018)}px Nunito`;ctx.textAlign='center';ctx.strokeText(labels[i],0,-Math.min(105,w*.082));ctx.fillText(labels[i],0,-Math.min(105,w*.082));ctx.restore();});}
  const size=Math.min(215,w*.175);if(forestVictory>0){ctx.save();ctx.translate(w*.5,h*.67);drawAtlasN(forestFlamingoImg,Math.min(3,Math.floor(forestVictory*4)%4),4,0,-size*.08,size*1.55,size*1.72);ctx.restore();}else{ctx.save();ctx.globalAlpha=forestInvuln>0&&Math.floor(t*10)%2===0?.35:1;ctx.translate(dogX*w,forestDogY*h+Math.sin(t*8)*(dogMoving?4:1));ctx.scale(aimDir,1);const crouch=forestCrouching(),jumping=jumpVelocity!==0,frame=crouch?4:dogMoving?1+Math.floor(t*8)%2:0;if(jumping){ctx.translate(-size*.025,-size*.012);ctx.rotate(Math.max(-.06,Math.min(.06,jumpVelocity*.065)));drawForestJumpMike(0,0,size);}else drawForestMike(frame,0,0,size);if(forestPower==='shield'){ctx.strokeStyle='#ffe768';ctx.lineWidth=7;ctx.setLineDash([12,8]);ctx.lineDashOffset=-t*30;ctx.beginPath();ctx.ellipse(0,-size*.12,size*.58,size*.43,0,0,Math.PI*2);ctx.stroke();}ctx.restore();}
  forestLeaves.forEach(leaf=>{const size=48*leaf.size;ctx.save();ctx.translate(leaf.x*w,leaf.y*h);ctx.rotate(leaf.rot);ctx.globalAlpha=.68;drawForestNature(6,0,0,size);ctx.restore();});
  const foregroundScroll=forestDistance*1.9+exitMix*.45;for(let i=0;i<5;i++){const x=((i*.27-foregroundScroll*.18)%(1.35))*w-80,s=Math.min(190,w*.16);ctx.save();ctx.globalAlpha=.52;drawForestNature(7,x,h*.91,s);ctx.restore();}
  drawParticles(w,h);if(forestPower==='slowmo'){ctx.save();ctx.strokeStyle='rgba(111,229,255,.6)';ctx.lineWidth=Math.max(4,w*.004);ctx.setLineDash([18,14]);ctx.lineDashOffset=-t*22;ctx.strokeRect(8,8,w-16,h-16);ctx.fillStyle='rgba(92,211,255,.055)';ctx.fillRect(0,0,w,h);ctx.restore();}if(flash>0){ctx.fillStyle=`rgba(255,255,255,${flash*.35})`;ctx.fillRect(0,0,w,h);}if(forestTransition>0){const a=Math.min(.58,forestTransition*.78);ctx.save();ctx.globalAlpha=a;const g=ctx.createLinearGradient(0,0,w,0);g.addColorStop(0,'rgba(18,63,47,.84)');g.addColorStop(.5,'rgba(20,78,48,.48)');g.addColorStop(1,'rgba(18,63,47,.84)');ctx.fillStyle=g;ctx.fillRect(0,0,w,h);for(let i=0;i<18;i++){ctx.save();ctx.translate((i/17)*w+Math.sin(t*2+i)*25,(i%4)*h*.22+h*.08);ctx.rotate(t+i);drawForestNature(6,0,0,75);ctx.restore();}ctx.fillStyle='#fff';ctx.font=`900 ${Math.max(25,w*.035)}px Baloo 2`;ctx.textAlign='center';ctx.shadowColor='#102b22';ctx.shadowBlur=12;ctx.fillText(`ESCENARIO ${forestLevel} · ${forestConfig[forestLevel-1].name.toUpperCase()}`,w/2,h*.5);ctx.restore();}if(forestExitTimer>0){ctx.save();ctx.fillStyle='rgba(255,255,255,.96)';ctx.strokeStyle='rgba(20,58,45,.82)';ctx.lineWidth=7;ctx.font=`900 ${Math.max(24,w*.032)}px Baloo 2`;ctx.textAlign='center';const label=`SIGUIENTE SENDERO · ${forestConfig[forestNextLevel-1].name.toUpperCase()}`;ctx.strokeText(label,w/2,h*.31);ctx.fillText(label,w/2,h*.31);ctx.restore();}ctx.fillStyle='rgba(255,255,255,.96)';ctx.font='900 15px Nunito';ctx.textAlign='center';ctx.fillText(forestChoiceActive?'← → ELEGÍ · ESPACIO CONFIRMA':'← → CORRÉ · ESPACIO SALTA · ↓ AGACHATE',w/2,matchMedia('(pointer:coarse)').matches?h-106:h-18);
}

function startMission2Level(){
  const cfg=spaceLevelConfig[spaceLevel-1];state='playing';energy=3;lives=3;spaceObjects=[];spaceBones=[];spaceBoxes=[];catApples=[];spaceEggs=[];eggExplosions=[];heartDrops=[];impactParticles=[];planeX=.5;planeY=.76;planeLastX=planeX;planeLastY=planeY;spaceSpawn=1.1;spaceBoxClock=3.5+Math.random()*3;spaceInvuln=2;spaceDistance=0;spaceDestroyed=0;spaceFireCooldown=0;catAssistTimer=0;catAppleClock=0;eggClock=0;planeBank=0;planePitch=0;planeKick=0;alienShot=0;alienX=.5;alienDir=1;
  $('alienBar').querySelector('span').innerHTML='👽 EXTRATERRESTRE <b id="alienCount">40</b>';
  spaceDuration=cfg.duration;time=spaceDuration;if(spaceLevel===5)alienHP=40;
  audio.wind(false);document.querySelector('.score-pill small').textContent='PUNTOS';$('setup').classList.add('hidden');$('game').classList.remove('hidden','flying-hero','hero-flight','forest-mission');$('game').classList.add('mission-two');$('bossBar').classList.add('hidden');$('alienBar').classList.toggle('hidden',spaceLevel!==5);$('actionBtn').classList.remove('hidden');$('specialFireBtn').classList.add('hidden');$('actionBtn').textContent='¡HUESO!';$('pauseBtn').classList.remove('hidden');$('missionObjective').classList.toggle('hidden',spaceLevel===5);$('missionObjective').textContent=`OBJETIVO · ${cfg.objective}`;
  $('climateLabel').textContent=cfg.name;const hint=$('touchHint');hint.textContent='✈️ Arrastrá para pilotar · tocá para disparar';hint.style.animation='none';void hint.offsetHeight;hint.style.animation='touchHintAway .8s 4s forwards';
  saveMission2Progress();resize();updateHUD();last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);audio.engine(true);audio.fx('level');showToast(spaceLevel===5?'¡RESCATÁ AL RATÓN!':`NIVEL ${spaceLevel} · ${cfg.intro}`);if(spaceLevel===1)startTutorial(2);else $('tutorialCoach').classList.add('hidden');
}
function updateMission2(dt){
  const cfg=spaceLevelConfig[spaceLevel-1];
  spaceInvuln=Math.max(0,spaceInvuln-dt);spaceFireCooldown=Math.max(0,spaceFireCooldown-dt);catAssistTimer=Math.max(0,catAssistTimer-dt);planeKick=Math.max(0,planeKick-dt*5);updateComboTimers(dt);time-=dt;spaceDistance=Math.min(1,1-time/spaceDuration);updateTutorial(dt);
  updateLifeHeart(dt);
  const horizontal=(keys.arrowright||keys.d?1:0)-(keys.arrowleft||keys.a?1:0),vertical=(keys.arrowdown||keys.s?1:0)-(keys.arrowup||keys.w?1:0),touchX=Math.abs(planeX-planeLastX)>.002?Math.sign(planeX-planeLastX):0,touchY=Math.abs(planeY-planeLastY)>.002?Math.sign(planeY-planeLastY):0,speed=(.55+spaceLevel*.035)*dt;if(horizontal<0)planeX-=speed;if(horizontal>0)planeX+=speed;if(vertical<0)planeY-=speed;if(vertical>0)planeY+=speed;planeX=Math.max(.1,Math.min(.9,planeX));planeY=Math.max(.43,Math.min(.88,planeY));const flightX=horizontal||touchX,flightY=vertical||touchY;planeBank+=(flightX-planeBank)*Math.min(1,dt*7);planePitch+=(flightY-planePitch)*Math.min(1,dt*6);audio.engine(true,flightX,flightY);planeLastX=planeX;planeLastY=planeY;
  if((keys[' ']||keys.fire)&&spaceFireCooldown<=0)fireSpaceBone();
  spaceSpawn-=dt;if(spaceSpawn<=0){spaceSpawn=Math.max(.34,cfg.spawn)+Math.random()*.28;spawnSpaceObstacle();if(spaceLevel>=3&&Math.random()<.12+(spaceLevel-3)*.055)spawnSpaceObstacle();}
  spaceBoxClock-=dt;if(spaceBoxClock<=0){spaceBoxClock=cfg.box+Math.random()*5;spaceBoxes.push({x:.14+Math.random()*.72,y:.5+Math.random()*.28,z:.03,speed:.16+spaceLevel*.012,rot:0});}
  if(catAssistTimer>0){catAppleClock-=dt;eggClock-=dt;if(catAppleClock<=0){catAppleClock=.42;catApples.push({x:planeX+.035,y:planeY-.025,z:.94,rot:0});audio.fx('apple');}if(eggClock<=0){eggClock=1.35;spaceEggs.push({x:planeX-.04,y:planeY-.015,z:.94,rot:0});audio.fx('egg');}}
  if(spaceLevel===5){alienX+=alienDir*.2*dt;if(alienX>.82||alienX<.18){alienDir*=-1;alienX=Math.max(.18,Math.min(.82,alienX));}alienShot-=dt;if(alienShot<=0){alienShot=.78+Math.random()*.55;spawnSpaceObstacle(Math.random()<.5?'bomb':'net',alienX,.48);}}
  updateSpaceBones(dt);updateCatApples(dt);updateSpaceEggs(dt);updateSpaceBoxes(dt);updateSpaceObjects(dt);updateParticles(dt);updateHUD();
  if(state!=='playing')return;if(spaceLevel<5&&time<=0)winMission2Level();else if(spaceLevel===5&&time<=0)endMission2(false,'El OVNI escapó antes de que pudieran rescatar a Rayo.');
}
function spawnSpaceObstacle(forced,x,y){
  const cfg=spaceLevelConfig[spaceLevel-1],pool=cfg.pool,type=forced||pool[Math.floor(Math.random()*pool.length)],speedBoost=type==='fireball'?.045:type==='star'?.025:0;
  spaceObjects.push({type,index:{bomb:0,net:1,asteroid:2,mine:3}[type],combatIndex:{fireball:0,star:3}[type],hp:type==='fireball'?5:type==='star'?4:type==='asteroid'||type==='mine'?2:1,x:x??(.12+Math.random()*.76),y:y??(.44+Math.random()*.38),z:.03,speed:cfg.speed+Math.random()*.055+speedBoost,rot:Math.random()*6});
}
function fireSpaceBone(){if(state!=='playing'||mission!==2||spaceFireCooldown>0)return;spaceFireCooldown=catAssistTimer>0?.15:.22;planeKick=.16;tutorialAction('fire');if(catAssistTimer>0){[-.08,-.04,0,.04,.08].forEach((offset,i)=>spaceBones.push({x:Math.max(.07,Math.min(.93,planeX+offset)),y:planeY+Math.abs(i-2)*.008,z:1,rot:i*.22,vx:offset*.22}));audio.fx('salvo');}else{spaceBones.push({x:planeX,y:planeY,z:1,rot:0,vx:0});audio.fx('bark');}}
function updateSpaceBones(dt){
  for(let i=spaceBones.length-1;i>=0;i--){const b=spaceBones[i];b.z-=dt*1.28;b.x+=(b.vx||0)*dt;b.rot+=dt*10;let hit=false;
    for(let j=spaceBoxes.length-1;j>=0;j--){const box=spaceBoxes[j];if(Math.abs(b.z-box.z)<.09&&Math.abs(b.x-box.x)<.1&&Math.abs(b.y-box.y)<.11){spaceBoxes.splice(j,1);hit=true;activateCatAssist(box.x,box.y);break;}}
    if(!hit)for(let j=spaceObjects.length-1;j>=0;j--){const o=spaceObjects[j];if(Math.abs(b.z-o.z)<.09&&Math.abs(b.x-o.x)<.095&&Math.abs(b.y-o.y)<.1){hit=true;applySpaceHit(o,j,1);break;}}
    if(!hit&&spaceLevel===5&&b.z<.2&&Math.abs(b.x-alienX)<.14){hit=true;alienHP--;score+=150;audio.fx('hit');burst(alienX,.3,'#b76cff',22);if(alienHP<=0){spaceBones.splice(i,1);endMission2(true);return;}if(alienHP%5===0)showToast(`👽 FALTAN ${alienHP} IMPACTOS`);}
    if(hit||b.z<-.05)spaceBones.splice(i,1);
  }
}
function updateCatApples(dt){
  for(let i=catApples.length-1;i>=0;i--){const apple=catApples[i];apple.z-=dt*1.34;apple.rot+=dt*8;let hit=false;
    for(let j=spaceObjects.length-1;j>=0;j--){const o=spaceObjects[j];if(Math.abs(apple.z-o.z)<.105&&Math.abs(apple.x-o.x)<.105&&Math.abs(apple.y-o.y)<.11){hit=true;applySpaceHit(o,j,2);break;}}
    if(!hit&&spaceLevel===5&&apple.z<.2&&Math.abs(apple.x-alienX)<.16){hit=true;alienHP=Math.max(0,alienHP-2);score+=250;audio.fx('hit');burst(alienX,.3,'#ff4f57',24);if(alienHP<=0){catApples.splice(i,1);endMission2(true);return;}}
    if(hit||apple.z<-.05)catApples.splice(i,1);
  }
}
function updateSpaceEggs(dt){
  for(let i=spaceEggs.length-1;i>=0;i--){const egg=spaceEggs[i];egg.z-=dt*1.08;egg.rot+=dt*7;let exploded=false;
    for(let j=spaceObjects.length-1;j>=0;j--){const o=spaceObjects[j];if(Math.abs(egg.z-o.z)<.12&&Math.abs(egg.x-o.x)<.13&&Math.abs(egg.y-o.y)<.13){explodeEgg(egg);exploded=true;for(let k=spaceObjects.length-1;k>=0;k--){const target=spaceObjects[k];if(Math.abs(target.x-egg.x)<.2&&Math.abs(target.y-egg.y)<.18&&Math.abs(target.z-egg.z)<.16)applySpaceHit(target,k,3);}break;}}
    if(!exploded&&spaceLevel===5&&egg.z<.21&&Math.abs(egg.x-alienX)<.17){alienHP=Math.max(0,alienHP-4);score+=300;explodeEgg(egg);exploded=true;if(alienHP<=0){spaceEggs.splice(i,1);endMission2(true);return;}}
    if(exploded||egg.z<-.05)spaceEggs.splice(i,1);
  }
  for(let i=eggExplosions.length-1;i>=0;i--){eggExplosions[i].life-=dt;if(eggExplosions[i].life<=0)eggExplosions.splice(i,1);}
}
function explodeEgg(egg){eggExplosions.push({x:egg.x,y:egg.y,z:egg.z,life:.48});burst(egg.x,egg.y,'#ffd84e',34);audio.fx('eggBoom');showToast('🥚 ¡HUEVO EXPLOSIVO!');}
function applySpaceHit(object,index,damage){
  object.hp-=damage;audio.fx('stomp');burst(object.x,object.y,damage>1?'#ff5b4d':'#ffd84e',damage>1?24:12);
  if(object.hp<=0){spaceObjects.splice(index,1);spaceDestroyed++;rewardCatch(100,object.x,object.y,damage>1?'🍎 ¡EL GATO ABRIÓ EL CAMINO!':'💥 ¡CAMINO LIBRE!');}
  else{score+=35;showToast(`💢 ¡RESISTE ${object.hp} GOLPE${object.hp===1?'':'S'}!`);}
}
function activateCatAssist(x,y){catAssistTimer=12;catAppleClock=.12;eggClock=.55;score+=200;burst(x,y,'#ffd84e',34);audio.fx('crate');showToast('📦 ¡RÁFAGA MASIVA + MANZANAS + HUEVOS! 12s');}
function updateSpaceBoxes(dt){
  for(let i=spaceBoxes.length-1;i>=0;i--){const box=spaceBoxes[i];box.z+=box.speed*dt;box.rot+=dt*1.4;if(box.z>.86&&Math.abs(box.x-planeX)<.12&&Math.abs(box.y-planeY)<.13){spaceBoxes.splice(i,1);activateCatAssist(box.x,box.y);}else if(box.z>1.08)spaceBoxes.splice(i,1);}
}
function updateSpaceObjects(dt){
  for(let i=spaceObjects.length-1;i>=0;i--){const o=spaceObjects[i];o.z+=o.speed*dt;o.rot+=dt*(2+spaceLevel*.3);
    if(o.z>.86&&Math.abs(o.x-planeX)<.105&&Math.abs(o.y-planeY)<.11){spaceObjects.splice(i,1);damagePlane(o.type);if(state!=='playing')return;continue;}if(o.z>1.08)spaceObjects.splice(i,1);
  }
}
function damagePlane(type){
  if(spaceInvuln>0||state!=='playing')return;spaceInvuln=1.35;energy--;runDamage++;resetCombo();flash=1;planeKick=.4;const depleted=energy<=0;updateHUD();audio.fx(type==='net'?'net':'splash');
  const messages={net:'¡La red bajó la energía del avión!',fireball:'¡La bola de fuego consumió energía!',star:'¡La estrella sacudió la reserva!'},reason=messages[type]||'¡El escudo absorbió el impacto!';
  if(!depleted){showToast(`⚡ IMPACTO ABSORBIDO · ENERGÍA ${energy}/3`);return;}
  lives--;if(lives>0)energy=3;updateHUD();
  beginLifeCountdown(reason,()=>{if(lives<=0)endMission2(false,'Las recargas del avión se tomaron un descanso. ¡El equipo puede intentarlo otra vez!');else resumeAfterLifeLoss();},true,true);
}
function winMission2Level(){state='paused';audio.engine(false);if(spaceLevel<5){const next=spaceLevelConfig[spaceLevel];localStorage.setItem(MISSION2_SAVE_KEY,JSON.stringify({spaceLevel:spaceLevel+1,score,lives,selectedDog,selectedHero,dogName:petName()}));refreshMission2Shortcut();audio.fx('level');showModal('✈️',`¡Ruta ${spaceLevel} superada!`,`Destruyeron ${spaceDestroyed} obstáculos en ${spaceNames[spaceLevel-1]}.\nSiguiente desafío: ${next.name}\n${next.objective}`,`Volar al nivel ${spaceLevel+1}`,'spaceNext');}}
function populateMissionResult(won,reason,winText){
  const result=saveMissionResult(won),missing=Math.max(0,result.best-score);endingStage='result';lastGameWon=won;
  $('ending').classList.remove('hidden','farewell','unlock');$('ending').classList.toggle('win',won);$('ending').classList.toggle('lose',!won);$('endingMoral').classList.add('hidden');
  $('endingIcon').textContent=won?'🏆':'🐾';$('endingTitle').textContent=won?'¡MISIÓN COMPLETADA!':'¡CASI!';
  $('endingText').textContent=won?winText:`${reason}\n${missing>0?`Te faltaron ${missing} puntos para alcanzar tu mejor marca.`:'¡Estuviste muy cerca de completar la misión!'}`;
  $('endingScore').textContent=`${score.toLocaleString('es-AR')} puntos`;$('resultBest').textContent=result.best.toLocaleString('es-AR');$('resultStars').textContent='★'.repeat(result.stars)+'☆'.repeat(3-result.stars);$('resultItems').textContent=runCollected;$('resultCombo').textContent=`×${Math.max(1,maxCombo)}`;
  $('resultStats').classList.remove('hidden');$('newRecord').classList.toggle('hidden',!newRecordEarned);$('endingActions').classList.remove('hidden');$('replayBtn').classList.remove('hidden');$('menuBtn').classList.remove('hidden');$('endingBtn').classList.toggle('hidden',!won);$('endingBtn').innerHTML=mission===1?'Siguiente misión <span>▶</span>':'Ver el gran final <span>▶</span>';
  if(newRecordEarned)audio.fx('record');else audio.fx(won?'win':'lose');reportRankingScore();
}
function endMission2(won,reason=''){
  state='ended';audio.engine(false);cancelAnimationFrame(raf);clearMission2Save();$('game').classList.add('hidden');$('pauseBtn').classList.add('hidden');$('missionObjective').classList.add('hidden');populateMissionResult(won,reason,'Rayo está a salvo. ¡El equipo vuelve unido a casa!');
}

function burst(x,y,color,count=12) {
  for (let i=0;i<count;i++) impactParticles.push({x,y,vx:(Math.random()-.5)*.35,vy:(Math.random()-.7)*.35,life:.45+Math.random()*.35,color});
}
function updateParticles(dt) {
  for (let i=impactParticles.length-1;i>=0;i--) { const p=impactParticles[i]; p.x+=p.vx*dt; p.y+=p.vy*dt; p.vy+=.35*dt; p.life-=dt; if (p.life<=0) impactParticles.splice(i,1); }
  for(let i=stompEffects.length-1;i>=0;i--){const e=stompEffects[i];e.y+=e.vy*dt;e.vy+=.55*dt;e.rot+=dt*7;e.life-=dt;if(e.life<=0)stompEffects.splice(i,1);}
  for(let i=floatingTexts.length-1;i>=0;i--){const text=floatingTexts[i];text.y-=.045*dt;text.life-=dt;if(text.life<=0)floatingTexts.splice(i,1);}
}

function drawScenario(w,h) {
  const t=performance.now()/1000; ctx.save();
  if(level===1) {
    for(let i=0;i<4;i++) drawCloud(((t*(16+i*3)+i*w*.31)%(w+220))-110,h*(.18+i*.1),70+i*12,'rgba(255,255,255,.62)');
    ctx.strokeStyle='rgba(16,38,75,.45)';ctx.lineWidth=3;for(let i=0;i<3;i++){const x=(w*.2+i*w*.25+t*18)%w,y=h*(.26+i*.06);ctx.beginPath();ctx.arc(x,y,10,3.55,5.85);ctx.arc(x+20,y,10,3.55,5.85);ctx.stroke();}
  } else if(level===2) {
    const grad=ctx.createLinearGradient(0,0,0,h);grad.addColorStop(0,'rgba(255,149,55,.2)');grad.addColorStop(1,'rgba(255,210,80,.04)');ctx.fillStyle=grad;ctx.fillRect(0,0,w,h);
    ctx.strokeStyle='rgba(255,245,205,.45)';ctx.lineWidth=4;for(let i=0;i<4;i++){const y=h*(.25+i*.13);ctx.beginPath();ctx.moveTo(-40,y);ctx.bezierCurveTo(w*.3,y+Math.sin(t*2+i)*35,w*.65,y-35,w+50,y+Math.cos(t+i)*25);ctx.stroke();}
  } else if(level===3) {
    for(let i=0;i<5;i++) drawCloud(((t*(9+i)+i*w*.24)%(w+260))-130,h*(.12+i%2*.11),95,'rgba(53,82,125,.55)');
    ctx.strokeStyle='rgba(185,235,255,.65)';ctx.lineWidth=4;for(let i=0;i<5;i++){const x=(i+.5)*w/5,r=22+Math.sin(t*3+i)*8;ctx.beginPath();ctx.ellipse(x,h*.91,r,r*.22,0,0,Math.PI*2);ctx.stroke();}
  } else if(level===4) {
    const aurora=ctx.createLinearGradient(0,0,w,0);aurora.addColorStop(0,'rgba(84,255,202,.08)');aurora.addColorStop(.5,'rgba(93,190,255,.27)');aurora.addColorStop(1,'rgba(201,106,255,.1)');ctx.strokeStyle=aurora;ctx.lineWidth=34;ctx.beginPath();ctx.moveTo(-50,h*.22);ctx.bezierCurveTo(w*.25,h*(.08+Math.sin(t)*.04),w*.7,h*(.37+Math.cos(t*.8)*.04),w+50,h*.13);ctx.stroke();
    ctx.fillStyle='rgba(238,250,255,.72)';ctx.beginPath();ctx.moveTo(0,h*.84);for(let x=0;x<=w;x+=w/8)ctx.lineTo(x,h*(.82+Math.sin(x*.02+t)*.025));ctx.lineTo(w,h);ctx.lineTo(0,h);ctx.fill();
    for(let i=0;i<7;i++) drawPine((i+.3)*w/7,h*.85,35+(i%3)*14);
  } else {
    ctx.fillStyle='rgba(8,18,55,.3)';for(let i=0;i<13;i++){const bw=w/13+2,bh=h*(.08+(i%4)*.025);ctx.fillRect(i*w/13,h*.84-bh,bw,bh);}
    for(let i=0;i<5;i++) drawCloud(((t*(22+i*4)+i*w*.3)%(w+300))-150,h*(.18+i%2*.12),115,'rgba(20,28,65,.62)');
    if(Math.sin(t*5.7)>.985){ctx.strokeStyle='rgba(255,245,165,.9)';ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(w*.72,0);ctx.lineTo(w*.67,h*.25);ctx.lineTo(w*.73,h*.24);ctx.lineTo(w*.65,h*.48);ctx.stroke();}
  }
  ctx.restore();
}
function drawCloud(x,y,size,color) {ctx.fillStyle=color;ctx.beginPath();ctx.arc(x-size*.28,y,size*.25,0,Math.PI*2);ctx.arc(x,y-size*.12,size*.34,0,Math.PI*2);ctx.arc(x+size*.32,y,size*.23,0,Math.PI*2);ctx.fillRect(x-size*.5,y,size, size*.22);ctx.fill();}
function drawPine(x,y,size) {ctx.fillStyle='rgba(28,91,98,.42)';for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(x,y-size*(1-i*.22));ctx.lineTo(x-size*(.45-i*.08),y-size*(.36-i*.18));ctx.lineTo(x+size*(.45-i*.08),y-size*(.36-i*.18));ctx.fill();}}

function animateWeather(dt) {
  weather.forEach(p => {
    if (level===1) { p.x+=Math.sin(p.phase+=dt)*dt*.018; p.y+=Math.cos(p.phase*.7)*dt*.008; }
    if (level===2) { p.x+=dt*(.13+p.s*.08); p.y+=Math.sin(p.phase+=dt*4)*dt*.045; }
    if (level===3) { p.x-=dt*.08; p.y+=dt*(.45+p.s*.3); }
    if (level===4) { p.x+=Math.sin(p.phase+=dt*2)*dt*.05; p.y+=dt*(.08+p.s*.07); }
    if (level===5) { p.x+=Math.sin(p.phase+=dt)*dt*.01; p.y-=dt*.012*p.s; }
    if (p.x>1.05) p.x=-.05; if (p.x<-.05) p.x=1.05; if (p.y>1.05) p.y=-.05; if (p.y<-.05) p.y=1.05;
  });
}

function loseLife(reason) {
  if (state!=='playing'||dogInvuln>0) return;const timedOut=time<=0;dogInvuln=1.3;energy--;runDamage++;resetCombo();flash=1;const depleted=energy<=0;updateHUD();audio.fx('splash');
  if(!depleted){if(timedOut)time=90;showToast(`⚡ IMPACTO ABSORBIDO · ENERGÍA ${energy}/3`);return;}
  lives--;if(lives>0)energy=3;updateHUD();audio.fx(lives<=0?'lose':'fuel');
  beginLifeCountdown(reason,()=>{if(lives<=0)endGame(false,'Las tres recargas se tomaron un descanso. ¡Podés volver a intentarlo cuando quieras!');else{if(timedOut)time=90;resumeDogAfterEnergy();}},false,true);
}
function beginLifeCountdown(reason,onComplete,flight=false,recharged=false){
  state='lifeLost';cancelAnimationFrame(raf);audio.engine(false);const token=++lifeCountdownToken,overlay=$('lifeCountdown'),game=$('game'),dog=$('lifeHitDog');
  $('lifeCountdownTitle').textContent=lives<=0?'¡MOMENTO DE DESCANSAR!':recharged?'¡RECARGANDO ENERGÍA!':flight?'¡ESCUDO DE ENERGÍA!':'¡ENERGÍA PROTEGIDA!';$('lifeCountdownReason').textContent=`${reason} Tus ${score} puntos siguen guardados.`;$('lifeCountdownHint').textContent=lives>0?(recharged?'Nueva carga lista en...':'Seguimos la aventura en...'):'Preparamos un nuevo intento en...';
  dog.className='life-hit-dog';if(flight)dog.classList.add('plane');else if(selectedHero!=='dog')dog.classList.add(selectedHero);dog.style.backgroundPosition=flight?'center':selectedHero==='dog'?`${selectedDog*100/3}% 50%`:'left center';game.classList.remove('damage-shake');void game.offsetHeight;game.classList.add('damage-shake');overlay.classList.remove('hidden');
  let count=3;const step=()=>{if(token!==lifeCountdownToken)return;if(count===0){overlay.classList.add('hidden');game.classList.remove('damage-shake');onComplete();return;}const number=$('lifeCountdownNumber');number.textContent=count;number.style.animation='none';void number.offsetHeight;number.style.animation='lifeCountPop .72s both';audio.tone(330+(3-count)*130,.13,'triangle',.11);count--;setTimeout(step,850);};step();
}
function resumeDogAfterEnergy(){state='playing';last=performance.now();cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);}
function resumeAfterLifeLoss(){
  state='playing';last=performance.now();spaceInvuln=Math.max(spaceInvuln,2);audio.engine(true);cancelAnimationFrame(raf);raf=requestAnimationFrame(loop);
}
function winLevel() {
  if(level>=5)return;
  state='paused'; audio.fx('level'); const next=climates[level].label;
  showModal('⭐','¡Nivel superado!',`${petName()} alcanzó la meta.\nPróximo clima: ${next}\nPuntaje total: ${score}`,'Siguiente nivel','next');
}
function endGame(won,reason='') {
  state='ended'; cancelAnimationFrame(raf);
  if(won&&mission===1)localStorage.setItem(MISSION2_UNLOCK_KEY,'true');
  const name=petName();
  populateMissionResult(won,reason,`${name} recuperó los huesos. Rayo y Clemente ya no son rivales: ahora son sus amigos.`);
}
function reportRankingScore(){
  const character=selectedHero==='dog'?breeds[selectedDog]:selectedHero==='cat'?'Clemente':'Rayo';
  window.dispatchEvent(new CustomEvent('huesos-score',{detail:{nickname:petName().slice(0,14),score:Math.max(0,Math.round(score)),mission,character,bones:mission===3?0:runCollected,coins:mission===3?heroFlightTotalCoins:0}}));
}
function showModal(icon,title,text,btn,action) {
  $('modalIcon').textContent=icon; $('modalTitle').textContent=title; $('modalText').textContent=text; $('modalBtn').innerHTML=btn+' <span>▶</span>'; $('modalBtn').dataset.action=action; $('modal').classList.remove('hidden');
}
function showToast(text) { const t=$('toast'); t.textContent=text; t.classList.remove('hidden'); t.style.animation='none'; void t.offsetHeight; t.style.animation='pop .65s both'; }
function updateHUD() {
  $('score').textContent=String(score).padStart(4,'0'); $('level').textContent=`${level}/5`;
  $('bestHudValue').textContent=(getAdventureProgress().best?.[mission]||0).toLocaleString('es-AR');
  $('timer').textContent=`${String(Math.max(0,Math.floor(time/60))).padStart(2,'0')}:${String(Math.max(0,Math.ceil(time%60))).padStart(2,'0')}`;
  const energyUnits=mission===3?Math.max(0,Math.ceil(heroFuel/34)):energy,energyHud=$('hearts');energyHud.innerHTML=`<span class="energy-label">ENERGÍA</span><span class="energy-cells">${Array.from({length:3},(_,i)=>`<i class="heart ${i>=energyUnits?'lost':''}">⚡</i>`).join('')}</span><b class="recharge-count">🔋×${lives}</b>`;energyHud.setAttribute('aria-label',`Energía ${energyUnits} de 3. Recargas ${lives}`);
  if(mission===4){const cfg=forestConfig[forestLevel-1];$('level').textContent=`BOSQUE ${forestLevel}/5`;$('progressBar').style.width=`${Math.min(100,forestDistance*100)}%`;$('progressText').textContent=forestChoiceActive?'ELEGÍ EL CAMINO Y SALTÁ':forestExitTimer>0?'MIKE AVANZA AL NUEVO SENDERO':`SENDERO ${Math.floor(forestDistance*100)}% · 🐾 ${forestClues}`;$('bossBar').classList.add('hidden');$('alienBar').classList.add('hidden');$('powerStatus').classList.toggle('hidden',forestPowerTimer<=0);$('powerStatus').textContent=forestPower==='shield'?`✨ ESCUDO ${Math.ceil(forestPowerTimer)}s`:forestPower==='jump'?`🍄 SÚPER SALTO ${Math.ceil(forestPowerTimer)}s`:forestPower==='slowmo'?`⏳ TIEMPO CALMO ${Math.ceil(forestPowerTimer)}s`:`⚡ VELOCIDAD ${Math.ceil(forestPowerTimer)}s`;$('weaponStatus').classList.add('hidden');$('netStatus').classList.add('hidden');$('surpriseStatus').classList.remove('hidden');$('surpriseStatus').textContent=forestChoiceActive?'🐾 RECORDÁ LA ÚLTIMA PISTA':forestExitTimer>0?`🍃 CAMINO A ${forestConfig[forestNextLevel-1].name}`:`🦩 BUSCANDO EL FLAMENCO · ${cfg.name}`;$('actionBtn').textContent=forestChoiceActive?'¡ELEGIR!':'¡SALTA!';return;}
  if(mission===3){const cfg=heroFlightConfig[heroFlightLevel-1],fuelSeconds=Math.max(0,Math.ceil(heroFuel*.15));$('score').textContent=String(heroFlightTotalCoins).padStart(3,'0');$('level').textContent=`AIRE ${heroFlightLevel}/5`;$('progressBar').style.width=Math.min(100,heroFlightCoins/cfg.target*100)+'%';$('progressText').textContent=`${heroFlightCoins} / ${cfg.target} MONEDAS · ⛽ ${fuelSeconds}s`;$('bossBar').classList.add('hidden');$('alienBar').classList.toggle('hidden',heroFlightLevel!==5);if(heroFlightLevel===5){$('alienCount').textContent=dragonHP.toLocaleString('es-AR');$('alienHealth').style.width=`${Math.max(0,dragonHP/10000*100)}%`;}$('powerStatus').classList.toggle('hidden',heroFlightImmunity<=0);$('powerStatus').textContent=`🍀 INMUNIDAD ${Math.ceil(heroFlightImmunity)}s`;$('netStatus').classList.add('hidden');$('weaponStatus').classList.toggle('hidden',heroBananaTimer<=0);$('weaponStatus').textContent=`🍎🍌 BANANADA ${Math.ceil(heroBananaTimer)}s`;$('surpriseStatus').classList.remove('hidden');$('surpriseStatus').textContent=`⛽ COMBUSTIBLE ${fuelSeconds}s · 🔋 ${lives} RECARGAS`;$('actionBtn').textContent=heroFlightLevel===5?'¡TIRÁ!':'¡VOLÁ!';$('specialFireBtn').classList.toggle('hidden',heroFlightLevel!==5);$('specialFireBtn').textContent='↑';return;}
  if(mission===2){
    $('level').textContent=`M2 ${spaceLevel}/5`;$('bossBar').classList.add('hidden');$('alienBar').classList.toggle('hidden',spaceLevel!==5);
    if(spaceLevel===5){$('progressBar').style.width=((40-alienHP)/40*100)+'%';$('progressText').textContent=`${40-alienHP} / 40 impactos`;$('alienHealth').style.width=(alienHP/40*100)+'%';$('alienCount').textContent=alienHP;}
    else{$('progressBar').style.width=(spaceDistance*100)+'%';$('progressText').textContent=`RUTA ${Math.floor(spaceDistance*100)}% · ${spaceDestroyed} despejados`;}
    ['powerStatus','weaponStatus','netStatus'].forEach(id=>$(id).classList.add('hidden'));$('surpriseStatus').classList.toggle('hidden',catAssistTimer<=0);$('surpriseStatus').textContent=`📦 RÁFAGA ×5 · 🍎 · 🥚 ${Math.ceil(catAssistTimer)}s`;$('actionBtn').textContent=catAssistTimer>0?'¡RÁFAGA!':'¡HUESO!';return;
  }
  if (level===5) {
    const hits=120-ratHP-bossHP; $('progressBar').style.width=(hits/120*100)+'%'; $('progressText').textContent=`${hits} / 120 impactos`;
  } else { $('progressBar').style.width=Math.min(100,levelScore/LEVEL_TARGET*100)+'%'; $('progressText').textContent=`${levelScore} / ${LEVEL_TARGET}`; }
  $('bossHealth').style.width=(bossHP/20*100)+'%'; $('ratHealth').style.width=ratHP+'%';
  $('bossCount').textContent=bossHP; $('ratCount').textContent=ratHP;
  document.querySelector('.cat-row').classList.toggle('defeated',bossHP<=0); document.querySelector('.rat-row').classList.toggle('defeated',ratHP<=0);
  $('powerStatus').classList.toggle('hidden',powerTimer<=0); $('powerStatus').textContent=`⚡ SUPERPODER ${Math.ceil(powerTimer)}s`;
  $('weaponStatus').classList.toggle('hidden',blackAmmo<=0);
  $('weaponStatus').textContent=level===5?`🖤 TIROS TRIPLES ×${blackAmmo}`:`🖤 HUESOS NEGROS ×${blackAmmo}`;
  $('netStatus').classList.toggle('hidden',netTimer<=0);$('netStatus').textContent=`🕸️ ATRAPADO ${Math.ceil(netTimer)}s`;
  const surpriseParts=[];if(playBallTimer>0)surpriseParts.push(`🎾 JUGANDO ${Math.ceil(playBallTimer)}s`);if(doubleTimer>0)surpriseParts.push(`🦴 ×2 ${Math.ceil(doubleTimer)}s`);if(sizeTimer>0)surpriseParts.push(dogSizeMode==='puppy'?`🐶 CACHORRO ${Math.ceil(sizeTimer)}s`:`🐕 GIGANTE ${Math.ceil(sizeTimer)}s`);const surpriseText=surpriseParts.join(' · ');
  $('surpriseStatus').classList.toggle('hidden',!surpriseText);$('surpriseStatus').textContent=surpriseText;
  if(selectedHero!=='dog'){$('actionBtn').textContent='¡VOLA!';$('specialFireBtn').classList.toggle('hidden',level<5&&blackAmmo<=0);$('specialFireBtn').textContent=level===5?'🦴':`🖤${blackAmmo}`;}
  else{if(level<5)$('actionBtn').textContent=blackAmmo>0?'¡TIRÁ!':'¡SALTA!';$('specialFireBtn').classList.add('hidden');}
}

function draw() {
  if(mission===2){drawMission2();return;}
  if(mission===3){drawHeroFlight();return;}
  if(mission===4){drawForest();return;}
  const w=canvas.w,h=canvas.h; ctx.clearRect(0,0,w,h); drawCover(bg,0,0,w,h);
  ctx.fillStyle=climates[level-1].tint; ctx.fillRect(0,0,w,h); drawScenario(w,h); drawWeather(w,h);trampolines.forEach(t=>drawTrampoline(t,w,h));if(catBallThrowTimer>0)drawCatBallThrower(w,h);
  if(level===3||level===4)drawSupportCat(w,h);
  if (level<5 || ratHP>0) drawPirateBalloon(pirateX*w,(level===5?pirateY:.28)*h,Math.min(level===5?175:150,w*.14),level);
  else drawRatDefeat(w,h);
  hazards.forEach(b=>{ ctx.save(); ctx.translate(b.x*w,b.y*h); ctx.rotate(b.spin); if(b.type==='net')drawNet(68);else drawAtlasN(pirateImg,1,2,0,0,62,62);if(level===5&&b.hp>1)drawHitPips(b.hp,42);ctx.restore(); });
  birds.forEach(bird=>drawBird(bird,w,h));
  groundHazards.forEach(tick=>tick.type==='flea'?drawFlea(tick.x*w,tick.y*h,tick.phase,tick.dir,w):drawTick(tick.x*w,tick.y*h,tick.phase,tick.dir,w));
  carnivorousPlants.forEach(plant=>drawCarnivorousPlant(plant,w,h));
  catBalls.forEach(ball=>{ctx.save();if(ball.kicked){ctx.strokeStyle='rgba(255,245,165,.82)';ctx.lineWidth=Math.max(4,w*.006);ctx.lineCap='round';ctx.beginPath();ctx.moveTo(ball.x*w-ball.vx*w*.13,ball.y*h);ctx.lineTo(ball.x*w-ball.vx*w*.035,ball.y*h);ctx.stroke();}ctx.translate(ball.x*w,ball.y*h);ctx.rotate(ball.rot);drawCatBall(ball);ctx.restore();});
  if(fedeVisibleTimer>0)drawFede(w,h);
  stompEffects.forEach(e=>{ctx.save();ctx.globalAlpha=Math.min(1,e.life*2.5);ctx.translate(e.x*w,e.y*h);ctx.rotate(e.rot);drawAtlasN(objectsImg,0,4,0,0,58,58);ctx.restore();});
  blackShots.forEach(s=>{ctx.save();ctx.translate(s.x*w,s.y*h);ctx.rotate(s.rot);drawBlackBone(true);ctx.restore();});
  if (level===5) {
    if (bossHP>0) drawAtlasN(helicopterImg,Math.floor(performance.now()/150)%3,3,bossX*w,.31*h,Math.min(235,w*.19),Math.min(150,w*.12));
    else drawCatDefeat(w,h);
    shots.forEach(s=>{ ctx.save(); ctx.translate(s.x*w,s.y*h); ctx.rotate(s.rot); if(s.type==='blackBone')drawBlackBone(true);else drawAtlasN(objectsImg,s.type==='yarn'?3:0,4,0,0,s.type==='yarn'?64:50,s.type==='yarn'?64:50);if(s.type==='yarn'&&s.hp>1)drawHitPips(s.hp,40);ctx.restore(); });
  } else items.forEach(o=>{ ctx.save(); ctx.translate(o.x*w,o.y*h); ctx.rotate(o.rot); if(o.type==='blackBone')drawBlackBone(false);else if (o.type==='slow'||o.type==='stun') drawTrapBone(o.type); else if(o.type.startsWith('toy')) drawDogToy(o.type); else if(o.type==='surprise')drawSurpriseBox();else drawAtlasN(objectsImg,o.type==='prize'?1:0,4,0,0,o.type==='prize'?88:58,o.type==='prize'?88:58); ctx.restore(); });
  powerUps.forEach(p=>{ctx.save();ctx.translate(p.x*w,p.y*h);ctx.rotate(p.rot);drawGoldenBone();ctx.restore();});
  heartDrops.forEach(heart=>{if(!heart.space){ctx.save();ctx.translate(heart.x*w,heart.y*h);ctx.rotate(heart.rot);drawEnergyCapsule(Math.min(72,w*.065));ctx.restore();}});
  drawDog(w,h);if(catStealTimer>0)drawCatSteal(w,h);drawParticles(w,h);
  if (flash>0) { ctx.fillStyle=`rgba(80,205,255,${flash*.42})`; ctx.fillRect(0,0,w,h); }
  if (level===5) { ctx.fillStyle='rgba(255,255,255,.95)'; ctx.font='800 18px Nunito'; ctx.textAlign='center'; const hint=selectedHero!=='dog'?'← → MOVER · ESPACIO VOLAR · F DISPARAR':matchMedia('(pointer:coarse)').matches?'DESLIZÁ ↑ SALTA · ↓ AGACHA · TOQUE DISPARA':'← → MOVER · ↑ SALTAR · ↓ AGACHAR · ESPACIO DISPARAR';ctx.fillText(hint,w/2,h-24); }
}
function drawHeroFlight(){
  const w=canvas.w,h=canvas.h,t=performance.now()/1000,cfg=heroFlightConfig[heroFlightLevel-1];ctx.clearRect(0,0,w,h);
  ctx.save();if(heroFlightLevel===2)ctx.filter='saturate(1.15) sepia(.18) hue-rotate(-8deg)';else if(heroFlightLevel===3)ctx.filter='brightness(.56) saturate(1.2) hue-rotate(14deg)';else if(heroFlightLevel===4)ctx.filter='brightness(.48) saturate(.92) hue-rotate(18deg)';else if(heroFlightLevel===5)ctx.filter='brightness(.42) saturate(.72) hue-rotate(28deg)';if(heroFlightBg.complete&&heroFlightBg.naturalWidth){const sw=heroFlightBg.naturalWidth*.9,sx=(heroFlightBg.naturalWidth-sw)*(.5+.5*Math.sin(heroFlightScroll*Math.PI));ctx.drawImage(heroFlightBg,sx,0,sw,heroFlightBg.naturalHeight,0,0,w,h);}ctx.restore();
  const overlays=['rgba(255,220,100,.02)','rgba(255,118,45,.17)','rgba(9,20,70,.42)','rgba(19,21,68,.5)','rgba(31,18,62,.58)'];ctx.fillStyle=overlays[heroFlightLevel-1];ctx.fillRect(0,0,w,h);
  drawHeroFlightWeather(w,h,t,cfg);
  drawHeroGround(w,h,t);
  heroFlightObjects.forEach(o=>{ctx.save();ctx.translate(o.x*w,o.y*h);if(o.type==='coin'){const s=Math.min(64,w*.055)*(o.size||1);ctx.scale(.42+.58*Math.abs(Math.sin(o.phase)),1);drawAtlasN(heroFlightAtlas,0,4,0,0,s,s);}else if(o.type==='flightCharge'){ctx.translate(0,Math.sin(o.phase*2)*6);ctx.rotate(Math.sin(o.phase)*.08);drawEnergyCapsule(Math.min(82,w*.07));}else if(o.type==='clover'){const s=Math.min(92,w*.075);ctx.rotate(Math.sin(o.phase)*.08);drawAtlasN(heroFlightAtlas,1,4,0,0,s,s);}else if(o.type==='fuel'){drawHeroFuel(Math.min(76,w*.065),o.phase);}else if(o.type==='flightBox'){drawHeroFlightBox(Math.min(82,w*.07),o.phase);}else if(o.type==='stork'){const s=Math.min(155,w*.135)*(o.size||1);ctx.translate(0,Math.sin(o.phase*1.7)*8);drawAtlasN(heroFlightAtlas,2,4,0,0,s,s*.7);}else if(o.type==='plane'){const s=Math.min(150,w*.13)*(o.size||1);ctx.rotate(Math.sin(o.phase*2)*.035);drawAtlasN(heroFlightAtlas,3,4,0,0,s,s*.68);}else if(o.type==='peak'){drawHeroMountainPeak(Math.min(245,w*.2)*(o.size||1));}else if(o.type==='volcano'){drawHeroVolcano(Math.min(245,w*.2)*(o.size||1),o.phase);}else if(o.type==='stormCloud'){drawHeroStormCloud(Math.min(175,w*.145)*(o.size||1),o.phase,o.striking);}else if(o.type==='dragonFire'){drawDragonFire(Math.min(76,w*.06),o.phase);}else{const s=Math.min(105,w*.09)*(o.size||1),frame=Math.sin(o.phase)>0?0:1;ctx.translate(0,Math.sin(o.phase*.7)*5);drawAtlasN(heroFlightBirdImg,frame,2,0,0,s,s*.72);}ctx.restore();});
  heroShots.forEach(shot=>{ctx.save();ctx.translate(shot.x*w,shot.y*h);ctx.rotate(shot.rot);if(shot.kind==='apple'){ctx.font='900 42px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🍎',0,0);}else if(shot.kind==='banana'){ctx.font='900 44px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('🍌',0,0);}else drawAtlasN(objectsImg,0,4,0,0,48,36);ctx.restore();});
  if(heroFlightLevel===5&&dragonHP>0)drawHeroDragon(dragonX*w,dragonY*h,Math.min(330,w*.27),t);
  const heroSize=w<700?Math.min(165,w*.31):Math.min(220,w*.19),blink=heroFlightInvuln>0&&Math.floor(t*10)%2===0;ctx.save();ctx.globalAlpha=blink?.38:1;ctx.translate(heroFlightX*w,heroFlightY*h);ctx.rotate(Math.max(-.18,Math.min(.18,heroFlightVY*.38)));if(heroFlightImmunity>0){ctx.strokeStyle='#ffe768';ctx.lineWidth=7;ctx.setLineDash([13,9]);ctx.lineDashOffset=-t*28;ctx.shadowColor='#9dff72';ctx.shadowBlur=25;ctx.beginPath();ctx.ellipse(0,0,heroSize*.67,heroSize*.55,0,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);ctx.shadowBlur=0;}if(selectedHero==='cat')drawPlayerCat(heroSize);else drawPlayerMouse(heroSize*.84,heroFlightLevel);ctx.restore();
  drawParticles(w,h);if(heroFlightLightning>0){ctx.fillStyle=`rgba(235,249,255,${heroFlightLightning*1.9})`;ctx.fillRect(0,0,w,h);ctx.strokeStyle='rgba(255,255,255,.96)';ctx.lineWidth=6;ctx.beginPath();ctx.moveTo(w*.68,0);ctx.lineTo(w*.62,h*.24);ctx.lineTo(w*.68,h*.25);ctx.lineTo(w*.59,h*.52);ctx.stroke();}
  if(flash>0){ctx.fillStyle=`rgba(255,255,255,${flash*.34})`;ctx.fillRect(0,0,w,h);}const coarse=matchMedia('(pointer:coarse)').matches;ctx.fillStyle='rgba(255,255,255,.94)';ctx.font='900 15px Nunito';ctx.textAlign='center';const heroHint=heroFlightLevel===5?(coarse?'↑ SUBE · ¡TIRÁ! DISPARA':'↑/W SUBE · ESPACIO DISPARA'):(coarse?'TOCÁ PARA SUBIR · SOLTÁ PARA BAJAR':'ESPACIO SUBE · SOLTAR BAJA · ← → MUEVE');ctx.fillText(heroHint,w/2,coarse?h-106:h-18);
}
function drawHeroGround(w,h,t){
  ctx.save();if(heroTerrainImg.complete&&heroTerrainImg.naturalWidth){const dh=h*.36,dw=dh*(heroTerrainImg.naturalWidth/heroTerrainImg.naturalHeight),offset=-(heroFlightScroll*260%dw);ctx.globalAlpha=heroFlightLevel>=4?.94:1;for(let x=offset-dw;x<w+dw;x+=dw)ctx.drawImage(heroTerrainImg,x,h-dh,dw,dh);}else{ctx.fillStyle='#365b4c';ctx.fillRect(0,h*.88,w,h*.12);}ctx.restore();
}
function drawHeroFuel(size,phase){ctx.save();ctx.rotate(Math.sin(phase)*.08);ctx.shadowColor='#52eaff';ctx.shadowBlur=18;ctx.fillStyle='#32bdd1';ctx.strokeStyle='white';ctx.lineWidth=4;ctx.beginPath();ctx.roundRect(-size*.34,-size*.46,size*.68,size*.92,size*.12);ctx.fill();ctx.stroke();ctx.fillStyle='#fff36b';ctx.font=`900 ${size*.52}px Nunito`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('⛽',0,2);ctx.restore();}
function drawHeroFlightBox(size,phase){ctx.save();ctx.rotate(Math.sin(phase*1.4)*.1);ctx.shadowColor='#ffd85c';ctx.shadowBlur=18;ctx.fillStyle='#8057d8';ctx.strokeStyle='#fff2a4';ctx.lineWidth=5;ctx.beginPath();ctx.roundRect(-size*.46,-size*.42,size*.92,size*.84,size*.12);ctx.fill();ctx.stroke();ctx.fillStyle='white';ctx.font=`900 ${size*.58}px Nunito`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('?',0,1);ctx.restore();}
function drawHeroMountainPeak(size){
  const height=size*1.55;ctx.save();ctx.shadowColor='rgba(8,26,58,.45)';ctx.shadowBlur=16;const rock=ctx.createLinearGradient(0,-height*.55,0,height*.62);rock.addColorStop(0,'#7f9fbd');rock.addColorStop(.5,'#486982');rock.addColorStop(1,'#243d59');ctx.fillStyle=rock;ctx.strokeStyle='#17324f';ctx.lineWidth=Math.max(3,size*.025);ctx.beginPath();ctx.moveTo(-size*.68,height*.56);ctx.lineTo(-size*.35,height*.1);ctx.lineTo(-size*.16,height*.2);ctx.lineTo(0,-height*.52);ctx.lineTo(size*.17,-height*.08);ctx.lineTo(size*.29,-height*.16);ctx.lineTo(size*.7,height*.56);ctx.closePath();ctx.fill();ctx.stroke();ctx.shadowBlur=0;
  ctx.fillStyle='#f5fbff';ctx.beginPath();ctx.moveTo(0,-height*.52);ctx.lineTo(-size*.17,-height*.15);ctx.lineTo(-size*.04,-height*.2);ctx.lineTo(size*.08,-height*.1);ctx.lineTo(size*.17,-height*.08);ctx.closePath();ctx.fill();ctx.strokeStyle='rgba(170,220,245,.85)';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='rgba(134,190,218,.42)';for(const x of [-.38,.32]){ctx.beginPath();ctx.moveTo(size*x,height*.14);ctx.lineTo(size*(x-.12),height*.48);ctx.lineTo(size*(x+.07),height*.48);ctx.closePath();ctx.fill();}ctx.restore();
}
function drawHeroVolcano(size,phase){
  const height=size*1.35;ctx.save();ctx.shadowColor='rgba(35,8,7,.5)';ctx.shadowBlur=14;const rock=ctx.createLinearGradient(0,-height*.35,0,height*.55);rock.addColorStop(0,'#6b312c');rock.addColorStop(1,'#241d2a');ctx.fillStyle=rock;ctx.strokeStyle='#1d1724';ctx.lineWidth=Math.max(3,size*.025);ctx.beginPath();ctx.moveTo(-size*.7,height*.56);ctx.lineTo(-size*.2,-height*.22);ctx.quadraticCurveTo(0,-height*.33,size*.2,-height*.22);ctx.lineTo(size*.7,height*.56);ctx.closePath();ctx.fill();ctx.stroke();ctx.fillStyle='#ff542f';ctx.shadowColor='#ffb328';ctx.shadowBlur=22;ctx.beginPath();ctx.ellipse(0,-height*.23,size*.2,size*.08,0,0,Math.PI*2);ctx.fill();for(let i=0;i<4;i++){const p=(phase*.45+i*.24)%1,x=Math.sin(i*2.2+phase)*size*.22*p,y=-height*(.25+p*.5);ctx.fillStyle=i%2?'#ffd44f':'#ff6437';ctx.beginPath();ctx.arc(x,y,5+9*(1-p),0,Math.PI*2);ctx.fill();}ctx.restore();
}
function drawDragonFire(size,phase){ctx.save();ctx.rotate(Math.PI+Math.sin(phase)*.08);ctx.shadowColor='#ff6b22';ctx.shadowBlur=20;const g=ctx.createRadialGradient(size*.12,0,2,0,0,size*.55);g.addColorStop(0,'#fff49a');g.addColorStop(.35,'#ff9d24');g.addColorStop(1,'#e52d27');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(size*.55,0);ctx.quadraticCurveTo(size*.08,-size*.5,-size*.5,-size*.2);ctx.quadraticCurveTo(-size*.25,0,-size*.52,size*.22);ctx.quadraticCurveTo(size*.1,size*.45,size*.55,0);ctx.fill();ctx.restore();}
function drawHeroDragon(x,y,size,t){
  const charging=dragonFireClock<.58,frame=dragonHitTimer>0?3:charging?2:Math.floor(t*6)%2;ctx.save();ctx.translate(x,y+Math.sin(t*2.4)*7);ctx.rotate(Math.sin(t*1.8)*.028);ctx.shadowColor=charging?'#ff7a2e':'rgba(35,12,66,.65)';ctx.shadowBlur=charging?30:18;drawAtlasN(heroDragonImg,frame,4,0,0,size,size*1.25);ctx.restore();
}
function drawHeroStormCloud(size,phase,striking){
  const charge=(Math.sin(phase)+1)/2,pulse=1+charge*.045;ctx.save();ctx.scale(pulse,pulse);ctx.shadowColor=striking?'#fff48b':'#8b7bff';ctx.shadowBlur=striking?28:12+charge*12;const cloud=ctx.createLinearGradient(0,-size*.45,0,size*.3);cloud.addColorStop(0,'#6874b8');cloud.addColorStop(.5,'#393c79');cloud.addColorStop(1,'#202753');ctx.fillStyle=cloud;ctx.strokeStyle='#172249';ctx.lineWidth=Math.max(3,size*.026);ctx.beginPath();ctx.moveTo(-size*.48,size*.2);ctx.bezierCurveTo(-size*.64,size*.02,-size*.52,-size*.2,-size*.3,-size*.2);ctx.bezierCurveTo(-size*.25,-size*.48,size*.1,-size*.55,size*.27,-size*.28);ctx.bezierCurveTo(size*.52,-size*.3,size*.66,-size*.08,size*.55,size*.15);ctx.quadraticCurveTo(size*.48,size*.3,size*.26,size*.3);ctx.lineTo(-size*.35,size*.3);ctx.quadraticCurveTo(-size*.46,size*.29,-size*.48,size*.2);ctx.closePath();ctx.fill();ctx.stroke();ctx.shadowBlur=0;
  ctx.fillStyle=striking?'#fff5a4':'rgba(255,225,93,.55)';for(let i=-1;i<=1;i++){ctx.beginPath();ctx.arc(i*size*.2,size*.06,3+charge*3,0,Math.PI*2);ctx.fill();}
  if(striking){ctx.strokeStyle='#fff36b';ctx.shadowColor='#fff';ctx.shadowBlur=18;ctx.lineWidth=Math.max(5,size*.045);ctx.lineJoin='bevel';ctx.beginPath();ctx.moveTo(size*.05,size*.2);ctx.lineTo(-size*.08,size*.55);ctx.lineTo(size*.06,size*.52);ctx.lineTo(-size*.13,size*1.13);ctx.lineTo(size*.22,size*.63);ctx.lineTo(size*.06,size*.66);ctx.lineTo(size*.2,size*.22);ctx.stroke();ctx.shadowBlur=0;}else{ctx.strokeStyle=`rgba(255,232,105,${.22+charge*.42})`;ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(0,size*.22);ctx.lineTo(-size*.05,size*(.42+charge*.12));ctx.stroke();}ctx.restore();
}
function drawHeroFlightWeather(w,h,t,cfg){
  ctx.save();const speed=heroFlightLevel>=4?320:130;ctx.lineCap='round';if(heroFlightLevel>=3){ctx.fillStyle='rgba(255,255,220,.8)';for(let i=0;i<38;i++){const x=(i*113+t*(15+i%4))%w,y=(i*71)%Math.max(1,h*.68);ctx.beginPath();ctx.arc(x,y,1+i%3*.45,0,Math.PI*2);ctx.fill();}}
  if(heroFlightLevel>=4){ctx.strokeStyle=heroFlightLevel===5?'rgba(215,235,255,.64)':'rgba(185,225,255,.52)';ctx.lineWidth=2.2;for(let i=0;i<46;i++){const x=((i*97-t*speed*(1+i%3*.15))%(w+180))+90,y=(i*53+t*95)%h;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-34-heroFlightLevel*8,y+18+heroFlightLevel*4);ctx.stroke();}}
  for(let i=0;i<6;i++){const cloudX=((i*w*.24-t*(18+heroFlightLevel*6))%(w+280))-140;drawCloud(cloudX,h*(.16+(i%3)*.12),75+i%2*25,heroFlightLevel>=3?'rgba(22,33,78,.42)':'rgba(255,255,255,.34)');}ctx.restore();
}
function drawMission2(){
  const w=canvas.w,h=canvas.h,t=performance.now()/1000,bgImg=spaceLevel<5?mission2LevelImgs[spaceLevel-1]:mission2Bg,shake=planeKick>0?Math.sin(t*80)*planeKick*10:0;ctx.clearRect(0,0,w,h);ctx.save();ctx.translate(shake,shake*.35);drawCover(bgImg,0,0,w,h);ctx.restore();
  const shade=[0,.02,.06,.1,.24][spaceLevel-1];ctx.fillStyle=`rgba(25,12,80,${shade})`;ctx.fillRect(0,0,w,h);
  drawFlightParallax(w,h,t);ctx.strokeStyle='rgba(190,239,255,.5)';ctx.lineWidth=2;for(let i=0;i<18;i++){const velocity=210+spaceLevel*30,x=((i*137+t*velocity*(1+i%3))%(w+180))-90,y=h*(.25+(i%8)*.095);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-34-i%4*13-planeBank*18,y+62+spaceLevel*3);ctx.stroke();}
  if(spaceLevel===5){const uw=Math.min(440,w*.34),uh=uw*.83;ctx.save();ctx.translate(alienX*w,.29*h+Math.sin(t*2.3)*8);ctx.rotate(Math.sin(t*1.7)*.025);ctx.drawImage(alienUfoImg,-uw/2,-uh/2,uw,uh);ctx.restore();}
  [...spaceObjects].sort((a,b)=>a.z-b.z).forEach(o=>{const p=spaceProject(o.x,o.y,o.z,w,h),s=35+o.z*Math.min(155,w*.13),combat=o.combatIndex!==undefined;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(o.type==='fireball'?Math.sin(t*8+o.rot)*.06:o.rot);const frame=o.type==='fireball'?Math.floor(t*12+o.rot)%3:o.combatIndex,combatSize=s*(combat?1.16:1);if(combat)drawCombatSprite(frame,0,0,combatSize);else drawSpaceHazardSprite(o.index,0,0,combatSize);if(o.hp>1){ctx.fillStyle='rgba(255,255,255,.94)';const start=-(o.hp-1)*4.5;for(let i=0;i<o.hp;i++)ctx.fillRect(start+i*9,s*.45,6,3);}ctx.restore();});
  spaceBoxes.forEach(box=>{const p=spaceProject(box.x,box.y,box.z,w,h),s=38+box.z*Math.min(130,w*.11);ctx.save();ctx.translate(p.x,p.y);ctx.rotate(Math.sin(t*4+box.rot)*.08);drawAtlasN(mission2PowerupsImg,0,5,0,0,s,s);ctx.restore();});
  spaceBones.forEach(b=>{const p=spaceProject(b.x,b.y,b.z,w,h),s=24+b.z*48;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(b.rot);drawSpaceHazardSprite(4,0,0,s*1.4);ctx.restore();});
  catApples.forEach(apple=>{const p=spaceProject(apple.x,apple.y,apple.z,w,h),s=24+apple.z*54;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(apple.rot);drawAtlasN(mission2PowerupsImg,1,5,0,0,s*1.15,s);ctx.restore();});
  spaceEggs.forEach(egg=>{const p=spaceProject(egg.x,egg.y,egg.z,w,h),s=25+egg.z*58;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(egg.rot);drawCombatSprite(4,0,0,s*1.28);ctx.restore();});
  eggExplosions.forEach(explosion=>{const p=spaceProject(explosion.x,explosion.y,explosion.z,w,h),progress=1-explosion.life/.48,s=(58+progress*105)*(1-progress*.18);ctx.save();ctx.globalAlpha=Math.min(1,explosion.life*4);ctx.translate(p.x,p.y);drawCombatSprite(5,0,0,s);ctx.restore();});
  heartDrops.forEach(heart=>{if(heart.space){const p=spaceProject(heart.x,heart.y,heart.z,w,h),s=28+heart.z*Math.min(86,w*.08);ctx.save();ctx.translate(p.x,p.y);drawEnergyCapsule(s);ctx.restore();}});
  const ps=w<700?Math.min(250,w*.58,h*.33):Math.min(410,w*.32,h*.42),blink=spaceInvuln>0&&Math.floor(t*10)%2===0,bob=Math.sin(t*6)*4;drawPlaneMotionEffects(w,h,t,ps,bob);ctx.save();ctx.globalAlpha=blink?.42:1;ctx.translate(planeX*w,planeY*h+bob-planeKick*22);ctx.rotate(planeBank*.12);ctx.scale(1-planePitch*.035,1+planePitch*.025);ctx.drawImage(rescuePlaneImg,-ps/2,-ps*.34,ps,ps*.67);drawPlaneCrew(ps,t);if(catAssistTimer>0){const pulse=44+Math.sin(t*8)*6;drawAtlasN(mission2PowerupsImg,1,5,ps*.1,-ps*.19,pulse,pulse*.82);}ctx.restore();
  drawParticles(w,h);if(flash>0){flash=Math.max(0,flash-.08);ctx.fillStyle=`rgba(255,80,85,${flash*.35})`;ctx.fillRect(0,0,w,h);}ctx.fillStyle='rgba(255,255,255,.92)';ctx.font='800 15px Nunito';ctx.textAlign='center';ctx.fillText(matchMedia('(pointer:coarse)').matches?'ARRASTRÁ · TOQUE DISPARA':'FLECHAS/WASD · ESPACIO',w/2,h-18);
}
function drawPlaneMotionEffects(w,h,t,ps,bob){
  const x=planeX*w,y=planeY*h+bob;ctx.save();ctx.globalCompositeOperation='screen';ctx.lineCap='round';for(const side of [-1,1]){const trail=ps*(.18+Math.sin(t*9+side)*.018);ctx.strokeStyle=catAssistTimer>0?'rgba(255,201,55,.7)':'rgba(82,218,255,.58)';ctx.lineWidth=catAssistTimer>0?8:5;ctx.beginPath();ctx.moveTo(x+side*ps*.24,y+ps*.18);ctx.quadraticCurveTo(x+side*trail,y+ps*.34,x+side*ps*.14,y+ps*(.55+Math.sin(t*7+side)*.04));ctx.stroke();}
  if(catAssistTimer>0){ctx.globalAlpha=.65+.2*Math.sin(t*8);drawAtlasN(mission2PowerupsImg,4,5,x,y+ps*.02,ps*.78,ps*.78);}ctx.restore();
}
function drawPlaneCrew(ps,t){
  const look=planeBank<-.045?-1:planeBank>.045?1:Math.sin(t*.8)>0?1:-1,gesture=Math.abs(planeBank)+Math.abs(planePitch),bounce=Math.sin(t*7)*ps*.006;
  ctx.save();ctx.translate(-ps*.075,-ps*.165+bounce);ctx.scale(look,1);drawNaturalDogHead(selectedDog,0,0,ps*.155);ctx.restore();
  ctx.save();ctx.translate(ps*.085,-ps*.125-bounce);ctx.scale(look,1);ctx.rotate(-look*planeBank*.12);drawNaturalCastHead(2,0,0,ps*(.13+Math.min(.018,gesture*.025)));ctx.restore();
}
function drawFlightParallax(w,h,t){
  const horizonY=h*.29,speed=.13+spaceLevel*.035;ctx.save();for(let i=0;i<24;i++){const z=(i/24+t*speed)%1,spread=Math.pow(z,1.65),seed=((i*47)%101)/101,x=w*(.5+(seed-.5)*1.7*spread-planeBank*.035),y=horizonY+(h-horizonY)*spread,size=3+z*z*(18+spaceLevel*2);ctx.globalAlpha=.12+z*.34;ctx.fillStyle=i%3===0?'#fff4c8':'#d9f7ff';ctx.beginPath();ctx.ellipse(x,y,size*(1+Math.abs(planeBank)*.8),size*.28,planeBank*.08,0,Math.PI*2);ctx.fill();}ctx.restore();
}
function drawCombatSprite(index,x,y,size){const ratio=mission2CombatImg.naturalWidth?mission2CombatImg.naturalHeight/(mission2CombatImg.naturalWidth/6):2;drawAtlasN(mission2CombatImg,index,6,x,y,size,size*ratio);}
function drawSpaceHazardSprite(index,x,y,size){const ratio=spaceHazardsImg.naturalWidth?spaceHazardsImg.naturalHeight/(spaceHazardsImg.naturalWidth/5):1.67;const frameWidth=size*1.18;drawAtlasN(spaceHazardsImg,index,5,x,y,frameWidth,frameWidth*ratio);}
function spaceProject(x,y,z,w,h){const scale=.12+z*.88;return{x:w*(.5+(x-.5)*scale),y:h*(.29+(y-.29)*z)};}
function dogAttentionDirection(){
  if(keys.arrowleft||keys.a)return -1;if(keys.arrowright||keys.d)return 1;
  const candidates=[...items,...powerUps,...hazards,...catBalls,...birds].filter(o=>Number.isFinite(o.x));if(!candidates.length)return aimDir;
  let target=candidates[0],best=Math.abs(target.x-dogX);for(let i=1;i<candidates.length;i++){const d=Math.abs(candidates[i].x-dogX);if(d<best){best=d;target=candidates[i];}}
  return Math.abs(target.x-dogX)>.012?(target.x<dogX?-1:1):aimDir;
}
function drawSelectedHero(size,movingFrame,firing,facing=aimDir){
  if(selectedHero==='mouse'){drawPlayerMouse(size);return;}
  if(selectedHero==='cat'){drawPlayerCat(size);return;}
  const personalityFrame=dogPersonalityFrame();ctx.save();ctx.scale(firing&&level<5?dogFireSide:facing,1);if(personalityFrame>=0)drawPersonalityDog(selectedDog,personalityFrame,0,0,size*1.08);else drawNaturalDog(selectedDog,movingFrame,0,0,size*1.08);ctx.restore();
}
function drawNaturalDog(col,frame,x,y,size){
  const img=naturalDogImgs[Math.max(0,Math.min(3,col))];
  if(!img||!img.complete||!img.naturalWidth)return;
  drawAtlasN(img,Math.max(0,Math.min(4,frame)),5,x,y,size,size);
}
function dogPersonalityFrame(){
  if(selectedHero!=='dog'||dogIdleTime<2.2||dogMoving||jumpY<0||playerCrouching()||playBallTimer>0||dogFireTimer>0)return -1;
  const phase=(dogIdleTime-2.2)%5.2;if(phase>1.2)return -1;return Math.min(3,Math.floor(phase/.3));
}
function drawPersonalityDog(col,frame,x,y,size){
  const img=dogPersonalityImgs[Math.max(0,Math.min(3,col))];if(!img||!img.complete||!img.naturalWidth){drawNaturalDog(col,0,x,y,size);return;}
  drawAtlasN(img,Math.max(0,Math.min(3,frame)),4,x,y-size*.055,size*1.05,size*1.4);
}
function drawNaturalDogHead(col,x,y,size){if(!naturalDogsImg.complete||!naturalDogsImg.naturalWidth)return;const sw=naturalDogsImg.naturalWidth/4,sh=naturalDogsImg.naturalHeight/4;ctx.drawImage(naturalDogsImg,col*sw,0,sw,sh*.62,x-size*.5,y-size*.52,size,size*.66);}
function drawNaturalCast(col,row,x,y,w,h){if(!naturalCastImg.complete||!naturalCastImg.naturalWidth)return;drawAtlasGrid(naturalCastImg,col,row,3,3,x,y,w,h);}
function drawNaturalCastHead(col,x,y,size){if(!naturalCastImg.complete||!naturalCastImg.naturalWidth)return;const sw=naturalCastImg.naturalWidth/3,sh=naturalCastImg.naturalHeight/3;ctx.drawImage(naturalCastImg,col*sw,0,sw,sh*.62,x-size*.5,y-size*.5,size,size*.65);}
function drawPlayerMouse(size,colorLevel=0){
  if(!playerMouseImg.complete||!playerMouseImg.naturalWidth)return;
  const height=size*1.34,width=height*(playerMouseImg.naturalWidth/playerMouseImg.naturalHeight);
  ctx.save();if(colorLevel){ctx.shadowColor=['#ff765d','#ffcf4d','#64e890','#74c9ff','#c58aff'][(colorLevel-1)%5];ctx.shadowBlur=14;}ctx.drawImage(playerMouseImg,-width/2,-height/2,width,height);ctx.shadowBlur=0;if(colorLevel)paintBalloonTint(width,height,colorLevel);const facing=mission===3?heroFacingDir:aimDir,motion=Math.sin(performance.now()/105)*size*.018;ctx.save();ctx.translate(facing*size*.025,height*.13+motion);ctx.scale(facing,1);ctx.rotate(facing*Math.max(-.1,Math.min(.1,heroFlightVY*.2)));drawNaturalCast(1,1,0,0,size*.34,size*.37);ctx.restore();ctx.restore();
}
function paintBalloonTint(width,height,colorLevel){if(colorLevel<=1)return;const colors=['#ff704d','#e7a936','#38ae91','#438bd3','#8057b8'];ctx.save();ctx.globalCompositeOperation='source-atop';ctx.globalAlpha=.2;ctx.fillStyle=colors[(colorLevel-1)%colors.length];ctx.beginPath();ctx.ellipse(0,-height*.235,width*.455,height*.285,0,0,Math.PI*2);ctx.fill();ctx.restore();}
function drawPirateBalloon(x,y,size,colorLevel=1){if(!playerMouseImg.complete||!playerMouseImg.naturalWidth)return;const height=size*1.34,width=height*(playerMouseImg.naturalWidth/playerMouseImg.naturalHeight),sway=Math.sin(performance.now()/330)*.025,look=dogX*canvas.w<x?-1:1;ctx.save();ctx.translate(x,y);ctx.rotate(sway);ctx.shadowColor='rgba(12,35,72,.28)';ctx.shadowBlur=14;ctx.drawImage(playerMouseImg,-width/2,-height/2,width,height);ctx.shadowBlur=0;paintBalloonTint(width,height,colorLevel);ctx.save();ctx.translate(0,height*.14+Math.sin(performance.now()/120)*size*.012);ctx.scale(look,1);drawNaturalCast(1,1,0,0,size*.32,size*.35);ctx.restore();ctx.restore();}
function drawPlayerCat(size){
  const frame=Math.floor(performance.now()/135)%3;
  const facing=mission===3?heroFacingDir:aimDir,motion=Math.sin(performance.now()/115)*size*.016;ctx.save();ctx.filter='hue-rotate(185deg) saturate(1.3) brightness(1.08)';drawAtlasN(helicopterImg,frame,3,0,0,size*1.28,size*.82);ctx.filter='none';ctx.save();ctx.translate(-size*.08+facing*size*.025,-size*.02+motion);ctx.scale(facing,1);ctx.rotate(facing*Math.max(-.11,Math.min(.11,heroFlightVY*.22)));drawNaturalCast(2,1,0,0,size*.38,size*.43);ctx.restore();ctx.restore();
}
function drawDog(w,h) {
  const crouching=playerCrouching(),playing=playBallTimer>0,firing=dogFireTimer>0,kicking=dogKickTimer>0,firePulse=firing?Math.sin((.28-dogFireTimer)/.28*Math.PI):0,kickPulse=kicking?Math.sin((.34-dogKickTimer)/.34*Math.PI):0,facing=dogAttentionDirection(),movingFrame=crouching||playing?4:jumpY<0?3:dogMoving?1+(Math.floor(performance.now()/105)%2):kicking||firing?1:0;
  const bob=playing||crouching?0:dogMoving?Math.sin(performance.now()/(selectedDog===1?42:selectedDog===2?58:70))*(selectedDog===1?7:selectedDog===2?6:5):Math.sin(performance.now()/(selectedDog===3?170:260))*(selectedDog===3?3:2);
  const size=dogRenderSize(w,h)*(dogSizeMode==='puppy'?.66:dogSizeMode==='giant'?1.42:1);
  const ground=dogGroundY();
  ctx.save(); ctx.translate(dogX*w,ground*h); ctx.fillStyle=`rgba(16,38,75,${.2+Math.min(.13,-jumpY*.6)})`; ctx.beginPath();ctx.ellipse(0,size*.39,size*(.31+jumpY*.45),size*.075,0,0,Math.PI*2);ctx.fill();ctx.restore();
  drawDogRunDust(w,h,size,facing,crouching||playing);
  const playWave=playing?Math.sin(performance.now()/105):0;
  ctx.save(); ctx.translate(dogX*w,(ground+jumpY)*h+bob);if(selectedHero==='mouse'){const lateral=(keys.arrowright||keys.d?1:0)-(keys.arrowleft||keys.a?1:0),verticalTilt=Math.max(-.11,Math.min(.11,jumpVelocity*.22));ctx.translate(lateral*size*.025,Math.sin(performance.now()/170)*size*.015);ctx.rotate(lateral*.13+verticalTilt);}else if(selectedHero!=='dog'&&jumpY<0)ctx.rotate(Math.max(-.16,Math.min(.16,jumpVelocity*.32)));if(crouching){ctx.translate(0,size*.11);ctx.rotate(Math.sin(performance.now()/115)*.012);}else if(playing){ctx.translate(0,size*(.1+playWave*.012));ctx.rotate(playWave*.022);}else if(kicking){ctx.translate(-dogKickSide*size*.055*kickPulse,-size*.018*kickPulse);ctx.rotate(dogKickSide*.13*kickPulse);}else if(firing){ctx.translate(dogFireSide===0?0:-dogFireSide*size*.075*firePulse,dogFireSide===0?size*.055*firePulse:0);ctx.rotate(dogFireSide*.075*firePulse);}
  if(dogInvuln>0&&Math.floor(performance.now()/85)%2===0)ctx.globalAlpha=.18;
  if(powerTimer>0) drawPowerAura(size,powerTimer);
  if(blackAmmo>0&&level<5&&!playing){ctx.strokeStyle='#d3baff';ctx.fillStyle='#24153f';ctx.lineWidth=4;ctx.beginPath();ctx.moveTo(aimDir*size*.35,-size*.25);ctx.lineTo(aimDir*size*.62,-size*.25);ctx.stroke();ctx.beginPath();ctx.moveTo(aimDir*size*.7,-size*.25);ctx.lineTo(aimDir*size*.56,-size*.35);ctx.lineTo(aimDir*size*.56,-size*.15);ctx.closePath();ctx.fill();}
  if(playing){const wag=Math.sin(performance.now()/55);ctx.strokeStyle='rgba(255,255,255,.88)';ctx.lineWidth=Math.max(3,size*.022);ctx.lineCap='round';for(let i=0;i<2;i++){ctx.beginPath();ctx.arc(-size*(.38+i*.08),size*(.01+wag*.045),size*(.13+i*.035),Math.PI*.78,Math.PI*1.22);ctx.stroke();}}
  if (tailDragTimer>0) {
    ctx.strokeStyle=stunTimer>0?'#59dfff':'#a95cff'; ctx.lineWidth=6; ctx.lineCap='round';
    ctx.beginPath(); ctx.moveTo(-size*.25,size*.08); ctx.quadraticCurveTo(-size*.58,-size*.04,-size*.45,size*.25); ctx.stroke();
    ctx.fillStyle=stunTimer>0?'#dffaff':'#eacfff'; for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(-size*(.35+i*.09),size*(.18-i*.06),3+i,0,Math.PI*2);ctx.fill();}
  }
  if (stunTimer>0) ctx.rotate(Math.sin(performance.now()/80)*.075); else if (slowTimer>0) ctx.rotate(-.065);
  if(selectedHero==='dog'&&selectedDog===3){const wag=Math.sin(performance.now()/48);ctx.save();ctx.strokeStyle='#fff5b8';ctx.globalAlpha=.82;ctx.lineWidth=Math.max(3,size*.02);ctx.lineCap='round';for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(-size*(.34+i*.055),size*(.02+wag*.06),size*(.12+i*.025),Math.PI*.78,Math.PI*1.2);ctx.stroke();}ctx.restore();}
  if(selectedHero==='dog'&&selectedDog===1&&dogMoving){ctx.save();ctx.strokeStyle='rgba(255,244,172,.82)';ctx.lineWidth=Math.max(3,size*.018);ctx.lineCap='round';for(let i=0;i<3;i++){const y=-size*.14+i*size*.16;ctx.beginPath();ctx.moveTo(-aimDir*size*(.42+i*.05),y);ctx.lineTo(-aimDir*size*(.7+i*.08),y);ctx.stroke();}ctx.restore();}
  if(selectedHero==='dog'&&selectedDog===1&&jumpY<-.05){ctx.save();ctx.fillStyle='#fff27a';ctx.globalAlpha=.8;for(let i=0;i<4;i++){const a=performance.now()/240+i*1.57;ctx.beginPath();ctx.arc(Math.cos(a)*size*.48,Math.sin(a)*size*.27,3+i%2,0,Math.PI*2);ctx.fill();}ctx.restore();}
  drawSelectedHero(size,movingFrame,firing,facing);if(kicking){ctx.save();ctx.translate(dogKickSide*size*.43,size*.22);ctx.globalAlpha=.4+.5*kickPulse;ctx.fillStyle='#fff2a8';ctx.font=`900 ${Math.max(18,size*.19)}px Nunito`;ctx.textAlign='center';ctx.fillText('💥',0,0);ctx.restore();}if(firing){const fx=dogFireSide===0?0:dogFireSide*size*.48,fy=dogFireSide===0?-size*.48:-size*.12;ctx.save();ctx.translate(fx,fy);ctx.globalAlpha=.55+.45*firePulse;ctx.strokeStyle='#fff2a8';ctx.lineWidth=4;for(let i=0;i<4;i++){ctx.rotate(Math.PI/2);ctx.beginPath();ctx.moveTo(8,0);ctx.lineTo(20+firePulse*8,0);ctx.stroke();}ctx.restore();}if(playing){ctx.save();ctx.translate(facing*playWave*size*.12,size*(.3-Math.abs(playWave)*.025));ctx.rotate(performance.now()/210);ctx.scale(.48,.48);drawDogToy('toyBall');ctx.restore();}if(netTimer>0)drawNetOverlay(size);ctx.restore();
  if(powerTimer>0) drawStatusBubble(`SUPERPODER ${Math.ceil(powerTimer)}s`,dogX*w,(ground-.17+jumpY)*h,'#ffbd25');
  else if(playing)drawStatusBubble(`¡GUAU! JUGANDO ${Math.ceil(playBallTimer)}s`,dogX*w,(ground-.16)*h,'#ff8b38');
  else if(netTimer>0)drawStatusBubble(`ATRAPADO ${Math.ceil(netTimer)}s`,dogX*w,(ground-.17+jumpY)*h,'#8a6d4f');
  else if(crouching)drawStatusBubble('AGACHADO · EL PÁJARO PASA',dogX*w,(ground-.12)*h,'#2d73d2');
  else if (slowTimer>0 || stunTimer>0) drawStatusBubble(stunTimer>0?`CONGELADO ${Math.ceil(stunTimer)}s`:`LENTO ${Math.ceil(slowTimer)}s`,dogX*w,(ground-.15+jumpY)*h,stunTimer>0?'#3edcff':'#a95cff');
}
function drawDogRunDust(w,h,size,facing,suppressed){
  if(!dogMoving||suppressed||jumpY<-.025||netTimer>0||stunTimer>0)return;
  const t=performance.now()/1000,intensity=selectedDog===2?1.35:selectedDog===0?1.08:1,count=Math.round(6*intensity),ground=dogGroundY()*h+size*.34;
  ctx.save();ctx.translate(dogX*w-facing*size*.25,ground);ctx.globalCompositeOperation='source-over';
  for(let i=0;i<count;i++){
    const phase=(t*(2.1+intensity*.65)+i/count)%1,trail=phase*size*(.62+intensity*.12),lift=Math.sin(phase*Math.PI)*size*(.07+i%2*.025),r=size*(.025+phase*.055)*(i%3===0?1.35:1);
    ctx.globalAlpha=(1-phase)*(.22+intensity*.075);ctx.fillStyle=i%2?'#d7b27a':'#efd3a0';ctx.beginPath();ctx.ellipse(-facing*trail,-lift,r*1.45,r,0,0,Math.PI*2);ctx.fill();
  }
  for(let i=0;i<4;i++){
    const phase=(t*(3.5+intensity)+i*.23)%1,x=-facing*phase*size*.78,y=-Math.sin(phase*Math.PI)*size*(.08+i*.018);
    ctx.globalAlpha=(1-phase)*.52;ctx.fillStyle=i%2?'#8f6538':'#b9854c';ctx.save();ctx.translate(x,y);ctx.rotate(t*5+i);ctx.fillRect(-size*.012,-size*.008,size*.024,size*.016);ctx.restore();
  }
  ctx.restore();
}
function dogRenderSize(w,h) {
  const mobile = w < 700 || matchMedia('(pointer:coarse)').matches;
  if(!mobile)return Math.min(185,w*.15,h*.28);
  return h>w ? Math.min(178,Math.max(142,w*.43),h*.25) : Math.min(140,Math.max(104,w*.19),h*.27);
}
function dogGroundY(){return (matchMedia('(pointer:coarse)').matches&&innerHeight>innerWidth)?.80:.84;}
function dogCatchRadius() {
  const w=canvas.w||innerWidth,h=canvas.h||innerHeight;
  const scale=dogSizeMode==='puppy'?.66:dogSizeMode==='giant'?1.42:1;
  return Math.min(.2,Math.max(.055,dogRenderSize(w,h)*scale/w*.34));
}
function drawSurpriseBox(){
  const t=performance.now()/300;ctx.save();ctx.rotate(Math.sin(t)*.06);ctx.shadowColor='#ffcf3f';ctx.shadowBlur=18;
  ctx.fillStyle='#ff5a48';ctx.strokeStyle='white';ctx.lineWidth=4;ctx.beginPath();ctx.roundRect(-30,-25,60,50,9);ctx.fill();ctx.stroke();
  ctx.fillStyle='#ffd84e';ctx.fillRect(-7,-25,14,50);ctx.fillRect(-30,-6,60,12);ctx.strokeStyle='#fff4b1';ctx.lineWidth=3;
  ctx.beginPath();ctx.ellipse(-10,-30,13,8,-.45,0,Math.PI*2);ctx.ellipse(10,-30,13,8,.45,0,Math.PI*2);ctx.stroke();
  ctx.shadowBlur=0;ctx.fillStyle='#10264b';ctx.font='900 22px Nunito';ctx.textAlign='center';ctx.fillText('?',0,9);ctx.restore();
}
function drawEnergyCapsule(size){
  const s=size/64;ctx.save();ctx.scale(s,s);ctx.shadowColor='#45e7ff';ctx.shadowBlur=20;const gradient=ctx.createLinearGradient(-22,-28,22,28);gradient.addColorStop(0,'#79f7ff');gradient.addColorStop(.55,'#24bde3');gradient.addColorStop(1,'#406cff');ctx.fillStyle=gradient;ctx.strokeStyle='white';ctx.lineWidth=4;ctx.beginPath();ctx.roundRect(-22,-28,44,56,13);ctx.fill();ctx.stroke();ctx.fillStyle='#fff36b';ctx.beginPath();ctx.moveTo(4,-19);ctx.lineTo(-10,4);ctx.lineTo(0,4);ctx.lineTo(-5,20);ctx.lineTo(13,-4);ctx.lineTo(3,-4);ctx.closePath();ctx.fill();ctx.shadowBlur=0;ctx.restore();
}
function drawCatSteal(w,h){
  const p=1-catStealTimer/2.6,x=(1.15-p*1.35)*w,y=(.34+Math.sin(p*Math.PI*4)*.035)*h,dw=Math.min(230,w*.2),dh=Math.min(150,w*.13);
  ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(p*18)*.035);drawAtlasN(helicopterImg,Math.floor(performance.now()/140)%3,3,0,0,dw,dh);ctx.restore();
  for(let i=0;i<4;i++){ctx.save();ctx.translate(x+dw*(.25+i*.1),y+dh*(.2+i*.04));ctx.rotate(p*8+i);drawAtlasN(objectsImg,0,4,0,0,34,34);ctx.restore();}
  drawStatusBubble(`¡ME LLEVO ${catStealAmount}!`,x,y-dh*.62,'#ff5a48');
}
function drawNet(size){
  ctx.strokeStyle='#eee1c8';ctx.lineWidth=4;ctx.shadowColor='#6f5744';ctx.shadowBlur=7;ctx.beginPath();ctx.arc(0,0,size*.42,0,Math.PI*2);ctx.stroke();
  ctx.lineWidth=2.5;for(let i=-2;i<=2;i++){ctx.beginPath();ctx.moveTo(i*size*.13,-size*.38);ctx.lineTo(i*size*.13,size*.38);ctx.stroke();ctx.beginPath();ctx.moveTo(-size*.38,i*size*.13);ctx.lineTo(size*.38,i*size*.13);ctx.stroke();}ctx.shadowBlur=0;
}
function drawNetOverlay(size){ctx.save();ctx.rotate(Math.sin(performance.now()/100)*.025);ctx.strokeStyle='rgba(238,225,200,.92)';ctx.lineWidth=4;for(let i=-3;i<=3;i++){ctx.beginPath();ctx.moveTo(i*size*.13,-size*.48);ctx.lineTo(i*size*.13,size*.48);ctx.stroke();ctx.beginPath();ctx.moveTo(-size*.48,i*size*.13);ctx.lineTo(size*.48,i*size*.13);ctx.stroke();}ctx.strokeStyle='#806448';ctx.strokeRect(-size*.5,-size*.5,size,size);ctx.restore();}
function drawSupportCat(w,h){
  const t=performance.now()/1000,x=(level===3?.82:.18)*w,y=(.57+Math.sin(t*2.4)*.012)*h,dw=Math.min(225,w*.19),dh=Math.min(145,w*.12);
  ctx.save();ctx.globalAlpha=.9;ctx.translate(x,y);ctx.rotate(Math.sin(t*1.7)*.025);drawAtlasN(helicopterImg,Math.floor(t*7)%3,3,0,0,dw,dh);ctx.restore();
  const messages=['¡VAMOS, RATÓN!','¡ATRAPÁ AL PERRITO!','¡LOS HUESOS SERÁN NUESTROS!','¡USÁ LAS REDES!','¡HELICÓPTERO LISTO!'];
  const cycle=(t/2.35)%messages.length,index=Math.floor(cycle),local=cycle-index,alpha=Math.min(1,local*5,(1-local)*5),text=messages[index];
  ctx.save();ctx.globalAlpha=alpha;const bx=x,by=y-dh*.68,scale=.9+Math.sin(local*Math.PI)*.08;ctx.translate(bx,by);ctx.scale(scale,scale);ctx.font='900 13px Nunito';const bw=ctx.measureText(text).width+24;ctx.fillStyle='rgba(255,255,255,.94)';ctx.strokeStyle='#ff5a48';ctx.lineWidth=3;ctx.beginPath();ctx.roundRect(-bw/2,-17,bw,34,13);ctx.fill();ctx.stroke();ctx.fillStyle='#10264b';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,0,1);ctx.restore();
}
function drawCatBallThrower(w,h){
  const progress=1-catBallThrowTimer/1.8,arrival=Math.sin(Math.min(1,progress)*Math.PI),dw=Math.min(205,w*.18),dh=dw*.64,fromLeft=catBallThrowSide===1;
  const x=fromLeft?-dw*.42+arrival*dw*.9:w+dw*.42-arrival*dw*.9,y=h*(.5+Math.sin(performance.now()/150)*.012);
  ctx.save();ctx.translate(x,y);ctx.scale(fromLeft?1:-1,1);ctx.rotate((fromLeft?1:-1)*Math.sin(progress*Math.PI)*.06);drawAtlasN(helicopterImg,Math.floor(performance.now()/125)%3,3,0,0,dw,dh);ctx.restore();
  if(progress<.62)drawStatusBubble('¡ATRAPÁ ESTA PELOTA!',x,y-dh*.64,'#ff6650');
}
function drawBlackBone(thrown){
  const scale=thrown?.82:1;ctx.scale(scale,scale);ctx.shadowColor='#8e5cff';ctx.shadowBlur=thrown?12:22;ctx.fillStyle='#18121f';ctx.strokeStyle='#b991ff';ctx.lineWidth=4;
  ctx.beginPath();ctx.roundRect(-26,-8,52,16,7);ctx.fill();ctx.stroke();[[-26,-10],[-26,10],[26,-10],[26,10]].forEach(([x,y])=>{ctx.beginPath();ctx.arc(x,y,9,0,Math.PI*2);ctx.fill();ctx.stroke();});
  ctx.fillStyle='#d8c4ff';ctx.font='900 13px Nunito';ctx.textAlign='center';ctx.fillText('✦',0,5);ctx.shadowBlur=0;
}
function drawGoldenBone() {
  ctx.shadowColor='#ffd128';ctx.shadowBlur=25;ctx.fillStyle='#ffc52f';ctx.strokeStyle='#fff2a6';ctx.lineWidth=4;
  ctx.beginPath();ctx.roundRect(-27,-9,54,18,8);ctx.fill();ctx.stroke();
  [[-27,-11],[-27,11],[27,-11],[27,11]].forEach(([x,y])=>{ctx.beginPath();ctx.arc(x,y,10,0,Math.PI*2);ctx.fill();ctx.stroke();});
  ctx.fillStyle='white';ctx.font='900 15px Nunito';ctx.textAlign='center';ctx.fillText('★',0,6);ctx.shadowBlur=0;
}
function drawPowerAura(size,remaining) {
  const alpha=Math.min(1,remaining/2),t=performance.now()/500;ctx.save();ctx.globalAlpha=alpha;
  const glow=ctx.createRadialGradient(0,0,size*.25,0,0,size*.7);glow.addColorStop(0,'rgba(255,238,95,.08)');glow.addColorStop(.7,'rgba(255,204,34,.25)');glow.addColorStop(1,'rgba(255,184,24,0)');ctx.fillStyle=glow;ctx.beginPath();ctx.arc(0,0,size*.75,0,Math.PI*2);ctx.fill();
  ctx.strokeStyle='#ffe86b';ctx.lineWidth=5;ctx.setLineDash([10,9]);ctx.lineDashOffset=-t*10;ctx.beginPath();ctx.ellipse(0,0,size*.56,size*.63,0,0,Math.PI*2);ctx.stroke();ctx.setLineDash([]);
  for(let i=0;i<7;i++){const a=t+i*Math.PI*2/7,r=size*(.53+.05*Math.sin(t+i));ctx.fillStyle=i%2?'#fff7ad':'#ffb629';ctx.beginPath();ctx.arc(Math.cos(a)*r,Math.sin(a)*r,3+(i%3),0,Math.PI*2);ctx.fill();}
  ctx.restore();
}
function drawDogToy(type) {
  ctx.shadowColor='rgba(16,38,75,.3)'; ctx.shadowBlur=9; ctx.lineWidth=4; ctx.strokeStyle='white';
  if(type==='toyBall') { ctx.fillStyle='#ff784d';ctx.beginPath();ctx.arc(0,0,25,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.strokeStyle='#ffd64d';ctx.beginPath();ctx.arc(0,0,14,-1.2,1.2);ctx.stroke(); }
  else if(type==='toyFrisbee') { ctx.fillStyle='#5fe08d';ctx.beginPath();ctx.ellipse(0,0,31,13,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.strokeStyle='#167a50';ctx.beginPath();ctx.ellipse(0,0,17,6,0,0,Math.PI*2);ctx.stroke(); }
  else { ctx.strokeStyle='#ffb33f';ctx.lineWidth=9;ctx.beginPath();ctx.moveTo(-25,-8);ctx.bezierCurveTo(-8,-25,8,25,25,8);ctx.stroke();ctx.fillStyle='#ff5a48';[-27,27].forEach(x=>{ctx.beginPath();ctx.arc(x,x<0?-9:9,10,0,Math.PI*2);ctx.fill();ctx.stroke();}); }
  ctx.shadowBlur=0;
}
function drawCatBall(ball){
  const size=ball.size||1,style=CAT_BALL_STYLES[ball.style||0];ctx.save();ctx.scale(size,size);ctx.shadowColor=style.glow;ctx.shadowBlur=14;ctx.fillStyle=style.main;ctx.strokeStyle='rgba(255,255,255,.96)';ctx.lineWidth=4;
  ctx.beginPath();ctx.arc(0,0,25,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.shadowBlur=0;ctx.strokeStyle=style.stripe;ctx.lineWidth=6;ctx.beginPath();ctx.arc(0,0,15,-1.22,1.22);ctx.stroke();ctx.beginPath();ctx.arc(0,0,15,Math.PI-1.22,Math.PI+1.22);ctx.stroke();
  ctx.fillStyle='rgba(255,255,255,.75)';ctx.beginPath();ctx.ellipse(-8,-10,6,3,-.65,0,Math.PI*2);ctx.fill();ctx.restore();
}
function drawHitPips(hp,y){ctx.save();ctx.fillStyle='rgba(255,255,255,.96)';ctx.strokeStyle='#10264b';ctx.lineWidth=2;for(let i=0;i<hp;i++){ctx.beginPath();ctx.arc((i-(hp-1)/2)*13,y,4,0,Math.PI*2);ctx.fill();ctx.stroke();}ctx.restore();}
function drawCarnivorousPlant(plant,w,h){
  const base=Math.min(112,Math.max(76,w*.085))*(plant.scale||1),pulse=1+Math.sin(plant.phase)*.045,bite=plant.biteCooldown>1?1.13:1,x=plant.x*w,y=plant.y*h;ctx.save();ctx.translate(x,y);ctx.fillStyle='rgba(20,70,35,.28)';ctx.beginPath();ctx.ellipse(0,4,base*.35,base*.09,0,0,Math.PI*2);ctx.fill();ctx.scale(pulse,bite);ctx.rotate(Math.sin(plant.phase*.7)*.045);ctx.shadowColor=plant.biteCooldown>0?'#ff745d':'rgba(69,220,91,.75)';ctx.shadowBlur=plant.biteCooldown>0?22:14;if(carnivorousPlantImg.complete&&carnivorousPlantImg.naturalWidth){const ratio=carnivorousPlantImg.naturalWidth/carnivorousPlantImg.naturalHeight;ctx.drawImage(carnivorousPlantImg,-base*ratio/2,-base,base*ratio,base);}ctx.restore();
}
function drawFede(w,h){
  const fade=Math.min(1,fedeVisibleTimer*2),mobile=w<700,elapsed=5.8-fedeVisibleTimer,entry=Math.min(1,Math.max(0,elapsed/.75)),edge=fedeSide<0?(mobile?.18:.09):(mobile?.82:.91),outside=fedeSide<0?-.08:1.08,x=(outside+(edge-outside)*(1-Math.pow(1-entry,3)))*w,y=.905*h,height=Math.min(mobile?158:196,w*(mobile?.29:.14)),width=height*.82,gesture=entry<.82?1:2,breath=1+Math.sin(performance.now()/310)*.012;ctx.save();ctx.globalAlpha=fade;ctx.translate(x,y);ctx.fillStyle='rgba(15,38,74,.25)';ctx.beginPath();ctx.ellipse(0,2,width*.28,height*.045,0,0,Math.PI*2);ctx.fill();ctx.scale((fedeSide<0?1:-1)*breath,breath);ctx.shadowColor='rgba(15,38,74,.32)';ctx.shadowBlur=15;drawNaturalCast(0,gesture,0,-height*.5,width,height);ctx.restore();
  drawStatusBubble(fedeDialogue,x,y-height-8,'#2d73d2');
}
function drawTrampoline(t,w,h){
  const x=t.x*w,y=t.y*h,bounce=t.landed?Math.abs(Math.sin(performance.now()/150))*4:0,scale=Math.min(1.2,Math.max(.72,w/900)),spin=t.landed?performance.now()/(t.kind==='boostBall'?420:140):t.rot;ctx.save();ctx.translate(x,y-bounce);ctx.rotate(spin);ctx.scale(scale,scale);ctx.shadowColor='#42cfff';ctx.shadowBlur=17;ctx.strokeStyle='#173d75';ctx.lineWidth=4;if(t.kind==='boostBall'){ctx.fillStyle='#ff6255';ctx.beginPath();ctx.arc(0,-22,28,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.strokeStyle='#ffd84e';ctx.lineWidth=7;ctx.beginPath();ctx.arc(0,-22,17,-1.2,1.2);ctx.stroke();ctx.beginPath();ctx.arc(0,-22,17,Math.PI-1.2,Math.PI+1.2);ctx.stroke();ctx.fillStyle='white';ctx.font='900 15px Nunito';ctx.textAlign='center';ctx.fillText('★',0,-17);}else{ctx.fillStyle='#ff5b4a';ctx.beginPath();ctx.ellipse(0,-13,46,15,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#35cfe6';ctx.beginPath();ctx.ellipse(0,-15,33,9,0,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.strokeStyle='#173d75';ctx.lineWidth=5;[-28,28].forEach(px=>{ctx.beginPath();ctx.moveTo(px,-3);ctx.lineTo(px*.82,22);ctx.stroke();});}ctx.restore();ctx.save();ctx.translate(x,y+2);ctx.fillStyle='rgba(57,211,238,.24)';ctx.beginPath();ctx.ellipse(0,0,50,9,0,0,Math.PI*2);ctx.fill();ctx.restore();
}
function drawBird(bird,w,h){
  const crow=bird.kind==='crow',frame=crow?3+(Math.floor(bird.phase/1.35)%2):Math.floor(bird.phase/1.12)%3,size=Math.min(crow?92:78,w*(crow?.073:.064))*(bird.size||1);
  ctx.save();ctx.translate(bird.x*w,bird.y*h);ctx.scale(bird.dir,crow?1+Math.sin(bird.phase)*.08:1);ctx.rotate(Math.sin(bird.phase*.34)*.035);ctx.shadowColor='rgba(10,27,52,.28)';ctx.shadowBlur=9;if(crow&&mission1CrowImg.complete&&mission1CrowImg.naturalWidth)ctx.drawImage(mission1CrowImg,-size*.62,-size*.62,size*1.24,size*1.24);else drawWildlife(frame,0,0,size);ctx.restore();
}
function drawFlea(x,y,phase,dir,w){
  const size=Math.min(34,w*.034),leg=Math.sin(phase*2)*size*.12;ctx.save();ctx.translate(x,y);ctx.scale(dir,1);ctx.strokeStyle='#294321';ctx.lineWidth=Math.max(2,size*.07);ctx.lineCap='round';for(let i=0;i<3;i++){const yy=(-.12+i*.19)*size;ctx.beginPath();ctx.moveTo(-size*.1,yy);ctx.lineTo(-size*(.4+i*.05),yy+leg);ctx.lineTo(-size*.58,yy-size*.18);ctx.stroke();ctx.beginPath();ctx.moveTo(size*.1,yy);ctx.lineTo(size*(.4+i*.05),yy-leg);ctx.lineTo(size*.58,yy-size*.18);ctx.stroke();}ctx.fillStyle='#6fa83e';ctx.beginPath();ctx.ellipse(0,0,size*.3,size*.43,-.18,0,Math.PI*2);ctx.fill();ctx.stroke();ctx.fillStyle='#26391d';ctx.beginPath();ctx.arc(size*.23,-size*.18,size*.16,0,Math.PI*2);ctx.fill();ctx.fillStyle='#f6ffca';ctx.beginPath();ctx.arc(size*.28,-size*.22,size*.04,0,Math.PI*2);ctx.fill();ctx.restore();
}
function drawTick(x,y,phase,dir,w) {
  const size=Math.min(42,w*.04); ctx.save(); ctx.translate(x,y); ctx.scale(dir,1);
  ctx.strokeStyle='#43231f'; ctx.lineWidth=Math.max(2,size*.07); ctx.lineCap='round';
  for(let i=0;i<4;i++){
    const yy=(-.3+i*.2)*size, step=Math.sin(phase+i)*size*.13;
    ctx.beginPath();ctx.moveTo(-size*.12,yy);ctx.lineTo(-size*.48,yy-step);ctx.lineTo(-size*.62,yy+step);ctx.stroke();
    ctx.beginPath();ctx.moveTo(size*.12,yy);ctx.lineTo(size*.48,yy+step);ctx.lineTo(size*.62,yy-step);ctx.stroke();
  }
  ctx.fillStyle='#7d352b';ctx.beginPath();ctx.ellipse(0,0,size*.35,size*.43,0,0,Math.PI*2);ctx.fill();ctx.stroke();
  ctx.fillStyle='#c44d3d';ctx.beginPath();ctx.ellipse(-size*.03,size*.08,size*.21,size*.27,0,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='#2b1d22';ctx.beginPath();ctx.arc(size*.28,-size*.08,size*.18,0,Math.PI*2);ctx.fill();
  ctx.fillStyle='white';ctx.beginPath();ctx.arc(size*.33,-size*.12,size*.045,0,Math.PI*2);ctx.fill();
  ctx.restore();
}
function drawTrapBone(type) {
  const color=type==='stun'?'#32c9ff':'#9b55ef', glow=type==='stun'?'#dffaff':'#f0dcff';
  ctx.shadowColor=color; ctx.shadowBlur=15; ctx.fillStyle=color; ctx.strokeStyle=glow; ctx.lineWidth=3;
  ctx.beginPath(); ctx.roundRect(-24,-9,48,18,8); ctx.fill(); ctx.stroke();
  [[-24,-10],[-24,10],[24,-10],[24,10]].forEach(([x,y])=>{ctx.beginPath();ctx.arc(x,y,9,0,Math.PI*2);ctx.fill();ctx.stroke();});
  ctx.shadowBlur=0; ctx.fillStyle='white'; ctx.font='900 12px Nunito'; ctx.textAlign='center'; ctx.fillText(type==='stun'?'❄':'!',0,5);
}
function drawRatDefeat(w,h) {
  const p=Math.min(1,ratDefeat/2.25), eased=1-Math.pow(1-p,3), targetX=Math.min(ratCrashX,.38);
  const x=(ratCrashX+(targetX-ratCrashX)*eased)*w, y=(ratCrashY+(.79-ratCrashY)*eased)*h;
  if (p<1) {
    ctx.save();ctx.translate(x,y);ctx.rotate(Math.sin(p*18)*.22);drawPirateBalloon(0,0,Math.min(165,w*.14)*(1-p*.18),level);ctx.restore();
    ctx.fillStyle='#ff6650'; for(let i=0;i<3;i++){ctx.beginPath();ctx.moveTo(x+(i-1)*25,y-70-p*50);ctx.lineTo(x+(i-1)*25+10,y-58-p*50);ctx.lineTo(x+(i-1)*25-8,y-54-p*50);ctx.fill();}
  } else {
    drawMouseSafe(x,y,Math.min(150,w*.13)); drawStatusBubble('¡ESTOY BIEN!',x,y-Math.min(105,h*.15),'#34bce8');
  }
}
function drawMouseSafe(x,y,size) {
  if (!pirateImg.complete || !pirateImg.naturalWidth) return;
  const sw=pirateImg.naturalWidth/2, sh=pirateImg.naturalHeight, sy=sh*.23, cropH=sh*.77;
  ctx.drawImage(pirateImg,0,sy,sw,cropH,x-size/2,y-size*.42,size,size*.77);
}
function drawCatDefeat(w,h) {
  const p=Math.min(1,catDefeat/2.55), eased=1-Math.pow(1-p,3), targetX=Math.max(catCrashX,.64);
  const x=(catCrashX+(targetX-catCrashX)*eased)*w, y=(.31+(.77-.31)*eased)*h, dw=Math.min(235,w*.19), dh=Math.min(150,w*.12);
  ctx.save(); ctx.translate(x,y); ctx.rotate(p<1?Math.sin(p*16)*.15:p*.08); drawAtlasN(helicopterImg,Math.min(2,Math.floor(performance.now()/170)%3),3,0,0,dw,dh); ctx.restore();
  if (p>.45&&p<1) {ctx.fillStyle='rgba(220,235,245,.55)';for(let i=0;i<3;i++){ctx.beginPath();ctx.arc(x+dw*.33+i*10,y-dh*.1-i*13,8+i*4,0,Math.PI*2);ctx.fill();}}
  if (p>=1) drawStatusBubble('¡ESTOY BIEN!',x,y-dh*.62,'#ff6650');
}
function drawStatusBubble(text,x,y,color) {
  ctx.save(); ctx.font='900 13px Nunito'; const width=Math.min((canvas.w||innerWidth)-18,ctx.measureText(text).width+22);x=Math.max(width/2+6,Math.min((canvas.w||innerWidth)-width/2-6,x));
  ctx.fillStyle='rgba(255,255,255,.95)'; ctx.strokeStyle=color; ctx.lineWidth=3; ctx.beginPath(); ctx.roundRect(x-width/2,y-15,width,30,12); ctx.fill(); ctx.stroke();
  ctx.fillStyle='#10264b'; ctx.textAlign='center'; ctx.textBaseline='middle'; ctx.fillText(text,x,y+1); ctx.restore();
}
function drawParticles(w,h) {
  impactParticles.forEach(p=>{ ctx.globalAlpha=Math.min(1,p.life*2); ctx.fillStyle=p.color; ctx.beginPath(); ctx.arc(p.x*w,p.y*h,3+p.life*5,0,Math.PI*2); ctx.fill(); }); ctx.globalAlpha=1;
  ctx.save();ctx.textAlign='center';ctx.font=`900 ${Math.max(18,Math.min(30,w*.025))}px "Baloo 2"`;floatingTexts.forEach(text=>{ctx.globalAlpha=Math.min(1,text.life*2);ctx.fillStyle=text.color;ctx.strokeStyle='rgba(16,38,75,.65)';ctx.lineWidth=5;ctx.strokeText(text.text,text.x*w,text.y*h);ctx.fillText(text.text,text.x*w,text.y*h);});ctx.restore();ctx.globalAlpha=1;
}
function drawWeather(w,h) {
  ctx.save();
  if (level===1) weather.forEach(p=>{ ctx.fillStyle=p.hue%2?'#fff1a1':'#ffffff'; ctx.globalAlpha=.45; ctx.beginPath(); ctx.arc(p.x*w,p.y*h,1.4+p.s,0,Math.PI*2); ctx.fill(); });
  else if (level===2) { const colors=['#f5a623','#e7593e','#ffd05a','#9f6b35']; weather.forEach(p=>{ ctx.fillStyle=colors[p.hue]; ctx.globalAlpha=.8; ctx.fillRect(p.x*w,p.y*h,8*p.s,4*p.s); }); }
  else if (level===3) { ctx.strokeStyle='rgba(210,240,255,.65)'; ctx.lineWidth=2; weather.forEach(p=>{ ctx.beginPath(); ctx.moveTo(p.x*w,p.y*h); ctx.lineTo(p.x*w-8,p.y*h+22*p.s); ctx.stroke(); }); }
  else if (level===4) weather.forEach(p=>{ ctx.fillStyle='rgba(255,255,255,.88)'; ctx.beginPath(); ctx.arc(p.x*w,p.y*h,2+p.s*2,0,Math.PI*2); ctx.fill(); });
  else { weather.forEach(p=>{ ctx.fillStyle=`rgba(255,240,150,${.35+p.s*.35})`; ctx.beginPath(); ctx.arc(p.x*w,p.y*h,.7+p.s,0,Math.PI*2); ctx.fill(); }); if (Math.random()<.004) { ctx.fillStyle='rgba(255,255,255,.24)'; ctx.fillRect(0,0,w,h); } }
  ctx.restore();
}
function drawAtlasN(img,index,count,x,y,dw,dh) {
  if (!img.complete || !img.naturalWidth) return; const sw=img.naturalWidth/count,sh=img.naturalHeight; ctx.drawImage(img,index*sw,0,sw,sh,x-dw/2,y-dh/2,dw,dh);
}
function drawAtlasGrid(img,col,row,cols,rows,x,y,dw,dh) {
  if (!img.complete || !img.naturalWidth) return; const sw=img.naturalWidth/cols,sh=img.naturalHeight/rows; ctx.drawImage(img,col*sw,row*sh,sw,sh,x-dw/2,y-dh/2,dw,dh);
}
function drawCover(img,x,y,w,h) {
  if (!img.complete || !img.naturalWidth) return; const s=Math.max(w/img.naturalWidth,h/img.naturalHeight),sw=w/s,sh=h/s,sx=(img.naturalWidth-sw)/2,sy=(img.naturalHeight-sh)/2; ctx.drawImage(img,sx,sy,sw,sh,x,y,w,h);
}

refreshMission2Shortcut();
syncVolumeControls();
updateMenuProgress();
const cinematicPreview=Number(new URLSearchParams(location.search).get('cinematic'));
if([1,2,3,4].includes(cinematicPreview)){closeStory();setTimeout(()=>playMissionCinematic(cinematicPreview,()=>cinematicPreview===1?startLevel(true):cinematicPreview===2||cinematicPreview===4?beginMission2(false):showHeroUnlock()),0);}
const birdDemo=new URLSearchParams(location.search).get('birdDemo');if(birdDemo){closeStory();setTimeout(()=>{mission=1;selectedHero='dog';selectedDog=0;level=1;score=0;lives=3;energy=3;startLevel(true);birds=[{x:.76,y:.68,baseY:.68,dir:-1,speed:.025,size:birdDemo==='crow'?1.18:1,phase:0,kind:birdDemo==='crow'?'crow':'bird'}];birdClock=99;},80);}
