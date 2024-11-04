import "server-only";
import { MainClient } from "binance";
import { env } from "@/env";
import { unstable_cache } from "next/cache";
import { wait } from "@/lib/wait";

const binance = new MainClient({
	api_key: env.BINANCE_API_KEY,
	api_secret: env.BINANCE_API_SECRET,
});

interface IGetCryptoPrice {
	symbol: string;
}
export const get_crypto_price = async ({ symbol }: IGetCryptoPrice) => {
	const result = await unstable_cache(
		async () => {
			try {
				const stats = await binance.get24hrChangeStatististics({
					symbol: `${symbol}USDT`,
				});
				console.log(stats);
				const price = Number(stats.lastPrice);
				const delta = Number(stats.priceChange);
				const percentageChange = (delta / price) * 100;

				await wait(2000);

				return {
					price,
					percentageChange: Number(percentageChange.toFixed(3)),
					delta,
				};
			} catch (err) {
				console.log(`Error fetching crypto price for ${symbol}:`, err);
				return {
					price: 0,
					percentageChange: 0,
					delta: 0,
				};
			}
		},
		[`get_crypto_price-${symbol}`],
		{
			revalidate: 60,
		}
	)();

	return result;
};

export const get_crypto_stats = async ({ slug }: { slug: string }) => {
	const result = await unstable_cache(
		async () => {
			const url = new URL(
				"https://api.coinmarketcap.com/data-api/v3/cryptocurrency/detail"
			);

			// Set the query params which are required
			url.searchParams.append("slug", slug);
			url.searchParams.append("limit", "1");
			url.searchParams.append("sortBy", "market_cap");

			try {
				const response = await fetch(url, {
					next: {
						revalidate: 60,
					},
					headers: {
						// Set the headers
						Accept: "application/json",
						"Content-Type": "application/json",
						"X-CMC_PRO_API_KEY": env.CMC_API_KEY,
					},
				});

				if (!response.ok) {
					throw new Error("Crypto not found!");
				}

				const res = (await response.json()) as {
					data: {
						id: number;
						name: string;
						symbol: string;
						volume: number;
						volumeChangePercentage24h: number;
						statistics: {
							rank: number;
							totalSupply: number;
							marketCap: number;
							marketCapDominance: number;
						};
					};
				};

				const data = res.data;
				const stats = res.data.statistics;

				const marketStats = {
					name: data.name,
					volume: data.volume,
					volumeChangePercentage24h: data.volumeChangePercentage24h,
					rank: stats.rank,
					marketCap: stats.marketCap,
					totalSupply: stats.totalSupply,
					dominance: stats.marketCapDominance,
					symbol: data.symbol,
				};

				return marketStats;
			} catch (error) {
				console.error(`Error fetching crypto stats for ${slug}:`, error);
				return null;
			}
		},
		[`get_crypto_stats-${slug}`],
		{
			revalidate: 60,
		}
	)();

	return result;
};
