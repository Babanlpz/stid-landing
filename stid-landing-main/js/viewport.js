import Events from "events"

export class __Viewport extends Events {
  constructor() {
    super()

    this.width = window.innerWidth
    this.height = window.innerHeight

    window.addEventListener("resize", this.onWindowResize, false)
  }

  destroy() {
    window.removeEventListener("resize", this.onWindowResize, false)
    this.removeAllListeners()
  }

  get aspect() {
    return this.width / this.height
  }

  onWindowResize = () => {
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.emit("resize")
  }
}

export const Viewport = new __Viewport()
