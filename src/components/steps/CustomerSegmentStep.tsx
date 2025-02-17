import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  FormHelperText,
  Autocomplete,
  Chip,
} from '@mui/material';
import { PartnerProfileForm } from '../../types/form';

const customerSegments = [
  { key: 'sme', label: 'Kobi (Küçük ve Orta Ölçekli İşletmeler)' },
  { key: 'enterprise', label: 'Kurumsal (Enterprise İşletmeler)' },
  { key: 'government', label: 'Kamu (Devlet Kurum ve Kuruluşları)' },
];

const sectorsList = [
  { key: 'manufacturing', label: 'Üretim ve Sanayi' },
  { key: 'finance', label: 'Finans ve Bankacılık' },
  { key: 'healthcare', label: 'Sağlık' },
  { key: 'education', label: 'Eğitim' },
  { key: 'textile', label: 'Tekstil ve Giyim' },
  { key: 'furniture', label: 'Mobilya' },
  { key: 'construction', label: 'İnşaat' },
  { key: 'food', label: 'Gıda' },
  { key: 'transportation', label: 'Ulaşım' },
  { key: 'retail', label: 'Mağazacılık' },
  { key: 'agriculture', label: 'Tarım' },
  { key: 'tourism', label: 'Turizm' },
  { key: 'media', label: 'Medya' },
  { key: 'insurance', label: 'Sigortacılık' },
  { key: 'customs', label: 'Gümrük' },
  { key: 'accounting', label: 'Mali Müşavirlik' },
  { key: 'technology', label: 'Teknoloji' },
  { key: 'entertainment', label: 'Eğlence' },
  { key: 'cafeRestaurant', label: 'Cafe ve Restoran' },
  { key: 'chemical', label: 'Kimya' },
];

const cities = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya',
  'Artvin', 'Aydın', 'Balıkesir', 'Bilecik', 'Bingöl', 'Bitlis', 'Bolu',
  'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli', 'Diyarbakır',
  'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun',
  'Gümüşhane', 'Hakkari', 'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir',
  'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir', 'Kocaeli', 'Konya',
  'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş',
  'Nevşehir', 'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop',
  'Sivas', 'Tekirdağ', 'Tokat', 'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak',
  'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman', 'Kırıkkale',
  'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük',
  'Kilis', 'Osmaniye', 'Düzce'
];

const countries = [
  'ABD', 'Almanya', 'Fransa', 'İngiltere', 'İtalya', 'Japonya', 'Kanada', 
  'Rusya', 'Çin', 'Hindistan', 'Brezilya', 'Güney Kore', 'İspanya', 
  'Hollanda', 'Belçika', 'İsveç', 'Norveç', 'Danimarka', 'Finlandiya',
  'Avusturya', 'İsviçre', 'Polonya', 'Çek Cumhuriyeti', 'Macaristan',
  'Romanya', 'Bulgaristan', 'Yunanistan', 'Portekiz', 'İrlanda',
  'Birleşik Arap Emirlikleri', 'Suudi Arabistan', 'Katar', 'Kuveyt',
  'Azerbaycan', 'Gürcistan', 'Ukrayna', 'Mısır', 'Fas', 'Güney Afrika',
  'Avustralya', 'Yeni Zelanda', 'Singapur', 'Malezya', 'Endonezya',
  'Vietnam', 'Tayland', 'Pakistan', 'İran', 'Irak'
];

const CustomerSegmentStep: React.FC = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<PartnerProfileForm>();

  const watchedSectors = watch('sectors');
  const geographicRegions = watch('geographicRegions');

  const handleOtherSectorChange = (value: string) => {
    if (value.trim()) {
      setValue('sectors.other', value, { shouldValidate: true });
    } else {
      setValue('sectors.other', undefined, { shouldValidate: true });
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Müşteri Segmenti */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Müşteri Segmenti
          </Typography>
          <FormControl 
            component="fieldset" 
            error={!!errors.customerSegments}
            sx={{ width: '100%' }}
          >
            <FormGroup>
              <Grid container spacing={2}>
                {customerSegments.map(({ key, label }) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register(`customerSegments.${key as keyof PartnerProfileForm['customerSegments']}`)}
                        />
                      }
                      label={label}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
            {errors.customerSegments && (
              <FormHelperText>
                {errors.customerSegments.message}
              </FormHelperText>
            )}
          </FormControl>
        </Paper>
      </Grid>

      {/* Sektörler */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Hizmet Verilen Sektörler
          </Typography>
          <FormControl 
            component="fieldset" 
            error={!!errors.sectors}
            sx={{ width: '100%' }}
          >
            <FormGroup>
              <Grid container spacing={2}>
                {sectorsList.map(({ key, label }) => (
                  <Grid item xs={12} sm={6} key={key}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register(`sectors.${key as keyof PartnerProfileForm['sectors']}`)}
                        />
                      }
                      label={label}
                    />
                  </Grid>
                ))}
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register('sectors.other')}
                        onChange={(e) => {
                          register('sectors.other').onChange(e);
                          if (!e.target.checked) {
                            handleOtherSectorChange('');
                          }
                        }}
                      />
                    }
                    label="Diğer"
                  />
                </Grid>
              </Grid>
            </FormGroup>
            {watchedSectors?.other && (
              <TextField
                fullWidth
                label="Diğer Sektörler"
                value={watchedSectors.other || ''}
                onChange={(e) => handleOtherSectorChange(e.target.value)}
                sx={{ mt: 2 }}
                error={!!errors.sectors?.other}
                helperText={errors.sectors?.other?.message}
              />
            )}
            {errors.sectors && !errors.sectors.other && (
              <FormHelperText>
                {errors.sectors.message}
              </FormHelperText>
            )}
          </FormControl>
        </Paper>
      </Grid>

      {/* Coğrafi Bölgeler */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Hizmet Verilen Bölgeler
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register('geographicRegions.domestic')}
                    />
                  }
                  label="Yurt İçi"
                />
              </FormGroup>
            </Grid>

            {geographicRegions?.domestic && (
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={cities}
                  value={geographicRegions.domesticCities || []}
                  onChange={(_, newValue) => {
                    setValue('geographicRegions.domesticCities', newValue, { shouldValidate: true });
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                        sx={{ m: 0.5 }}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="İller"
                      error={!!errors.geographicRegions?.domesticCities}
                      helperText={errors.geographicRegions?.domesticCities?.message}
                    />
                  )}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register('geographicRegions.international')}
                    />
                  }
                  label="Yurt Dışı"
                />
              </FormGroup>
            </Grid>

            {geographicRegions?.international && (
              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  freeSolo
                  options={countries}
                  value={geographicRegions.internationalCountries || []}
                  onChange={(_, newValue) => {
                    setValue('geographicRegions.internationalCountries', newValue, { shouldValidate: true });
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                      <Chip
                        label={option}
                        {...getTagProps({ index })}
                        sx={{ m: 0.5 }}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Ülkeler"
                      placeholder="Ülke adı yazın"
                      error={!!errors.geographicRegions?.internationalCountries}
                      helperText={errors.geographicRegions?.internationalCountries?.message}
                    />
                  )}
                />
              </Grid>
            )}
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CustomerSegmentStep;
