import { Chat } from '@/components/chat'

export const runtime = 'edge'

export default function IndexPage () {
  return (
    <main className='grid h-screen place-content-center'>
      <Chat />
    </main>
  )
}
