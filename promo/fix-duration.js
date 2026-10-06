const fs = require('fs');
const path = require('path');
const fixWebmDuration = require('fix-webm-duration');

(async () => {
  const file = path.resolve(__dirname, 'Huesos-al-Vuelo-trailer-30s.webm');
  const source = new Blob([fs.readFileSync(file)], { type: 'video/webm' });
  const fixed = await fixWebmDuration(source, 30250, { logger: false });
  fs.writeFileSync(file, Buffer.from(await fixed.arrayBuffer()));
  console.log(JSON.stringify({ file, size: fs.statSync(file).size }));
})().catch(error => { console.error(error); process.exitCode = 1; });
