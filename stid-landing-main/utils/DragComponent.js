export default class Drag {
  constructor(elem, isMobile, callBack){
    this.callBack = callBack
    this.isMobile = isMobile
    this.elem = elem
    this.x = 0
    this.lastX = 0
    this.isHold = false
    this.width = this.elem.getBoundingClientRect().width - window.innerWidth + 50
    this.wait = false
    this.timeout = false

    window.addEventListener('resize', () => {
      this.width = this.elem.getBoundingClientRect().width - window.innerWidth + 50
    })

    this.elem.addEventListener('mousedown', this.down.bind(this))
    this.elem.addEventListener('touchstart', this.down.bind(this))
    document.addEventListener('mouseup', this.up.bind(this))
    document.addEventListener('touchend', this.up.bind(this))
    this.elem.addEventListener('touchmove', this.move.bind(this))
    this.elem.addEventListener('mousemove', this.move.bind(this))
  }

  down(event){
    this.elem.style.userSelect = "none"
    this.lastX = event.changedTouches ? event.changedTouches[0].screenX : event.screenX
    this.isHold = true
  }

  up(){
    this.elem.style.userSelect = ""
    this.isHold = false

    if(this.isMobile){
      if(this.timeout) clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.elem.style.transform = `translateX(${this.x}px)`
        this.timeout = setTimeout(() => {
          this.snap()
        }, 500)
      }, 50)
    }
  }

  move(event){
    if(this.isHold){
      const eventX = event.changedTouches ? event.changedTouches[0].screenX : event.screenX
      this.x += (eventX - this.lastX) * (this.isMobile ? 2 : 1)
      this.lastX = eventX
      if(this.x > 0) this.x = 0
      else if (this.x < -this.width) this.x = -this.width

      if(!this.wait) this.apply()

      if(this.timeout) clearTimeout(this.timeout)
    }
  }

  snap(){
    const snapId = Math.round((this.x / this.width) * (this.elem.children.length - 1))
    const box = this.elem.children[Math.abs(snapId)].getBoundingClientRect()
    this.x -= box.left - (window.innerWidth * 0.5) + (box.width / 2)
    this.apply()
  }

  apply(){
    this.wait = true
    this.elem.style.transform = `translateX(${this.x}px)`
    window.requestAnimationFrame(() => {this.wait = false})
    if(this.callBack) this.callBack(this.x / this.width)
  }
}