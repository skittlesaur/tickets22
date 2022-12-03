import { useLoader } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { CLIENT_URL } from '@services/constants'
import { useMemo, useState } from 'react'
import { SeatPosition } from '@components/purchase/index'

interface PositionSelectorProps {
  seatPosition: SeatPosition
  setSeatPosition: (seatPosition: SeatPosition) => void
}

const PositionSelector = ({ seatPosition, setSeatPosition }: PositionSelectorProps) => {
  const [northHover, setNorthHover] = useState(false)
  const [southHover, setSouthHover] = useState(false)
  const [eastHover, setEastHover] = useState(false)
  const [westHover, setWestHover] = useState(false)

  const font = useLoader(FontLoader, `${CLIENT_URL}/fonts/qatar2022.json`)
  const config = useMemo(
    () => ({
      font: font,
      size: 16,
      height: 2,
    }),
    [font],
  )

  const getAngleRadians = (angle: number) => {
    return angle * (Math.PI / 180)
  }

  return (
    <>
      <group
        onPointerOver={() => setNorthHover(true)}
        onPointerOut={() => setNorthHover(false)}
        onClick={() => setSeatPosition(SeatPosition.NORTH)}
      >
        <mesh
          position={[40, 45, 80]}
          rotation={[0, getAngleRadians(180), 0]}
        >
          {/* @ts-ignore */}
          <textGeometry center args={['NORTH', config]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh
          position={[0, 45, 80]}
          rotation={[getAngleRadians(70), 0, 0]}
        >
          <boxBufferGeometry attach="geometry" args={[140, 60, 1]} />
          <meshPhongMaterial
            color="#00BFA6"
            opacity={seatPosition === SeatPosition.NORTH ? 0.6 : (northHover ? 0.3 : 0)}
            transparent
          />
        </mesh>
      </group>
      <group
        onPointerOver={() => setSouthHover(true)}
        onPointerOut={() => setSouthHover(false)}
        onClick={() => setSeatPosition(SeatPosition.SOUTH)}
      >
        <mesh
          position={[-40, 45, -50]}
          rotation={[0, 0, 0]}
        >
          {/* @ts-ignore */}
          <textGeometry center args={['SOUTH', config]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh
          position={[0, 45, -50]}
          rotation={[getAngleRadians(-60), 0, 0]}
        >
          <boxBufferGeometry attach="geometry" args={[140, 60, 1]} />
          <meshPhongMaterial
            color="#00BFA6"
            opacity={seatPosition === SeatPosition.SOUTH ? 0.6 : (southHover ? 0.3 : 0)}
            transparent
          />
        </mesh>
      </group>
      <group
        onPointerOver={() => setEastHover(true)}
        onPointerOut={() => setEastHover(false)}
        onClick={() => setSeatPosition(SeatPosition.EAST)}
      >
        <mesh
          position={[-80, 45, 40]}
          rotation={[0, getAngleRadians(90), 0]}
        >
          {/* @ts-ignore */}
          <textGeometry center args={['EAST', config]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh
          position={[-80, 40, 20]}
          rotation={[0, 0, getAngleRadians(-20)]}
        >
          <boxBufferGeometry attach="geometry" args={[100, 1, 140]} />
          <meshPhongMaterial
            color="#00BFA6"
            opacity={seatPosition === SeatPosition.EAST ? 0.6 : (eastHover ? 0.3 : 0)}
            transparent
          />
        </mesh>
      </group>
      <group
        onPointerOver={() => setWestHover(true)}
        onPointerOut={() => setWestHover(false)}
        onClick={() => setSeatPosition(SeatPosition.WEST)}
      >
        <mesh
          position={[80, 45, -20]}
          rotation={[0, getAngleRadians(-90), 0]}
        >
          {/* @ts-ignore */}
          <textGeometry center args={['WEST', config]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh
          position={[80, 40, 20]}
          rotation={[0, 0, getAngleRadians(20)]}
        >
          <boxBufferGeometry attach="geometry" args={[100, 1, 140]} />
          <meshPhongMaterial
            color="#00BFA6"
            opacity={seatPosition === SeatPosition.WEST ? 0.6 : (westHover ? 0.3 : 0)}
            transparent
          />
        </mesh>
      </group>
    </>
  )
}

export default PositionSelector