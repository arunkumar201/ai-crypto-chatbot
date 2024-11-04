import { ChatInputForm } from "@/components/ChatInputForm";

export default function Home() {
  return (
    <main className="relative flex w-full min-h-screen flex-col items-center justify-start bg-gray-50 overflow-y-scroll overflow-x-hidden">
      <div className="fixed inset-x-0 bottom-0 w-full flex flex-col gap-4 items-center justify-center">
        <ChatInputForm />
      </div>
    </main>
  );
}
