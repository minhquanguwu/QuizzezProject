"use client";
import { useRouter } from "next/navigation";
import AnswerCard from "../../ui/Card";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Script from "next/script";
import { CardBody, Card, Chip, Progress } from "@nextui-org/react";
import { CSSTransition } from "react-transition-group";
import { Button, Image } from "@nextui-org/react";
export default function Quiz() {
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [gaze, setGaze] = useState(false);
    const [showUserResult, setShowUserResult] = useState(false);
    const [result, setResult] = useState(0);
    const router = useRouter();
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

    return (
        <div className="h-full">
            {showUserResult && (
                <div className="grid grid-rows-6 gap-4 p-4 text-white bg-[#230D21] rounded-lg shadow-lg max-w-md mx-auto font-serif">
                    <div>Your Score: {result}</div>
                    <div className="row-span-2 text-2xl font-bold flex gap-4">
                        <div className="h-[100px] w-[260px] bg-black rounded-lg mx-auto p-3">
                            Avatar
                        </div>
                        <div className="h-[100px] bg-black rounded-md flex-grow p-3">Avatar</div>
                    </div>

                    <Progress
                        label="Correct Answers"
                        size="md"
                        value={(result / questionList.length) * 100}
                        color="success"
                        showValueLabel={true}
                        className="max-w-md"
                    />
                    <div className="flex flex-row justify-center gap-3">
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
                    <div
                        id="gaze"
                        className="absolute none w-24 h-24 rounded-full border-2 border-white border-opacity-20 shadow-lg pointer-events-none z-50 bg-red-400"
                    ></div>
                    <Script src="https://api.gazerecorder.com/GazeCloudAPI.js"></Script>
                    <div className="row-span-1 flex flex-row text-white items-center ml-3">
                        <Chip size="lg" variant="faded">
                            {currentQuestionIndex + 1}/{questionList.length}
                        </Chip>
                        <Button onClick={() => setGaze(true)}> StartEyeTracking</Button>
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
                                    <AnswerCard
                                        answer={answer}
                                        key={index}
                                        handleAnswerClick={() =>
                                            handleAnswerClick(answer.isCorrect)
                                        }
                                        isChoosingAnswer={showAnswer}
                                        index={index}
                                    />
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
