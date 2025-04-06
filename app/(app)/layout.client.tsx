'use client'

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { PresupuestoInterface } from "@/types/apiTypes";
import { PanelLeft } from "lucide-react";
import React, { useState } from "react";

export default function AppLayoutClient({ children, data }: { children: React.ReactNode, data: PresupuestoInterface[] | null }) {
    const [openSheet, setOpenSheet] = useState<boolean>(true);

    return (
        <div className="overflow-hidden flex justify-end">

            <div className={`fixed top-0 left-0 h-svh min-h-svh max-h-svh min-w-64 w-64 bg-sidebar-background-foreground`}>
                <div className={`${openSheet ? "w-full" : "w-[80px]"} h-full flex transition-[width] duration-300`}>
                    <div className="w-full h-full flex flex-col justify-between gap-4 overflow-hidden">
                        <div className="flex flex-col gap-8 h-full w-full">

                            <div className="bg-background w-full px-4 h-12 flex items-center border-b">
                                {/* <HOCBIcon className={`w-12 h-auto absolute top-0 left-0`} /> */}
                                {/* <div className={`flex flex-col relative -top-2 left-10 ${openSheet ? "opacity-100" : "opacity-0 w-0"}`}> */}
                                <span className={`text-2xl font-medium`}>Strongwood</span>
                                {/* </div> */}
                            </div>

                            <div className="flex flex-col gap-4 w-full">
                                <p className="text-sm font-medium px-4">Presupuestos</p>
                                <ScrollArea className="h-72 w-full">
                                    <div className="px-4">
                                        {data && data.map((item, index) => {
                                            return (
                                                <React.Fragment key={item.Id}>
                                                    <div className="hover:bg-accent py-2 text-nowrap">
                                                        <p>{item.Codigo}</p>
                                                        {/* 
                                                <p>{item.Descripcion}</p>
                                                <p>{new Date(item.Fecha).toLocaleDateString()}</p>
                                                <p>{new Date(item.FechaEntrega).toLocaleDateString()}</p>
                                                <p>{item.Dolar}</p>
                                                <p>{item.CostoPesos}</p>
                                                <p>{item.CostoDolares}</p>
                                                <p>{item.PrecioPesos}</p>
                                                <p>{item.PrecioDolares}</p>
                                                <p>{item.Estado}</p> 
                                                */}
                                                    </div>
                                                    <Separator />
                                                </React.Fragment>
                                            )
                                        })}
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>

                        <div className="w-full flex flex-col items-start ">
                            {/* <Link
                                href={'/settings'}
                                prefetch={false}
                                className={buttonVariants({ className: "w-full text-left justify-start gap-2 text-sm", size: 'lg', variant: 'ghost' })}
                            >
                                <Settings className="w-4" />
                                <span className={`${openSheet ? "opacity-100" : "opacity-0 w-0"} transition-opacity duration-150`}>Settings</span>
                            </Link> */}
                            {/* <SignOut openSheet={openSheet} /> */}
                        </div>
                    </div>
                </div>
            </div>

            {/* CHILDREN */}
            <div className={`${openSheet ? "w-[calc(100%-256px)]" : "w-[calc(100%-80px)]"} min-h-svh h-svh transition-[width] duration-300 z-10 overflow-hidden bg-sidebar-background-foreground`}>
                <div className="relative w-full h-full flex flex-col">
                    <div className="bg-background px-4 h-12 flex items-center border-l border-b">
                        <div>
                            <div
                                className="w-full text-left justify-start cursor-pointer"
                                onClick={() => setOpenSheet(!openSheet)}
                            >
                                <PanelLeft className="w-5" />
                            </div>
                        </div>
                    </div>
                    <div className="h-[calc(100svh-48px)] min-h-[calc(100svh-48px)] bg-background border-l">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}