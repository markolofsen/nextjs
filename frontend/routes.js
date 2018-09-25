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

/*
 * BASE
 */
routes.add('progress', '/:lang/progress', 'progress')
routes.add('support', '/:lang/support', 'support')
routes.add('terms', '/:lang/terms', 'terms')
routes.add('privacy', '/:lang/privacy', 'privacy')
routes.add('protection', '/:lang/protection', 'protection')
routes.add('earnings', '/:lang/earnings', 'earnings')
routes.add('fees', '/:lang/fees', 'fees')


/*
 * CATALOG
 */
 routes.add({
   name: 'catalog_page',
   page: 'catalog',
   pattern: '/:lang/sell_buy_online/:page?',
   params: {
     page: false,
   }
 })
routes.add({
  name: 'catalog',
  page: 'catalog',
  pattern: '/:lang/catalog/:pagination?',
  params: {
    pagination: '1',
  }
})
routes.add({
  name: 'catalog_details',
  page: 'catalog_details',
  pattern: '/:lang/offer/:slug?',
  params: {
    slug: false,
  }
})


/*
 * PROFILE
 */
 routes.add({
   name: 'profile',
   page: 'profile',
   pattern: '/:lang/profile/:username?',
   params: {
     username: false,
   }
 })


 /*
  * FAQ
  */
routes.add({
  name: 'faq',
  page: 'faq',
  pattern: '/:lang/faq/',
  params: {}
})

/*
 * POSTS
 */
routes.add({
  name: 'posts',
  page: 'posts',
  pattern: '/:lang/posts/:pagination?',
  params: {
    pagination: '1',
  }
})
routes.add({
  name: 'posts_detail',
  page: 'posts_detail',
  pattern: '/:lang/post/:slug?',
  params: {
    slug: false,
  }
})

/*
 * USER
 */
routes.add({
  name: 'user_orders',
  page: 'user_orders',
  pattern: '/:lang/user/orders_outcome/:pagination?',
  params: {
    pagination: '1',
  }
})
routes.add({
  name: 'user_orders_income',
  page: 'user_orders_trader',
  pattern: '/:lang/user/orders_income/:pagination?',
  params: {
    pagination: '1',
  }
})

routes.add({
  name: 'user_ads',
  page: 'user_ads',
  pattern: '/:lang/user/ads/:pagination?',
  params: {
    pagination: '1',
  }
})
routes.add({
  name: 'user_ads_form',
  page: 'user_ads_form',
  pattern: '/:lang/user/ad/form/:id?',
  params: {
    id: false
  }
})

routes.add({
  name: 'user_balance',
  page: 'user_balance',
  pattern: '/:lang/user/balance/:pagination?',
  params: {
    pagination: '1',
  }
})
routes.add({
  name: 'user_affiliate',
  page: 'user_affiliate',
  pattern: '/:lang/user/affiliate/:pagination?',
  params: {
    pagination: '1',
  }
})
routes.add({
  name: 'user_settings',
  page: 'user_settings',
  pattern: '/:lang/user/settings',
  params: {}
})

/*
 * AUTH
 */
routes.add({
  name: 'auth',
  page: 'auth',
  pattern: '/:lang/auth/:type?',
  params: {
    type: 'login',
    return: false
  }
})
