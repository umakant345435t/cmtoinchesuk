import { initVanillaCore } from './vanillaCore';

const REACT_REQUIRED_ROUTES = new Set([
  '/paper-size-in-inches/',
  '/paper-size-in-inches',
  '/ring-shoe-size-cm/',
  '/ring-shoe-size-cm',
  '/unit-conversion-chart/',
  '/unit-conversion-chart',
  '/contact-us/',
  '/contact-us',
]);

const rootEl = document.getElementById('root');

if (!rootEl || !rootEl.hasChildNodes() || REACT_REQUIRED_ROUTES.has(window.location.pathname)) {
  // Dev mode (un-prerendered) or rich interactive tool/form pages load React cleanly
  void import('./reactBoot').then((m) => m.bootReact());
} else {
  // All prerendered homepage, converter, and info pages run natively in ~4-6 KB JS with zero React overhead
  initVanillaCore();
}
