import React from 'react';
import { MessageCircle,Coins,ChartBar,AlertCircle } from 'lucide-react';
import { Card,CardContent,CardDescription,CardHeader,CardTitle } from '@/components/ui/card';

export const AIChatInfo = () => {
	const features = [
		{
			icon: <Coins className="w-6 h-6 text-yellow-500" />,
			title: "Crypto Price Tracking",
			description: "Get real-time cryptocurrency prices and market data"
		},
		{
			icon: <ChartBar className="w-6 h-6 text-blue-500" />,
			title: "Market Statistics",
			description: "Access detailed crypto market statistics and analytics"
		},
		{
			icon: <MessageCircle className="w-6 h-6 text-green-500" />,
			title: "Interactive Chat",
			description: "Engage in conversations about cryptocurrency and get answers to your questions"
		},
		{
			icon: <AlertCircle className="w-6 h-6 text-red-500" />,
			title: "Limitations",
			description: "Stock data and non-crypto related queries are not supported"
		}
	];

	return (
		<div className="w-full max-w-2xl mx-auto p-4 space-y-6 relative -top-[2rem]">
			<Card className="bg-white shadow-lg">
				<CardHeader>
					<CardTitle className="text-2xl font-bold text-gray-800">
						Crypto Assistant
					</CardTitle>
					<CardDescription className="text-gray-600">
						Your specialized cryptocurrency data and price information companion
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{features.map((feature,index) => (
							<div
								key={index}
								className="flex items-start space-x-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
							>
								<div className="flex-shrink-0">
									{feature.icon}
								</div>
								<div className="space-y-1">
									<h3 className="font-medium text-gray-900">
										{feature.title}
									</h3>
									<p className="text-sm text-gray-500">
										{feature.description}
									</p>
								</div>
							</div>
						))}
					</div>

					<div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
						<h4 className="font-medium text-gray-900 mb-2">
							How to Use:
						</h4>
						<ul className="space-y-2 text-sm text-gray-600">
							<li className="flex items-center space-x-2">
								<span className="w-2 h-2 bg-blue-500 rounded-full" />
								<span>Type a cryptocurrency symbol to get its current price (e.g.,BTC price)</span>
							</li>
							<li className="flex items-center space-x-2">
								<span className="w-2 h-2 bg-blue-500 rounded-full" />
								<span>Ask for market statistics using stats or market cap</span>
							</li>
							<li className="flex items-center space-x-2">
								<span className="w-2 h-2 bg-blue-500 rounded-full" />
								<span>Chat naturally about crypto-related topics</span>
							</li>
						</ul>
					</div>
					<div className="mt-6 text-center text-gray-500">
						Start chatting to get cryptocurrency information and answers to your questions!
					</div>
				</CardContent>
			</Card>
		</div>
	);
};
