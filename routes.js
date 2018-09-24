const nextRoutes = require('next-routes')
const routes = module.exports = nextRoutes()



/*
 * INDEX
 */
routes.add('index', '/:lang', 'index')
routes.add('about', '/:lang/about', 'about')
// routes.add({
//   name: 'index_tab',
//   page: 'index_tab',
//   pattern: '/:lang/tab/:tab?',
//   params: {
//     tab: false,
//   }
// })
