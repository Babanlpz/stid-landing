import Events from "events"
import { Group, Vector3 } from "three"
import { WebGL } from "."
import { getScreenCoordinates } from "./utils"

export class Hint extends Group {
  constructor() {
    super()

    this.events = new Events()

    this.element = document.createElement("button")

    this.element.innerHTML = new Array(3).fill("<div></div>").join("")
    this.element.classList.add("hint")
    this.element.style.position = "absolute"

    WebGL.renderer.domElement.insertAdjacentElement("afterend", this.element)
    WebGL.on("raf", this.raf)


    this.element.addEventListener("click", () => {
      this.events.emit("click")
    })
  }

  raf = () => {
    const position = getScreenCoordinates(this.getWorldPosition(new Vector3()))

    this.element.style.transform = `translate3d(${position.x}px, ${position.y}px, 0) translate3d(-50%, -50%, 0)`
  }

  set visible(value) {
    if (this.element)
      this.element.style.visibility = value ? "visible" : "hidden"
  }
}
