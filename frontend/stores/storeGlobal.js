import { action, observable, autorun, computed, reaction } from 'mobx'
import { AsyncTrunk, version, ignore } from 'mobx-sync'


import {API, LOC, apiDomain} from '../data/config';
import {left_menu_arr, social_links, languages_arr, locations_arr} from '../data/dicts'

/*
 * LIBS
 */
import moment from 'moment'

/*
 * FUNCS & CONF
 */
import {tokenAuth,logout} from '../data/auth';

let sound_notification = false

class Store {

  @observable light = false
  @action ch = () => {
    this.light = !this.light
  }

  @observable domain = 'https://domain.com'
  @observable sitePreview = `${this.domain}/media/site_preview.jpg`
  @observable sitename = 'SITENAME'
  @observable year = moment().year()
  @observable languages_arr = []
  @observable language = false
  @observable logged = false
  @observable query = false //For url query


  // CATALOG
  @observable locations_arr = locations_arr
  @observable currencies_arr = []
  @observable payment_methods_arr = []


  // settings
  @observable left_menu_arr = left_menu_arr
  @observable social_links = social_links

  @observable bonuses = false
  @observable statistics = {traders: 0, offers: 0, deals: 0, reviews: 0}
  @observable system_commission = false
  @observable affiliate_commission = 0

  @observable affiliate_link = `${this.domain}/${this.language}/`


  @action locationsTranslate(t) {
    let arr = []
    locations_arr.map(item => {
      let item_ = item
      item_.label = t(`dict-countries__${item.value}`)
      arr.push(item_)
    })
    arr = _.sortBy(arr, ['label']);
    return arr
  }

  @action initLangs() {
    this.languages_arr = languages_arr
  }

  @action initLogin(data=false) {
    this.logged = data

    this.affiliate_link = `${this.domain}/${this.language}/?code=${this.logged.user.first_name}`

  }
  @action initLogout() {
    logout(this.language)
  }
  @action getToken() {
    const token = new LOC().getLocal('user') ? new LOC().getLocal('user').token : false
    return token
  }
  @action getWalletByTicker(ticker) {
    const wallets = {
      BTC: 'BTC WALLET',
      DASH: 'DASH WALLET',
      ETH: 'ETH WALLET',
      LTC: 'LTC WALLET',
      XMR: 'XMR WALLET',
      XRP: 'XRP WALLET',
    }
    try {
      return wallets[ticker]
    } catch(err) {
      return false
    }

  }
  @action playSound(status=true) {

    // const sound_url = `${apiDomain}/media/sounds/notification.mp3`
    // if(!sound_notification) sound_notification = new Audio(sound_url)
    //
    // try{
    //   if(status) {
    //     sound_notification.pause()
    //     sound_notification.play()
    //   } else {
    //     sound_notification.pause()
    //   }
    // } catch(err) {}
  }


  @action initSettings = async (query, url) => {

    this.language = query.lang
    // try {
    //   if(document.location.hostname.indexOf('kupi.ru') !== -1) {
    //     this.domain = 'https://kupi.ru'
    //     this.sitename = 'kupi.ru'
    //   } else {
    //     this.sitename = 'kupi.net'
    //   }
    // } catch(err) {}

    // DJANGO SETTINGS
    await new API(`${this.language}/settings/`).get().then(res => {
      this.languages_arr = res.data.langs
      this.left_menu_arr = res.data.tabs
      this.currencies_arr = res.data.currencies
      // this.locations_arr = res.data.locations
      this.payment_methods_arr = res.data.payment_methods

      this.bonuses = res.data.bonuses
      this.statistics = res.data.statistics
      this.system_commission = res.data.system_commission
      this.affiliate_commission = res.data.affiliate_commission
		})
  }

  constructor() {
    console.log("new Store with: ", arguments)

    tokenAuth()
    this.initLangs()

  }

  @action init = async (isServer, storeData) => {

    if (isServer && this.serverInited) {
      console.log("init Store[server] error: already inited")
      return
    }
    if (!isServer && this.clientInited) {
      console.log("init Store[client] error: already inited")

      return
    }
    console.log("init Store with: isServer = ", isServer)
    console.log("init Store with: storeData = ", storeData)

    if (isServer) {}
  }


}



export let store = null;
export function initializeStore (isServer, lastUpdate = Date.now()) {
  if (isServer) {
    store = new Store(isServer, lastUpdate)
  } else if (store === null) {
    store = new Store(isServer, lastUpdate)
  }

  // reStore(store)
  return store
}
