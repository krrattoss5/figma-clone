import CursorSVG from '@/public/assets/CursorSVG'
import { type CursorChatProps, CursorMode } from '@/types/type'
import React from 'react'
// {cursorState.mode === CursorMode.Chat && (
// )}
  
const CursorChat = ({setCursorState,cursorState,updateMyPresence,cursor}: CursorChatProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {

  }

  return (
    <div className='absolute top-0 left-0' style={{ transform: `translateX(${cursor.x}px) translateY(${cursor.y}px)`}}>
        <>
         <CursorSVG color='#000' />
         <div className='absolute top-5 left-2 bg-blue-500 px-4 py-2 text-sm leading-relaxed text-white rounded-[20px]'>
          {cursorState.previousMessage && (
            <div>{cursorState.previousMessage}</div>
          )}
          <input type="text" className='z-10 w-60 border-none bg-transparent text-white placeholder-blue-300 outline-none' autoFocus={true} />
         </div>
        </>
    </div>
  )
}

export default CursorChat