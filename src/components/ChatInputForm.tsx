'use client'

import { useEnterSubmit } from '@/hooks/useEnterSubmit';
import Form from 'next/form'
import { FieldValues,SubmitHandler,useForm } from 'react-hook-form'
import TextAreaAutoSize from 'react-textarea-autosize'
import { Button } from './ui/button';
import { ArrowDownIcon,PlusIcon } from 'lucide-react';
import { TChatInputSchema } from '@/types';
import { useActions,useUIState } from 'ai/rsc';
import { AI } from '@/app/actions';
import { UserMessage } from './llm-crypto/UserMessage';
import { generateId } from 'ai';
import { AiChatList } from './AiChatList';
import { ChatScrollAnchor } from './ChatScrollAnchor';
export const ChatInputForm = () => {
	const chatForm = useForm();
	const { formRef,onkeyDown } = useEnterSubmit({});
	const [messages,setMessages] = useUIState<typeof AI>();

	const { sendMessage } = useActions<typeof AI>()


	const onSubmit: SubmitHandler<TChatInputSchema> = async ({ message }) => {
		const value = message.trim();
		formRef.current?.reset();
		if (!value) {
			return;
		}

		setMessages(currentMessages => [
			...currentMessages,
			{
				id: generateId(),
				role: "user",
				display: <UserMessage>{value}</UserMessage>,
			},
		]);

		try {
			const responseMessage = await sendMessage(value);
			setMessages(currentMessages => [...currentMessages,responseMessage]);
		} catch (err) {
			console.error('Error sending message to AI',err);
		}
	}

	return (
		<>
			<div className="pb-[26px] pt-4 md:pt-10 overflow-y-scroll max-h-svh scroll-m-0 flex-1 w-full">
				<AiChatList message={messages} />
				<ChatScrollAnchor messages={messages} />
			</div>
			<div className='mx-auto sm:max-w-2xl px-4 md:px-0  md:py-0 w-full py-3'>
				<div className="px-4 flex justify-center flex-col py-2 space-y-4 border-t shadow-lg bg-background sm:rounded-t-xl sm:border md:py-4 bg-white">
					<Form ref={formRef} onSubmit={chatForm.handleSubmit(onSubmit as SubmitHandler<FieldValues>)} action={() => { }}>
						<div className='relative flex items-center gap-2 flex-col  overflow-hidden max-h-60 grow bg-background rounded-md border'>
							<TextAreaAutoSize
								tabIndex={0}
								className='min-h-[60px] resize-none h-full w-full pl-4 pr-16 py-[1.5rem]  focus-within:outline-none'
								placeholder='send a message...'
								onKeyDown={onkeyDown}
								spellCheck={false}
								autoFocus
								autoCapitalize='off'
								autoComplete='off'
								autoCorrect='off'
								rows={1}
								{...chatForm.register('message',{ required: true })}
							/>
							<div className='absolute top-4  right-0  sm:right-4 flex items-center gap-2 rounded-md   bg-background px-4 py-2 text-sm text-muted sm:rounded-md'>
								<Button
									type='submit'
									size={"icon"}
									disabled={chatForm.watch("message") === ""}
								>
									<ArrowDownIcon className="w-5 h-5" />
									<span className='sr-only'>Send Message</span>
								</Button>
							</div>
						</div>

					</Form>

					<Button className='p-4 mt-4 rounded-full bg-background' variant={"outline"} size={"lg"}
						onClick={(e) => {
							e.preventDefault();
							window.location.reload();
						}}
					>
						<PlusIcon className='w-5 h-5' />
						<span className='sr-only'>Add New Chat</span>
						<span>New Chat</span>
					</Button>
				</div>
			</div >
		</>
	)

}
