import { AiChatList } from "@/components/AiChatList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start px-6 py-6 sm:p-12 bg-gray-50">
      <h1>Welecome Crypto AI chatbot</h1>
      <div>
        <AiChatList message={[]} />
      </div>
    </main>
  );
}
