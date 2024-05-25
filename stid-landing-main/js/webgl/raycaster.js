import Events from "events"
import { Raycaster } from "three"
import { Camera } from "./camera"
import { Mouse } from "./mouse"

const raycaster = new Raycaster()

const objects = []

function onMouseMove({ normalized }) {
  raycaster.setFromCamera(normalized, Camera.object)

  objects.forEach((object) => {
    const intersects = raycaster.intersectObject(object.object)

    object.hovered = intersects.length > 0
  })
}

Mouse.on("move", onMouseMove)

export class MouseEvents extends Events {
  constructor(object) {
    super()
    this.object = object
    this.__hovered = false

    objects.push(this)
  }

  set hovered(value) {
    if (value !== this.__hovered) {
      if (value) {
        this.emit("mouseenter")
      } else {
        this.emit("mouseleave")
      }
    }
    this.__hovered = value
  }
}
