import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo, useState } from 'react'
import * as THREE from 'three'
import { Instances, Instance, Environment, Float, Line, Trail } from '@react-three/drei'
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing'
import { easing } from 'maath'

// Data Nodes - Instanced for performance
const DataNodes = ({ count = 25 }) => {
    const mesh = useRef()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    const nodes = useMemo(() => {
        const temp = []
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 15
            const y = (Math.random() - 0.5) * 10
            const z = (Math.random() - 0.5) * 10
            temp.push({ x, y, z, speed: Math.random() * 0.5 })
        }
        return temp
    }, [count])

    useFrame((state, delta) => {
        nodes.forEach((node, i) => {
            dummy.position.set(
                node.x + Math.sin(state.clock.elapsedTime * node.speed) * 0.5,
                node.y + Math.cos(state.clock.elapsedTime * node.speed) * 0.5,
                node.z
            )
            dummy.rotation.x += delta * node.speed
            dummy.rotation.y += delta * node.speed
            dummy.updateMatrix()
            mesh.current.setMatrixAt(i, dummy.matrix)
        })
        mesh.current.instanceMatrix.needsUpdate = true
    })

    return (
        <instancedMesh ref={mesh} args={[null, null, count]}>
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial color="#00f0ff" emissive="#00a0ff" emissiveIntensity={2} toneMapped={false} />
        </instancedMesh>
    )
}

// Connections/Pipelines
const Connections = () => {
    const points = useMemo(() => {
        const p = []
        for (let i = 0; i < 10; i++) {
            const curve = new THREE.CatmullRomCurve3([
                new THREE.Vector3((Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 10),
                new THREE.Vector3((Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5),
                new THREE.Vector3(0, 0, 0) // All converge to center
            ])
            p.push(curve)
        }
        return p
    }, [])

    return (
        <group>
            {points.map((curve, index) => (
                <Line
                    key={index}
                    points={curve.getPoints(50)}
                    color={index % 2 === 0 ? "#00f0ff" : "#555"}
                    opacity={0.3}
                    transparent
                    lineWidth={1}
                />
            ))}
        </group>
    )
}

const Rig = () => {
    const { camera, pointer } = useThree()
    useFrame((state, delta) => {
        easing.damp3(camera.position, [state.pointer.x * 2, state.pointer.y * 2, 10], 0.25, delta)
        camera.lookAt(0, 0, 0)
    })
    return null
}

export const HeroSystem = () => {
    return (
        <group>
            {/* Post Processing disabled for maximum performance */}-
            {/* <EffectComposer disableNormalPass multisampling={0}>
                <Bloom luminanceThreshold={1} intensity={1} radius={0.5} />
                <Vignette eskil={false} offset={0.1} darkness={1.1} />
            </EffectComposer> */}

            <ambientLight intensity={0.5} />

            <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                <DataNodes />
                <Connections />

                {/* Central Brain/Core */}
                <mesh>
                    <icosahedronGeometry args={[1.5, 2]} />
                    <meshStandardMaterial
                        color="#111"
                        wireframe
                        emissive="#00f0ff"
                        emissiveIntensity={0.1}
                    />
                </mesh>
                <mesh>
                    <icosahedronGeometry args={[1.4, 2]} />
                    <meshBasicMaterial color="#000" />
                </mesh>
            </Float>

            <Rig />
            <Environment preset="city" />
        </group>
    )
}
