"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function Dashboard() {
    const router = useRouter();

    return (
        <div>
            <div className="uppercase text-5xl font-bold font-mono py-4">
                What do you want to do today?
            </div>
            <div className="flex flex-row gap-10 pt-20">
                <Card
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
