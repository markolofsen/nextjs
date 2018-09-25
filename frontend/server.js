const express = require('express')
const path = require('path')
const next = require('next')
const LRUCache = require('lru-cache')
const mobxReact = require('mobx-react')


const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const routes = require('./routes')


const handler = routes.getRequestHandler(app)
const i18nextMiddleware = require('i18next-express-middleware')
const BackendLocal = require('i18next-node-fs-backend')
const BackendRemote = require('i18next-node-remote-backend')
const { i18nInstance, i18whitelist } = require('./i18n')

const ENV = process.env.NODE_ENV || 'development';
const isProduction = ENV === 'production';
const isProdDev = ENV === 'production_dev';

let apiDomain = 'http://127.0.0.1:8000';
let port = 3000

if(isProduction) {
  apiDomain = 'http://127.0.0.1:7000'
  port = 7001
}
if(isProdDev) {
  apiDomain = 'https://domain.com'
  port = 7001
}



let Backend = isProduction ? BackendRemote : BackendLocal
let LocalesPath = isProduction ? `${apiDomain}/api/{{lng}}/translations/common.json` : path.join(__dirname, '/locales/{{lng}}/{{ns}}.json')

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
})

// MOBX
mobxReact.useStaticRendering(true)


// init i18next with serverside settings
// using i18next-express-middleware
i18nInstance
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: i18whitelist, // preload all languages
    ns: ['common'], // need to preload all the namespaces
    backend: {
      loadPath: LocalesPath,
      // loadPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.json'),
      // addPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.missing.json')
    },
    detection: {
      order: ['htmlTag','path']
    },
    // htmlTag: typeof window !== 'undefined' ? document.documentElement : false,
  }, () => {
    // loaded translations we can bootstrap our routes
    app.prepare()
      .then(() => {
        const server = express()

        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18nInstance));

        // serve locales for client
        // server.use('/locales', express.static(path.join(__dirname, '/locales')));

        // missing keys
        // server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18nInstance));


        server.use('/css', express.static(path.join(__dirname, '/files/css')));
        server.use('/favicon.png', express.static(path.join(__dirname, '/files/img/favicon.png')));
        server.use('/robots.txt', express.static(path.join(__dirname, '/files/robots.txt')));


        // Use the `renderAndCache` utility defined below to serve pages
        // server.get('/', (req, res) => {
        //   renderAndCache(req, res, '/')
        // })

        // server.get('/blog/:id', (req, res) => {
        //   const queryParams = { id: req.params.id }
        //   renderAndCache(req, res, '/blog', queryParams)
        // })


        // use next.js
        server.get('*', (req, res) => {

          langFunc(req, res)

          handler(req, res)
        })

        // server.use(handler); //For sure

        server.listen(3000, (err) => {
          if (err) throw err
          console.log('> Ready on http://localhost:3000')
        })
      })
  })



function langFunc(req, res) {

  // LANGUAGE REDIRECTS

    if(req.url == '/sitemap.xml') {
      res.redirect(`${apiDomain}/sitemap.xml`);
    }

    // www redirect
    if(isProduction) {
      if(req.headers.host.match(/^www/) !== null) {
        res.redirect('https://' + req.headers.host.replace(/^www\./, '') + req.url);
      }
    }

    const getLng = req.url.split('/')[1];


    function langRedirect() {
      let browserLang = req.headers["accept-language"]
      if(browserLang) {
        browserLang = browserLang ? browserLang.split(',')[0].substr(0,2) : 'en';
      }

      if(i18whitelist.indexOf(browserLang) === -1) {
        res.redirect(`/en`);
      } else {
        res.redirect(`/${browserLang}`);
      }
    }

    // Redirect by language detect from main page
    if(req.url == '/') { langRedirect(); }

    // Redirect if wrong language
    if(getLng != '_next') {
      if(i18whitelist.indexOf(getLng) === -1) {
        langRedirect();
      }
    }
}





/*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey (req) {
  return `${req.url}`
}

async function renderAndCache (req, res, pagePath, queryParams) {
  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams)

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }

    // Let's cache this page
    ssrCache.set(key, html)

    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams)
  }
}
