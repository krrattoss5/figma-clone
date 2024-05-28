"use client";

import { fabric } from 'fabric'
import Live from "@/components/Live";
import NavBar from "@/components/Navbar";
import LeftSidebar from "@/components/users/LeftSidebar";
import RightSidebar from "@/components/users/RightSidebar";
import { ActiveElement, CustomFabricObject } from "@/types/type";
import { useEffect, useRef, useState } from "react";
import { handleCanvasMouseDown, handleCanvasMouseUp, handleCanvaseMouseMove, handleResize, initializeFabric, renderCanvas } from '@/lib/canvas';
import { useMutation, useStorage } from '@/liveblocks.config';

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fabricRef = useRef<fabric.Canvas | null>(null)
  const isDrawing = useRef(false)
  const shapeRef = useRef<fabric.Object | null>(null)
  const selectedShapeRef = useRef<string | null>('rectangle')
  const activeObjectRef = useRef<fabric.Object | null>(null)

  const canvasObjects = useStorage((root) => root.canvasObjects)

  const syncShapeInStorage = useMutation(({ storage }, object) => {
    if(!object) return

    const {objectId} = object

    const shapeData = object.toJSON()
    shapeData.objectId = objectId

    const canvasObjects = storage.get('canvasObjects')
    canvasObjects.set(objectId, shapeData)
  }, [])

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

    canvas.on('mouse:down', (options) => {
      handleCanvasMouseDown({
        options,
        canvas,
        selectedShapeRef,
        isDrawing,
        shapeRef,
      })
    })

    canvas.on("mouse:move", (options) => {
      handleCanvaseMouseMove({
        options,
        canvas,
        isDrawing,
        selectedShapeRef,
        shapeRef,
        syncShapeInStorage,
      });
    });

    canvas.on("mouse:up", (options) => {
      handleCanvasMouseUp({
        canvas,
        isDrawing,
        selectedShapeRef,
        shapeRef,
        syncShapeInStorage,
        setActiveElement,
        activeObjectRef
      });
    });

    window.addEventListener("resize", () => {
      handleResize({
        canvas: fabricRef.current
       })
    })

    return () => {
      canvas.dispose()

      window.removeEventListener('resize', () => {
        handleResize({
          canvas: null
        })
      })
    }

  }, [canvasRef])

  useEffect(() => {

  }, [canvasObjects])
    renderCanvas({
      fabricRef,
      canvasObjects,
      activeObjectRef
    })
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