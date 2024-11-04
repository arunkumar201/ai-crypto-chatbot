import { useState, useEffect } from "react";

interface UseAtBottomOptions {
	offset?: number;
	containerRef?: React.RefObject<HTMLElement>;
}

export const useAtBottom = ({
	offset = 0,
	containerRef,
}: UseAtBottomOptions = {}): boolean => {
	const [atBottom, setAtBottom] = useState(false);

	const handleScroll = () => {
		const container = containerRef?.current || document.documentElement;
		const scrollTop = container.scrollTop || window.scrollY;
		const scrollHeight =
			container.scrollHeight || document.documentElement.scrollHeight;
		const clientHeight = container.clientHeight || window.innerHeight;

		setAtBottom(scrollTop + clientHeight >= scrollHeight - offset);
	};
	useEffect(() => {
		const target = containerRef?.current || window;

		target.addEventListener("scroll", handleScroll);

		return () => target.removeEventListener("scroll", handleScroll);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [offset, containerRef]);

	return atBottom;
};
