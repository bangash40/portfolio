// Injects the server-rendered home page into dist/index.html after `vite build`, so the first
// paint shows real content without waiting for JavaScript. The client then hydrates it.
import { readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = path.join(root, 'dist', 'index.html');
const serverEntry = path.join(root, 'dist-ssr', 'entry-server.js');

const { render } = await import(pathToFileURL(serverEntry).href);
const appHtml = await render();

const template = await readFile(htmlPath, 'utf8');
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) {
  throw new Error(`Could not find ${placeholder} in dist/index.html`);
}
await writeFile(htmlPath, template.replace(placeholder, `<div id="root">${appHtml}</div>`));
await rm(path.join(root, 'dist-ssr'), { recursive: true, force: true });

console.log(`Prerendered dist/index.html (${Math.round(appHtml.length / 1024)} KB of HTML)`);
