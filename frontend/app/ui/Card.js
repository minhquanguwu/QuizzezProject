"use client";
import React from "react";
import { Card, CardHeader, CardBody, Image, Chip } from "@nextui-org/react";

export default function AnswerCard({ answer, handleAnswerClick, isChoosingAnswer, index }) {
    const letters = ["A", "B", "C", "D", "E", "F"];
    return (
        <Card
            isFooterBlurred
            radius="lg"
            className={`border-none bg-amber-200 w-[350px] h-[200px] transition-colors duration-500 ${
                isChoosingAnswer ? (answer.isCorrect ? "bg-green-500" : "bg-red-500") : "bg-white"
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
    );
}
