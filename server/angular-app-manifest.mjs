
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/MoviePickerBot/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "route": "/MoviePickerBot"
  },
  {
    "renderMode": 0,
    "route": "/MoviePickerBot/question/*"
  },
  {
    "renderMode": 0,
    "route": "/MoviePickerBot/results"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 2321, hash: 'c101eb57c853c5b248b3a5a5b25e68a8560b87b4d67875bf8e351ed9ff97ec87', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1028, hash: '91deb93b9251304a5102c551a373429ee0346ee5e38729af643bf8f9ac436403', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-FHK5K4YV.css': {size: 1757, hash: 'i4+MLq1bYY8', text: () => import('./assets-chunks/styles-FHK5K4YV_css.mjs').then(m => m.default)}
  },
};
