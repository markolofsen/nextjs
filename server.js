const express = require('express')
const next = require('next')
const path = require('path')
const LRUCache = require('lru-cache')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const mobxReact = require('mobx-react')
const routes = require('./routes')
const handler = routes.getRequestHandler(app)


const i18nextMiddleware = require('i18next-express-middleware')
// const Backend = require('i18next-node-remote-backend')
const Backend = require('i18next-node-fs-backend')
const { i18nInstance } = require('./i18n')




const ENV = process.env.NODE_ENV || 'development';
const isProduction = ENV === 'production';
const isProdDev = ENV === 'production_dev';

let apiDomain = 'http://127.0.0.1:8000';
let port = 3000

// This is where we cache our rendered HTML pages
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
})
mobxReact.useStaticRendering(true)

// init i18next with serverside settings
// using i18next-express-middleware

i18nInstance
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'de'], // preload all langages
    ns: ['common', 'home', 'page2'], // need to preload all the namespaces
    backend: {
      loadPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '/locales/{{lng}}/{{ns}}.missing.json')
    }
  }, () => {
    // loaded translations we can bootstrap our routes
    app.prepare()
      .then(() => {
        const server = express()

        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18nInstance));

        // serve locales for client
        server.use('/locales', express.static(path.join(__dirname, '/locales')));

        server.use('/css', express.static(path.join(__dirname, '/files/css')));
        server.use('/favicon.png', express.static(path.join(__dirname, '/files/img/favicon.png')));
        server.use('/robots.txt', express.static(path.join(__dirname, '/files/robots.txt')));

        // missing keys
        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18nInstance));



        // Use the `renderAndCache` utility defined below to serve pages
        // server.get('/', (req, res) => {
        //   renderAndCache(req, res, '/')
        // })

        // server.get('/blog/:id', (req, res) => {
        //   const queryParams = { id: req.params.id }
        //   renderAndCache(req, res, '/blog', queryParams)
        // })





        function langRedirect(req, res) {
          let browserLang = req.headers["accept-language"]
          if(browserLang) browserLang = browserLang ? browserLang.split(',')[0].substr(0,2) : 'en';
          if(acceptedLangs.indexOf(browserLang) === -1) res.redirect(`/en`);
          else res.redirect(`/${browserLang}`);
        }




        // www redirect
        if(isProduction && req.headers.host.match(/^www/) !== null) {
          res.redirect('https://' + req.headers.host.replace(/^www\./, '') + req.url);
        }

        const getLng = req.url.split('/')[1];

        // Redirect by language detect from main page
        if(req.url == '/') langRedirect(req, res);

        // Redirect if wrong language
        if(getLng != '_next' && acceptedLangs.indexOf(getLng) === -1) langRedirect(req, res);

        server.get('*', (req, res) => {
          return handler(req, res)
        })

        server.use(handler); //For sure

        server.listen(port, (err) => {
          if (err) throw err
          console.log(`> Ready on http://localhost:${port}`)
        })
      })
  })






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
