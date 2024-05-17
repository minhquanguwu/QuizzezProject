"use client";
import dynamic from "next/dynamic";
import React, { useRef, useEffect } from "react";
import Script from "next/script";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const PDFViewer = dynamic(() => import("../components/PDFViewer"), {
    ssr: false,
});

export default function ReadBook() {
    const fileUrl = "pdf/DSA.pdf";
    const iframeRef = useRef(null);

    const handleGaze = () => {
        // Starts eye tracking
        GazeCloudAPI.StartEyeTracking();
        // Users can click to recalibrate in real time
        GazeCloudAPI.UseClickRecalibration = true;
        GazeCloudAPI.OnResult = (GazeData) => GazeScrolling(GazeData);
    };

    function GazeScrolling(GazeData) {
        console.log(GazeData);
        var docx = GazeData.docX;
        var docy = GazeData.docY;

        var gaze = document.getElementById("gaze");
        docx -= gaze.clientWidth / 2;
        docy -= gaze.clientHeight / 2;

        gaze.style.left = docx + "px";
        gaze.style.top = docy + "px";

        if (GazeData.state != 0) {
            if (gaze.style.display == "block") gaze.style.display = "none";
        } else {
            if (gaze.style.display == "none") gaze.style.display = "block";
        }

        if (GazeData.GazeY > 800) {
            window.scrollBy(0, 50);
        } else if (GazeData.GazeY < 350) {
            window.scrollBy(0, -50);
        }
    }

    return (
        <div className="h-screen">
            <Script src="/GazeCloudAPI.js" onLoad={handleGaze}></Script>
            <div
                id="gaze"
                className="absolute none w-24 h-24 rounded-full border-2 border-opacity-20 shadow-lg pointer-events-none z-50 "
            >
                <CircularProgressbar value={0} />
            </div>
            <iframe
                src={fileUrl}
                id="iframe"
                height="50000"
                width="100%"
                ref={iframeRef}
                allowFullScreen
            ></iframe>
        </div>
    );
}
