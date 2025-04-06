import { ComputedSegment, KitchenModuleData, KitchenSegmentInput, ModuleData } from "@/types/cocinaTypes";

const computeTotalWidth = (modules: ModuleData[]): number =>
    modules.reduce((sum, mod) => sum + mod.medidas.ancho, 0);


export function computeKitchenSegments(layoutInput: KitchenModuleData): ComputedSegment[] {
    const { tipo: layoutType, segmentos, pasillo = 0 } = layoutInput;

    const computed: ComputedSegment[] = [];

    const handleIsla = (
        seg: KitchenSegmentInput,
        orientacion: "horizontal" | "vertical" = "horizontal",
    ) => {
        if (seg.isla) {
            const [base, lateral] = segmentos;

            const anchoBase = computeTotalWidth(base.pisoModules);
            const profBase = base.pisoModules[0]?.medidas.profundidad ?? 0;
            const profLateral = lateral.pisoModules[0]?.medidas.profundidad ?? 0;

            const isla = seg.isla.data;
            const distanciaBorde = seg.isla.distanciaBorde ?? 0;
            const distanciaFrente = seg.isla.distanciaFrente ?? 0;

            const anchoLateral = computeTotalWidth(lateral.pisoModules);


            const anchoIsla = computeTotalWidth(isla.pisoModules);
            const profundidadSeg = seg.pisoModules[0]?.medidas.profundidad ?? 0;
            const anchoSeg = computeTotalWidth(seg.pisoModules);

            let xPos = 0;
            let zPos = 0;

            if (orientacion === "horizontal") {
                if (seg.isla.position === "izquierda") {
                    xPos = 0 + distanciaBorde + anchoIsla;
                } else if (seg.isla.position === "derecha") {
                    xPos = anchoSeg - distanciaBorde;
                }
                zPos = profundidadSeg + distanciaFrente;
            } else {
                const ajuste = seg.ajusteEsquina ?? "adelante";

                if (seg.isla.position === "izquierda") {
                    if (ajuste === "adelante") {
                        xPos = anchoBase - profLateral;
                        zPos = profBase
                    } else if (ajuste === "atras") {
                        xPos = anchoBase;
                    }
                }
                if (seg.isla.position === "derecha") {
                    if (ajuste === "adelante") {
                        xPos = anchoBase - profLateral;
                        zPos = anchoLateral - anchoIsla + profBase;
                    } else if (ajuste === "atras") {
                        xPos = anchoBase;
                        zPos = anchoLateral - anchoIsla;
                    }
                }
                xPos -= seg.isla.distanciaFrente ?? 0;
            }

            computed.push({
                position: [xPos, 0, zPos],
                rotation: orientacion === "horizontal" ? [0, Math.PI, 0] : [0, -Math.PI / 2, 0],
                pisoModules: isla.pisoModules,
                alacenaModules: isla.alacenaModules,
                alturaBajo: isla.alturaBajo ?? 0.8,
                separacionEntrePisos: isla.separacionEntrePisos ?? 0.6,
                tieneZocalo: isla.tieneZocalo ?? 0,
            });
        }
    };

    if (layoutType === "lineal") {
        const seg = segmentos[0];
        computed.push({
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            pisoModules: seg.pisoModules,
            alacenaModules: seg.alacenaModules,
            alturaBajo: seg.alturaBajo ?? 0.8,
            separacionEntrePisos: seg.separacionEntrePisos ?? 0.6,
            tieneZocalo: seg.tieneZocalo ?? 0,
        })

        handleIsla(seg);
    }
    if (layoutType === "L") {
        const [base, lateral] = segmentos;

        const anchoBase = computeTotalWidth(base.pisoModules);
        const profBase = base.pisoModules[0]?.medidas.profundidad ?? 0;
        const profLateral = lateral.pisoModules[0]?.medidas.profundidad ?? 0;

        computed.push({
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            pisoModules: base.pisoModules,
            alacenaModules: base.alacenaModules,
            alturaBajo: base.alturaBajo ?? 0.8,
            separacionEntrePisos: base.separacionEntrePisos ?? 0.6,
            tieneZocalo: base.tieneZocalo ?? 0,
        });

        const finalPosition: [number, number, number] = [anchoBase, 0, 0];

        if (lateral.ajusteEsquina === "adelante") {
            finalPosition[2] += profBase;
        } else if (lateral.ajusteEsquina === "atras") {
            finalPosition[0] += profLateral;
        }

        //SEGUNDO SEGMENTO
        computed.push({
            position: finalPosition,
            rotation: [0, -Math.PI / 2, 0],
            pisoModules: lateral.pisoModules,
            alacenaModules: lateral.alacenaModules,
            alturaBajo: lateral.alturaBajo ?? 0.8,
            separacionEntrePisos: lateral.separacionEntrePisos ?? 0.6,
            tieneZocalo: lateral.tieneZocalo ?? 0,
        });
        if (base?.isla) handleIsla(base);
        if (lateral?.isla) handleIsla(lateral, "vertical");
    }
    if (layoutType === "U") {
        const [base, lateral1, lateral2] = segmentos;

        const anchoBase = computeTotalWidth(base.pisoModules);
        const profBase = base.pisoModules[0]?.medidas.profundidad ?? 0;
        const profLateral = lateral1.pisoModules[0]?.medidas.profundidad ?? 0;
        const profLat2 = lateral2.pisoModules[0]?.medidas.profundidad ?? 0;

        computed.push({
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            pisoModules: base.pisoModules,
            alacenaModules: base.alacenaModules,
            alturaBajo: base.alturaBajo ?? 0.8,
            separacionEntrePisos: base.separacionEntrePisos ?? 0.6,
            tieneZocalo: base.tieneZocalo ?? 0,
        });

        const finalPosition1: [number, number, number] = [anchoBase, 0, 0];

        if (lateral1.ajusteEsquina === "adelante") {
            finalPosition1[2] += profBase;
        } else if (lateral1.ajusteEsquina === "atras") {
            finalPosition1[0] += profLateral;
        }

        computed.push({
            position: finalPosition1,
            rotation: [0, -Math.PI / 2, 0],
            pisoModules: lateral1.pisoModules,
            alacenaModules: lateral1.alacenaModules,
            alturaBajo: lateral1.alturaBajo ?? 0.8,
            separacionEntrePisos: lateral1.separacionEntrePisos ?? 0.6,
            tieneZocalo: lateral1.tieneZocalo ?? 0,
        });

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

        computed.push({
            position: finalPosition2,
            rotation: [0, Math.PI, 0],
            pisoModules: lateral2.pisoModules,
            alacenaModules: lateral2.alacenaModules,
            alturaBajo: lateral2.alturaBajo ?? 0.8,
            separacionEntrePisos: lateral2.separacionEntrePisos ?? 0.6,
            tieneZocalo: lateral2.tieneZocalo ?? 0,
        });
        if (base?.isla) handleIsla(base);
        if (lateral1?.isla) handleIsla(lateral1, "vertical");
    }
    if (layoutType === "paralela") {
        const [segmentoA, segmentoB] = segmentos;

        computed.push({
            position: [0, 0, 0],
            rotation: [0, 0, 0],
            pisoModules: segmentoA.pisoModules,
            alacenaModules: segmentoA.alacenaModules,
            alturaBajo: segmentoA.alturaBajo ?? 0.8,
            separacionEntrePisos: segmentoA.separacionEntrePisos ?? 0.6,
            tieneZocalo: segmentoA.tieneZocalo ?? 0,
        });

        const pasilloMinimo = pasillo;
        const profundidadA = segmentoA.pisoModules[0]?.medidas.profundidad ?? 0;
        const profundidadB = segmentoB.pisoModules[0]?.medidas.profundidad ?? 0;
        const anchoB = computeTotalWidth(segmentoB.pisoModules);

        const zOffset = profundidadA + profundidadB + pasilloMinimo;

        computed.push({
            position: [anchoB, 0, zOffset],
            rotation: [0, Math.PI, 0],
            pisoModules: segmentoB.pisoModules,
            alacenaModules: segmentoB.alacenaModules,
            alturaBajo: segmentoB.alturaBajo ?? 0.8,
            separacionEntrePisos: segmentoB.separacionEntrePisos ?? 0.6,
            tieneZocalo: segmentoB.tieneZocalo ?? 0,
        });
    }

    return computed;
}