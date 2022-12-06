import { Canvas } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useLoader } from '@react-three/fiber'
import { CLIENT_URL } from '@services/constants'
import { AxesHelper, TextureLoader } from 'three'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { PresentationControls, Stage } from '@react-three/drei'
import PositionSelector from '@components/purchase/position-selector'
import { Suspense, useEffect, useState } from 'react'
import CameraController from '@components/purchase/camera-controller'
import { SeatPosition } from '@components/purchase/index'

const Stadium = () => {
  const [model, setModel] = useState<any>()

  const loadModel = () => {
    const textureLoader = new TextureLoader()
    const mapImage = textureLoader.load(`${CLIENT_URL}/3d/stadium.jpg`)

    const mtlLoader = new MTLLoader()
    mtlLoader.load(`${CLIENT_URL}/3d/stadium.mtl`, (materials) => {
      materials.preload()
      const objLoader = new OBJLoader()
      objLoader.setMaterials(materials)
      objLoader.load(`${CLIENT_URL}/3d/stadium.obj`, (object) => {
        object.traverse((child: any) => {
          if (child.isMesh) {
            child.material.map = mapImage
          }
        })
        setModel(object)
      })
    })
  }

  useEffect(() => {
    loadModel()
  }, [])

  // const materials = useLoader(MTLLoader, `${CLIENT_URL}/3d/stadium.mtl`)
  // const obj = useLoader(OBJLoader, `${CLIENT_URL}/3d/stadium.obj`, (loader) => {
  //   materials.preload()
  //   loader.setMaterials(materials)
  // })

  return (
    <Canvas
      shadows
    >
      <CameraController
        selectedSeat={SeatPosition.NOT_SELECTED}
      />
      <primitive object={new AxesHelper(200)} />
      <primitive
        object={model}
        scale={[1, 1, 1]}
        castShadows
      />
      <Stage
        environment="studio"
      />
    </Canvas>
  )
}

export default Stadium