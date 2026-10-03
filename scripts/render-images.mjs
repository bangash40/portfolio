// Renders the social preview and touch icon PNGs with a local headless Chrome or Edge:
//   node scripts/render-images.mjs
// Set CHROME_PATH if the browser is not in the default Windows location.
import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const browser =
  process.env.CHROME_PATH ?? 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const jobs = [
  { source: 'scripts/og-image.html', output: 'public/og-image.png', size: '1200,630' },
  {
    source: 'scripts/apple-touch-icon.svg',
    output: 'public/apple-touch-icon.png',
    size: '180,180',
  },
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Edge's launcher can exit before the browser has written the file, so wait for the PNG
// to appear and stop growing.
async function waitForFile(file, timeoutMs = 20000) {
  let lastSize = -1;
  for (let waited = 0; waited < timeoutMs; waited += 250) {
    if (existsSync(file)) {
      const { size } = statSync(file);
      if (size > 0 && size === lastSize) return true;
      lastSize = size;
    }
    await sleep(250);
  }
  return false;
}

for (const job of jobs) {
  const output = path.join(root, job.output);
  rmSync(output, { force: true });
  const profile = mkdtempSync(path.join(tmpdir(), 'render-images-'));
  const result = spawnSync(browser, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--force-device-scale-factor=1',
    '--default-background-color=00000000',
    `--user-data-dir=${profile}`,
    `--window-size=${job.size}`,
    '--virtual-time-budget=5000',
    `--screenshot=${output}`,
    pathToFileURL(path.join(root, job.source)).href,
  ]);
  const written = result.status === 0 && (await waitForFile(output));
  await sleep(500);
  try {
    rmSync(profile, { recursive: true, force: true, maxRetries: 10, retryDelay: 300 });
  } catch {
    // The browser may still hold its temporary profile; the OS temp folder cleans it up.
  }
  if (!written) {
    console.error(`Failed to render ${job.output}`, result.stderr?.toString());
    process.exit(1);
  }
  console.log(`Rendered ${job.output}`);
}
