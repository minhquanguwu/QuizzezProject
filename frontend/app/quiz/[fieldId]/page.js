"use client";
import { useRouter } from "next/navigation";
import AnswerCard from "../../ui/Card";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Script from "next/script";
import { CardBody, Card, Chip } from "@nextui-org/react";
import { CSSTransition } from "react-transition-group";
import { Button } from "@nextui-org/react";
export default function Quiz() {
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [isChoosingAnswer, setIsChoosingAnswer] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [gaze, setGaze] = useState(false);
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
    const question = "What is the capital of France?";
    const answerList = [
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
            isCorrect: false,
        },
        {
            body: "Answer 4",
            image: "https://nextui.org/images/hero-card.jpeg",
            isCorrect: true,
        },
    ];

    const handleAnswerClick = (isCorrect) => {
        setIsChoosingAnswer(true);
        setIsAnswerCorrect(isCorrect);
        setShowAnswer(true);
    };

    useEffect(() => {
        if (showAnswer) {
            const timer = setTimeout(() => {
                setIsAnswerCorrect(false);
                setIsChoosingAnswer(false);
                setShowAnswer(false);
                if (currentQuestionIndex < questionList.length - 1) {
                    setCurrentQuestionIndex((currentQuestionIndex) => currentQuestionIndex + 1);
                } else {
                    // All questions have been answered
                    // Show a completion message or redirect to a results page
                    console.log("All questions have been answered");
                }
            }, 2000); // Change this to the duration of your animation

            return () => clearTimeout(timer);
        }
    }, [showAnswer]);

    return (
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
                    <h1 className="text-4xl font-bold font-sans">
                        {questionList[currentQuestionIndex].question}
                    </h1>
                </div>
                <div className="flex flex-row justify-between row-span-5">
                    {questionList[currentQuestionIndex].answerList.map((answer, index) => (
                        <CSSTransition in={showAnswer} timeout={2000} classNames="answer">
                            <AnswerCard
                                answer={answer}
                                key={index}
                                handleAnswerClick={() => handleAnswerClick(answer.isCorrect)}
                                isChoosingAnswer={isChoosingAnswer}
                                index={index}
                            />
                        </CSSTransition>
                    ))}
                </div>
            </div>
            <div className="flex flex-row row-span-2 w-full h-full ">
                <div
                    className={`text-white w-full mt-2 transform transition-all duration-300 ${
                        isChoosingAnswer
                            ? isAnswerCorrect
                                ? "bg-green-500 translate-y-0 opacity-100"
                                : "bg-red-500 translate-y-0 opacity-100"
                            : "bg-inherit translate-y-full opacity-0"
                    }`}
                >
                    <Card>
                        <CardBody>{isAnswerCorrect ? " Correct Answer" : " Wrong Answer"}</CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
