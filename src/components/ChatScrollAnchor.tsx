'use client'

import useAtBottom from "@/hooks/useAtBottom";
import { useEffect } from "react";
import { useInView } from 'react-intersection-observer'

export const ChatScrollAnchor = () => {
	const isAtBottom = useAtBottom();
	const { ref,inView,entry } = useInView({
		trackVisibility: true,
		delay: 100,
		rootMargin: "0px 0px -50px 0px"
	});
	const trackVisibility = entry?.isIntersecting;
	useEffect(() => {
		if (isAtBottom && trackVisibility && !!inView) {
			entry?.target.scrollIntoView({
				block: "start"
			})
		}

	},[inView,entry,isAtBottom,trackVisibility])


	return (
		<div ref={ref} className="h-px w-full">
			<h1>Chat  Scroll Anchor</h1>
		</div>
	)

}
