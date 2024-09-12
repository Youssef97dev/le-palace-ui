"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { me } from "@/lib/auth";

import Menu from "@/components/Menu";
import Dashboard from "@/components/Dashboard";
import Navbar from "@/components/Navbar";

import { userAppStore } from "@/store/store";

import { HashLoader } from "react-spinners";

export default function Home() {
  const router = useRouter();
  const { userInfo, setUserInfo }: any = userAppStore();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const data = await me();
      setUserInfo(data);
    };
    getUser();
  }, [setUserInfo]);

  useEffect(() => {
    console.log("userInfo: ", userInfo);
    // Check if user is authenticated
    if (!userInfo) {
      router.push("/signin");
    } else {
      router.push("/admin");
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    isClient && (
      <div className="h-screen flex justify-center items-center">
        <HashLoader color="#3b3f5c" size={70} />
      </div>
    )
  );
}
