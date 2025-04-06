'use client';

// import { useGLTF } from '@react-three/drei';
import { ModuleData } from '@/types/cocinaTypes';
// import { useMemo } from 'react';

type MuebleProps = {
  mueble: ModuleData;
  posicion: [number, number, number];
  rotacionY?: number;
  esIsla?: boolean;
};

export default function ModuleBlock({ mueble, posicion, rotacionY = 0 }: MuebleProps) {
  // const gltf = useGLTF(`/models/${mueble.modelo}.glb`);

  // Clonamos el objeto para evitar que todos compartan el mismo
  // const clonedScene = useMemo(() => gltf.scene.clone(), [gltf.scene]);
  if (mueble.tipo === "espacio") return null;

  return (
    // <primitive
    //   object={clonedScene}
    //   position={posicion}
    //   rotation={[0, rotacionY, 0]}
    //   scale={[
    //     mueble.medidas.ancho,
    //     mueble.medidas.alto,
    //     mueble.medidas.profundidad
    //   ]}
    //   dispose={null}
    // />

    <mesh position={posicion} rotation={[0, rotacionY, 0]}>
      <boxGeometry
        args={[
          mueble.medidas.ancho,
          mueble.medidas.alto,
          mueble.medidas.profundidad
        ]}
      />
      <meshStandardMaterial color="#ffffff" />
    </mesh>
  );
}

// useGLTF.preload('/models/cube.glb');
