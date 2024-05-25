import { getProject, types } from "@theatre/core"
import { Group } from "three"
import theatreState from "../../config/STid.theatre-project-state (9).json"

if (process.env.NODE_ENV === "development") {
  import("@theatre/studio").then(({ default: studio }) => {
      studio.initialize()
      studio.ui.restore()
  })
}

const project = getProject("STid", { state: theatreState })
export const sheet = project.sheet("STid")

export class GroupTheatre extends Group {
  constructor(theatreKey) {
    super()

    this.matrixAutoUpdate = false

    this.object = sheet.object(
      theatreKey,
      {
        position: {
          x: types.number(0, { nudgeMultiplier: 0.01 }),
          y: types.number(0, { nudgeMultiplier: 0.01 }),
          z: types.number(0, { nudgeMultiplier: 0.01 }),
        },
        scale: {
          x: types.number(1, { nudgeMultiplier: 0.01 }),
          y: types.number(1, { nudgeMultiplier: 0.01 }),
          z: types.number(1, { nudgeMultiplier: 0.01 }),
        },
        rotation: {
          x: types.number(0, { nudgeMultiplier: 0.01 }),
          y: types.number(0, { nudgeMultiplier: 0.01 }),
          z: types.number(0, { nudgeMultiplier: 0.01 }),
        },
        // visible: types.boolean(true),
      },
      { reconfigure: true }
    )
    this.object.onValuesChange(({ position, scale, rotation, visible }) => {
      this.position.set(position.x, position.y, position.z)
      this.scale.set(scale.x, scale.y, scale.z)
      this.rotation.set(rotation.x, rotation.y, rotation.z)
      // this.visible = visible

      this.updateMatrix()
    })
  }
}
