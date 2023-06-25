'use client'

import { useChat } from 'ai/react'

export function Chat () {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat' // The path to the API route
  })

  return (
    <div className='flex flex-col max-w-xl px-8 mx-auto'>
      {messages.length > 0 && (
        <>
          {messages.map((message) => {
            const isAI = message.role !== 'user'
            return (
              <div key={message.id}>
                <p>
                  {isAI ? '🤖' : '👤'}
                  <span className={`pl-2 ${isAI ? 'text-yellow-500' : 'text-blue-300'}`}>
                    {message.content}
                  </span>
                </p>
              </div>
            )
          })}
        </>
      )}

      <form onSubmit={handleSubmit}>
        <input
          id='input'
          className='fixed w-full max-w-xl px-4 py-2 m-auto mb-8 text-sm border border-gray-400 rounded-full shadow-2xl bottom-4'
          type='text'
          value={input}
          onChange={handleInputChange}
          placeholder='Say something...'
        />
      </form>
    </div>
  )
}
