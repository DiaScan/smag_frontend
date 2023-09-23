"use client";

import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";

import { Image } from "@nextui-org/image";
import React, { useState, useEffect } from "react";
import { API } from "@/components/fetching";
import { useAuth } from "../contexts/Context";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Props = {};

const Page = (props: Props) => {
    const nav = useRouter();
    const pair = [
        {
            imgSrc: "/images/selecttrack/import.svg",
            btnText: "Manage your Shops",
            redirect: "/shop-manage",
            heading: "Improve Sales",
        },
        {
            imgSrc: "/images/selecttrack/initiate.svg",
            btnText: "Start a new Shop",
            redirect: "/shop-register",
            heading: "Get into business?",
        },
    ];

    return (
        <div className="flex min-h-screen h-full flex-col items-center justify-font center p-10 gap-16">
            <h1 className="text-4xl p-4 font-teko">
                So what should we help you with today?
            </h1>
            <div className="flex justify-around w-full">
                {pair.map((item, index) => (
                    <Card
                        key={`opt${index}`}
                        onPress={() => nav.push(item.redirect)}
                        className="hover:scale-105 cursor-pointer"
                    >
                        <CardHeader className="flex flex-col">
                            <p className="text-md font-teko font-light">
                                {item.heading}
                            </p>
                            <h4 className="text-black text-3xl font-teko">
                                {item.btnText}
                            </h4>
                        </CardHeader>
                        <Image
                            removeWrapper
                            src={item.imgSrc}
                            onClick={() => nav.push(item.redirect)}
                            className="object-cover"
                            alt="Bring Your Own Data"
                            width={300}
                        />
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Page;
