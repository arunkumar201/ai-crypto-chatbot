import { ChatInputForm } from "@/components/ChatInputForm";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative flex w-full min-h-screen flex-col items-center justify-start bg-gray-50 overflow-y-scroll overflow-x-hidden">
      <div className='z-[1000] w-full h-[4rem] absolute -top-[0rem] left-0 right-0 flex flex-col items-center justify-center gap-4 px-4 py-2 bg-indigo-300 border rounded-b-xl border-indigo-500 text-indigo-800 shadow-lg'>
        <Button variant={"outline"} className='mt-2 p-4' size={"lg"}>
          <h1>Welcome to Crypto AI Chatbot</h1>
        </Button>
      </div>
      <div className="fixed inset-x-0 bottom-0 w-full flex flex-col gap-4 items-center justify-center">
        <ChatInputForm />
      </div>
    </main>
  );
}
