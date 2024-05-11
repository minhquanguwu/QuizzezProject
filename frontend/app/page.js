"use client";

import { useRef } from "react";
import Script from "next/script";

export default function Page() {
    const mapRef = useRef();

    return (
        <>
            <div ref={mapRef}></div>
            <Script
                id="google-maps"
                src="https://maps.googleapis.com/maps/api/js"
                onReady={() => {
                    new google.maps.Map(mapRef.current, {
                        center: { lat: -34.397, lng: 150.644 },
                        zoom: 8,
                    });
                }}
            />
        </>
    );
}
