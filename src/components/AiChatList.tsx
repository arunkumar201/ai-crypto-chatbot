import { UIState } from "@/app/actions";

export interface AiChatListProps {
	message: UIState
}

export const AiChatList = ({ message }: AiChatListProps) => {
	if (!message.length) return null;

	return (
		<div className="flex flex-col gap-2 mx-auto sm:max-w-2xl px-2 md:px-14  md:py-0 w-full py-3">
			{message.map((msg) => (
				<div key={msg.id} className="pb-4 w-full">{msg.display}</div>
			))}
		</div>
	)
}
