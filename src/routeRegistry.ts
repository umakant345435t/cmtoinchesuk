import type { ComponentType, ReactNode } from 'react';
import { RoutePath } from './types';

export interface RouteViewRegistry {
  converterSubpage?: ComponentType<{
    currentPath: RoutePath;
    converterValue?: number;
    onNavigate: (path: RoutePath | string) => void;
    breadcrumb: ReactNode;
  }>;
  unitChart?: ComponentType<{
    breadcrumb: ReactNode;
  }>;
  paperSize?: ComponentType<{
    onNavigate: (path: RoutePath | string) => void;
    breadcrumb: ReactNode;
  }>;
  ringShoeSize?: ComponentType<{
    onNavigate: (path: RoutePath | string) => void;
    breadcrumb: ReactNode;
  }>;
  staticPages?: ComponentType<{
    currentPath: RoutePath;
    onNavigate: (path: RoutePath | string) => void;
    breadcrumb: ReactNode;
  }>;
}

export const RESOLVED_VIEWS: RouteViewRegistry = {};

const CONVERTER_SUBPAGES = new Set([
  '/inches-to-cm/',
  '/feet-to-cm/',
  '/cm-to-feet/',
  '/meters-to-feet/',
  '/feet-to-meters/',
  '/mm-to-inches/',
  '/inches-to-mm/'
]);

const STATIC_PAGES = new Set([
  '/about-us/',
  '/contact-us/',
  '/privacy-policy/',
  '/terms-and-conditions/',
  '/disclaimer/',
  '/cookie-policy/',
  '/sitemap/'
]);

function normalizePath(path: string): string {
  if (!path) return '/';
  return !path.endsWith('/') && !path.includes('.') ? `${path}/` : path;
}

export async function preloadRouteView(rawPath: string): Promise<void> {
  const path = normalizePath(rawPath);
  if (path === '/') return;

  if (CONVERTER_SUBPAGES.has(path) && !RESOLVED_VIEWS.converterSubpage) {
    const mod = await import('./views/ConverterSubpageView');
    RESOLVED_VIEWS.converterSubpage = mod.default;
    return;
  }

  if (path === '/unit-conversion-chart/' && !RESOLVED_VIEWS.unitChart) {
    const mod = await import('./views/UnitChartView');
    RESOLVED_VIEWS.unitChart = mod.default;
    return;
  }

  if (path === '/paper-size-in-inches/' && !RESOLVED_VIEWS.paperSize) {
    const mod = await import('./views/PaperSizeView');
    RESOLVED_VIEWS.paperSize = mod.default;
    return;
  }

  if (path === '/ring-shoe-size-cm/' && !RESOLVED_VIEWS.ringShoeSize) {
    const mod = await import('./views/RingShoeSizeView');
    RESOLVED_VIEWS.ringShoeSize = mod.default;
    return;
  }

  if (STATIC_PAGES.has(path) && !RESOLVED_VIEWS.staticPages) {
    const mod = await import('./views/StaticPagesView');
    RESOLVED_VIEWS.staticPages = mod.default;
  }
}

export async function preloadAllRouteViews(): Promise<void> {
  const [c, u, p, r, s] = await Promise.all([
    import('./views/ConverterSubpageView'),
    import('./views/UnitChartView'),
    import('./views/PaperSizeView'),
    import('./views/RingShoeSizeView'),
    import('./views/StaticPagesView')
  ]);
  RESOLVED_VIEWS.converterSubpage = c.default;
  RESOLVED_VIEWS.unitChart = u.default;
  RESOLVED_VIEWS.paperSize = p.default;
  RESOLVED_VIEWS.ringShoeSize = r.default;
  RESOLVED_VIEWS.staticPages = s.default;
}
