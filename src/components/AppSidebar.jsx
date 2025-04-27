import {
    ArrowUpCircleIcon,
    BarChartIcon,
    CameraIcon,
    ClipboardListIcon,
    DatabaseIcon,
    FileCodeIcon,
    FileIcon,
    FileTextIcon,
    FolderIcon,
    HelpCircleIcon,
    LayoutDashboardIcon,
    ListIcon,
    SearchIcon,
    SettingsIcon,
    UsersIcon
} from "lucide-react";
import { NavDocuments } from "./NavDocuments";
import { NavMain } from "./NavMain";
import { NavSecondary } from "./NavSecondary";
import { NavUser } from "./NavUser";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "./ui/sidebar";

export function AppSidebar({ ...props }) {

    const user = JSON.parse(localStorage.getItem("user"))

    const data = {
        navMain: [
            {
                title: "User Management",
                url: "/admin/users",
                icon: LayoutDashboardIcon,
                permission: "manage-users",
            },
            {
                title: "Article Management",
                url: "/admin/articles",
                icon: ListIcon,
                permission: "manage-articles",
            },
            {
                title: "Role Management",
                url: "/admin/roles",
                icon: BarChartIcon,
                permission: "manage-roles",
            },
            {
                title: "Permission Management",
                url: "/admin/permissions",
                icon: FolderIcon,
                permission: "manage-permissions",
            },
        ],
    }

    return (
        <Sidebar collapsible="offcanvas" {...props} >
            <SidebarHeader className="bg-white">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="/">
                                <ArrowUpCircleIcon className="h-5 w-5" />
                                <span className="text-base font-semibold">Blog App</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter className="bg-white">
                <NavUser user={user} />
            </SidebarFooter>
        </Sidebar>
    )
}