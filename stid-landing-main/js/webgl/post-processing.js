import { types } from "@theatre/core"
import {
  BlendFunction,
  EffectComposer,
  EffectPass,
  RenderPass,
  SelectiveBloomEffect
} from "postprocessing"

import { HalfFloatType } from "three"
import { Camera } from "./camera"
import { sheet } from "./theatre"

class __PostProcessing {
  init({ renderer, scene, camera }) {
    this.renderer = renderer
    this.scene = scene
    this.camera = camera

    const isWebgl2 = this.renderer.capabilities.isWebGL2
    const dpr = window.devicePixelRatio
    const maxSamples = this.renderer.capabilities.maxSamples
    const needsAA = dpr < 2

    this.composer = new EffectComposer(this.renderer, {
      frameBufferType: HalfFloatType,
      multisampling: isWebgl2 && needsAA ? maxSamples : 0,
    })

    this.bloomEffect = new SelectiveBloomEffect(this.scene, this.camera, {
      blendFunction: BlendFunction.SCREEN,
    })
    this.bloomEffect.ignoreBackground = true

    this.bloomTheatre = sheet.object(
      "postprocessing / bloom",
      {
        intensity: types.number(2, { range: [0, 10], nudgeMultiplier: 0.01 }),
        // radius: types.number(0.85, { range: [0, 1], nudgeMultiplier: 0.01 }),
        resolution: types.number(720, {
          range: [256, 1024],
          nudgeMultiplier: 1,
        }),
        // luminance: {
        //   filter: false,
        //   threshold: types.number(0.7, {
        //     range: [0, 1],
        //     nudgeMultiplier: 0.01,
        //   }),
        //   smoothing: types.number(0.3, {
        //     range: [0, 1],
        //     nudgeMultiplier: 0.01,
        //   }),
        // },
      },
      {
        reconfigure: true,
      }
    )

    this.bloomTheatre.onValuesChange(({ intensity, resolution }) => {
      this.bloomEffect.intensity = intensity
      // this.bloomEffect.mipmapBlurPass.radius = radius
      this.bloomEffect.resolution.width = resolution
      this.bloomEffect.luminancePass.enabled = false
      // this.bloomEffect.luminanceMaterial.threshold = luminance.threshold
      // this.bloomEffect.luminanceMaterial.smoothing = luminance.smoothing
    })

    this.renderPass = new RenderPass(this.scene, this.camera)
    this.bloomPass = new EffectPass(this.camera, this.bloomEffect)

    this.composer.addPass(this.renderPass)
    this.composer.addPass(this.bloomPass)
  }

  destroy() {
    this.composer.dispose()
  }

  resize(width, height) {
    this.composer.setSize(width, height)

    this.renderer.render(this.scene, Camera.object)
  }

  render() {
    this.composer.render()
  }
}

export const PostProcessing = new __PostProcessing()
