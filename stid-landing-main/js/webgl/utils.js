import { LinearEncoding, LinearMipmapLinearFilter, TextureLoader } from "three"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { KTX2Loader } from "three/examples/jsm/loaders/KTX2Loader.js"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js"
import { WebGL } from "."
import { Viewport } from "../viewport"

let textureLoader
let objLoader
let gltfLoader
let dracoLoader
let ktx2Loader

export async function loadGLTF(url) {
  if (!gltfLoader) {
    gltfLoader = new GLTFLoader()
  }

  if (!dracoLoader) {
    dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("https://res.cloudinary.com/df7vlavbp/raw/upload/stid/cdn/decoders/draco/")
    gltfLoader.setDRACOLoader(dracoLoader)
  }

  return new Promise((resolve, reject) => {
    gltfLoader.load(url, (gltf) => {
      resolve(gltf)
    })
  })
}

export async function loadOBJ(url) {
  if (!objLoader) {
    objLoader = new OBJLoader()
  }

  return new Promise((resolve, reject) => {
    objLoader.load(url, (object) => {
      resolve(object)
    })
  })
}

export async function loadTexture(url) {
  if (!textureLoader) {
    textureLoader = new TextureLoader()
  }

  return new Promise((resolve, reject) => {
    textureLoader.load(url, (texture) => {
      resolve(texture)

      texture.encoding = LinearEncoding
      texture.magFilter = LinearMipmapLinearFilter
      texture.minFilter = LinearMipmapLinearFilter
    })
  })
}

export async function loadKTX2(url, renderer) {
  if (!ktx2Loader) {
    ktx2Loader = new KTX2Loader()
    ktx2Loader.setTranscoderPath("https://res.cloudinary.com/df7vlavbp/raw/upload/stid/cdn/decoders/basis/")
    ktx2Loader.detectSupport(WebGL.renderer)
  }

  return new Promise((resolve, reject) => {
    ktx2Loader.load(url, (texture) => {
      texture.encoding = LinearEncoding
      texture.magFilter = LinearMipmapLinearFilter
      texture.minFilter = LinearMipmapLinearFilter
      texture.flipY = false
      resolve(texture)
    })
  })
}

export function getScreenCoordinates(position) {
  const screenPosition = position.clone().project(WebGL.camera)
  screenPosition.x =
    Viewport.width / 2 + (Viewport.width / 2) * screenPosition.x
  screenPosition.y =
    Viewport.height / 2 - (Viewport.height / 2) * screenPosition.y

  return screenPosition
}
