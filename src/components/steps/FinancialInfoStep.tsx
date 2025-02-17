import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  TextField,
  MenuItem,
  Box,
} from '@mui/material';
import { PartnerProfileForm } from '../../types/form';

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 13 }, (_, i) => currentYear - i);

const revenueRanges = [
  '5M dan az',
  '5M-15M arası',
  '15M-50M arası',
  '50M-100M arası',
  '100M-500M arası',
  '500M dan fazla',
];

const employeeRanges = [
  '5\'den az',
  '5-15 arası',
  '15-25 arası',
  '25-50 arası',
  '50-200 arası',
  '200 den fazla',
];

const FinancialInfoStep: React.FC = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<PartnerProfileForm>();

  React.useEffect(() => {
    // Personel sayısı için varsayılan değeri ayarla
    setValue('employeeCount', [{ year: currentYear, value: '' }], { shouldValidate: true });
  }, [setValue]);

  return (
    <Grid container spacing={3}>
      {/* Yıllık Ciro */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Yıllık Ciro (TL)
            </Typography>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="Yıl"
                  defaultValue={currentYear}
                  {...register('yearlyRevenue.0.year')}
                  error={!!errors.yearlyRevenue?.[0]?.year}
                  helperText={errors.yearlyRevenue?.[0]?.year?.message}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={8}>
              <FormControl fullWidth>
                <TextField
                  select
                  label="Ciro"
                  {...register('yearlyRevenue.0.value')}
                  error={!!errors.yearlyRevenue?.[0]?.value}
                  helperText={errors.yearlyRevenue?.[0]?.value?.message}
                >
                  {revenueRanges.map((range) => (
                    <MenuItem key={range} value={range}>
                      {range}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Personel Sayısı */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Personel Sayısı
          </Typography>
          <FormControl fullWidth>
            <TextField
              select
              label="Personel Sayısı"
              {...register('employeeCount.0.value')}
              error={!!errors.employeeCount?.[0]?.value}
              helperText={errors.employeeCount?.[0]?.value?.message}
            >
              {employeeRanges.map((range) => (
                <MenuItem key={range} value={range}>
                  {range}
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FinancialInfoStep;
