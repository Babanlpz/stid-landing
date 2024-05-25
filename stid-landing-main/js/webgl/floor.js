import { GridHelper, Group } from "three"
import { config } from "./config"
import { PostProcessing } from "./post-processing"

export class Floor extends Group {
  constructor() {
    super()

    const tiles = 100
    const step = 2

    const size = tiles * step
    const divisions = tiles
    this.grid = new GridHelper(size, divisions, config.lines, config.lines)
    this.add(this.grid)

    PostProcessing.bloomEffect.selection.add(this.grid)

    console.log(this.grid)
  }
}
