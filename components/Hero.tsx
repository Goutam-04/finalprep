"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchModal } from "./SearchModal";
import Image from "next/image";
import { LineShadowText } from "@/components/magicui/line-shadow-text";

export default function Hero() {
    return (
        <section className="bg-[#101820] text-[#E0E0E0] py-12 px-0 pb-0">
            <div className="max-w-7xl mx-auto px-4">
                {/* Yellow Heading */}
               <h1 className="text-balance text-5xl font-semibold leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl text-center">
      Final
      <LineShadowText className="italic text-amber-300" shadowColor={"#FEE715"}>
        Prep
      </LineShadowText>
    </h1>

                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16">
                    {/* Left Column */}
                    <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
                        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                            Your Last Day DSA <br className="hidden md:block" />
                            Preparation for Interviews
                        </h1>
                        <p className="text-lg md:text-xl text-[#c0c0c0] max-w-xl mx-auto md:mx-0">
                            Search company-wise frequently asked DSA questions.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 max-w-lg mx-auto md:mx-0">
                            <Input
                                type="text"
                                placeholder="Search for a company (e.g., Amazon)"
                                className="bg-white text-black w-full h-12 text-lg px-5"
                                onClick={() => {
                                    const ctrlKEvent = new KeyboardEvent("keydown", {
                                        bubbles: true,
                                        cancelable: true,
                                        key: "k",
                                        code: "KeyK",
                                        ctrlKey: true,
                                    });
                                    window.dispatchEvent(ctrlKEvent);
                                }}
                            />
                            <Button className="bg-[#FEE715] text-[#101820] w-full sm:w-auto h-12 px-5 text-base font-semibold">
                                ⌘ + K
                            </Button>
                        </div>
                    </div>

                    {/* Right Column (Animated Illustration) */}
                    <div className="w-full md:w-1/2 flex justify-center md:justify-end">
                        <object
                            type="image/svg+xml"
                            data="/images/programming-animate.svg"
                            className="w-[550px] h-auto mix-blend-screen opacity-90 drop-shadow-xl scale-x-[-1]"
                            aria-label="Animated coding illustration"
                        />
                    </div>
                </div>
            </div>

            {/* Search Modal Trigger */}
            <SearchModal />
        </section>
    );
}
