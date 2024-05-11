"use client";
import { useRouter } from "next/navigation";
import AnswerCard from "../ui/Card";
import React, { useState } from "react";
import { Image } from "@nextui-org/image";
import { CardBody, Card, Chip } from "@nextui-org/react";
export default function Quiz() {
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
    const [isChoosingAnswer, setIsChoosingAnswer] = useState(false);
    const question = "What is the capital of France?";
    const answerList = [
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
    ];

    const handleAnswerClick = (isCorrect) => {
        setIsChoosingAnswer(true);
        setIsAnswerCorrect(isCorrect);
        if (isCorrect) {
            console.log("Correct answer chosen");
        } else {
            console.log("Wrong answer chosen");
        }
    };

    return (
        <div className="h-full grid grid-rows-15 ">
            <div className="row-span-1 flex flex-row text-white items-center ml-3">
                <Chip size="lg" variant="faded">
                    11/230
                </Chip>
            </div>
            <div className="grid grid-rows-10 text-white bg-fuchsia-950 rounded-lg p-2 mt-4 row-span-12">
                <div className="flex items-center justify-center row-span-5">
                    <h1 className="text-4xl font-bold font-sans">{question}</h1>
                </div>
                <div className="flex flex-row justify-between row-span-5">
                    {answerList.map((answer, index) => (
                        <AnswerCard
                            answer={answer}
                            key={index}
                            handleAnswerClick={handleAnswerClick}
                            isChoosingAnswer={isChoosingAnswer}
                            index={index}
                        />
                    ))}
                </div>
            </div>
            <div className="flex flex-row row-span-2 w-full h-full">
                <div
                    className={`text-white w-full mt-2 rounded-lg transform transition-all duration-300 ${
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
