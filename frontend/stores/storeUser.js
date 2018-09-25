import { action, observable, autorun, computed, reaction } from 'mobx'
import { AsyncTrunk, version, ignore } from 'mobx-sync'

@version(1)
class Store {
  @observable username = 'Mark'

  @action changeName(value) {
    this.username = value
  }
}




// create a mobx-sync
function reStore(store) {

  if(typeof window !== 'undefined') {
    window.StoreUser = store
    const trunk = new AsyncTrunk(store, { storage: localStorage, storageKey: 'StoreUser' })
    trunk.init().then(() => {
      console.log(store);
    })

    autorun(() => {
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
