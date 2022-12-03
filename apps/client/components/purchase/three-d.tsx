import { Canvas, useLoader } from '@react-three/fiber'
import { PresentationControls, Stage } from '@react-three/drei'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { CLIENT_URL } from '@services/constants'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { TextureLoader } from 'three'
import { extend } from '@react-three/fiber'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
import PositionSelector from '@components/purchase/position-selector'
import { SeatPosition } from '@components/purchase/index'

extend({ TextGeometry })

interface ThreeDProps {
  seatPosition: SeatPosition
  setSeatPosition: (seatPosition: SeatPosition) => void
}

const ThreeD = ({ seatPosition, setSeatPosition }: ThreeDProps) => {
  const [model, setModel] = useState<any>()

  const loadModel = () => {
    const textureLoader = new TextureLoader()
    const mapImage = textureLoader.load(`${CLIENT_URL}/3d/stadium.jpg`)

    const mtlLoader = new MTLLoader()
    mtlLoader.load(`${CLIENT_URL}/3d/stadium.mtl`, (materials) => {
      materials.preload()
      const objLoader = new OBJLoader()
      objLoader.setMaterials(materials)
      objLoader.load(`${CLIENT_URL}/3d/stadium2.obj`, (object) => {
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

  return (
    <Canvas
      camera={{ position: [-80, 60, 200], fov: 75, zoom: 1 }}
    >
      <Suspense fallback={null}>
        <Stage>
          <PresentationControls
            global
          >
            <pointLight
              color="white"
              intensity={1}
            />
            <PositionSelector
              seatPosition={seatPosition}
              setSeatPosition={setSeatPosition}
            />
            {model && <primitive
              position={[0, 0, 0]}
              scale={[1, 1, 1]}
              object={model}
            />}
          </PresentationControls>
        </Stage>
      </Suspense>
    </Canvas>
  )
}

export default ThreeD