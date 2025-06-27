
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'MoviePickerBot',
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
    'index.csr.html': {size: 2319, hash: '15421cb402f693800edbd793b96cc61f1bd821a50d66c4dd30891485cda49173', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1026, hash: '3a7f9b79f58e75a1940859c96400d7ee226be50c0b300bb5e13a5f3c4af5855a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-FHK5K4YV.css': {size: 1757, hash: 'i4+MLq1bYY8', text: () => import('./assets-chunks/styles-FHK5K4YV_css.mjs').then(m => m.default)}
  },
};
