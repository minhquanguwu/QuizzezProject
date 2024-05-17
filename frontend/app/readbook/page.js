'use client'
import dynamic from 'next/dynamic'
import React from 'react';
import { useRef, useEffect } from 'react';
import Script from 'next/script'

const PDFViewer = dynamic(() => import('../components/PDFViewer'), {
    ssr: false
  });

const readBook = () => {

    const fileUrl = 'pdf/DSA.pdf';
    const handleGaze = () => {
        // Starts eye tracking
        GazeCloudAPI.StartEyeTracking();
        // Users can click to recalibrate in real time
        GazeCloudAPI.UseClickRecalibration = true;
        GazeCloudAPI.OnResult = (GazeData) => GazeScrolling(GazeData);
    };


    function GazeScrolling(GazeData) {
        const canvasRef = useRef(null);
        const { x, y } = GazeData;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const circleRadius = 10;

        // Clear the canvas
        context.clearRect(0, 0, canvasWidth, canvasHeight);

        // Draw the circle at the gaze position
        context.beginPath();
        context.arc(x, y, circleRadius, 0, 2 * Math.PI);
        context.fillStyle = 'red';
        context.fill();

        // Scroll the webpage based on the gaze position
        if (y < circleRadius) {
            window.scrollBy(0, -10); // Scroll up
        } else if (y > canvasHeight - circleRadius) {
            window.scrollBy(0, 10); // Scroll down
        }
    }




    return (
        <div className="pdf-container">
            <Script src="/GazeCloudAPI.js" onLoad={handleGaze}></Script>
            <PDFViewer fileUrl={fileUrl}></PDFViewer>
        </div>
    );
};


export default readBook;