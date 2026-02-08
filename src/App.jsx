import { ScrollControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Overlay } from './components/Overlay'
import Navbar from './components/Navbar'
import { HeroSystem } from './canvas/HeroSystem'
import { SkillsSystem } from './canvas/SkillsSystem'
import { TimelineSystem } from './canvas/TimelineSystem'

function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Navbar Component with Full Redirection */}
      <Navbar />

      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 15], fov: 45 }}
        style={{ width: '100%', height: '100%', background: 'var(--color-bg)' }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={8} damping={0} style={{ scrollbarWidth: 'none' }}>
            {/* HTML Overlay */}
            <Overlay />

            {/* 3D Scene Layers */}
            <HeroSystem />
            <SkillsSystem />
            <TimelineSystem />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
