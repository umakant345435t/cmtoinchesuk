import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { preloadRouteView } from './routeRegistry.ts';
import './index.css';

function ensureDeferredStylesheet(): Promise<void> {
  if (typeof document === 'undefined') return Promise.resolve();
  const meta = document.querySelector('meta[name="app-css"]') as HTMLMetaElement | null;
  const href = meta?.content;
  if (!href || document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => resolve();
    document.head.appendChild(link);
    // Do not stall indefinitely if cached or slow
    window.setTimeout(resolve, 250);
  });
}

let booted = false;

export async function bootReact(): Promise<void> {
  if (booted) return;
  booted = true;

  const w = window as Window & {
    __REACT_HYDRATED__?: boolean;
    __VANILLA_ACTIVE__?: boolean;
    __PREHYDRATE_INPUT__?: string;
    __PREHYDRATE_MODE__?: string;
    __PENDING_ROUTE__?: string;
  };

  const targetPath = w.__PENDING_ROUTE__ || window.location.pathname;
  delete w.__PENDING_ROUTE__;

  await Promise.all([preloadRouteView(targetPath), ensureDeferredStylesheet()]);

  const rootEl = document.getElementById('root')!;
  const inp = document.getElementById('converter-input') as HTMLInputElement | null;
  const sel = document.getElementById('conversion-mode-select') as HTMLSelectElement | null;
  if (inp && inp.value && !w.__PREHYDRATE_INPUT__) w.__PREHYDRATE_INPUT__ = inp.value;
  if (sel && sel.value && !w.__PREHYDRATE_MODE__) w.__PREHYDRATE_MODE__ = sel.value;

  w.__REACT_HYDRATED__ = true;

  if (rootEl.hasChildNodes() && !w.__VANILLA_ACTIVE__) {
    hydrateRoot(
      rootEl,
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else {
    createRoot(rootEl).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}
