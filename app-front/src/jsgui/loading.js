let onStartEmmitsGlobal = []
let onStopEmmitsGlobal = []

class Loading {
  constructor () {
    this.onStartEmmits = []
    this.onStopEmmits = []
  }

  addStartEventGlobal (fn) {
    onStartEmmitsGlobal.push(fn)
  }

  addStopEventGlobal (fn) {
    onStopEmmitsGlobal.push(fn)
  }

  start () {
    for (let em of onStartEmmitsGlobal) {
      em()
    }
  }

  stop () {
    for (let em of onStopEmmitsGlobal) {
      em()
    }
  }
}

export default new Loading()
