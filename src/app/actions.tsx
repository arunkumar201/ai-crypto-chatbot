import { createAI } from 'ai/rsc';
import { openai } from '@ai-sdk/openai';
import { CoreMessage,generateId } from "ai";
import { z } from 'zod';
import { ReactNode } from 'react';
import type { ToolInvocation } from 'ai';


// Define the AI state and UI state types
export type AIState = Array<{
	id?: number;
	name?: 'get_crypto_price' | 'get_crypto_stats';
	role: 'user' | 'assistant' | 'system';
	content: string;
}>;

export const sendMessage = async (message: string) => {
	'use server';
	console.log(message);

}

export type UIState = Array<{
	id: number;
	role: 'user' | 'assistant';
	display: ReactNode;
	toolInvocations?: ToolInvocation[];
}>;



/*
- this is the System Message that we send to the AI Model (LLM) to intialted the AI
or this message give the AI model some context or input for tool invocation (calling)
*/
const contentMessage = `\
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
