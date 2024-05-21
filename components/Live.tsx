import React, { useCallback, useEffect, useState } from 'react'
import LiveCursors from './cursor/LiveCursors'
import { useBroadcastEvent, useEventListener, useMyPresence, useOthers } from '@/liveblocks.config'
import CursorChat from './cursor/CursorChat'
import { CursorMode, CursorState, Reaction, ReactionEvent } from '@/types/type'
import ReactionSelector from './reaction/ReactionButton'
import FlyingReaction from './reaction/FlyingReaction'
import useInterval from '@/hooks/useInterval'

const Live = () => {
  const others = useOthers()
  const [{cursor}, updateMyPresence] = useMyPresence() as any

  const [cursorState,setCursorState] = useState<CursorState>({
    mode: CursorMode.Hidden
  })

  const [reaction, setReaction] = useState<Reaction[]>([])

  const broadcast = useBroadcastEvent()

  //eliminino las reacciones que ya no son visibles
  useInterval(() => {
    setReaction((reaction) => reaction.filter(r => r.timestamp > Date.now() - 4000))
  }, 1000)

  // hacer visibles las reacciones
  useInterval(() => {
    if(cursorState.mode === CursorMode.Reaction && cursorState.isPressed && cursor) {

      setReaction((reactions) => reactions.concat([
        {
          point: { x: cursor.x, y: cursor.y},
          value: cursorState.reaction,
          timestamp: Date.now()
        }
      ]))

      broadcast({
        x: cursor.x,
        y: cursor.y,
        value: cursorState.reaction,
      })
    }
  }, 100)

  useEventListener((eventData) => {
    const event = eventData.event as ReactionEvent

    setReaction((reactions) => reactions.concat([
      {
        point: { x: event.x, y: event.y},
        value: event.value,
        timestamp: Date.now()
      }
    ]))
  })

  const handlePointerMove = useCallback((event: React.PointerEvent) => {
    event.preventDefault()

    if(cursor == null || cursorState.mode !== CursorMode.ReactionSelector) {
      const x = event.clientX - event.currentTarget.getBoundingClientRect().x
      const y = event.clientY - event.currentTarget.getBoundingClientRect().y
      updateMyPresence({cursor:{x, y}})
    }
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

    setCursorState((state: CursorState) => cursorState.mode === CursorMode.Reaction ? {...state, isPressed: true} : state)

  }, [cursorState.mode, setCursorState])

  const handlePointerUp = useCallback((event: React.PointerEvent) => {
    setCursorState((state: CursorState) => cursorState.mode === CursorMode.Reaction ? {...state, isPressed: false} : state)

  }, [cursorState.mode, setCursorState])

  useEffect(() => {
    const onKeyUp = (e: KeyboardEvent) => {
      if(e.key === '/') {
        setCursorState({
          mode: CursorMode.Chat,
          previousMessage: null,
          message: '',
        })
      } else if (e.key === 'Escape') {
        updateMyPresence({ message: '' })
        setCursorState({
          mode: CursorMode.Hidden
        })
      } else if (e.key === 'e') {
        setCursorState({
          mode: CursorMode.ReactionSelector
        })
      }
    }

    const onKeyDown = (e: KeyboardEvent) => {
      if(e.key === '/'){
        e.preventDefault()
      }
    }

    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('keydown', onKeyDown)
    }

  }, [updateMyPresence])

  const setReactions = useCallback((reaction: string) => {
    setCursorState({
      mode: CursorMode.Reaction,
      reaction,
      isPressed: false
    })
  }, [])

  return (
    <div
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerUp={handlePointerUp}
      onPointerDown={handlePointerDown}
      className='border-4 border-green-500 w-full h-[100vh] flex justify-center items-center text-center'
    >
      <h1 className="text-2xl text-white">Figma Clone</h1>
      <LiveCursors others={others} />

      {reaction.map((r) => (
        <FlyingReaction
          key={r.timestamp.toString()}
          x={r.point.x}
          y={r.point.y}
          timestamp={r.timestamp}
          value={r.value}
       />
      ))}

      {cursor && (
        <CursorChat
          cursor={cursor}
          cursorState={cursorState}
          setCursorState={setCursorState}
          updateMyPresence={updateMyPresence}
        />
      )}

      {cursorState.mode === CursorMode.ReactionSelector && (
        <ReactionSelector
          setReaction={setReactions}
       />
      )}

    </div>
  )
}

export default Live