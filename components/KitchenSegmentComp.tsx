'use client';

import { ComputedSegment, ModuleData } from "@/types/cocinaTypes";
import ModuleBlock from "./ModuleBlock";

export default function KitchenSegmentComp({
    position,
    rotation,
    pisoModules,
    alacenaModules,
    alturaBajo,
    separacionEntrePisos,
    tieneZocalo,
}: ComputedSegment) {
    let currentX_Piso = 0;
    let currentX_Alacena = 0;

    const totalWidth = pisoModules.reduce((sum, mod) => sum + mod.medidas.ancho, 0);
    const firstModuleProfundidad = pisoModules[0]?.medidas.profundidad ?? 0;
    const zocaloDepth = firstModuleProfundidad - 0.05;
    const zocaloZ = firstModuleProfundidad / 2 - 0.025;

    return (
        <group position={position} rotation={rotation}>
            {/* Zócalo: se dibuja si tieneZocalo > 0.Se posiciona de modo que su borde superior quede en Y = 0 */}
            {tieneZocalo > 0 && (
                <mesh position={[totalWidth / 2, -tieneZocalo / 2, zocaloZ]}>
                    <boxGeometry args={[totalWidth, tieneZocalo, zocaloDepth]} />
                    <meshStandardMaterial color="#cccccc" />
                </mesh>
            )}

            {/* PISO MODULES: Los módulos se ubican con su base en Y = 0 (sin sumar tieneZocalo) */}
            {pisoModules.map((mod, i) => {
                const { ancho, alto, profundidad } = mod.medidas;
                const x = currentX_Piso + ancho / 2;
                // Si alto > 0, la base es Y = 0, por lo tanto su centro es alto/2.
                // Si es "espacio" (alto 0) queda en 0.
                const y = alto > 0 ? alto / 2 : 0;
                // Posicionamos en Z para que el fondo (lado trasero) esté en Z = 0,
                // es decir, ponemos el objeto en Z = profundidad/2 (suponiendo modelo centrado).
                const z = profundidad / 2;
                currentX_Piso += ancho;

                return (
                    <ModuleBlock
                        key={`piso-${mod.id}-${i}`}
                        mueble={mod}
                        posicion={[x, y, z]}
                        rotacionY={0}
                    />
                );
            })}

            {/* ALACENAS: Ubicadas encima del piso y con su fondo apoyado en Z = 0 */}
            {alacenaModules.map((mod, i) => {
                const { ancho, alto, profundidad } = mod.medidas;
                const x = currentX_Alacena + ancho / 2;
                const y = alturaBajo + separacionEntrePisos + (alto > 0 ? alto / 2 : 0);
                const z = profundidad / 2;
                currentX_Alacena += ancho;

                return (
                    <ModuleBlock
                        key={`alacena-${mod.id}-${i}`}
                        mueble={mod}
                        posicion={[x, y, z]}
                        rotacionY={0}
                    />
                );
            })}
        </group>
    );
}
