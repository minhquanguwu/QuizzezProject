import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { Image } from "@nextui-org/react";

export default function QuizLogo() {
    return (
        <div className={`font-sans flex flex-row items-center leading-none text-white`}>
            <Image src="/image/quiz.png" height={20} width={20}></Image>
            <p className="text-[44px]">Quizzez</p>
        </div>
    );
}
