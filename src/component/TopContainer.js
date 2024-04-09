import React, { useEffect, useState } from "react";
import { MdNetworkCell } from "react-icons/md";
import { BiWifi2 } from "react-icons/bi";
import { FaBatteryFull } from "react-icons/fa6";

const TopContainer = () => {
  const [time, setTime] = useState("");
  const getTime = () => {
    setInterval(() => {
      const date = new Date();
      setTime(date.toLocaleTimeString());
    }, 1000);
  };

  useEffect(() => {
    getTime();
  }, []);
  return (
    <div className="w-full flex justify-between items-center p-3 px-4">
      <div className="text-base font-semibold">{time}</div>
      <div className="flex gap-1 text-base">
        <MdNetworkCell />
        <BiWifi2 />
        <FaBatteryFull />
      </div>
    </div>
  );
};

export default TopContainer;
