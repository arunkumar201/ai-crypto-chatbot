import { ChatInputForm } from "@/components/ChatInputForm";
import { ChatScrollAnchor } from "@/components/ChatScrollAnchor";

export default function Home() {
  return (
    <main className="relative flex w-full min-h-screen flex-col items-center justify-start bg-gray-50">
      <div className="pb-[200px] pt-4 md:pt-10">
        <ChatScrollAnchor />
      </div>
      {/* Add your chatbot implementation here */}
      <div className="fixed inset-x-0 bottom-0 w-full flex flex-col gap-4 items-center justify-center">
        <ChatInputForm />
      </div>
    </main>
  );
}
