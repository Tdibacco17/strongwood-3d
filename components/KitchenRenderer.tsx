'use client';

import { KitchenModuleData } from "@/types/cocinaTypes";
import { computeKitchenSegments } from "@/helpers/computedSegment";
import KitchenSegmentComp from "./KitchenSegmentComp";

export default function KitchenRenderer({ kitchenRender }: { kitchenRender: KitchenModuleData }) {
    const segmentos = computeKitchenSegments(kitchenRender);
    return segmentos.map((segment, i) => (<KitchenSegmentComp key={i} {...segment} />))
}
