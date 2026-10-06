const path = require('path');
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--autoplay-policy=no-user-gesture-required', '--allow-file-access-from-files']
  });
  const page = await browser.newPage();
  const url = `file:///${path.resolve(__dirname, 'Huesos-al-Vuelo-trailer-30s.webm').replace(/\\/g, '/')}`;
  await page.goto(url, { waitUntil: 'load' });
  await page.waitForFunction(() => document.querySelector('video')?.readyState >= 1);
  const initial = await page.evaluate(() => {
    const v = document.querySelector('video');
    return { duration: v.duration, width: v.videoWidth, height: v.videoHeight, readyState: v.readyState };
  });
  await page.evaluate(() => document.querySelector('video').play());
  await page.waitForTimeout(1800);
  const playback = await page.evaluate(() => {
    const v = document.querySelector('video');
    return { currentTime: v.currentTime, paused: v.paused, audioDecodedBytes: v.webkitAudioDecodedByteCount || null, videoDecodedBytes: v.webkitVideoDecodedByteCount || null };
  });
  for (const second of [5, 15, 25, 29]) {
    await page.evaluate(second => new Promise(resolve => {
      const v = document.querySelector('video'); v.pause();
      v.addEventListener('seeked', resolve, { once: true }); v.currentTime = second;
    }), second);
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.resolve(__dirname, `video-preview-${second}.png`) });
  }
  console.log(JSON.stringify({ ...initial, ...playback }));
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
