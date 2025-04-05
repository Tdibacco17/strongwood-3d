import { KitchenModuleData } from "@/types/cocinaTypes";

const kitchenExample: KitchenModuleData = {
  tipo: "U",
  tieneIsla: false,
  segmentos: [
    {
      id: 'seg-01',
      tieneZocalo: 0.1,
      alturaAlacenas: 1.5,
      posicionInicial: 'frente',
      ajusteEsquina: undefined,
      pisoModules: [
        {
          id: 'm1',
          tipo: "bajo_mesada",
          modelo: "cube",
          medidas: { ancho: 1.8, alto: 0.8, profundidad: 0.6 }
        },
        {
          id: 'm2',
          tipo: "espacio",
          modelo: "cube",
          medidas: { ancho: 0.6, alto: 0, profundidad: 0.6 }
        },
        {
          id: 'm3',
          tipo: "bajo_mesada",
          modelo: "cube",
          medidas: { ancho: 0.8, alto: 0.8, profundidad: 0.6 }
        },
        {
          id: 'm4',
          tipo: "torre",
          modelo: "cube",
          medidas: { ancho: 0.8, alto: 2.1, profundidad: 0.6 }
        },
        {
          id: 'm5',
          tipo: "bajo_mesada",
          modelo: "cube",
          medidas: { ancho: 0.6, alto: 0.8, profundidad: 0.6 }
        },
        {
          id: 'm6',
          tipo: "bajo_mesada",
          modelo: "cube",
          medidas: { ancho: 1.1, alto: 0.8, profundidad: 0.6 }
        }
      ],
      alacenaModules: [
        {
          id: 'a1',
          tipo: "alacena",
          modelo: "cube",
          medidas: { ancho: 1.8, alto: 0.7, profundidad: 0.45 }
        },
        {
          id: 'm2',
          tipo: "espacio",
          modelo: "cube",
          medidas: { ancho: 0.6, alto: 0, profundidad: 0.6 }
        },
        {
          id: 'a1',
          tipo: "alacena",
          modelo: "cube",
          medidas: { ancho: 0.8, alto: 0.7, profundidad: 0.45 }
        },
      ]
    },
    {
      id: 'seg-02',
      alturaAlacenas: 1.5,
      posicionInicial: 'izquierdo',
      ajusteEsquina: "atras",
      pisoModules: [
        {
          id: 'm7',
          tipo: "bajo_mesada",
          modelo: "cube",
          medidas: { ancho: 2.4, alto: 0.8, profundidad: 0.6 }
        }
      ],
      alacenaModules: [
        {
          id: 'a3',
          tipo: "alacena",
          modelo: "cube",
          medidas: { ancho: 2.4, alto: 0.7, profundidad: 0.5 }
        }
      ]
    },
    {
      id: 'seg-03',
      alturaAlacenas: 1.5,
      posicionInicial: 'derecho',
      ajusteEsquina: "adelante",
      pisoModules: [
        {
          id: 'm8',
          tipo: "bajo_mesada",
          modelo: "cube",
          medidas: { ancho: 1.1, alto: 0.8, profundidad: 0.6 }
        },
        {
          id: 'm9',
          tipo: "bajo_mesada",
          modelo: "cube",
          medidas: { ancho: 1.0, alto: 0.8, profundidad: 0.6 }
        },
        {
          id: 'm10',
          tipo: "bajo_mesada",
          modelo: "cube",
          medidas: { ancho: 1.0, alto: 0.8, profundidad: 0.6 }
        }
      ],
      alacenaModules: []
    }
  ]
};

export default kitchenExample;
