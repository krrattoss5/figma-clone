"use client";

import { fabric } from 'fabric'
import Live from "@/components/Live";
import NavBar from "@/components/NavBar";
import LeftSidebar from "@/components/users/LeftSidebar";
import RightSidebar from "@/components/users/RightSidebar";
import { CustomFabricObject } from "@/types/type";
import { useRef } from "react";

export default function Page() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.canvas | null>()
  const isDrawing = useRef(false)

  return (
    <main className="h-screen overflow-hidden">
      <NavBar />

      <section className="flex h-full flex-row">
        <LeftSidebar />
          <Live />
        <RightSidebar />
      </section>
    </main>
  );
}