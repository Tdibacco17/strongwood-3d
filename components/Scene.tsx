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


// 'use client';

// import { Canvas, useFrame } from '@react-three/fiber';
// import { OrbitControls, useGLTF } from '@react-three/drei';
// import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
// import * as THREE from 'three';

// function AutoScaledInstance({ position }: { position: [number, number, number] }) {
//   const gltf = useGLTF('/models/bajo.glb');
//   const [scaleFactor, setScaleFactor] = useState<[number, number, number]>([1, 1, 1]);

//   const scene = useMemo(() => gltf.scene.clone(), [gltf.scene]);

//   useEffect(() => {
//     const bbox = new THREE.Box3().setFromObject(scene);
//     const size = new THREE.Vector3();
//     bbox.getSize(size);

//     const targetWidth = 1;
//     const factor = targetWidth / size.x;

//     setScaleFactor([factor, factor, factor]); // escala uniforme
//   }, [scene]);

//   return (
//     <primitive
//       object={scene}
//       position={position}
//       scale={scaleFactor}
//       dispose={null}
//     />
//   );
// }

// export default function TwoAutoScaledCubes() {
//   return (
//     <Canvas camera={{ position: [-3, 2, 5], fov: 35 }}>
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[5, 10, 5]} intensity={1} />

//       <Suspense fallback={null}>
//         <AutoScaledInstance position={[0, 0, 0]} />
//         <AutoScaledInstance position={[1, 0, 0]} />
//       </Suspense>

//       <OrbitControls target={[1, 0.5, 0]} />
//     </Canvas>
//   );
// }

// useGLTF.preload('/models/bajo.glb');
