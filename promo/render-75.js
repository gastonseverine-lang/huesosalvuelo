const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const root = path.resolve(__dirname, '..');
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.gif':'image/gif'};
const server = http.createServer((req,res)=>{
  const rel=decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '')||'index.html';
  const file=path.resolve(root,rel);
  if(!file.startsWith(root)){res.writeHead(403);res.end();return;}
  fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);res.end('Not found');return;}res.writeHead(200,{'Content-Type':mime[path.extname(file).toLowerCase()]||'application/octet-stream','Cache-Control':'no-store'});res.end(data)});
});

(async()=>{
  await new Promise(resolve=>server.listen(4189,'127.0.0.1',resolve));
  const browser=await chromium.launch({headless:true,executablePath:'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',args:['--autoplay-policy=no-user-gesture-required']});
  const page=await browser.newPage({viewport:{width:1280,height:720}});
  page.on('console',m=>{if(m.type()==='error'&&!m.text().includes('Firebase')&&!m.text().includes('ERR_NETWORK_ACCESS_DENIED'))console.error(m.text())});
  await page.goto('http://127.0.0.1:4189/promo/render-75.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>window.promoReady===true,{timeout:30000});
  const downloadPromise=page.waitForEvent('download',{timeout:150000});
  await page.click('#render');
  const download=await downloadPromise;
  const output=path.join(__dirname,'Huesos-al-Vuelo-promo-joven-v3.webm');
  await download.saveAs(output);
  console.log(JSON.stringify({output,size:fs.statSync(output).size}));
  await browser.close();server.close();
})().catch(error=>{console.error(error);server.close();process.exitCode=1});
