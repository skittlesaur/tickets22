import { Canvas, useFrame } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { useEffect, useState } from 'react'
import { Vector3 } from 'three'
import { CLIENT_URL } from '@services/constants'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { OrbitControls, Stars } from '@react-three/drei'
import { SeatPosition } from '@components/purchase/index'

const cameraProps: { [key: string]: any } = {
  not_selected: {
    position: [0, 170, 250],
    lookAt: [0, 0, 0],
  },
  north: {
    position: [0, 25, 40],
    lookAt: [0, 20, 0],
  },
  south: {
    position: [0, 25, 10],
    lookAt: [-5, 20, 100],
  },
  east: {
    position: [20, 25, 15],
    lookAt: [100, 20, 15],
  },
  west: {
    position: [-20, 25, 15],
    lookAt: [-100, 20, 12],
  },
}

interface StadiumProps {
  seatPosition: SeatPosition
}

const Stadium = ({ seatPosition }: StadiumProps) => {
  const [model, setModel] = useState<any>()

  useEffect(() => {
    new MTLLoader().load(`${CLIENT_URL}/3d/stadium.mtl`, (materials) => {
      materials.preload()
      new OBJLoader().setMaterials(materials).load(`${CLIENT_URL}/3d/stadium.obj`, (model) => {
        model.position.set(0, 0, 0)
        setModel(model)
      })
    })
  }, [])

  if (!model) return <></>

  const Camera = () => {
    const [animation, setAnimation] = useState(false)
    const [lastAnimationPosition, setLastAnimationPosition] = useState<any>()
    const [step, setStep] = useState(0)
    const [position, setPosition] = useState<any>()
    const [lookAt, setLookAt] = useState<any>()


    useFrame(state => {
      if (!position) return

      if (animation) {
        if (seatPosition === SeatPosition.NOT_SELECTED
          && step > 50
          && lastAnimationPosition === state.camera.position
        ) {
          setAnimation(false)
        }
        setLastAnimationPosition(state.camera.position)
        setStep(step + 1)
        state.camera.position.lerp(new Vector3(position.x, position.y, position.z), .05)
        state.camera.lookAt(new Vector3(lookAt.x, lookAt.y, lookAt.z))
      }
    })

    useEffect(() => {
      const key = Object.keys(SeatPosition)[Object.values(SeatPosition).indexOf(seatPosition)]
      const { position, lookAt } = cameraProps[key.toLowerCase()]
      setPosition({
        x: position[0],
        y: position[1],
        z: position[2],
      })
      setLookAt({
        x: lookAt[0],
        y: lookAt[1],
        z: lookAt[2],
      })
      setStep(0)
      setAnimation(true)
    }, [seatPosition])

    return (
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={seatPosition === SeatPosition.NOT_SELECTED}
        autoRotate={seatPosition === SeatPosition.NOT_SELECTED}
        autoRotateSpeed={0.5}
      />
    )
  }

  return (
    <Canvas
      shadows
    >
      <Camera />
      <ambientLight intensity={.5} />
      <spotLight position={[10, 15, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -15, -10]} />
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade />
      <mesh>
        <primitive
          position={[0, -30, 0]}
          object={model}
        />
      </mesh>
    </Canvas>
  )
}

export default Stadium