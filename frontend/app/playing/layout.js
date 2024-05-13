import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import SideNav from "../ui/sidenav";

export default function DashboardLayout({ children }) {
    return <div className="flex h-screen flex-col bg-black px-2 pt-2">{children}</div>;
}
