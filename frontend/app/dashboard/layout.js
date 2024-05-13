import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button } from "@nextui-org/react";
import SideNav from "../ui/sidenav";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-[#F2F2F2]">
            <div className="w-full flex-none md:w-64 bg-white">
                <SideNav />
            </div>
            <div className="flex-grow md:overflow-y-auto md:p-8 flex justify-center ">
                {children}
            </div>
        </div>
    );
}
