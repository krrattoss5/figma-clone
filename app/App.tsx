"use client";

import { fabric } from 'fabric'
import Live from "@/components/Live";
import NavBar from "@/components/Navbar";
import LeftSidebar from "@/components/users/LeftSidebar";
import RightSidebar from "@/components/users/RightSidebar";
import { ActiveElement, CustomFabricObject } from "@/types/type";
import { useEffect, useRef, useState } from "react";
import { handleCanvasMouseDown, handleCanvasMouseUp, handleCanvasObjectModified, handleCanvaseMouseMove, handleResize, initializeFabric, renderCanvas } from '@/lib/canvas';
import { useMutation, useRedo, useStorage, useUndo } from '@/liveblocks.config';
import { defaultNavElement } from '@/constants';
import { handleDelete } from '@/lib/key-events';

export default function Home() {
  const undo = useUndo()
  const redo = useRedo()

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
    icon: '',
  })

  const deleteAllShapes = useMutation(({ storage }) => {
    const canvasObjects = storage.get('canvasObjects')

    if(!canvasObjects || canvasObjects.size === 0) return true

    for (const [key, value] of canvasObjects.entries()) {
      canvasObjects.delete(key)
    }

    return canvasObjects.size === 0
  }, [])

  const deleteShapesFromStorage = useMutation(({ storage }, objectId) => {
    const canvasObjects = storage.get('canvasObjects')

    canvasObjects.delete(objectId)
  }, [])

  const handleActiveElement = (elem: ActiveElement) => {
    setActiveElement(elem)

    switch (elem?.value) {
      case 'reset':
        deleteAllShapes()
        fabricRef.current?.clear()
        setActiveElement(defaultNavElement)
      break;

      case 'delete':
        handleDelete(
          fabricRef.current as any,
          deleteShapesFromStorage
        )
        setActiveElement(defaultNavElement)

      default:
        break;
    }

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

    canvas.on("mouse:up", () => {
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

    canvas.on("object:modified", (options) => {
      handleCanvasObjectModified({
        options,
        syncShapeInStorage
      })
    })

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
        <LeftSidebar allShapes={Array.from(canvasObjects)} />
          <Live canvasRef={canvasRef} />
        <RightSidebar />
      </section>
    </main>
  );
}