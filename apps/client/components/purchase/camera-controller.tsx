import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo } from 'react'
import { SeatPosition } from '@components/purchase/index'
import { Vector3 } from 'three'

const degToRad = (degrees: number) => {
  return (degrees * Math.PI) / 180
}

interface CameraProps {
  selectedSeat: SeatPosition
}

const CameraController = ({ selectedSeat }: CameraProps) => {
  const { camera, gl } = useThree()
  const controls = useMemo(() => new OrbitControls(camera, gl.domElement), [])

  useEffect(() => {
    if (selectedSeat === SeatPosition.NOT_SELECTED) {
      camera.position.set(0, 150, 250)
      // camera.lookAt(0, 0, 0)
      controls.autoRotate = true
      controls.enabled = true
      controls.autoRotateSpeed = 0.5
      return () => {
        controls.dispose()
      }
    }

    controls.autoRotate = false
    controls.enabled = false

    if (selectedSeat === SeatPosition.NORTH) {
      camera.position.lerp(new Vector3(0, 200, 300), 0.1)
      camera.lookAt(0, 70, 0)
      camera.updateProjectionMatrix()
    }

    return () => {
      controls.dispose()
    }
  }, [camera, gl, selectedSeat])

  useFrame(() => {
    camera.lookAt(0, 70, 0)
    controls.update()
  })

  return null
}

export default CameraController