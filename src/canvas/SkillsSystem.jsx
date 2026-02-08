import { useScroll, Text, Float, RoundedBox } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { useState, useRef } from 'react'
import * as THREE from 'three'


const SkillNode = ({ position, color, label, delay = 0 }) => {
    const [hovered, setHover] = useState(false)

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
            <group position={position}>
                <RoundedBox
                    args={[2.5, 1, 0.2]}
                    radius={0.05}
                    smoothness={4}
                    onPointerOver={() => setHover(true)}
                    onPointerOut={() => setHover(false)}
                >
                    <meshStandardMaterial
                        color={hovered ? "#00f0ff" : "#1a1a1a"}
                        emissive={hovered ? "#00f0ff" : "#000"}
                        emissiveIntensity={hovered ? 0.5 : 0}
                        roughness={0.2}
                        metalness={0.8}
                        side={THREE.DoubleSide}
                    />
                </RoundedBox>
                <Text
                    position={[0, 0, 0.11]}
                    fontSize={0.3}
                    color={hovered ? "#000" : "#fff"}
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>
            </group>
        </Float>
    )
}

export const SkillsSystem = () => {
    const scroll = useScroll()
    const group = useRef()
    const { viewport } = useThree()

    useFrame(() => {
        // Move the group up as we scroll down
        // Section 2 (Skills) starts around scroll page 2
        // We want it to be visible when scroll.offset is around 0.4 - 0.5
        const visibleRange = scroll.range(2 / 5, 1 / 5)
        // Logic can be refined. For now, place it physically at y = -viewport.height * 2
    })

    return (
        <group ref={group} position={[0, -viewport.height * 2, 0]}>
            <Text
                position={[-4, 3, 0]}
                fontSize={1}
                color="#00f0ff"
                anchorX="left"
                anchorY="middle"
            >
                SYSTEM CAPABILITIES
            </Text>

            {/* Programming Languages */}
            <SkillNode position={[-4, 1, 0]} label="Python (Systems)" />
            <SkillNode position={[-1, 1.5, 0.5]} label="JavaScript (ES6+)" />
            <SkillNode position={[2, 1, -0.5]} label="PHP (Backend logic)" />
            <SkillNode position={[5, 1.5, 0]} label="SQL (Data Structure)" />

            {/* Frameworks */}
            <SkillNode position={[-3, -0.5, 0.5]} label="React / R3F" />
            <SkillNode position={[0, -0.5, -1]} label="Node.js" />
            <SkillNode position={[3, -0.5, 0]} label="MySQL / Supabase" />

            {/* Data & Tools */}
            <SkillNode position={[-2, -2, 0]} label="Pandas / NumPy" />
            <SkillNode position={[2, -2, 0.5]} label="Git / CI/CD" />

            {/* Connecting Lines - Visualizing interconnectedness */}
            {/* Could add Line components here connecting the nodes */}
        </group>
    )
}
