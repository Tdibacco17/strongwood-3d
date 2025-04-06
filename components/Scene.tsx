'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import kitchenExample from '@/models/kitchenExample';
import KitchenRenderer from './KitchenRenderer';

export default function Scene() {
  return (
    <Canvas camera={{ position: [-6, 3.2, 10], fov: 30 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1} />
      <Suspense fallback={null}>
        <KitchenRenderer kitchenRender={kitchenExample} />
      </Suspense>
      <OrbitControls target={[3.41, 0.65, 0.66]} />
    </Canvas>
  );
}