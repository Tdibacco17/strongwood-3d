import { ComputedSegment, KitchenModuleData, KitchenSegmentInput, ModuleData } from "@/types/cocinaTypes";

const computeTotalWidth = (modules: ModuleData[]): number =>
    modules.reduce((sum, mod) => sum + mod.medidas.ancho, 0);

type PosInicial = "frente" | "izquierdo" | "derecho" | "fondo";

function getSegmentTransform(
    posicion: PosInicial,
    anchoBase: number, // ancho total del segmento 0
    profundidadBase: number, // profundidad del segmento 0
    anchoSegmento: number // ancho del segmento actual (a ubicar)
): { position: [number, number, number], rotation: [number, number, number] } {
    switch (posicion) {
        case 'frente':
            return { position: [0, 0, 0], rotation: [0, 0, 0] };
        case 'izquierdo':
            return {
                position: [0, 0, profundidadBase + anchoSegmento],
                rotation: [0, Math.PI / 2, 0],
            };
        case 'derecho':
            return {
                position: [anchoBase, 0, profundidadBase],
                rotation: [0, -Math.PI / 2, 0],
            };
        case 'fondo':
            return {
                position: [0, 0, -profundidadBase],
                rotation: [0, Math.PI, 0],
            };
        default:
            return { position: [0, 0, 0], rotation: [0, 0, 0] };
    }
}

export function computeKitchenSegments(layoutInput: KitchenModuleData): ComputedSegment[] {
    const { tipo: layoutType, segmentos, pasillo = 1 } = layoutInput;

    if (layoutType === "lineal") {
        const seg = segmentos[0];
        const anchoSeg = computeTotalWidth(seg.pisoModules);
        const profSeg = seg.pisoModules[0]?.medidas.profundidad ?? 0;

        const { position, rotation } = getSegmentTransform(
            seg.posicionInicial ?? "frente",
            0, // ancho base acumulado: 0 porque es el primero
            profSeg,
            anchoSeg
        );

        return [
            {
                position,
                rotation,
                pisoModules: seg.pisoModules,
                alacenaModules: seg.alacenaModules,
                alturaBajo: seg.alturaBajo ?? 0.8,
                separacionEntrePisos: seg.separacionEntrePisos ?? 0.6,
                tieneZocalo: seg.tieneZocalo ?? 0,
            },
        ];
    }

    if (layoutType === "L") {
        const [base, lateral] = segmentos;

        const anchoBase = computeTotalWidth(base.pisoModules);
        const anchoLateral = computeTotalWidth(lateral.pisoModules);
        const profBase = base.pisoModules[0]?.medidas.profundidad ?? 0;
        const profLateral = lateral.pisoModules[0]?.medidas.profundidad ?? 0;

        const frente: ComputedSegment = {
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            pisoModules: base.pisoModules,
            alacenaModules: base.alacenaModules,
            alturaBajo: base.alturaBajo ?? 0.8,
            separacionEntrePisos: base.separacionEntrePisos ?? 0.6,
            tieneZocalo: base.tieneZocalo ?? 0,
        };

        const { position, rotation } = getSegmentTransform(
            lateral.posicionInicial ?? "izquierdo",
            anchoBase,
            profBase,
            anchoLateral
        );

        // Ajuste por esquina (adelante / atras)
        const finalPosition = [...position] as [number, number, number];
        const ajuste = lateral.ajusteEsquina;

        if (lateral.posicionInicial === "derecho") {
            if (ajuste === "adelante") {
                // finalPosition[2];
            } else if (ajuste === "atras") {
                finalPosition[0] += profLateral;
                finalPosition[2] -= profBase;
            }
        }

        if (lateral.posicionInicial === "izquierdo") {
            if (ajuste === "adelante") {
                // finalPosition[2] += profBase;
            } else if (ajuste === "atras") {
                finalPosition[0] += -profLateral;
                finalPosition[2] -= profBase;
            }
        }

        const lateralSegment: ComputedSegment = {
            position: finalPosition,
            rotation,
            pisoModules: lateral.pisoModules,
            alacenaModules: lateral.alacenaModules,
            alturaBajo: lateral.alturaBajo ?? 0.8,
            separacionEntrePisos: lateral.separacionEntrePisos ?? 0.6,
            tieneZocalo: base.tieneZocalo ?? 0
        };

        return [frente, lateralSegment];
    }

    if (layoutType === "U") {
        const [base, lateral1, lateral2] = segmentos;

        const anchoBase = computeTotalWidth(base.pisoModules);
        const anchoLat1 = computeTotalWidth(lateral1.pisoModules);
        const profBase = base.pisoModules[0]?.medidas.profundidad ?? 0;
        const profLat1 = lateral1.pisoModules[0]?.medidas.profundidad ?? 0;

        // Segmento frente
        const frente: ComputedSegment = {
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            pisoModules: base.pisoModules,
            alacenaModules: base.alacenaModules,
            alturaBajo: base.alturaBajo ?? 0.8,
            separacionEntrePisos: base.separacionEntrePisos ?? 0.6,
            tieneZocalo: base.tieneZocalo ?? 0,
        };

        // Segmento lateral 1 (izquierdo o derecho)
        const { position: pos1, rotation: rot1 } = getSegmentTransform(
            lateral1.posicionInicial ?? "izquierdo",
            anchoBase,
            profBase,
            anchoLat1
        );

        const finalPos1 = [...pos1] as [number, number, number];
        const ajuste1 = lateral1.ajusteEsquina;

        if (lateral1.posicionInicial === "derecho") {
            if (ajuste1 === "adelante") {
                // nada, queda como está
            } else if (ajuste1 === "atras") {
                finalPos1[0] += profLat1;
                finalPos1[2] -= profBase;
            }
        }

        if (lateral1.posicionInicial === "izquierdo") {
            if (ajuste1 === "adelante") {
                // nada, queda como está
            } else if (ajuste1 === "atras") {
                finalPos1[0] += -profLat1;
                finalPos1[2] -= profBase;
            }
        }

        const lateralSegment1: ComputedSegment = {
            position: finalPos1,
            rotation: rot1,
            pisoModules: lateral1.pisoModules,
            alacenaModules: lateral1.alacenaModules,
            alturaBajo: lateral1.alturaBajo ?? 0.8,
            separacionEntrePisos: lateral1.separacionEntrePisos ?? 0.6,
            tieneZocalo: base.tieneZocalo ?? 0,
        };


        // ahora dependiendo de:
        // lateral1.posicionInicial y lateral2.posicionInicial
        // calculamos la posición y rotación de lateral2

        const posicion1 = lateral1.posicionInicial ?? "izquierdo";
        const posicion2 = lateral2.posicionInicial ?? "derecho";

        // caso 1: lateral1 = izquierdo, lateral2 = derecho
        // caso 2: lateral1 = izquierdo, lateral2 = izquierdo
        // caso 3: lateral1 = derecho, lateral2 = izquierdo
        // caso 4: lateral1 = derecho, lateral2 = derecho

        // if (posicion1 === "izquierdo" && posicion2 === "derecho") { ... }
        // if (posicion1 === "izquierdo" && posicion2 === "izquierdo") { ... }
        // if (posicion1 === "derecho" && posicion2 === "izquierdo") { ... }
        // if (posicion1 === "derecho" && posicion2 === "derecho") { ... }

        // para cada uno hacemos su `position: [x, y, z]` y `rotation: [0, rotY, 0]`
        if (posicion1 === "izquierdo" && posicion2 === "derecho") {
            const rot2: [number, number, number] = [0, -Math.PI / 2, 0];
            const profLat2 = lateral2.pisoModules[0]?.medidas.profundidad ?? 0;
            const ajuste2 = lateral2.ajusteEsquina;

            const pos2: [number, number, number] = [
                anchoBase,
                0,
                profBase,
            ];

            if (ajuste2 === "atras") {
                pos2[0] += profLat2;
                pos2[2] -= profBase;
            }

            const lateralSegment2: ComputedSegment = {
                position: pos2,
                rotation: rot2,
                pisoModules: lateral2.pisoModules,
                alacenaModules: lateral2.alacenaModules,
                alturaBajo: lateral2.alturaBajo ?? 0.8,
                separacionEntrePisos: lateral2.separacionEntrePisos ?? 0.6,
                tieneZocalo: base.tieneZocalo ?? 0,
            };

            return [frente, lateralSegment1, lateralSegment2];
        }

    }

    return [];
}

// if (layoutType === "lineal") {
//     const seg = segmentos[0];
//     return [
//         {
//             position: [0, 0, 0],
//             rotation: [0, 0, 0],
//             pisoModules: seg.pisoModules,
//             alacenaModules: seg.alacenaModules,
//             alturaBajo: seg.alturaBajo ?? 0.8,
//             separacionEntrePisos: seg.separacionEntrePisos ?? 0.6,
//             tieneZocalo: seg.tieneZocalo ?? 0,
//         },
//     ];
// }

// if (layoutType === "L") {
//     const [base, vertical] = segmentos;
//     const anchoBase = computeTotalWidth(base.pisoModules);

//     const profVertical = vertical.pisoModules[0]?.medidas.profundidad ?? 0;
//     const profFinalBase = base.pisoModules.at(-1)?.medidas.profundidad ?? 0;

//     let zOffset = 0;

//     if (vertical.ajusteEsquina === "adelante") {
//         zOffset = profFinalBase / 2;
//     } else if (vertical.ajusteEsquina === "atras") {
//         zOffset = -profFinalBase / 2;
//     }

//     return [
//         {
//             position: [0, 0, 0],
//             rotation: [0, 0, 0],
//             pisoModules: base.pisoModules,
//             alacenaModules: base.alacenaModules,
//             alturaBajo: base.alturaBajo ?? 0.8,
//             separacionEntrePisos: base.separacionEntrePisos ?? 0.6,
//             tieneZocalo: base.tieneZocalo ?? 0,
//         },
//         {
//             position: [anchoBase, 0, zOffset],
//             rotation: [0, -Math.PI / 2, 0],
//             pisoModules: vertical.pisoModules,
//             alacenaModules: vertical.alacenaModules,
//             alturaBajo: vertical.alturaBajo ?? 0.8,
//             separacionEntrePisos: vertical.separacionEntrePisos ?? 0.6,
//             tieneZocalo: base.tieneZocalo ?? 0,
//         },
//     ];
// }

// if (layoutType === "U") {
//     const [base, izq, der] = segmentos;

//     const anchoBase = computeTotalWidth(base.pisoModules);

//     const profIzq = izq.pisoModules[0]?.medidas.profundidad ?? 0;
//     const profDer = der.pisoModules.at(-1)?.medidas.profundidad ?? 0;
//     const profFinalBase = base.pisoModules.at(-1)?.medidas.profundidad ?? 0;

//     // POSICIÓN SEGMENTO IZQUIERDO
//     let zOffsetIzq = 0;
//     if (izq.ajusteEsquina === "adelante") {
//         zOffsetIzq = profFinalBase / 2;
//     } else if (izq.ajusteEsquina === "atras") {
//         zOffsetIzq = -profFinalBase / 2;
//     }

//     // POSICIÓN SEGMENTO DERECHO
//     const anchoTotalIzq = computeTotalWidth(izq.pisoModules);

//     let anchoBase2 = anchoBase;
//     let zOffsetDer = 0;

//     if (izq.ajusteEsquina === "adelante") {
//         anchoBase2 = anchoBase - profIzq / 2;
//         zOffsetDer = anchoTotalIzq + (der.ajusteEsquina === "adelante" ? 0 : profDer);
//     } else {
//         anchoBase2 = anchoBase + profIzq / 2;
//         zOffsetDer = anchoTotalIzq - (der.ajusteEsquina === "adelante" ? profDer : 0);
//     }

//     return [
//         {
//             position: [0, 0, 0],
//             rotation: [0, 0, 0],
//             pisoModules: base.pisoModules,
//             alacenaModules: base.alacenaModules,
//             alturaBajo: base.alturaBajo ?? 0.8,
//             separacionEntrePisos: base.separacionEntrePisos ?? 0.6,
//         },
//         {
//             position: [anchoBase, 0, zOffsetIzq],
//             rotation: [0, -Math.PI / 2, 0],
//             pisoModules: izq.pisoModules,
//             alacenaModules: izq.alacenaModules,
//             alturaBajo: izq.alturaBajo ?? 0.8,
//             separacionEntrePisos: izq.separacionEntrePisos ?? 0.6,
//         },
//         {
//             position: [anchoBase2, 0, zOffsetDer],
//             rotation: [0, -Math.PI, 0],
//             pisoModules: der.pisoModules,
//             alacenaModules: der.alacenaModules,
//             alturaBajo: der.alturaBajo ?? 0.8,
//             separacionEntrePisos: der.separacionEntrePisos ?? 0.6,
//         },
//     ];
// }

// if (layoutType === "paralela") {
//     const [a, b] = segmentos;
//     const anchoA = computeTotalWidth(a.pisoModules);

//     return [
//         {
//             position: [0, 0, 0],
//             rotation: [0, 0, 0],
//             pisoModules: a.pisoModules,
//             alacenaModules: a.alacenaModules,
//             alturaBajo: a.alturaBajo ?? 0.8,
//             separacionEntrePisos: a.separacionEntrePisos ?? 0.6,
//         },
//         {
//             position: [anchoA, 0, pasillo],
//             rotation: [0, Math.PI, 0],
//             pisoModules: b.pisoModules,
//             alacenaModules: b.alacenaModules,
//             alturaBajo: b.alturaBajo ?? 0.8,
//             separacionEntrePisos: b.separacionEntrePisos ?? 0.6,
//         },
//     ];
// }