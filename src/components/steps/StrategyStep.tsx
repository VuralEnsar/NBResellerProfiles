import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from '@mui/material';
import { PartnerProfileForm } from '../../types/form';

const StrategyStep: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<PartnerProfileForm>();

  return (
    <Grid container spacing={3}>
      {/* Rakip Ürünler */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Sizin satış kanalınızda Narbulut'a rakip olabilecek ürünler hangileri?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            {...register('competitors')}
            error={!!errors.competitors}
            helperText={errors.competitors?.message}
          />
        </Paper>
      </Grid>

      {/* Rekabet Analizi */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Narbulut'u rakip ürünlerle kıyasladığınızda öne çıkan ya da geride kalan noktalar hangileri?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            {...register('competitiveAnalysis')}
            error={!!errors.competitiveAnalysis}
            helperText={errors.competitiveAnalysis?.message}
          />
        </Paper>
      </Grid>

      {/* Satış Bilgileri */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Son 1 yıl içerisinde yedekleme ürünleri genelinde kaç adet satış gerçekleştirdiniz?
          </Typography>
          <TextField
            fullWidth
            type="number"
            {...register('pastYearSales')}
            error={!!errors.pastYearSales}
            helperText={errors.pastYearSales?.message}
          />
        </Paper>
      </Grid>

      {/* Hedef */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Önümüzdeki 6 aylık periyotta ne kadarlık Narbulut satışı hedefliyorsunuz?
          </Typography>
          <TextField
            fullWidth
            type="number"
            {...register('sixMonthTarget')}
            error={!!errors.sixMonthTarget}
            helperText={errors.sixMonthTarget?.message}
          />
        </Paper>
      </Grid>

      {/* Hedef Stratejisi */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Bu hedefe ulaşmak için planladığınız belirli aksiyon veya stratejiler var mı?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            {...register('targetStrategy')}
            error={!!errors.targetStrategy}
            helperText={errors.targetStrategy?.message}
          />
        </Paper>
      </Grid>

      {/* Fiyatlandırma Modeli */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Müşterilerinize hangi fiyatlandırma modelini sunmak istersiniz?
          </Typography>
          <FormControl 
            component="fieldset" 
            error={!!errors.pricingModel}
            sx={{ width: '100%' }}
          >
            <RadioGroup
              row
              {...register('pricingModel')}
            >
              <FormControlLabel
                value="monthly"
                control={<Radio />}
                label="Aylık"
              />
              <FormControlLabel
                value="yearly"
                control={<Radio />}
                label="Yıllık"
              />
            </RadioGroup>
            {errors.pricingModel && (
              <FormHelperText>
                {errors.pricingModel.message}
              </FormHelperText>
            )}
          </FormControl>
        </Paper>
      </Grid>

      {/* Müşteri Geri Bildirimi */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Narbulut veya benzeri yedekleme çözümleri ile ilgili müşterilerinizden aldığınız en yaygın geri bildirim nedir?
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            {...register('customerFeedback')}
            error={!!errors.customerFeedback}
            helperText={errors.customerFeedback?.message}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default StrategyStep;
