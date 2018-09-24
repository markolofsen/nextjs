import { types, applySnapshot } from 'mobx-state-tree'

let store = null




/*
 * i18
 */
import { withI18next } from '../lib/withI18next'


const Store = types
  .model({
    lastUpdate: types.Date,
    light: false,
    hello: true,
  })
  .actions((self) => {
    let timer
    function start () {
      timer = setInterval(() => {
        // mobx-state-tree doesn't allow anonymous callbacks changing data
        // pass off to another action instead
        self.update()
      }, 1000)
    }

    function update () {
      self.lastUpdate = Date.now()
      self.light = true
    }

    function stop () {
      clearInterval(timer)
    }

    function check() {
      self.hello = !self.hello
    }

    return { start, stop, update, check }
  })

export function initStore (isServer, snapshot = null) {
  if (isServer) {
    store = Store.create({ lastUpdate: Date.now() })
  }
  if (store === null) {
    store = Store.create({ lastUpdate: Date.now() })
  }

  if (snapshot) {
    applySnapshot(store, snapshot)
  }

  return store
}
