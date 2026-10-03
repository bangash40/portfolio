// Page entry. The stylesheets load with the HTML as usual; the app itself is imported only
// after the prerendered page has painted, so the first paint never waits for JavaScript.
import 'lenis/dist/lenis.css';
import './index.css';

requestAnimationFrame(() => {
  // rAF runs just before the first paint; the timeout runs just after it.
  setTimeout(() => import('./main'), 0);
});
