import * as yup from 'yup';

const phoneRegExp = /^5[0-9]{9}$/;
const websiteRegExp = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

const contactSchema = yup.object().shape({
  name: yup.string().required('Ad Soyad zorunludur'),
  position: yup.string().required('Görev zorunludur'),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Geçerli bir telefon numarası giriniz (5XXXXXXXXX)')
    .required('Telefon zorunludur'),
  email: yup
    .string()
    .email('Geçerli bir e-posta adresi giriniz')
    .required('E-posta zorunludur'),
});

const yearlyDataSchema = yup.object().shape({
  year: yup.number().required('Yıl zorunludur'),
  value: yup.string().required('Değer zorunludur'),
});

const teamSchema = yup.object().shape({
  hasTeam: yup.boolean(),
  teamSize: yup.number().when('hasTeam', {
    is: true,
    then: (schema) => schema.min(1, 'Ekip büyüklüğü en az 1 olmalıdır').required('Ekip büyüklüğü zorunludur'),
  }),
});

export const companyInfoSchema = yup.object().shape({
  companyName: yup.string().required('Firma adı zorunludur'),
  address: yup.string().required('Adres zorunludur'),
  district: yup.string().required('İlçe zorunludur'),
  city: yup.string().required('İl zorunludur'),
  postalCode: yup.string().required('Posta kodu zorunludur'),
  taxNumber: yup.string().required('Vergi numarası zorunludur'),
  website: yup
    .string()
    .matches(websiteRegExp, 'Geçerli bir website adresi giriniz')
    .required('Website zorunludur'),
  foundingDate: yup.date().nullable().required('Kuruluş tarihi zorunludur'),
});

export const customerSegmentSchema = yup.object().shape({
  customerSegments: yup.object().test(
    'at-least-one-segment',
    'En az bir müşteri segmenti seçilmelidir',
    (value) => Object.values(value || {}).some(Boolean)
  ),
  sectors: yup.object().test(
    'at-least-one-sector',
    'En az bir sektör seçilmelidir',
    (value) => Object.values(value || {}).some((v) => v === true || typeof v === 'string')
  ),
  geographicRegions: yup.object().shape({
    domestic: yup.boolean(),
    international: yup.boolean(),
    domesticCities: yup.array().when('domestic', {
      is: true,
      then: (schema) => schema.min(1, 'En az bir il seçilmelidir'),
    }),
    internationalCountries: yup.array().when('international', {
      is: true,
      then: (schema) => schema.min(1, 'En az bir ülke seçilmelidir'),
    }),
  }),
});

export const productPortfolioSchema = yup.object().shape({
  products: yup.object().test(
    'at-least-one-product',
    'En az bir ürün/hizmet seçilmelidir',
    (value) => Object.values(value || {}).some(Boolean)
  ),
  mainRevenue: yup.string().required('Ana gelir kaynağı seçilmelidir'),
});

export const financialInfoSchema = yup.object().shape({
  yearlyRevenue: yup.array().of(yearlyDataSchema).optional(),
  employeeCount: yup.array().of(
    yup.object().shape({
      year: yup.number(),
      value: yup.string().required('Personel sayısı seçilmelidir'),
    })
  ).min(1, 'Personel sayısı seçilmelidir'),
});

export const teamInfoSchema = yup.object().shape({
  technicalTeam: teamSchema,
  salesTeam: teamSchema,
  companyOfficials: yup.array().of(contactSchema).min(1, 'En az bir firma yetkilisi eklenmelidir'),
  technicalContact: contactSchema.nullable(),
  salesContact: contactSchema.nullable(),
}).test(
  'at-least-one-contact',
  'Teknik sorumlu veya satış sorumlusu bilgilerinden en az biri doldurulmalıdır',
  function(value) {
    if (!value.technicalContact && !value.salesContact) {
      return false;
    }
    if (value.technicalContact) {
      const { name, position, phone, email } = value.technicalContact;
      if (name && position && phone && email) {
        return true;
      }
    }
    if (value.salesContact) {
      const { name, position, phone, email } = value.salesContact;
      if (name && position && phone && email) {
        return true;
      }
    }
    return false;
  }
);

export const servicesSchema = yup.object().shape({
  services: yup.object().shape({
    backup: yup.string(),
    cloudServer: yup.string(),
    cloudStorage: yup.string(),
  }),
  backupTypes: yup.object().test(
    'at-least-one-backup-type',
    'En az bir yedekleme türü seçilmelidir',
    (value) => Object.values(value || {}).some(Boolean)
  ),
});

export const strategySchema = yup.object().shape({
  competitors: yup.string().required('Rakip ürünler zorunludur'),
  competitiveAnalysis: yup.string().required('Rekabet analizi zorunludur'),
  pastYearSales: yup
    .number()
    .min(0, 'Satış adedi 0\'dan küçük olamaz')
    .required('Son 1 yıl satış adedi zorunludur'),
  sixMonthTarget: yup
    .number()
    .min(0, 'Hedef 0\'dan küçük olamaz')
    .required('6 aylık hedef zorunludur'),
  targetStrategy: yup.string().required('Hedef stratejisi zorunludur'),
  pricingModel: yup
    .string()
    .oneOf(['monthly', 'yearly'], 'Fiyatlandırma modeli seçilmelidir')
    .required('Fiyatlandırma modeli zorunludur'),
  customerFeedback: yup.string().required('Müşteri geri bildirimi zorunludur'),
});

export const formSchema = yup.object().shape({
  ...companyInfoSchema.fields,
  ...customerSegmentSchema.fields,
  ...productPortfolioSchema.fields,
  ...financialInfoSchema.fields,
  ...teamInfoSchema.fields,
  ...servicesSchema.fields,
  ...strategySchema.fields,
});
