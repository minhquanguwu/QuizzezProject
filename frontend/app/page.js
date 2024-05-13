"use client";

import { useRef } from "react";
import Script from "next/script";
import Login from "./ui/Login";

export default function Page() {
    const mapRef = useRef();

    return (
        <>
            <Login />
        </>
    );
}
