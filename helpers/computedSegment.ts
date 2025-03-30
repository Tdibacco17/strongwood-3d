import { ComputedSegment, KitchenModuleData, ModuleData } from "@/types/cocinaTypes";

const computeTotalWidth = (modules: ModuleData[]): number =>
    modules.reduce((sum, mod) => sum + mod.medidas.ancho, 0);

export function computeKitchenSegments(layoutInput: KitchenModuleData): ComputedSegment[] {
    const { tipo: layoutType, segmentos, pasillo = 1 } = layoutInput;

    if (layoutType === "lineal") {
        const seg = segmentos[0];
        return [
            {
                position: [0, 0, 0],
                rotation: [0, 0, 0],
                pisoModules: seg.pisoModules,
                alacenaModules: seg.alacenaModules,
                alturaBajo: seg.alturaBajo ?? 0.8,
                separacionEntrePisos: seg.separacionEntrePisos ?? 0.6,
                tieneZocalo: seg.tieneZocalo ?? 0,
            },
        ];
    }

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
    //         },
    //         {
    //             position: [anchoBase, 0, zOffset],
    //             rotation: [0, -Math.PI / 2, 0],
    //             pisoModules: vertical.pisoModules,
    //             alacenaModules: vertical.alacenaModules,
    //             alturaBajo: vertical.alturaBajo ?? 0.8,
    //             separacionEntrePisos: vertical.separacionEntrePisos ?? 0.6,
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

    return [];
}
