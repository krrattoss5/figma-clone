import React, { useCallback, useState } from 'react'
import LiveCursors from './cursor/LiveCursors'
import { useMyPresence, useOthers } from '@/liveblocks.config'
import CursorChat from './cursor/CursorChat'
import { CursorMode } from '@/types/type'

const Live = () => {
  const others = useOthers()
  const [{cursor}, updateMyPresence] = useMyPresence() as any

  const [cursorState,setCursorState] = useState({
    mode: CursorMode.Hidden
  })

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault()

    const x = event.clientX - event.currentTarget.getBoundingClientRect().x
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y

    updateMyPresence({cursor:{x, y}})
  }, [])

  const handlePointerLeave = useCallback((event: React.PointerEvent) => {
    event.preventDefault()

    setCursorState({mode: CursorMode.Hidden})
    updateMyPresence({cursor: null, message: null})
  }, [])

  const handlePointerDown = useCallback((event: React.PointerEvent) => {
    event.preventDefault()

    const x = event.clientX - event.currentTarget.getBoundingClientRect().x
    const y = event.clientY - event.currentTarget.getBoundingClientRect().y

    updateMyPresence({cursor:{x, y}})
  }, [])

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      className='border-4 border-green-500 w-full h-[100vh] flex justify-center items-center text-center'
    >
      <h1 className="text-2xl text-white">Figma Clone</h1>
      <LiveCursors others={others} />

      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}
    </div>
  )
}

export default Live