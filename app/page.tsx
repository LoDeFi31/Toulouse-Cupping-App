'use client';

import { useState, useEffect } from 'react';
import sdk from '@farcaster/frame-sdk';
import { Asset } from '@/lib/types';
import { getTrendingAssets } from '@/lib/api';
import AssetSelector from '@/components/AssetSelector';
import MarketcapComparator from '@/components/MarketcapComparator';
import Leaderboard from '@/components/Leaderboard';

export default function Home() {
  const [isSDKReady, setIsSDKReady] = useState(false);
  const [trendingAssets, setTrendingAssets] = useState<Asset[]>([]);
  const [selectedAssetA, setSelectedAssetA] = useState<Asset | null>(null);
  const [selectedAssetB, setSelectedAssetB] = useState<Asset | null>(null);

  useEffect(() => {
    const initSDK = async () => {
      await sdk.actions.ready();
      setIsSDKReady(true);
    };
    initSDK();
  }, []);

  useEffect(() => {
    const loadTrending = async () => {
      const assets = await getTrendingAssets();
      setTrendingAssets(assets);
    };
    loadTrending();
  }, []);

  if (!isSDKReady) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-900">MarketCapOf</h1>
          <p className="text-gray-600 mt-2">Calculez le prix cible d'un token</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <AssetSelector
            label="Asset A"
            selectedAsset={selectedAssetA}
            onSelectAsset={setSelectedAssetA}
            trendingAssets={trendingAssets}
          />
          <AssetSelector
            label="Asset B"
            selectedAsset={selectedAssetB}
            onSelectAsset={setSelectedAssetB}
            trendingAssets={trendingAssets}
          />
        </div>

        <MarketcapComparator assetA={selectedAssetA} assetB={selectedAssetB} />

        <Leaderboard />
      </div>
    </main>
  );
}
