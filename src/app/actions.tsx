import { createAI,getMutableAIState,streamUI } from 'ai/rsc';
import { ReactNode } from 'react';
import { CoreMessage,generateId,type ToolInvocation } from 'ai';
// import { openai } from '@ai-sdk/openai'
import { groq } from '@ai-sdk/groq';

import { BotCard,BotMessage } from '@/components/llm-crypto/UserMessage';
import { Loader2 } from 'lucide-react';
import { z } from 'zod';
import { PriceSkeleton } from '@/components/llm-crypto/price-skeleton';
import { env } from '@/env';
import { get_crypto_price } from '@/helpers';
import { PriceCard } from '@/components/llm-crypto/price-card';
//Hello! I'm a crypto assistant, designed to help you find information about cryptocurrencies. I can provide price data, stats, and other useful information.
// Define the AI state and UI state types
export type AIState = Array<{
	id?: number;
	name?: 'get_crypto_price' | 'get_crypto_stats';
	role: 'user' | 'assistant' | 'system';
	content: string;
}>;

export const sendMessage = async (message: string): Promise<{
	id: string,
	role: 'user' | 'assistant',
	display: ReactNode
}> => {
	'use server';
	console.log(message);
	const history = getMutableAIState<typeof AI>();

	history.update([
		...history.get(),
		{
			role: "user",
			content: message
		}
	]);

	const reply = await streamUI({
		model: groq("llama3-8b-8192"),
		messages: [
			{
				role: "system",
				content: contentMessage,
				toolInvocations: []
			},
			...history.get()
		] as CoreMessage[],
		initial: (
			<BotMessage>
				<Loader2 className='w-5 animate-spin stroke-gray-700 ' />
			</BotMessage>

		),
		text: ({ content,done }) => {
			if (done) {
				history.done([...history.get(),{
					role: "system",
					content
				}])
			}
			return <BotMessage>{content}</BotMessage>;
		},
		tools: {
			get_crypto_price: {
				description:
					"Get the current price of a given cryptocurrency. Use this to show the price to the user.",
				parameters: z.object({
					symbol: z
						.string()
						.describe("The name or symbol of the cryptocurrency. e.g. BTC/ETH/SOL.")
				}),
				generate: async function* ({ symbol }: { symbol: string }) {
					yield (
						<BotCard>
							<PriceSkeleton />
						</BotCard>
					)
					console.log('symbol',symbol)

					const { price,percentageChange,delta } = await get_crypto_price({ symbol });

					history.done([
						...history.get(),
						{
							role: "assistant",
							name: "get_crypto_price",
							content: `The current price of ${symbol} is ${price} USD, and the percentage change over the last 24 hours is ${percentageChange}%.`,
						}
					])

					return <BotCard>
						<PriceCard name={symbol} price={price} delta={delta} />
					</BotCard>;
				}
			},
			get_crypto_stats: {
				description:
					"Get various statistics about a given cryptocurrency. Use this to show additional information about the cryptocurrency to the user.",
				parameters: z.object({
					symbol: z
						.string()
						.describe("The name or symbol of the cryptocurrency or The full name of the cryptocurrency in lowercase. e.g. bitcoin/ethereum/solana.")
				}),
				generate: async function* ({ symbol }: { symbol: string }) {
					yield (
						<BotCard>
							<p>This is a placeholder for crypto stats.</p>
						</BotCard>
					)
					console.log('symbol',symbol)
					return null;
				}
			},
		}
	})
	return {
		id: generateId(),
		role: 'assistant' as const,
		display: <div className='flex flex-col justify-center items-center w-full h-full  text-xl sm:text-md'>{reply.value}</div>
	}

}

export type UIState = Array<{
	id: string;
	role: 'user' | 'assistant';
	display: ReactNode;
	toolInvocations?: ToolInvocation[];
}>;



/*
- this is the System Message that we send to the AI Model (LLM) to intialted the AI
or this message give the AI model some context or input for tool invocation (calling)
*/
export const contentMessage = `\
You are a crypto assistant specializing in cryptocurrency data and prices.

Guidelines:
1. **Crypto Price Requests**: To display a cryptocurrency's price (e.g., BTC), use \`get_crypto_price\`.
2. **Crypto Stats Requests**: For market cap or additional stats, use \`get_crypto_stats\`.
3. **UI Elements**: Wrap messages shown to the user in [ ] brackets. For instance, "[Price of BTC = 69000]" represents a UI message.
4. **Limitations**: 
   - **Stocks**: Inform the user that stock data isn't available.
   - **Other Requests**: If outside crypto prices and stats, reply that the task is unsupported.

In addition to crypto data, you're here to chat and answer questions!`;


// Create the AI provider with the initial states and allowed actions
export const AI = createAI({
	initialAIState: [] as AIState,
	initialUIState: [] as UIState,
	actions: {
		sendMessage,
	},
});
