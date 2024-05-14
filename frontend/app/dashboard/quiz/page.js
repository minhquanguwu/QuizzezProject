"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect, use } from "react";
import Script from "next/script";
import { Image } from "@nextui-org/image";
import { CardBody, Card, Chip, CardHeader, CardFooter, Button } from "@nextui-org/react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
export default function Dashboard() {
    var gazeOnCardStart = null;
    var currentCard = null;
    const cardRefs = useRef([]);
    const [progress, setProgress] = useState(0);
    const handleGaze = () => {
        // Starts eye tracking
        GazeCloudAPI.StartEyeTracking();
        // Users can click to recalibrate in real time
        GazeCloudAPI.UseClickRecalibration = true;
        GazeCloudAPI.OnResult = (GazeData) => PlotGaze(GazeData);
    };

    const router = useRouter();

    const handleCardClick = (type) => {
        router.push(`/playing/${type}`);
    };

    const questionList = [
        {
            type: "Sciene",
            image: "https://thumbs.dreamstime.com/b/science-background-illustration-scientific-design-flasks-glass-chemistry-physics-elements-generative-ai-271589343.jpg",
            description: "Discover the world of science",
        },
        {
            type: "Mathematics",
            image: "https://thumbs.dreamstime.com/b/science-background-illustration-scientific-design-flasks-glass-chemistry-physics-elements-generative-ai-271589343.jpg",
            description: "Discover the world of science",
        },
        {
            type: "Sports",
            image: "https://thumbs.dreamstime.com/b/science-background-illustration-scientific-design-flasks-glass-chemistry-physics-elements-generative-ai-271589343.jpg",
            description: "Discover the world of science",
        },
        {
            type: "Sciene",
            image: "https://thumbs.dreamstime.com/b/science-background-illustration-scientific-design-flasks-glass-chemistry-physics-elements-generative-ai-271589343.jpg",
            description: "Discover the world of science",
        },
        {
            type: "Sciene",
            image: "https://thumbs.dreamstime.com/b/science-background-illustration-scientific-design-flasks-glass-chemistry-physics-elements-generative-ai-271589343.jpg",
            description: "Discover the world of science",
        },
        {
            type: "Sciene",
            image: "https://thumbs.dreamstime.com/b/science-background-illustration-scientific-design-flasks-glass-chemistry-physics-elements-generative-ai-271589343.jpg",
            description: "Discover the world of science",
        },
    ];

    function PlotGaze(GazeData) {
        /*
            GazeData.state // 0: valid gaze data; -1 : face tracking lost, 1 : gaze uncalibrated
            GazeData.docX // gaze x in document coordinates
            GazeData.docY // gaze y in document cordinates
            GazeData.time // timestamp
        */
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

        var gazeOnCard = false;
        var cards = cardRefs.current;
        console.log(cards);
        cards.forEach((card) => {
            var cardRect = card.getBoundingClientRect();
            console.log(cardRect);

            if (
                docx >= cardRect.left &&
                docx <= cardRect.right &&
                docy >= cardRect.top &&
                docy <= cardRect.bottom
            ) {
                gazeOnCard = true;
                if (currentCard !== card) {
                    currentCard = card;
                    gazeOnCardStart = Date.now();
                }
            }
        });

        if (!gazeOnCard) {
            gazeOnCardStart = null;
            currentCard = null;
        } else {
            setProgress((Date.now() - gazeOnCardStart) / 30);
            if (Date.now() - gazeOnCardStart >= 3000) {
                console.log("bo m clicked");
                GazeCloudAPI.StopEyeTracking();
                currentCard.click();
                gazeOnCardStart = null;
                currentCard = null;
            }
        }
    }

    return (
        <div>
            <Script src="/GazeCloudAPI.js" onLoad={handleGaze}></Script>

            <div
                id="gaze"
                className="absolute none w-24 h-24 rounded-full border-2 border-opacity-20 shadow-lg pointer-events-none z-50 "
            >
                <CircularProgressbar value={progress} text={`${Math.round(progress)}%`} />
            </div>

            <div className="flex flex-row justify-center font-sans">
                <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
                    <span> Select a </span>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                        category
                    </span>{" "}
                    to explore
                </h1>
            </div>
            <div className="max-w-[1000px] gap-6 grid grid-cols-12 grid-rows-2 px-8">
                {questionList.map((question, index) => (
                    <Card
                        ref={(el) => (cardRefs.current[index] = el)}
                        className="col-span-2 sm:col-span-4 h-[280px]"
                        key={index}
                        isPressable
                        onClick={() => handleCardClick(question.type)}
                    >
                        <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                            <p className="text-tiny text-white/60 uppercase font-bold">
                                {question.description}
                            </p>
                            <h4 className="text-white font-medium text-large uppercase">
                                {question.type}
                            </h4>
                        </CardHeader>
                        <Image
                            removeWrapper
                            alt="Card background"
                            className="z-0 w-full h-full object-cover"
                            src={question.image}
                        />
                    </Card>
                ))}
            </div>
        </div>
    );
}
