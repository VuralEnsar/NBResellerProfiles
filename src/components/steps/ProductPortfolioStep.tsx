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
  FormHelperText,
  Radio,
  RadioGroup,
} from '@mui/material';
import { PartnerProfileForm, Products } from '../../types/form';

const products = [
  { key: 'serverHardware', label: 'Sunucu Donanımları (sunucu ve aksesuarları vb)' },
  { key: 'networkSecurity', label: 'Ağ ve Güvenlik Donanımları (firewall, switch, modem, ap, router vb)' },
  { key: 'storageHardware', label: 'Depolama Donanımları (Storage, nas cihazı vb)' },
  { key: 'softwareLicenses', label: 'Yazılım Lisans Satışları (işletim sistemi, antivirüs, yedekleme vb)' },
  { key: 'securityCamera', label: 'Güvenlik Kamerası' },
  { key: 'systemNetworkSetup', label: 'Sistem ve Ağ Kurulumları' },
  { key: 'maintenanceServices', label: 'Bakım Anlaşmalı IT Hizmetleri' },
  { key: 'commercialSoftware', label: 'Ticari Program Satış ve Hizmetleri' },
  { key: 'webDevelopment', label: 'Web Sitesi ve Yazılım Hizmetleri' },
  { key: 'hostingServices', label: 'Hosting Hizmetleri' },
  { key: 'cloudServerServices', label: 'Bulut Sunucu Hizmetleri' },
  { key: 'cloudStorageServices', label: 'Bulut Depolama Hizmetleri' },
  { key: 'agencyServices', label: 'Ajans Hizmetleri (sosyal medya, grafik, tasarım vb)' },
] as const;

const ProductPortfolioStep: React.FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<PartnerProfileForm>();

  const watchedProducts = watch('products');

  // Seçili ürünleri filtrele
  const selectedProducts = Object.entries(watchedProducts || {})
    .filter(([_, value]) => value === true)
    .map(([key]) => key as keyof Products);

  return (
    <Grid container spacing={3}>
      {/* Ürün ve Çözümler */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Mevcut Portföyünüzde Hangi Ürün ve Çözümler Yer Alıyor?
          </Typography>
          <FormControl 
            component="fieldset" 
            error={!!errors.products}
            sx={{ width: '100%' }}
          >
            <FormGroup>
              <Grid container spacing={2}>
                {products.map(({ key, label }) => (
                  <Grid item xs={12} key={key}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...register(`products.${key as keyof Products}`)}
                        />
                      }
                      label={label}
                    />
                  </Grid>
                ))}
              </Grid>
            </FormGroup>
            {errors.products && (
              <FormHelperText>
                {errors.products.message}
              </FormHelperText>
            )}
          </FormControl>
        </Paper>
      </Grid>

      {/* Ana Gelir Kaynağı */}
      {selectedProducts.length > 0 && (
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Firmanızın Ana Gelir Kaynağı Nedir?
            </Typography>
            <FormControl 
              component="fieldset" 
              error={!!errors.mainRevenue}
              sx={{ width: '100%' }}
            >
              <RadioGroup
                name="mainRevenue"
                value={watch('mainRevenue') || ''}
                onChange={(e) => {
                  setValue('mainRevenue', e.target.value as keyof Products, { shouldValidate: true });
                }}
              >
                {selectedProducts.map((key) => {
                  const product = products.find(p => p.key === key);
                  return (
                    <FormControlLabel
                      key={key}
                      value={key}
                      control={<Radio />}
                      label={product?.label}
                    />
                  );
                })}
              </RadioGroup>
              {errors.mainRevenue && (
                <FormHelperText>
                  {errors.mainRevenue.message}
                </FormHelperText>
              )}
            </FormControl>
          </Paper>
        </Grid>
      )}
    </Grid>
  );
};

export default ProductPortfolioStep;
