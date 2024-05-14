"use client";
import { useRouter } from "next/navigation";
import { CircularProgressbar } from "react-circular-progressbar";
import React, { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { CardBody, Card, Chip, Progress, CardHeader, CardFooter } from "@nextui-org/react";
import { CSSTransition } from "react-transition-group";
import { Button, Image } from "@nextui-org/react";
export default function Quiz() {
    const letters = ["A", "B", "C", "D", "E", "F"];
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [showUserResult, setShowUserResult] = useState(false);
    const [result, setResult] = useState(0);
    const router = useRouter();
    const user = JSON.parse(localStorage.getItem("faceAuth"));
    const cardRefs = useRef([]);
    const [progress, setProgress] = useState(10);
    var gazeOnCardStart = null;
    var currentCard = null;
    const questionList = [
        {
            question: "What is the capital of France?",
            answerList: [
                {
                    body: "Answer 1",
                    image: "https://nextui.org/images/hero-card.jpeg",
                    isCorrect: true,
                },
                {
                    body: "Answer 2",
                    image: "https://nextui.org/images/hero-card.jpeg",
                    isCorrect: false,
                },
                {
                    body: "Answer 3",
                    image: "https://nextui.org/images/hero-card.jpeg",
                    isCorrect: true,
                },
                {
                    body: "Answer 4",
                    image: "https://nextui.org/images/hero-card.jpeg",
                    isCorrect: false,
                },
            ],
        },
        {
            question: "1+1=?",
            answerList: [
                {
                    body: "Answer 1",
                    image: "https://nextui.org/images/hero-card.jpeg",
                    isCorrect: false,
                },
                {
                    body: "Answer 2",
                    image: "https://nextui.org/images/hero-card.jpeg",
                    isCorrect: false,
                },
                {
                    body: "Answer 3",
                    image: "https://nextui.org/images/hero-card.jpeg",
                    isCorrect: true,
                },
                {
                    body: "Answer 4",
                    image: "https://nextui.org/images/hero-card.jpeg",
                    isCorrect: false,
                },
            ],
        },
        {
            question: "What is the capital of Germany?",
            answerList: [
                {
                    body: "Answer 1",
                    image: "https://nextui.org/images/hero-card.jpeg",
                    isCorrect: false,
                },
                {
                    body: "Answer 2",
                    image: "https://nextui.org/images/hero-card.jpeg",
                    isCorrect: false,
                },
                {
                    body: "Answer 3",
                    image: "https://nextui.org/images/hero-card.jpeg",
                    isCorrect: true,
                },
                {
                    body: "Answer 4",
                    image: "https://nextui.org/images/hero-card.jpeg",
                    isCorrect: false,
                },
            ],
        },
    ];

    const handleAnswerClick = (isCorrect) => {
        isCorrect && setResult(result + 1);
        setIsAnswerCorrect(isCorrect);
        setShowAnswer(true);
    };

    useEffect(() => {
        if (showAnswer) {
            const timer = setTimeout(() => {
                setIsAnswerCorrect(false);
                setShowAnswer(false);
                if (currentQuestionIndex < questionList.length - 1) {
                    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
                } else {
                    // All questions have been answered
                    // Show a completion message or redirect to a results page
                    setShowUserResult(true);
                    console.log("All questions have been answered");
                }
            }, 2000); // Change this to the duration of your animation

            return () => clearTimeout(timer);
        }
    }, [showAnswer]);

    const handleGaze = () => {
        GazeCloudAPI.StartEyeTracking();
        GazeCloudAPI.UseClickRecalibration = true;
        GazeCloudAPI.OnResult = (GazeData) => PlotGaze(GazeData);
        console.log(cardRefs.current);
    };

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
                currentCard.click();
                gazeOnCardStart = null;
                currentCard = null;
            }
        }
    }

    return (
        <div className="h-full">
            <Script src="/GazeCloudAPI.js" onLoad={handleGaze}></Script>

            <div
                id="gaze"
                className="absolute none w-24 h-24 rounded-full border-2 border-opacity-20 shadow-lg pointer-events-none z-50 "
            >
                <CircularProgressbar value={progress} text={`${Math.round(progress)}%`} />
            </div>
            {showUserResult && (
                <div className="grid grid-rows-6 gap-4 p-4 h-[95%] text-white bg-[#230D21] rounded-lg shadow-lg max-w-md mx-auto font-serif my-2 mt-4">
                    <div className="text-3xl font-bold pt-4 text-center uppercase font-sans">
                        Your Score: {result} / {questionList.length}
                    </div>
                    <div className="row-span-2 text-2xl font-bold flex gap-4 font-sans">
                        <div className="h-[100px] w-[260px] bg-black rounded-lg mx-auto p-3 flex justify-center items-center">
                            {user.account.fullName}
                        </div>
                        <div className="rounded-md flex-grow pl-2 ">
                            <Card className="bg-black">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src={`/temp-accounts/${user.account.picture}`}
                                    width={150}
                                    height={150}
                                    isZoomed
                                />
                            </Card>
                        </div>
                    </div>

                    <Progress
                        label="Correct Answers"
                        size="md"
                        value={(result / questionList.length) * 100}
                        color="success"
                        showValueLabel={true}
                        className="max-w-md pt-6"
                    />
                    <div className="flex flex-row justify-center gap-3 pt-[100px]">
                        <Button
                            color="secondary"
                            variant="shadow"
                            className="text-white"
                            size="lg"
                            onClick={() => {
                                window.location.reload();
                            }}
                        >
                            Play Again
                        </Button>
                        <Button
                            color="danger"
                            variant="shadow"
                            className="text-white"
                            size="lg"
                            onClick={() => {
                                router.push(`/dashboard`);
                            }}
                        >
                            Back to Home
                        </Button>
                    </div>
                </div>
            )}
            {!showUserResult && (
                <div className="h-full grid grid-rows-15">
                    <div className="row-span-1 flex flex-row text-white items-center ml-3">
                        <Chip size="lg" variant="faded">
                            {currentQuestionIndex + 1}/{questionList.length}
                        </Chip>
                    </div>
                    <div className="grid grid-rows-10 text-white bg-fuchsia-950 rounded-lg p-2 mt-4 row-span-12">
                        <div className="flex items-center justify-center row-span-5">
                            <div className="text-4xl font-bold font-sans">
                                {questionList[currentQuestionIndex].question}
                            </div>
                        </div>
                        <div className="flex flex-row justify-between row-span-5">
                            {questionList[currentQuestionIndex].answerList.map((answer, index) => (
                                <CSSTransition in={showAnswer} timeout={2000} classNames="answer">
                                    {/* <AnswerCard
                                        answer={answer}
                                        key={index}
                                        handleAnswerClick={() =>
                                            handleAnswerClick(answer.isCorrect)
                                        }
                                        isChoosingAnswer={showAnswer}
                                        index={index}
                                    /> */}
                                    <Card
                                        ref={(el) => (cardRefs.current[index] = el)}
                                        isFooterBlurred
                                        radius="lg"
                                        className={`border-none bg-amber-200 w-[350px] h-[200px] transition-colors duration-500 ${
                                            showAnswer
                                                ? answer.isCorrect
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                                : "bg-white"
                                        }`}
                                        isPressable
                                        onClick={() => handleAnswerClick(answer.isCorrect)}
                                    >
                                        <CardHeader className="justify-end font-serif">
                                            <Chip size="lg" variant="shadow" color="secondary">
                                                {letters[index]}
                                            </Chip>
                                        </CardHeader>
                                        <CardBody className="justify-center items-center font-serif text-2xl">
                                            {answer.body}
                                        </CardBody>
                                    </Card>
                                </CSSTransition>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-row row-span-2 w-full h-full ">
                        <div
                            className={`flex text-white items-center justify-end w-full mt-2 transform transition-all duration-300 ${
                                showAnswer
                                    ? isAnswerCorrect
                                        ? "bg-green-500 translate-y-0 opacity-100"
                                        : "bg-red-500 translate-y-0 opacity-100"
                                    : "bg-inherit translate-y-full opacity-0"
                            }`}
                        >
                            <Card className="border rounded-lg font-serif shadow-md w-[180px] mr-4">
                                <CardBody className="flex items-center">
                                    {isAnswerCorrect ? (
                                        <>
                                            <span className="text-green-500 mr-2">
                                                Correct Answer
                                            </span>
                                            <Image
                                                alt="Correct Answer Icon"
                                                className="w-6 h-6"
                                                src="/image/correctIcon.png"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-red-500 mr-2">Wrong Answer</span>
                                            <Image
                                                alt="Wrong Answer Icon"
                                                className="w-6 h-6"
                                                src="/image/wrongIcon.png"
                                            />
                                        </>
                                    )}
                                </CardBody>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
