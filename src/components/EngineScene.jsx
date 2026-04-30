import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useControls } from 'leva'

function EngineModel({ scrollProgress }) {
  const { scene } = useGLTF('/engine.glb')

  const { explosionStrength, lerpSpeed } = useControls({
    explosionStrength: { value: 6, min: 2, max: 20, step: 0.5 },
    lerpSpeed: { value: 10, min: 0.1, max: 20, step: 0.1 },
  })

  const data = useMemo(() => {
    if (!scene) return null

    // Scale to fit
    const box = new THREE.Box3().setFromObject(scene)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)
    if (maxDim > 0) {
      const s = 6 / maxDim
      scene.scale.setScalar(s)
      const center = new THREE.Vector3()
      box.getCenter(center)
      scene.position.set(
        -center.x * s,
        -center.y * s,
        -center.z * s
      )
    }

    // Collect all meshes
    const allMeshes = []
    scene.traverse((child) => {
      if (child.isMesh) allMeshes.push(child)
    })

    // Group into 20 spatial clusters
    const meshGroups = Array.from({ length: 20 }, () => [])
    const center = new THREE.Vector3()
    new THREE.Box3().setFromObject(scene).getCenter(center)

    allMeshes.forEach((mesh) => {
      const pos = new THREE.Vector3()
      mesh.getWorldPosition(pos)
      const angle = Math.atan2(pos.z - center.z, pos.x - center.x)
      const verticalBand = pos.y > center.y ? 0 : 1
      const gi = Math.floor(((angle + Math.PI) / (Math.PI * 2)) * 10) + verticalBand * 10
      meshGroups[Math.min(Math.max(gi, 0), 19)].push(mesh)
    })

    const targets = meshGroups.map(() => ({
      x: (Math.random() - 0.5) * 6,
      y: (Math.random() - 0.5) * 6 + Math.random() * 2,
      z: (Math.random() - 0.5) * 6,
      rx: (Math.random() - 0.5) * Math.PI * 2,
      ry: (Math.random() - 0.5) * Math.PI * 2,
      rz: (Math.random() - 0.5) * Math.PI * 2,
    }))

    const origins = meshGroups.map((group) => {
      const avg = new THREE.Vector3()
      if (group.length === 0) return avg
      group.forEach((m) => {
        const p = new THREE.Vector3()
        m.getWorldPosition(p)
        avg.add(p)
      })
      avg.divideScalar(group.length)
      return avg
    })

    return { meshGroups, targets, origins }
  }, [scene])

  useFrame((_, delta) => {
    if (!data) return
    const { meshGroups, targets, origins } = data
    const speed = lerpSpeed

    meshGroups.forEach((group, i) => {
      if (group.length === 0) return
      const exploding = scrollProgress > 0.02
      const tx = exploding ? targets[i].x * (explosionStrength / 6) : origins[i].x
      const ty = exploding ? targets[i].y * (explosionStrength / 6) : origins[i].y
      const tz = exploding ? targets[i].z * (explosionStrength / 6) : origins[i].z
      const target = new THREE.Vector3(tx, ty, tz)

      group.forEach((mesh) => {
        mesh.position.lerp(target, speed * delta)
        mesh.rotation.x = THREE.MathUtils.lerp(
          mesh.rotation.x,
          scrollProgress * (targets[i].rx || 0),
          speed * delta
        )
        mesh.rotation.y = THREE.MathUtils.lerp(
          mesh.rotation.y,
          scrollProgress * (targets[i].ry || 0),
          speed * delta
        )
      })
    })

    if (scrollProgress < 0.05) {
      scene.rotation.y += delta * 0.15
    }
  })

  return <primitive object={scene} />
}

export default function EngineScene({ scrollProgress }) {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      width: '100%',
      height: '100vh',
      background: '#000'
    }}>
      <Canvas
        camera={{ position: [0, 2, 12], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#ffffff" />
        <directionalLight position={[-8, 5, -5]} intensity={0.6} color="#ff4444" />
        <pointLight position={[0, -5, 0]} intensity={0.8} color="#EF9F27" />
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color="#E24B4A" />
          </mesh>
        }>
          <EngineModel scrollProgress={scrollProgress} />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
