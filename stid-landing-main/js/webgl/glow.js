import { types } from "@theatre/core"
import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from "three"
import { GroupTheatre, sheet } from "./theatre"

export class GlowMaterial extends MeshBasicMaterial {
  constructor(theatreKey) {
    super({
      color: 0x00ff00,
      transparent: true,
      depthWrite: false,
      depthTest: true,
      side: DoubleSide,
    })

    this.onBeforeCompile = (shader) => {
      shader.defines = {
        ...shader.defines,
        USE_UV: "",
      }

      shader.fragmentShader = shader.fragmentShader.replace(
        "vec4 diffuseColor = vec4( diffuse, opacity );",
        `
        float distanceFromCenter = distance(vUv, vec2(0.5, 0.5));
        float alpha = opacity *  (1. - 2. * distanceFromCenter);
        alpha = smoothstep(0.0, 1.0, alpha);
        alpha = clamp(alpha, 0., 1.);
        vec4 diffuseColor = vec4( diffuse, alpha );
        `
      )
    }

    this.object = sheet.object(
      theatreKey,
      {
        color: types.rgba({ r: 0, g: 1, b: 0, a: 1 }),
        opacity: types.number(1, { nudgeMultiplier: 0.01, range: [0, 1] }),
      },
      { reconfigure: true }
    )

    this.object.onValuesChange(({ color, opacity }) => {
      this.color.set(color.toString())
      this.opacity = opacity
    })
  }
}

export class Glow extends GroupTheatre {
  constructor(theatreKey) {
    super(theatreKey + " /  matrix")

    this.geometry = new PlaneGeometry(1, 1, 1)
    this.material = new GlowMaterial(theatreKey + " / material")
    this.mesh = new Mesh(this.geometry, this.material)
    this.add(this.mesh)
  }
}
