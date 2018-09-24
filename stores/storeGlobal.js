import { action, observable, autorun, computed, reaction } from 'mobx'
import { AsyncTrunk, version, ignore } from 'mobx-sync'


@version(1)
class Store {
  @observable lastUpdate = 0
  @observable light = false


  @observable @ignore x = 0;
  @observable y = 0;


  constructor (isServer, lastUpdate) {
    this.lastUpdate = lastUpdate

    if(!isServer) {
      reaction(
        () => this.x,
        () => {
          // some logic fires when x changes
        }
      );
    }

  }

  @action ch = () => {
    this.light = !this.light
  }

  @action start = () => {
    this.timer = setInterval(() => {
      this.lastUpdate = Date.now()
      this.light = true
    }, 1000)
  }

  @computed
  get options() {
    return this.x + this.y;
  }

  @action options2 = () => {
    return this.x + this.y;
  }


  stop = () => clearInterval(this.timer)
}




// create a mobx-sync

function reStore(store) {

  if(typeof window !== 'undefined') {

    window.StoreGlobal = store

    // const trunk = new AsyncTrunk(store);
    const trunk = new AsyncTrunk(store, { storage: localStorage, storageKey: 'StoreGlobal' })
    // const trunk = new AsyncTrunk(store, { storage: localStorage })

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
export function initializeStore (isServer, lastUpdate = Date.now()) {
  if (isServer) {
    store = new Store(isServer, lastUpdate)
  } else if (store === null) {
    store = new Store(isServer, lastUpdate)
  }

  reStore(store)
  return store
}
