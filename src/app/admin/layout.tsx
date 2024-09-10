"use client";
import Menu from "@/components/Menu";
import Navbar from "@/components/Navbar";
import CalendarUI from "@/components/Calendar";
import Image from "next/image";
import Link from "next/link";
import { userAppStore } from "@/store/store";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { me } from "@/lib/auth";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const router = useRouter();
  const { userInfo, setUserInfo }: any = userAppStore();
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        try {
          const data = await me();
          setUserInfo(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          router.push("/signin");
        } finally {
          setIsLoading(false);
        }
      } else {
        router.push("/signin");
      }
    };
    getUser();
  }, [setUserInfo, router]);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    isClient &&
    !isLoading && (
      <div className="h-screen flex overflow-y-auto overflow-x-hidden">
        {/* LEFT */}
        <div className="w-[14%] md:w-[8%] lg:w-[16%] xl:w-[14%] p-4">
          <Link href="/" className="flex items-center justify-center gap-2">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </Link>

          {pathname === "/admin/reservation" && <CalendarUI />}
          <Menu />
        </div>
        {/* RIGHT */}
        <div className="w-[86%] md:w-[92%] lg:w-[84%] xl:w-[86%] bg-[#F7F8FA] flex flex-col">
          <Navbar userInfo={userInfo} />
          {children}
        </div>
      </div>
    )
  );
}
