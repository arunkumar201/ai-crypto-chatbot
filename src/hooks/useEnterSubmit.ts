/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";

import React, { RefObject } from "react";

interface UseEnterSubmitProps {
	onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
}

interface UseEnterSubmitReturn {
	formRef: RefObject<HTMLFormElement>;
	onkeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export const useEnterSubmit = ({
	onSubmit,
}: UseEnterSubmitProps): UseEnterSubmitReturn => {
	const formRef = React.useRef<HTMLFormElement>(null);

	const onkeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent) {
			e.preventDefault();
			if (formRef.current) {
				onSubmit && onSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
			}
		}
	};

	return {
		formRef,
		onkeyDown,
	};
};
