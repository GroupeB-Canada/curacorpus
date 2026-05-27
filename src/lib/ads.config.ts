export const ADS_CONFIG = {
  curacorpus: {
    site: 'curacorpus',
    domain: 'curacorpus.groupeb.ca',
    adsEnabled: true,
    network: 'ethicalads' as const,
    freemiumOnly: false,
    excludedPaths: [],
    placements: [
      {
        slot: 'sidebar-health',
        format: 'square' as const,
        network: 'ethicalads' as const,
        slotEnvVar: 'NEXT_PUBLIC_AD_SLOT_SIDEBAR',
        enabled: true,
        description: 'EthicalAds sidebar - pub sante/fitness pertinente',
      },
    ],
  },
};

export function getSiteAdConfig(siteKey: string) {
  return ADS_CONFIG[siteKey as keyof typeof ADS_CONFIG] ?? null;
}
