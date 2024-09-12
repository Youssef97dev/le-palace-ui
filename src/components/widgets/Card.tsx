"use client";
import { useEffect, useState } from "react";
import { getCount } from "@/lib/reservation";
import { BounceLoader } from "react-spinners";

const Card = ({ type, title }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const getCardCount = async () => {
      try {
        const data = await getCount(type);
        setCount(data.length);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getCardCount();
  }, []);
  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      {isLoading ? (
        <BounceLoader />
      ) : (
        <>
          <h1 className="text-2xl font-semibold my-4">{count}</h1>
          <h2 className="capitalize text-sm font-medium">{title}</h2>
        </>
      )}
    </div>
  );
};

export default Card;
