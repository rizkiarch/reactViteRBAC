import { MailIcon, PlusCircleIcon } from "lucide-react"
import { Button } from "./ui/button"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "./ui/sidebar"
import { Link } from "react-router-dom"

export function NavMain({ items }) {
    const user = JSON.parse(localStorage.getItem("user"))
    const userPermissions = user?.roles?.flatMap(role => role.permissions?.map(permission => permission.name)) || []

    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    {items
                        .filter(item => !item.permission || userPermissions.includes(item.permission))
                        .map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <Link to={item.url}>
                                        <item.icon />
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}