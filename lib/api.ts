import { Asset } from './types';

const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

export async function searchAssets(query: string): Promise<Asset[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/search?query=${encodeURIComponent(query)}`
    );
    const data = await response.json();
    
    const coinIds = data.coins.slice(0, 10).map((coin: any) => coin.id);
    
    if (coinIds.length === 0) return [];
    
    const marketsResponse = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&ids=${coinIds.join(',')}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`
    );
    
    const markets = await marketsResponse.json();
    
    return markets.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      circulating_supply: coin.circulating_supply,
      image: coin.image,
      price_change_24h: coin.price_change_percentage_24h,
    }));
  } catch (error) {
    console.error('Error searching assets:', error);
    return [];
  }
}

export async function getTrendingAssets(): Promise<Asset[]> {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false&price_change_percentage=24h`
    );
    
    const data = await response.json();
    
    return data.map((coin: any) => ({
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      circulating_supply: coin.circulating_supply,
      image: coin.image,
      price_change_24h: coin.price_change_percentage_24h,
    }));
  } catch (error) {
    console.error('Error fetching trending assets:', error);
    return [];
  }
}

export async function getAssetById(id: string): Promise<Asset | null> {
  try {
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&ids=${id}&sparkline=false&price_change_percentage=24h`
    );
    
    const data = await response.json();
    
    if (data.length === 0) return null;
    
    const coin = data[0];
    
    return {
      id: coin.id,
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      current_price: coin.current_price,
      market_cap: coin.market_cap,
      circulating_supply: coin.circulating_supply,
      image: coin.image,
      price_change_24h: coin.price_change_percentage_24h,
    };
  } catch (error) {
    console.error('Error fetching asset:', error);
    return null;
  }
}

export const POPULAR_COMPARISONS = [
  { assetA: 'bitcoin', assetB: 'ethereum' },
  { assetA: 'ethereum', assetB: 'bitcoin' },
  { assetA: 'cardano', assetB: 'ethereum' },
  { assetA: 'ripple', assetB: 'ethereum' },
  { assetA: 'dogecoin', assetB: 'bitcoin' },
  { assetA: 'polkadot', assetB: 'ethereum' },
  { assetA: 'solana', assetB: 'ethereum' },
  { assetA: 'shiba-inu', assetB: 'dogecoin' },
];
