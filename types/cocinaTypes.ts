export type LayoutType = 'L' | 'U' | 'lineal' | 'paralela';

export interface Medidas {
  ancho: number;
  alto: number;
  profundidad: number;
}

export interface Posicion {
  x: number;
  y: number;
  z: number;
}

export interface Rotacion {
  x: number;
  y: number;
  z: number;
}

export interface ModuleData {
  id: string;
  tipo: 'bajo_mesada' | 'alacena' | 'horno' | 'torre' | 'isla' | string;
  modelo: string;
  medidas: Medidas;
  material?: string;
  posicion?: Posicion;
  rotacion?: Rotacion;
}

export interface KitchenSegmentInput {
  id?: string;
  tieneZocalo?: number;
  alturaAlacenas: number;
  pisoModules: ModuleData[];
  alacenaModules: ModuleData[];
  ajusteEsquina?: 'adelante' | 'atras';
  alturaBajo?: number;
  separacionEntrePisos?: number;
}

export interface KitchenModuleData {
  tipo: LayoutType;
  tieneIsla: boolean;
  pasillo?: number;
  segmentos: KitchenSegmentInput[];
  isla?: KitchenSegmentInput;
}

export interface ComputedSegment {
  position: [number, number, number];
  rotation: [number, number, number];
  pisoModules: ModuleData[];
  alacenaModules: ModuleData[];
  alturaBajo: number;
  separacionEntrePisos: number;
  tieneZocalo: number;
}