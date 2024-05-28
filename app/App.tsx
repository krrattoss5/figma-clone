"use client";

import { fabric } from 'fabric'
import Live from "@/components/Live";
import NavBar from "@/components/Navbar";
import LeftSidebar from "@/components/users/LeftSidebar";
import RightSidebar from "@/components/users/RightSidebar";
import { ActiveElement, CustomFabricObject } from "@/types/type";
import { useEffect, useRef, useState } from "react";
import { handleCanvasMouseDown, handleResize, initializeFabric } from '@/lib/canvas';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const isDrawing = useRef(false)
  const shapeRef = useRef<fabric.Object | null>(null)
  const selectedShapeRef = useRef<string | null>('rectangle')

  const [activeElement, setActiveElement] = useState<ActiveElement>({
    name: '',
    value: '',
    icon: ''
  })

  const handleActiveElement = (elem: ActiveElement) => {
    setActiveElement(elem)

    selectedShapeRef.current = elem?.value as string
  }

  useEffect(() => {
    const canvas = initializeFabric({ canvasRef, fabricRef })

    canvas.on("mouse:down", (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        isDrawing,
        shapeRef,
        selectedShapeRef
      })
    })

    window.addEventListener("resize", () => {
      handleResize( {fabricRef} )
    })
  }, [])

  return (
    <main className="h-screen overflow-hidden">
      <NavBar
        activeElement={activeElement}
        handleActiveElement={handleActiveElement}
      />

      <section className="flex h-full flex-row">
        <LeftSidebar />
          <Live canvasRef={canvasRef} />
        <RightSidebar />
      </section>
    </main>
  );
}