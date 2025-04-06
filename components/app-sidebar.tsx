import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    BellIcon,
    CreditCardIcon,
    LogOutIcon,
    MoreVerticalIcon,
    UserCircleIcon,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { PresupuestoInterface } from "@/types/apiTypes"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AppSidebar({ data }: { data: PresupuestoInterface[] | null }) {
    return (
        <Sidebar className="min-h-svh max-h-svh h-svh">
            <div className="h-full flex flex-col justify-between">
                <div className="px-4 h-12 min-h-12 flex items-center">
                    <p className={`text-xl font-medium`}>Strongwood</p>
                </div>
                <div className="h-full overflow-hidden">
                    <ScrollArea className="h-full">
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupLabel>Presupuestos</SidebarGroupLabel>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {data && data.map((item) => {
                                            return (
                                                <SidebarMenuItem key={`item-${item.Id}`}>
                                                    <SidebarMenuButton>
                                                        {item.Codigo}
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            )
                                        })}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </ScrollArea>
                </div>
                <div className="px-2 min-h-16 h-16 flex items-center">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton
                                        size="lg"
                                        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                    >
                                        <Avatar className="h-8 w-8 rounded-lg grayscale">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                        </Avatar>
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-medium">asd</span>
                                            <span className="truncate text-xs text-muted-foreground">
                                                {/* {user.email} */}
                                            </span>
                                        </div>
                                        <MoreVerticalIcon className="ml-auto size-4" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    // side={isMobile ? "bottom" : "right"}
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-medium">
                                                    asd
                                                </span>
                                                <span className="truncate text-xs text-muted-foreground">
                                                    {/* {user.email} */}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <UserCircleIcon />
                                            Account
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <CreditCardIcon />
                                            Billing
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <BellIcon />
                                            Notifications
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOutIcon />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </div>
            </div>
        </Sidebar>
    )
}
