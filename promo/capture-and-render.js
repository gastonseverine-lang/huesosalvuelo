const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const shotsDir = path.join(__dirname, 'shots');
fs.mkdirSync(shotsDir, { recursive: true });

const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.gif': 'image/gif', '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  const clean = decodeURIComponent(req.url.split('?')[0]);
  const requested = clean === '/' ? 'index.html' : clean.replace(/^\/+/, '');
  const full = path.resolve(root, requested);
  if (!full.startsWith(root)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.readFile(full, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': mime[path.extname(full).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(data);
  });
});

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  await new Promise(resolve => server.listen(4188, '127.0.0.1', resolve));
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--autoplay-policy=no-user-gesture-required']
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  page.on('console', msg => { if (msg.type() === 'error' && !msg.text().includes('Firebase')) console.error(msg.text()); });
  await page.goto('http://127.0.0.1:4188/', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => typeof window.requestAnimationFrame === 'function' && document.getElementById('storyNext'));
  await wait(1300);

  const shot = async (name, delay = 550) => {
    await wait(delay);
    await page.screenshot({ path: path.join(shotsDir, `${name}.png`) });
  };
  const gameEval = async code => page.evaluate(code => eval(code), code);

  await shot('01-cover', 800);
  await page.evaluate(() => {
    localStorage.setItem('huesosHeroesUnlockedV1', 'true');
    localStorage.setItem('huesosMission2UnlockedV1', 'true');
    localStorage.setItem('huesosAdventureProgressV2', JSON.stringify({ best: { 1: 18400, 2: 24750, 3: 320 }, stars: { 1: 3, 2: 3, 3: 2 } }));
  });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.click('#storyNext');
  await page.fill('#dogName', 'Rayo');
  await shot('02-select', 650);

  await gameEval("playMissionCinematic(1,()=>{}); renderCinematicScene(0); cancelAnimationFrame(cinematicRaf)");
  await shot('03-cinematic-park', 650);
  await gameEval("finishMissionCinematic(); selectedHero='dog'; selectedDog=2; mission=1; level=1; score=1450; levelScore=1450; startLevel(true); powerTimer=8; updateHUD()");
  await shot('04-park-action', 1250);
  await gameEval("level=5; score=18400; levelScore=4900; startLevel(true); ratHP=38; bossHP=8; blackAmmo=6; updateHUD()");
  await shot('05-park-boss', 1250);

  await gameEval("playMissionCinematic(2,()=>{}); renderCinematicScene(0); cancelAnimationFrame(cinematicRaf)");
  await shot('06-rescue-cinematic', 650);
  await gameEval("finishMissionCinematic(); mission=2; spaceLevel=1; score=3200; startMission2Level(); catAssistTimer=10; updateHUD()");
  await shot('07-flight-clouds', 1200);
  await gameEval("spaceLevel=3; score=8950; startMission2Level(); catAssistTimer=9; updateHUD()");
  await shot('08-flight-space', 1350);
  await gameEval("spaceLevel=5; score=19800; startMission2Level(); alienHP=18; catAssistTimer=9; updateHUD()");
  await shot('09-ufo-boss', 1350);

  await gameEval("selectedHero='cat'; mission=3; heroFlightLevel=1; heroFlightTotalCoins=84; startHeroFlightLevel(true); heroFlightImmunity=7; updateHUD()");
  await shot('10-cat-flight', 1100);
  await gameEval("selectedHero='mouse'; mission=3; heroFlightLevel=4; heroFlightTotalCoins=246; startHeroFlightLevel(true); heroFlightImmunity=6; updateHUD()");
  await shot('11-storm-flight', 1200);
  await gameEval("selectedHero='cat'; mission=3; heroFlightLevel=5; heroFlightTotalCoins=315; startHeroFlightLevel(true); dragonHP=5200; heroBananaTimer=12; updateHUD()");
  await shot('12-dragon-boss', 1200);

  await gameEval("mission=2; score=24750; lives=3; maxCombo=12; runCollected=68; currentStars=3; endMission2(true)");
  await shot('13-victory', 700);
  await page.evaluate(() => {
    document.getElementById('rankingModal').classList.remove('hidden');
    document.getElementById('rankingList').innerHTML = [
      ['Rayo','24.750'],['Luna','21.900'],['Michi','18.400'],['Rocky','15.850']
    ].map((r,i)=>`<li><div><b>${i+1}. ${r[0]}</b><small>Equipo completo · Misión ${i<2?2:1} · 🦴 ${68-i*9}</small></div><strong>${r[1]}</strong></li>`).join('');
  });
  await shot('14-ranking', 350);

  const renderPage = await browser.newPage({ viewport: { width: 1280, height: 720 }, deviceScaleFactor: 1 });
  await renderPage.goto('http://127.0.0.1:4188/promo/render.html', { waitUntil: 'networkidle' });
  const downloadPromise = renderPage.waitForEvent('download', { timeout: 90000 });
  await renderPage.click('#render');
  const download = await downloadPromise;
  const output = path.join(__dirname, 'Huesos-al-Vuelo-trailer-30s.webm');
  await download.saveAs(output);
  const size = fs.statSync(output).size;
  console.log(JSON.stringify({ output, size, shots: fs.readdirSync(shotsDir).length }));
  await browser.close();
  server.close();
})().catch(async error => {
  console.error(error);
  server.close();
  process.exitCode = 1;
});
