import { BoxGeometry, Mesh, MeshBasicMaterial, Spherical, Vector3 } from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { WebGL } from "."
import { Mouse } from "./mouse"
import { GroupTheatre } from "./theatre"

class __Camera {
  constructor() {
    this.sperical = new Spherical()

    this.target = new Vector3()
    this.position = new Vector3()

    
  }

  init(camera) {
    this.object = camera

    this.controls = new OrbitControls(this.object, WebGL.renderer.domElement)
    this.controls.enabled = false
  }

  update() {

    if(this.controls.enabled) {
      this.controls.update()
      return
    }

    const proxy = this.position.clone().sub(this.target)

    this.sperical.setFromVector3(proxy)
    this.sperical.set(
      this.sperical.radius,
      this.sperical.phi + -Mouse.lerpedNormalized.y * 0.05,
      this.sperical.theta + Mouse.lerpedNormalized.x * 0.05
    )

    const delta = new Vector3().setFromSpherical(this.sperical)

    this.object.lookAt(this.target)
    this.object.position.copy(this.target.clone().add(delta))
  }
}

export const Camera = new __Camera()

export class CameraConfig extends GroupTheatre {
  constructor(theatreKey) {
    super(theatreKey + "/ matrix")

    this.positionObject = new GroupTheatre(theatreKey + " / position")
    this.lookAtObject = new GroupTheatre(theatreKey + " / lookAt")

    this.add(this.positionObject)
    this.add(this.lookAtObject)

    this.positionObjectDebug = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 0xff0000 })
    )
    this.positionObjectDebug.scale.set(0.1, 0.1, 0.1)
    this.positionObject.add(this.positionObjectDebug)

    this.lookAtObjectDebug = new Mesh(
      new BoxGeometry(1, 1, 1),
      new MeshBasicMaterial({ color: 0x00ff00 })
    )
    this.lookAtObjectDebug.scale.set(0.1, 0.1, 0.1)
    this.lookAtObject.add(this.lookAtObjectDebug)

    this.visible = false

    // this.positionObjectDebug.visible = this.lookAtObjectDebug.visible = false
  }
}
