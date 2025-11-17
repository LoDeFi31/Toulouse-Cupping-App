'use client';

import { useMemo } from 'react';
import { Asset, ComparisonResult } from '@/lib/types';
import { formatPrice, formatMarketCap, formatMultiplier } from '@/lib/utils';

interface MarketcapComparatorProps {
  assetA: Asset | null;
  assetB: Asset | null;
}

export default function MarketcapComparator({ assetA, assetB }: MarketcapComparatorProps) {
  const result = useMemo<ComparisonResult | null>(() => {
    if (!assetA || !assetB) return null;

    const priceMultiplier = assetB.market_cap / assetA.market_cap;
    const targetPrice = assetA.current_price * priceMultiplier;
    const marketCapDifference = assetB.market_cap - assetA.market_cap;

    return {
      assetA,
      assetB,
      targetPrice,
      priceMultiplier,
      marketCapDifference,
    };
  }, [assetA, assetB]);

  if (!result) {
    return (
      <div className="bg-white rounded-lg p-6 shadow-md text-center text-gray-500">
        Sélectionnez deux assets pour comparer
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg p-6 shadow-lg text-white">
      <h2 className="text-2xl font-bold mb-4 text-center">Résultat</h2>
      <div className="bg-white/10 rounded-lg p-4 mb-4">
        <p className="text-lg mb-2">
          Si <span className="font-bold">{result.assetA.symbol}</span> avait la marketcap de{' '}
          <span className="font-bold">{result.assetB.symbol}</span>
        </p>
        <div className="flex items-center justify-center gap-4 my-6">
          <div className="text-center">
            <div className="text-sm opacity-80">Prix actuel</div>
            <div className="text-2xl font-bold">{formatPrice(result.assetA.current_price)}</div>
          </div>
          <div className="text-3xl">→</div>
          <div className="text-center">
            <div className="text-sm opacity-80">Prix cible</div>
            <div className="text-3xl font-bold">{formatPrice(result.targetPrice)}</div>
          </div>
        </div>
        <div className="text-center">
          <div className="text-xl font-semibold">
            Soit une multiplication par {formatMultiplier(result.priceMultiplier)}
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <div className="opacity-80">Marketcap {result.assetA.symbol}</div>
          <div className="font-medium">{formatMarketCap(result.assetA.market_cap)}</div>
        </div>
        <div>
          <div className="opacity-80">Marketcap {result.assetB.symbol}</div>
          <div className="font-medium">{formatMarketCap(result.assetB.market_cap)}</div>
        </div>
      </div>
    </div>
  );
}
