"use client";

import { Sun } from "lucide-react";
import React, { FC, useEffect, useState } from "react";
import { Location } from "@/interface/location";
import { useRouter } from "next/navigation";

interface TrafficLightProps {
  location: Location;
}

const TrafficLight: FC<TrafficLightProps> = ({ location }) => {
  const router = useRouter();
  const [count, setCount] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevCount) => prevCount - 1); // ✅ Decrement countdown
    }, 1000); // Run every second

    return () => clearInterval(interval); // Cleanup on unmount
  }, [count]); // ✅ Rerun effect when `count` changes

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
      setCount(30);
    }, 30000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [router]);
  return (
    <div className="flex flex-col">
      <h3 className="text-xl font-semibold mb-5">{location.name}</h3>
      <div className="flex flex-wrap gap-5">
        {location.traffics?.map((traffic, i) => (
          <div key={i} className="flex flex-col justify-center items-center text-red-500">
            <div
              className={
                traffic.status === "North" && count <= 5 ? "text-yellow-500" : traffic.status === "North" ? "text-green-500" : traffic.status === "East" && count <= 5 ? "text-yellow-500" : ""
              }
            >
              <Sun />
            </div>
            <div className="flex items-center gap-5">
              <div
                className={
                  traffic.status === "East" && count <= 5 ? "text-yellow-500" : traffic.status === "East" ? "text-green-500" : traffic.status === "South" && count <= 5 ? "text-yellow-500" : ""
                }
              >
                <Sun />
              </div>
              <div
                className={
                  traffic.status === "West" && count <= 5 ? "text-yellow-500" : traffic.status === "West" ? "text-green-500" : traffic.status === "North" && count <= 5 ? "text-yellow-500" : ""
                }
              >
                <Sun />
              </div>
            </div>
            <div
              className={
                traffic.status === "South" && count <= 5 ? "text-yellow-500" : traffic.status === "South" ? "text-green-500" : traffic.status === "West" && count <= 5 ? "text-yellow-500" : ""
              }
            >
              <Sun />
            </div>
            <p className="text-black mt-3">{count}</p>
            <p className="text-slate-600 font-semibold text-sm">{traffic.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrafficLight;
