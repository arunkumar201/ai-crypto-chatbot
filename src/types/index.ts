import { z } from "zod";

export const ZChatInputSchema = z.object({
	message: z
		.string()
		.min(3, { message: "Message must be at least 3 characters" }),
});

export type TChatInputSchema = z.infer<typeof ZChatInputSchema>;
