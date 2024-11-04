/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useAtBottom } from '@/hooks/useAtBottom';
import * as React from 'react';
import { useInView } from 'react-intersection-observer';

interface ChatScrollAnchorProps {
	trackVisibility?: boolean;
	messages: any;
	forceScroll?: boolean;
}

export function ChatScrollAnchor({
	trackVisibility = true,
	messages,
	forceScroll = true
}: ChatScrollAnchorProps) {
	const isAtBottom = useAtBottom();
	const { ref,entry } = useInView({
		trackVisibility,
		delay: 100,
		rootMargin: '0px 0px 50px 50px', 
	});

	React.useEffect(() => {
		if (entry?.target) {
			const shouldScroll = forceScroll || isAtBottom;
			if (shouldScroll) {
				requestAnimationFrame(() => {
					entry.target.scrollIntoView({
						behavior: 'smooth',
						block: 'end',
						inline: "end"
					});
				});
			}
		}
	},[entry,isAtBottom,messages,forceScroll]);

	const scrollToBottom = React.useCallback(() => {
		if (entry?.target) {
			entry.target.scrollIntoView({
				behavior: 'smooth',
				block: 'end',
			});
		}
	},[entry]);

	return (
		<>
			<div ref={ref} className="h-px w-full" />
			{!isAtBottom && (
				<button
					onClick={scrollToBottom}
					className="fixed bottom-4 right-4 rounded-full bg-primary p-2 text-white shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
					aria-label="Scroll to bottom"
				>
					↓
				</button>
			)}
		</>
	);
}
