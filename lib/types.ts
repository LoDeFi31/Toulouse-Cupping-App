export interface Asset {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  market_cap: number;
  circulating_supply: number;
  image?: string;
  price_change_24h?: number;
}

export interface ComparisonResult {
  assetA: Asset;
  assetB: Asset;
  targetPrice: number;
  priceMultiplier: number;
  marketCapDifference: number;
}
