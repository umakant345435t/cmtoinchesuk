import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App.tsx';
import {preloadRouteView} from './routeRegistry.ts';
import './index.css';

const rootEl = document.getElementById('root')!;
const w = window as Window & {
  __REACT_HYDRATED__?: boolean;
  __PREHYDRATE_INPUT__?: string;
  __PREHYDRATE_MODE__?: string;
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
};

let hydrationStarted = false;

async function startHydration() {
  if (hydrationStarted) return;
  hydrationStarted = true;

  // Preload matching code-split subpage view BEFORE hydrating so SSR DOM matches 1:1 with zero flicker
  await preloadRouteView(window.location.pathname);

  if (rootEl.hasChildNodes()) {
    // Capture any value/mode typed while ES5 fallback ran prior to hydration
    const inp = document.getElementById('converter-input') as HTMLInputElement | null;
    const sel = document.getElementById('conversion-mode-select') as HTMLSelectElement | null;
    if (inp && inp.value) {
      w.__PREHYDRATE_INPUT__ = inp.value;
      inp.value = '';
    }
    if (sel && sel.value) {
      w.__PREHYDRATE_MODE__ = sel.value;
    }
    const res = document.getElementById('converter-result');
    if (res && w.__PREHYDRATE_INPUT__) {
      res.textContent = '0';
    }

    w.__REACT_HYDRATED__ = true;
    hydrateRoot(
      rootEl,
      <StrictMode>
        <App />
      </StrictMode>,
    );
  } else {
    w.__REACT_HYDRATED__ = true;
    createRoot(rootEl).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
}

if (rootEl.hasChildNodes()) {
  const triggerOnInteract = () => {
    void startHydration();
  };
  const interactEvents = ['pointerdown', 'keydown', 'input', 'change', 'click', 'focusin'];
  for (let i = 0; i < interactEvents.length; i++) {
    window.addEventListener(interactEvents[i], triggerOnInteract, { once: true, passive: true });
  }

  if (typeof w.requestIdleCallback === 'function') {
    w.requestIdleCallback(() => void startHydration(), { timeout: 350 });
  } else {
    setTimeout(() => void startHydration(), 90);
  }
} else {
  void startHydration();
}
