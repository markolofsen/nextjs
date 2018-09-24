import { action, observable, autorun, computed, reaction } from 'mobx'
import { AsyncTrunk, version, ignore } from 'mobx-sync'

// let store = null

@version(1)
class Store {
  @observable username = 'Mark'
}




// create a mobx-sync

function reStore(store) {

  if(typeof window !== 'undefined') {

    window.StoreGlobal = store

    // const trunk = new AsyncTrunk(store);
    // const trunk = new AsyncTrunk(store, { storage: localStorage, storageKey: 'StoreGlobal' })
    const trunk = new AsyncTrunk(store, { storage: localStorage })

    // load the persisted data to store
    trunk.init().then(() => {
      // do any staff with loaded store
      console.log(store);
    })


    autorun(() => {
      console.log(store.light)
      trunk.updateStore(store)
    }, { delay: 1000 })

  }

}


let store = null;
export default function initStore () {
  store = new Store()

  reStore(store)
  return store
}
