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
