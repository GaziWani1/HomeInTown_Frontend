"use client";
import React from "react";
import DeviceLayout from "@/app/components/devicelayout";

const Main = ({ children }: { children: React.ReactNode }) => {
  return <DeviceLayout>{children}</DeviceLayout>;
};

export default Main;
