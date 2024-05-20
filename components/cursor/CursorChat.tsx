import CursorSVG from '@/public/assets/CursorSVG'
import { type CursorChatProps, CursorMode } from '@/types/type'
import React from 'react'

const CursorChat = ({setCursorState,cursorState,updateMyPresence,cursor}: CursorChatProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateMyPresence({message: e.target.value})
    setCursorState({
      mode: CursorMode.Chat,
      message: e.target.value,
      previousMessage: null
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      setCursorState({
        mode: CursorMode.Chat,
        message: cursorState.message,
        previousMessage: ''
      })
    } else if (e.key === 'Escape') {
      setCursorState({
        mode: CursorMode.Hidden
      })
    }
  }

  return (
    <div className='absolute top-0 left-0' style={{ transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`}}>

      {cursorState.mode === CursorMode.Chat && (
        <>
         <CursorSVG color='#000' />
         <div className='absolute top-5 left-2 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]'>
          {cursorState.previousMessage && (
            <div>{cursorState.previousMessage}</div>
          )}
          <input
            type="text"
            className='z-10 w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none'
            autoFocus={true}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={cursorState.previousMessage ? '' : 'Type a message...'}
            value={cursorState.message}
            maxLength={50}
          />
         </div>
        </>
      )}
    </div>
  )
}

export default CursorChat