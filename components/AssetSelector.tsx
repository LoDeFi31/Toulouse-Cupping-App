'use client';

import { useState } from 'react';
import { Asset } from '@/lib/types';
import { searchAssets } from '@/lib/api';
import { formatPrice, formatMarketCap } from '@/lib/utils';

interface AssetSelectorProps {
  label: string;
  selectedAsset: Asset | null;
  onSelectAsset: (asset: Asset) => void;
  trendingAssets: Asset[];
}

export default function AssetSelector({
  label,
  selectedAsset,
  onSelectAsset,
  trendingAssets,
}: AssetSelectorProps) {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Asset[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (value: string) => {
    setQuery(value);
    if (value.length > 1) {
      setIsSearching(true);
      const results = await searchAssets(value);
      setSearchResults(results);
      setIsSearching(false);
    } else {
      setSearchResults([]);
    }
  };

  const assets = query.length > 1 ? searchResults : trendingAssets;

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Rechercher un token..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
      <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
        {isSearching ? (
          <p className="text-gray-500 text-center py-4">Recherche...</p>
        ) : assets.length === 0 ? (
          <p className="text-gray-500 text-center py-4">Aucun résultat</p>
        ) : (
          assets.map((asset) => (
            <button
              key={asset.id}
              onClick={() => onSelectAsset(asset)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-purple-50 transition-colors ${
                selectedAsset?.id === asset.id ? 'bg-purple-100 border-2 border-purple-500' : 'border border-gray-200'
              }`}
            >
              <img src={asset.image} alt={asset.name} className="w-8 h-8 rounded-full" />
              <div className="flex-1 text-left">
                <div className="font-medium text-gray-900">{asset.symbol}</div>
                <div className="text-sm text-gray-500">{formatMarketCap(asset.market_cap)}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-900">{formatPrice(asset.current_price)}</div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
