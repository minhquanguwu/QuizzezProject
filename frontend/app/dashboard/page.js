"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useRef, useState } from "react";
import Script from "next/script";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
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
                className="absolute none w-24 h-24 rounded-full border-2 border-opacity-20 shadow-lg text-center pointer-events-none z-50 "
            >
                <CircularProgressbar
                    value={progress}
                    text={`${Math.round(progress)}%`}
                    strokeWidth={10}
                    styles={buildStyles({
                        pathColor: "turquoise",
                        trailColor: "blue-100",
                    })}
                />
            </div>
            <div className="uppercase text-5xl font-bold font-mono py-4">
                What do you want to do today?
            </div>
            <div className="flex flex-row gap-10 pt-20">
                <Card
                    ref={(el) => (cardRefs.current[0] = el)}
                    className="py-4 bg-orange-300 h-[350px] "
                    isPressable
                    onClick={() => router.push(`/dashboard/quiz`)}
                >
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny font-bold">Explore the world!</p>
                        <h4 className="font-bold text-large">Quiz</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible pt-7">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="https://53.fs1.hubspotusercontent-na1.net/hub/53/hubfs/google-quiz.jpg?width=893&height=600&name=google-quiz.jpg"
                            width={280}
                            height={200}
                            isZoomed
                        />
                    </CardBody>
                </Card>
                <div className="border-r-4 border-gray-600 h-auto mx-4"></div>
                <Card
                    ref={(el) => (cardRefs.current[1] = el)}
                    className="py-4 bg-violet-300 h-[350px]"
                    isPressable
                    onClick={() => router.push(`/dashboard/study`)}
                >
                    <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                        <p className="text-tiny font-bold">Reading new information</p>
                        <h4 className="font-bold text-large">Reading</h4>
                    </CardHeader>
                    <CardBody className="overflow-visible pt-7">
                        <Image
                            alt="Card background"
                            className="object-cover rounded-xl"
                            src="https://www.spectator.co.uk/wp-content/uploads/2023/03/iStock-1087508538.jpg?w=1272"
                            width={300}
                            height={200}
                            isZoomed
                        />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
