import { UIState } from "@/app/actions";

export interface AiChatListProps {
	message: UIState
}

export const AiChatList = ({ message }: AiChatListProps) => {
	if (!message.length) return null;

	return (
		<div className="flex flex-col gap-2">
			{message.map((msg) => (
				<div key={msg.id} className="pb-4">{msg.display}</div>
			))}
		</div>
	)
}
