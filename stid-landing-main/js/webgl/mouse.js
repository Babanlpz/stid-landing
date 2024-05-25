import Events from "events"
import gsap from "gsap"
import { Viewport } from "../viewport"
import { isMobile } from "./device"

class __Mouse extends Events {
  constructor() {
    super()

    this.position = {
      x: Viewport.width / 2,
      y: Viewport.height / 2,
    }
    this.lerpedPosition = {
      ...this.position,
    }
    window.addEventListener("mousemove", this.onMouseMove, false)
  }

  onMouseMove = (event) => {
    if (isMobile) return

    this.position = {
      x: event.clientX,
      y: event.clientY,
    }

    gsap.to(this.lerpedPosition, {
      x: event.clientX,
      y: event.clientY,
      duration: 2,
      ease: "expo.out",
    })

    this.emit("move", this)
  }

  get normalized() {
    return {
      x: (this.position.x / Viewport.width) * 2 - 1,
      y: -(this.position.y / Viewport.height) * 2 + 1,
    }
  }

  get lerpedNormalized() {
    return {
      x: (this.lerpedPosition.x / Viewport.width) * 2 - 1,
      y: -(this.lerpedPosition.y / Viewport.height) * 2 + 1,
    }
  }
}

export const Mouse = new __Mouse()
