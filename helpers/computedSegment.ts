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
    if (layoutType === "paralela") {
        const [segmentoA, segmentoB] = segmentos;

        const frente: ComputedSegment = {
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            pisoModules: segmentoA.pisoModules,
            alacenaModules: segmentoA.alacenaModules,
            alturaBajo: segmentoA.alturaBajo ?? 0.8,
            separacionEntrePisos: segmentoA.separacionEntrePisos ?? 0.6,
            tieneZocalo: segmentoA.tieneZocalo ?? 0,
        };

        const pasilloMinimo = pasillo;
        const profundidadA = segmentoA.pisoModules[0]?.medidas.profundidad ?? 0;
        const profundidadB = segmentoB.pisoModules[0]?.medidas.profundidad ?? 0;
        const anchoB = computeTotalWidth(segmentoB.pisoModules);

        const zOffset = profundidadA + profundidadB + pasilloMinimo;

        const enfrentado: ComputedSegment = {
            position: [anchoB, 0, zOffset],
            rotation: [0, Math.PI, 0],
            pisoModules: segmentoB.pisoModules,
            alacenaModules: segmentoB.alacenaModules,
            alturaBajo: segmentoB.alturaBajo ?? 0.8,
            separacionEntrePisos: segmentoB.separacionEntrePisos ?? 0.6,
            tieneZocalo: segmentoA.tieneZocalo ?? 0,
        };

        return [frente, enfrentado];
    }
    if (layoutType === "L") {
        const [base, lateral] = segmentos;

        const anchoBase = computeTotalWidth(base.pisoModules);
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

        const finalPosition: [number, number, number] = [anchoBase, 0, 0];

        if (lateral.ajusteEsquina === "adelante") {
            finalPosition[2] += profBase;
        } else if (lateral.ajusteEsquina === "atras") {
            finalPosition[0] += profLateral;
        }

        const lateralSegment: ComputedSegment = {
            position: finalPosition,
            rotation: [0, -Math.PI / 2, 0],
            pisoModules: lateral.pisoModules,
            alacenaModules: lateral.alacenaModules,
            alturaBajo: lateral.alturaBajo ?? 0.8,
            separacionEntrePisos: lateral.separacionEntrePisos ?? 0.6,
            tieneZocalo: base.tieneZocalo ?? 0,
        };

        return [frente, lateralSegment];
    }
    if (layoutType === "U") {
        const [base, lateral1, lateral2] = segmentos;

        const anchoBase = computeTotalWidth(base.pisoModules);
        const profBase = base.pisoModules[0]?.medidas.profundidad ?? 0;
        const profLateral = lateral1.pisoModules[0]?.medidas.profundidad ?? 0;
        const profLat2 = lateral2.pisoModules[0]?.medidas.profundidad ?? 0;

        const frente: ComputedSegment = {
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            pisoModules: base.pisoModules,
            alacenaModules: base.alacenaModules,
            alturaBajo: base.alturaBajo ?? 0.8,
            separacionEntrePisos: base.separacionEntrePisos ?? 0.6,
            tieneZocalo: base.tieneZocalo ?? 0,
        };

        const finalPosition1: [number, number, number] = [anchoBase, 0, 0];

        if (lateral1.ajusteEsquina === "adelante") {
            finalPosition1[2] += profBase;
        } else if (lateral1.ajusteEsquina === "atras") {
            finalPosition1[0] += profLateral;
        }

        const lateralSegment1: ComputedSegment = {
            position: finalPosition1,
            rotation: [0, -Math.PI / 2, 0],
            pisoModules: lateral1.pisoModules,
            alacenaModules: lateral1.alacenaModules,
            alturaBajo: lateral1.alturaBajo ?? 0.8,
            separacionEntrePisos: lateral1.separacionEntrePisos ?? 0.6,
            tieneZocalo: base.tieneZocalo ?? 0,
        };

        const finalPosition2: [number, number, number] = [
            finalPosition1[0],
            0,
            finalPosition1[2] + computeTotalWidth(lateral1.pisoModules)
        ];

        if (lateral2.ajusteEsquina === "adelante") {
            finalPosition2[0] -= profLat2;
        } else if (lateral2.ajusteEsquina === "atras") {
            finalPosition2[2] += profBase;
        }

        const lateralSegment2: ComputedSegment = {
            position: finalPosition2,
            rotation: [0, Math.PI, 0],
            pisoModules: lateral2.pisoModules,
            alacenaModules: lateral2.alacenaModules,
            alturaBajo: lateral2.alturaBajo ?? 0.8,
            separacionEntrePisos: lateral2.separacionEntrePisos ?? 0.6,
            tieneZocalo: base.tieneZocalo ?? 0,
        };

        return [frente, lateralSegment1, lateralSegment2];
    }

    return [];
}