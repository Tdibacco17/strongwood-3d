'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Suspense } from 'react';
import kitchenExample from '@/models/kitchenExample';
import KitchenRenderer from './KitchenRenderer';

export default function Scene() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [3, 2, 5], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <KitchenRenderer kitchenRender={kitchenExample} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}