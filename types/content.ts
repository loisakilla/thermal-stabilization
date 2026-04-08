export interface LogoAsset {
  id: string;
  title: string;
  localPath: string;
  sourceUrl: string;
  retrievedAt: string;
  usageNote: string;
}

export interface ComplianceBlock {
  title: string;
  description: string;
  mandatoryText: string;
  logos: LogoAsset[];
}

export interface HeroContent {
  kicker: string;
  title: string;
  lead: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export interface TextBlock {
  title: string;
  description: string;
}

export interface SpecItem {
  label: string;
  value: string;
  note?: string;
}

export interface ContactItem {
  label: string;
  value: string;
  href: string;
}

export interface ProjectContent {
  hero: HeroContent;
  about: {
    title: string;
    paragraphs: string[];
  };
  modifications: TextBlock[];
  applications: TextBlock[];
  specs: SpecItem[];
  contacts: ContactItem[];
  mediaRule: string;
}
