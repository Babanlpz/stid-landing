import { types } from "@theatre/core"
import Events from "events"
import gsap from "gsap"
import {
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  Vector3
} from "three"
import { WebGL } from "."
import { Camera, CameraConfig } from "./camera"
import { config } from "./config"
import { isMobile } from "./device"
import { Floor } from "./floor"
import { Glow } from "./glow"
import { Hint } from "./hint"
import { PostProcessing } from "./post-processing"
import { MouseEvents } from "./raycaster"
import { GroupTheatre, sheet } from "./theatre"
import { loadGLTF, loadKTX2, loadOBJ } from "./utils"

const rawPublicPath =
  "https://res.cloudinary.com/df7vlavbp/raw/upload/stid/cdn"
const imagePublicPath =
  "https://res.cloudinary.com/df7vlavbp/image/upload/stid/cdn"

class Architect extends GroupTheatre {
  constructor() {
    super("architect" + " / matrix")

    this.camera = new CameraConfig("architect / camera")
    this.cameraMobile = new CameraConfig("architect / camera / mobile")
    this.add(this.camera)
    this.add(this.cameraMobile)

    this.hint = new Hint()
    this.add(this.hint)

    this.hint.events.on("click", () =>
      ExperienceEvents.emit("hint", "architect")
    )
  }

  async load() {
    const [model, blueTexture, greenTexture] = await Promise.all([
      loadGLTF(imagePublicPath + "/models/architect/ModelArchitect.glb"),
      loadKTX2(rawPublicPath + "/models/architect/ArchitectBLUE_2K.ktx2"),
      loadKTX2(rawPublicPath + "/models/architect/ArchitectGREEN_2K.ktx2"),
    ])

    // this.offTexture = offTexture
    this.blueTexture = blueTexture
    this.greenTexture = greenTexture

    // this.offTexture.flipY =
    this.blueTexture.flipY = this.greenTexture.flipY = false

    this.geometry = model.scene.children[0].geometry
    this.material = new MeshBasicMaterial({
      map: blueTexture,
    })

    this.uniforms = {
      // uOffTexture: { value: this.offTexture },
      uBlueTexture: { value: this.blueTexture },
      uGreenTexture: { value: this.greenTexture },
      // uOffTextureOpacity: { value: 0.0 },
      uBlueTextureOpacity: { value: 0.0 },
      uGreenTextureOpacity: { value: 0.0 },
    }
    this.material.onBeforeCompile = (shader) => {
      shader.defines = {
        ...shader.defines,
        USE_UV: "",
      }
      shader.uniforms = {
        ...shader.uniforms,
        ...this.uniforms,
      }

      shader.fragmentShader = shader.fragmentShader.replace(
        "void main() {",
        `
        uniform sampler2D uOffTexture;
        uniform sampler2D uBlueTexture;
        uniform sampler2D uGreenTexture;
        uniform float uOffTextureOpacity;
        uniform float uBlueTextureOpacity;
        uniform float uGreenTextureOpacity;

            const float Epsilon = 1e-10;
 
        vec3 RGBtoHSV(in vec3 RGB)
        {
            vec4  P   = (RGB.g < RGB.b) ? vec4(RGB.bg, -1.0, 2.0/3.0) : vec4(RGB.gb, 0.0, -1.0/3.0);
            vec4  Q   = (RGB.r < P.x) ? vec4(P.xyw, RGB.r) : vec4(RGB.r, P.yzx);
            float C   = Q.x - min(Q.w, Q.y);
            float H   = abs((Q.w - Q.y) / (6.0 * C + Epsilon) + Q.z);
            vec3  HCV = vec3(H, C, Q.x);
            float S   = HCV.y / (HCV.z + Epsilon);
            return vec3(HCV.x, S, HCV.z);
        }

        vec3 HSVtoRGB(in vec3 HSV)
        {
            float H   = HSV.x;
            float R   = abs(H * 6.0 - 3.0) - 1.0;
            float G   = 2.0 - abs(H * 6.0 - 2.0);
            float B   = 2.0 - abs(H * 6.0 - 4.0);
            vec3  RGB = clamp( vec3(R,G,B), 0.0, 1.0 );
            return ((RGB - 1.0) * HSV.y + 1.0) * HSV.z;
        }

        void main() {
        `
      )

      shader.fragmentShader = shader.fragmentShader.replace(
        "vec4 diffuseColor = vec4( diffuse, opacity );",
        `
        // vec4 offColor = texture2D(uOffTexture, vUv) * uOffTextureOpacity;
        vec4 blueColor = texture2D(uBlueTexture, vUv) * uBlueTextureOpacity;
        vec4 greenColor = texture2D(uGreenTexture, vUv) * uGreenTextureOpacity;
        vec3 color = blueColor.rgb + greenColor.rgb;
        color *= 2.;

        vec3 col_hsv = RGBtoHSV(color);
        col_hsv.y *= (1.2 * 2.0); 
        vec3 col_rgb = HSVtoRGB(col_hsv.rgb);

        vec4 diffuseColor = vec4(  col_rgb, opacity );
        // diffuseColor.rgb *= 2.;
        `
      )

      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <tonemapping_fragment>`,
        ``
      )

      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <encodings_fragment>`,
        ``
      )
    }

    this.mesh = new Mesh(this.geometry, this.material)
    this.add(this.mesh)

    this.glow = new GroupTheatre("architect / glow / matrix")

    this.blueGlow = new Glow("architect / glow / glow-blue")
    this.greenGlow = new Glow("architect / glow / glow-green")

    this.add(this.glow)
    this.glow.add(this.blueGlow)
    this.glow.add(this.greenGlow)

    this.turnOff()

    this.mouseEvents = new MouseEvents(this.mesh)
    this.mouseEvents.on("mouseenter", () => {
      // this.turnBlue()
      // clearTimeout(this.timeout)
      // this.timeout = setTimeout(() => {
      this.turnOn()
      // }, 1000)
    })

    this.mouseEvents.on("mouseleave", () => {
      this.turnOff()
      // clearTimeout(this.timeout)
    })

    this.object = sheet.object(
      "architect",
      {
        state: types.stringLiteral("off", {
          off: "off",
          blue: "blue",
          green: "green",
        }),
      },
      {
        reconfigure: true,
      }
    )

    this.object.onValuesChange(({ state }) => {
      // switch (state) {
      //   case "off":
      //     this.turnOff()
      //     break
      //   case "blue":
      //     this.turnBlue()
      //     break
      //   case "green":
      //     this.turnGreen()
      //     break
      // }
    })
  }

  // turnOff() {
  //   console.log("turnOff")
  //   this.uniforms.uOffTextureOpacity.value = 1
  //   this.uniforms.uBlueTextureOpacity.value = 0
  //   this.uniforms.uGreenTextureOpacity.value = 0
  //   this.blueGlow.visible = false
  //   this.greenGlow.visible = false
  // }

  turnOff() {
    // console.log("turnBlue")
    // this.uniforms.uOffTextureOpacity.value = 0
    this.uniforms.uBlueTextureOpacity.value = 1
    this.uniforms.uGreenTextureOpacity.value = 0
    this.blueGlow.visible = true
    this.greenGlow.visible = false
  }

  turnOn() {
    // console.log("turnGreen")
    // this.uniforms.uOffTextureOpacity.value = 0
    this.uniforms.uBlueTextureOpacity.value = 0
    this.uniforms.uGreenTextureOpacity.value = 1
    this.blueGlow.visible = false
    this.greenGlow.visible = true
  }
}

class Spectre extends GroupTheatre {
  constructor() {
    super("spectre / matrix")

    this.camera = new CameraConfig("spectre / camera")
    this.cameraMobile = new CameraConfig("spectre / camera / mobile")
    this.add(this.camera)
    this.add(this.cameraMobile)

    this.hint = new Hint()
    this.add(this.hint)

    this.hint.events.on("click", () => ExperienceEvents.emit("hint", "spectre"))
  }

  turnOn() {
    this.material.map = this.onTexture
    this.glow.visible = true
  }

  turnOff() {
    this.material.map = this.offTexture
    this.glow.visible = false
  }

  async load() {
    const [model, offTexture, onTexture] = await Promise.all([
      loadGLTF(imagePublicPath + "/models/spectre/ModelSpectre.glb"),
      loadKTX2(rawPublicPath + "/models/spectre/Baked_Spectre_OFF.ktx2"),
      loadKTX2(rawPublicPath + "/models/spectre/Baked_Spectre_ON.ktx2"),
    ])

    this.onTexture = onTexture
    this.offTexture = offTexture

    this.onTexture.flipY = this.offTexture.flipY = false

    this.geometry = model.scene.children[0].geometry
    this.material = new MeshBasicMaterial({
      map: offTexture,
    })
    this.mesh = new Mesh(this.geometry, this.material)
    this.add(this.mesh)

    this.mouseEvents = new MouseEvents(this.mesh)
    this.mouseEvents.on("mouseenter", () => {
      this.turnOn()
    })
    this.mouseEvents.on("mouseleave", () => {
      this.turnOff()
    })

    this.glow = new Glow("spectre / glow")
    this.add(this.glow)

    this.object = sheet.object(
      "spectre",
      {
        state: types.stringLiteral("off", {
          off: "off",
          on: "on",
        }),
      },
      {
        reconfigure: true,
      }
    )

    this.object.onValuesChange(({ state }) => {
      // switch (state) {
      //   case "off":
      //     this.turnOff()
      //     break
      //   case "on":
      //     this.turnOn()
      //     break
      // }
    })
  }
}

class Phone extends GroupTheatre {
  constructor() {
    super("phone / matrix")

    this.camera = new CameraConfig("phone / camera")
    this.cameraMobile = new CameraConfig("phone / camera / mobile")
    this.add(this.camera)
    this.add(this.cameraMobile)

    this.hint = new Hint()
    this.add(this.hint)

    this.hint.events.on("click", () => ExperienceEvents.emit("hint", "phone"))
  }

  async load() {
    const [model, caseTexture, screenTexture] = await Promise.all([
      loadGLTF(imagePublicPath + "/models/phone/TelephoneMerge.glb"),
      loadKTX2(rawPublicPath + "/models/phone/Telephone_baked.ktx2"),
      loadKTX2(rawPublicPath + "/models/phone/Screen.ktx2"),
    ])

    this.caseTexture = caseTexture
    // this.caseTextureKTX = caseTextureKTX
    this.screenTexture = screenTexture

    this.caseTexture.flipY =
      // this.caseTextureKTX.flipY =
      this.screenTexture.flipY = false

    // this.caseTexture.encoding = LinearEncoding
    // this.caseTexture.magFilter = LinearMipmapLinearFilter
    // this.caseTexture.minFilter = LinearMipmapLinearFilter
    // this.caseTextureKTX.generateMipmaps = true

    // console.log(this.caseTexture)
    // console.log(this.caseTextureKTX)

    // this.caseTextureKTX.encoding = sRGBEncoding
    // this.caseTextureKTX.magFilter = LinearFilter

    this.caseMaterial = new MeshBasicMaterial({
      map: caseTexture,
    })

    this.screenMaterial = new MeshBasicMaterial({
      map: screenTexture,
    })

    this.inner = new Group()
    this.add(this.inner)
    this.inner.rotation.y = Math.PI / 2

    this.case = new Mesh(
      model.scene.children[0].children[0].geometry,
      this.caseMaterial
    )
    this.screen = new Mesh(
      model.scene.children[0].children[1].geometry,
      this.screenMaterial
    )
    this.inner.add(this.case)
    this.inner.add(this.screen)

    // const geometry = new PlaneGeometry(1, 1, 1)
    // const material = new MeshBasicMaterial({
    //   map: this.caseTexture,
    // })
    // const plane = new Mesh(geometry, material)
    // this.add(plane)

    // const geometry2 = new PlaneGeometry(1, 1, 1)
    // const material2 = new MeshBasicMaterial({
    //   map: this.caseTextureKTX,
    // })
    // const plane2 = new Mesh(geometry2, material2)
    // this.add(plane2)
    // plane.position.y = 1
  }
}

class Building extends Group {
  constructor() {
    super()

    this.floor = new Floor()
    this.add(this.floor)
  }

  async load() {
    const [model, buildingMask, characterMask] = await Promise.all([
      loadOBJ(rawPublicPath + "/models/Scene_Wireframe.obj"),
      loadGLTF(imagePublicPath + "/models/Batiment_MASK.glb"),
      loadGLTF(imagePublicPath + "/models/Character_MASK.glb"),
    ])

    this.material = new LineBasicMaterial({
      color: config.lines,

      // blending: AdditiveBlending,
      // transparent: true,
      // opacity: 0.5,
    })

    model.traverse((child) => {
      if (child instanceof LineSegments) {
        child.material = this.material
        PostProcessing.bloomEffect.selection.add(child)
      }
    })

    const maskMaterial = new MeshBasicMaterial({
      color: config.background,
      transparent: true,
      // opacity:0.8,
      opacity: 1,
      depthTest: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: 3,
      // polygonOffsetUnits: 1,
      // transparent: true,
      // opacity: 0,
    })

    const buildingMaskModel = buildingMask.scene.children[0]
    const characterMaskModel = characterMask.scene.children[0]
    buildingMaskModel.material = characterMaskModel.material = maskMaterial
    // maskModel.renderOrder = -1

    this.add(model)
    this.add(buildingMaskModel)
    this.add(characterMaskModel)
    // maskModel.scale.set(1, 1, 0.999)

    // const maskModelWrapper = new Group()
    // maskModelWrapper.add(maskModel)
    // this.add(maskModelWrapper)

    // maskModelWrapper.position.x = 6.5
    // maskModel.position.x = -6.5

    // maskModelWrapper.scale.set(1.001, 0.999, 0.999)

    // maskModel.scale.set(1.001,0.999,1)
  }
}

export class Experience extends Group {
  constructor(canvas) {
    super()

    const intersection = new IntersectionObserver(this.onIntersection, {
      threshold: 0.0,
    })
    intersection.observe(canvas)

    this.events = new Events()

    WebGL.init({
      gl: {
        canvas,
        alpha: false,
        antialias: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: false,
        // logarithmicDepthBuffer: true
      },
    })

    // const geometry = new BoxGeometry(1, 1, 1)
    // const material = new MeshBasicMaterial({ color: 0x00ff00 })
    // const cube = new Mesh(geometry, material)

    WebGL.camera.position.z = 5

    WebGL.scene.add(this)

    // WebGL.scene.add(cube)

    this.init()
  }

  onIntersection = ([entry]) => {
    WebGL.needsRender = entry.isIntersecting
  }

  async init() {
    this.building = new Building()
    this.architect = new Architect()
    this.spectre = new Spectre()
    this.phone = new Phone()

    await this.load()

    this.add(this.building)
    this.add(this.architect)
    this.add(this.spectre)
    this.add(this.phone)
  }

  async load() {
    await Promise.all([
      this.building.load(),
      this.architect.load(),
      this.spectre.load(),
      this.phone.load(),
    ])

    this.cameraObject = sheet.object(
      "camera",
      {
        position: {
          x: types.number(0, { nudgeMultiplier: 0.01 }),
          y: types.number(0, { nudgeMultiplier: 0.01 }),
          z: types.number(0, { nudgeMultiplier: 0.01 }),
        },
        controls: true,
        focus: types.stringLiteral("default", {
          default: "default",
          architect: "architect",
          spectre: "spectre",
          phone: "phone",
        }),
      },
      {
        reconfigure: true,
      }
    )

    this.cameraObject.onValuesChange(({ focus, controls }) => {
      // WebGL.controls.enabled = controls
      // this.focus(focus)
    })

    this.focus("default", true)

    setTimeout(() => {
      WebGL.render(true)
    }, 0)
  }

  focus(focus, immediate) {
    const target = Camera.target.clone()
    const position = Camera.position.clone()

    if (!immediate) {
      this.spectre.hint.visible = false
      this.architect.hint.visible = false
      this.phone.hint.visible = false
    }

    let camera

    switch (focus) {
      case "architect":
        if (isMobile) {
          camera = this.architect.cameraMobile
        } else {
          camera = this.architect.camera
        }
        break
      case "spectre":
        if (isMobile) {
          camera = this.spectre.cameraMobile
        } else {
          camera = this.spectre.camera
        }
        break
      case "phone":
        if (isMobile) {
          camera = this.phone.cameraMobile
        } else {
          camera = this.phone.camera
        }
        break
      default:
        if (isMobile) {
          target.set(10, 3, -0.4)
          position.set(-2.5, 3.5, 1.4)
        } else {
          target.set(10, 3, 4)
          position.set(-2.5, 3.5, 6)
        }

        break
    }

    if (camera) {
      target.copy(camera.lookAtObject.getWorldPosition(new Vector3()))
      position.copy(camera.positionObject.getWorldPosition(new Vector3()))
    }

    const duration = immediate ? 0 : 3
    const ease = "power4.inOut"

    const timeline = gsap.timeline({
      onUpdate: () => {
        Camera.update()
      },
      onComplete: () => {
        Camera.update()

        if (focus === "default") {
          this.spectre.hint.visible = true
          this.architect.hint.visible = true
          this.phone.hint.visible = true
        }
      },
    })

    timeline.to(
      Camera.target,
      {
        x: target.x,
        y: target.y,
        z: target.z,
        duration,
        ease,
      },
      0
    )

    timeline.to(
      Camera.position,
      {
        x: position.x,
        y: position.y,
        z: position.z,
        duration,
        ease,
      },
      0
    )

    // WebGL.camera.position.copy(position)
    // WebGL.controls.target.copy(target)
    // WebGL.controls.update()
  }

  destroy() {
    WebGL.destroy()
  }
}

export const ExperienceEvents = new Events()
