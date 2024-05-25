import Events from "events"
import gsap from "gsap"
import {
  Color,
  LinearEncoding,
  PerspectiveCamera,
  Scene,
  WebGLRenderer
} from "three"
import { Viewport } from "../viewport"
import { Camera } from "./camera"
import { config } from "./config"
import { PostProcessing } from "./post-processing"

class __WebGL extends Events {
  constructor() {
    super()

    this.needsRender = true
  }

  init({ gl = {} }) {
    Viewport.on("resize", this.onWindowResize)

    this.scene = new Scene()
    this.camera = new PerspectiveCamera(75, Viewport.aspect, 0.01, 1000)
    // this.camera = new OrthographicCamera(
    //   Viewport.width / -2,
    //   Viewport.width / 2,
    //   Viewport.height / 2,
    //   Viewport.height / -2,
    //   0.01,
    //   1000
    // )
    this.renderer = new WebGLRenderer({ ...gl })
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.outputEncoding = LinearEncoding
    this.scene.background = new Color(config.background)

    window.camera = this.camera

    // this.postprocessing = new PostProcessing({
    //   renderer: this.renderer,
    //   scene: this.scene,
    //   camera: this.camera,
    // })

    PostProcessing.init({
      renderer: this.renderer,
      scene: this.scene,
      camera: this.camera,
    })

    // this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    Camera.init(this.camera)

    this.onWindowResize()

    // this.raf()

    gsap.ticker.add(this.raf)
  }

  destroy() {
    cancelAnimationFrame(this.rafId)
    Viewport.destroy()
  }

  onWindowResize = () => {
    this.camera.aspect = Viewport.aspect
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(Viewport.width, Viewport.height)
    PostProcessing.resize(Viewport.width, Viewport.height)
  }

  render(force = false) {
    // this.renderer.render(this.scene, this.camera)

    if (this.needsRender || force) {
      PostProcessing.render()
    }
  }

  raf = () => {
    // if (this.controls.enabled) this.controls.update()
    // this.controls.update()
    // console.log("this.controls", this.controls.getPolarAngle())

    Camera.update()

    this.emit("raf")

    this.render()
    // this.rafId = requestAnimationFrame(this.raf)
  }
}

export const WebGL = new __WebGL()
