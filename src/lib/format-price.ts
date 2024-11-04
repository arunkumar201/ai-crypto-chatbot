export const formatPrice = (price: number) => {
	return price.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		currencyDisplay: "symbol",
		maximumFractionDigits: 6,
	});
};

export const formatValue = (value: number) => {
	if (value >= 1000000000000) {
		return `${(value / 1000000000000).toLocaleString("en-US", {
			maximumFractionDigits: 2,
		})}T`; // Trillion
	} else if (value >= 1000000000) {
		return `${(value / 1000000000).toLocaleString("en-US", {
			maximumFractionDigits: 2,
		})}B`; // Billion
	} else if (value >= 1000000) {
		return `${(value / 1000000).toLocaleString("en-US", {
			maximumFractionDigits: 2,
		})}M`; // Million
	} else if (value >= 1000) {
		return `${(value / 1000).toLocaleString("en-US", {
			maximumFractionDigits: 2,
		})}K`; // Thousand
	} else {
		return formatPrice(value); // Less than a thousand, format as currency
	}
};
