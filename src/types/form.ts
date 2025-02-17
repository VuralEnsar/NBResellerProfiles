export interface Contact {
  name: string;
  position: string;
  phone: string;
  email: string;
}

export interface YearlyData {
  year: number;
  value: string;
}

export interface Team {
  hasTeam: boolean;
  teamSize?: number;
}

export interface Services {
  backup?: string;
  cloudServer?: string;
  cloudStorage?: string;
}

export interface BackupTypes {
  fileFolder?: boolean;
  databases?: boolean;
  emailData?: boolean;
  userBackups?: boolean;
  computerImages?: boolean;
  serverImages?: boolean;
  virtualMachines?: boolean;
}

export interface CustomerSegments {
  sme?: boolean;
  enterprise?: boolean;
  government?: boolean;
}

export interface Sectors {
  manufacturing?: boolean;
  finance?: boolean;
  healthcare?: boolean;
  education?: boolean;
  textile?: boolean;
  furniture?: boolean;
  construction?: boolean;
  food?: boolean;
  transportation?: boolean;
  retail?: boolean;
  agriculture?: boolean;
  tourism?: boolean;
  media?: boolean;
  insurance?: boolean;
  customs?: boolean;
  accounting?: boolean;
  technology?: boolean;
  entertainment?: boolean;
  cafeRestaurant?: boolean;
  chemical?: boolean;
  other?: string;
}

export interface GeographicRegions {
  domestic?: boolean;
  international?: boolean;
  domesticCities?: string[];
  internationalCountries?: string[];
}

export interface Products {
  serverHardware?: boolean;
  networkSecurity?: boolean;
  storageHardware?: boolean;
  softwareLicenses?: boolean;
  securityCamera?: boolean;
  systemNetworkSetup?: boolean;
  maintenanceServices?: boolean;
  commercialSoftware?: boolean;
  webDevelopment?: boolean;
  hostingServices?: boolean;
  cloudServerServices?: boolean;
  cloudStorageServices?: boolean;
  agencyServices?: boolean;
}

export interface CommercialPartners {
  logo?: boolean;
  sap?: boolean;
  workcube?: boolean;
  nebim?: boolean;
  netsis?: boolean;
  mikro?: boolean;
  akinsoft?: boolean;
  zirve?: boolean;
  eta?: boolean;
  uyumsoft?: boolean;
  other?: string;
}

export interface PartnerProfileForm {
  // Firma Bilgileri
  companyName: string;
  address: string;
  district: string;
  city: string;
  postalCode: string;
  taxNumber: string;
  website: string;
  foundingDate: Date | null;

  // Müşteri Segmenti
  customerSegments: CustomerSegments;
  sectors: Sectors;
  geographicRegions: GeographicRegions;

  // Ürün Portföyü
  products: Products;
  commercialPartners?: CommercialPartners;
  mainRevenue: keyof Products;

  // Finansal Bilgiler
  yearlyRevenue: YearlyData[];
  employeeCount: YearlyData[];

  // Ekip Bilgileri
  technicalTeam: Team;
  salesTeam: Team;
  companyOfficials: Contact[];
  technicalContact: Contact | null;
  salesContact: Contact | null;

  // Servisler
  services: Services;
  backupTypes: BackupTypes;

  // Strateji
  competitors: string;
  competitiveAnalysis: string;
  pastYearSales: number;
  sixMonthTarget: number;
  targetStrategy: string;
  pricingModel: 'monthly' | 'yearly';
  customerFeedback: string;
}
