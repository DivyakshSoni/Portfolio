import { useScroll, Text, Float, Line } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

const ExperienceNode = ({ position, label, subLabel, year }) => {
    return (
        <group position={position}>
            <mesh>
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} />
            </mesh>
            <Text
                position={[0.5, 0.2, 0]}
                fontSize={0.3}
                color="#fff"
                anchorX="left"
                anchorY="bottom"
            >
                {label}
            </Text>
            <Text
                position={[0.5, -0.1, 0]}
                fontSize={0.2}
                color="#ccc"
                anchorX="left"
                anchorY="top"
            >
                {subLabel} | {year}
            </Text>
            {/* Vertical line dropping down */}
            <mesh position={[0, -1, 0]}>
                <cylinderGeometry args={[0.02, 0.02, 2, 8]} />
                <meshBasicMaterial color="#333" />
            </mesh>
        </group>
    )
}

export const TimelineSystem = () => {
    const scroll = useScroll()
    const group = useRef()
    const { viewport } = useThree()

    useFrame(() => {
        // Position at the last section (Experience)
        // Adjust Y based on scroll to bring it into view
        // The overlay has 5 sections. Experience is the last one.
    })

    const points = useMemo(() => {
        return [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(0, -2, 0),
            new THREE.Vector3(0, -4, 0),
            new THREE.Vector3(0, -6, 0)
        ]
    }, [])

    return (
        // Positioned deep down in the scroll, around y = -viewport.height * 4
        <group ref={group} position={[-2, -viewport.height * 4, 0]}>
            <Line points={points} color="#333" lineWidth={2} />

            <ExperienceNode position={[0, 0, 0]} label="Data Analyst Intern" subLabel="Cognifyz Tech" year="2024" />
            <ExperienceNode position={[0, -2, 0]} label="PHP Intern" subLabel="Splixcube IT" year="2020-23" />
            <ExperienceNode position={[0, -4, 0]} label="Co-Founder & OPS" subLabel="Kreativy" year="2023-25" />
        </group>
    )
}
