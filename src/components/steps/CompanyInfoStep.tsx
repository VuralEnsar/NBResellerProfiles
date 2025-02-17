import React from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  TextField,
  Grid,
  Box,
  Typography,
  styled,
  Alert,
  Collapse,
  InputAdornment,
  Tooltip,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { PartnerProfileForm } from '../../types/form';

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    transition: 'all 0.2s ease',
    '&.Mui-error': {
      backgroundColor: theme.palette.error.light + '10',
      '&:hover': {
        backgroundColor: theme.palette.error.light + '20',
      },
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.primary.light + '10',
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
  },
  '& .MuiFormHelperText-root': {
    marginLeft: 0,
    transition: 'all 0.2s ease',
  },
}));

const ValidationIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  '& svg': {
    fontSize: '1.25rem',
  },
}));

type CompanyInfoFields = Pick<PartnerProfileForm, 
  'companyName' | 
  'address' | 
  'district' | 
  'city' | 
  'postalCode' | 
  'taxNumber' | 
  'website' | 
  'foundingDate'
>;

const CompanyInfoStep: React.FC = () => {
  const {
    register,
    formState: { errors, touchedFields },
    watch,
    control,
  } = useFormContext<PartnerProfileForm>();

  const fields = [
    'companyName',
    'address',
    'district',
    'city',
    'postalCode',
    'taxNumber',
    'website',
    'foundingDate',
  ] as const;

  const watchedFields = fields.reduce((acc, field) => {
    acc[field] = watch(field);
    return acc;
  }, {} as Record<keyof CompanyInfoFields, any>);

  const getFieldStatus = (fieldName: keyof CompanyInfoFields) => {
    const isError = !!errors[fieldName];
    const isTouched = !!touchedFields[fieldName];
    const hasValue = !!watchedFields[fieldName];
    
    return {
      isError,
      isTouched,
      hasValue,
      isValid: !isError && hasValue,
    };
  };

  const getEndAdornment = (fieldName: keyof CompanyInfoFields) => {
    const status = getFieldStatus(fieldName);
    
    if (!status.hasValue) return null;
    
    if (status.isError) {
      return (
        <InputAdornment position="end">
          <Tooltip title={errors[fieldName]?.message as string}>
            <ValidationIcon>
              <ErrorIcon color="error" />
            </ValidationIcon>
          </Tooltip>
        </InputAdornment>
      );
    }
    
    if (status.isValid) {
      return (
        <InputAdornment position="end">
          <ValidationIcon>
            <CheckCircleIcon color="success" />
          </ValidationIcon>
        </InputAdornment>
      );
    }
    
    return null;
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
        Firma Bilgileri
      </Typography>

      <Collapse in={Object.keys(errors).length > 0}>
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          icon={<InfoIcon />}
        >
          Lütfen tüm zorunlu alanları doldurun ve hataları düzeltin
        </Alert>
      </Collapse>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="Firma Adı"
            {...register('companyName')}
            error={!!errors.companyName}
            helperText={errors.companyName?.message}
            InputProps={{
              endAdornment: getEndAdornment('companyName'),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <StyledTextField
            fullWidth
            label="Adres"
            multiline
            rows={3}
            {...register('address')}
            error={!!errors.address}
            helperText={errors.address?.message}
            InputProps={{
              endAdornment: getEndAdornment('address'),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            label="İlçe"
            {...register('district')}
            error={!!errors.district}
            helperText={errors.district?.message}
            InputProps={{
              endAdornment: getEndAdornment('district'),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            label="İl"
            {...register('city')}
            error={!!errors.city}
            helperText={errors.city?.message}
            InputProps={{
              endAdornment: getEndAdornment('city'),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            label="Posta Kodu"
            {...register('postalCode')}
            error={!!errors.postalCode}
            helperText={errors.postalCode?.message}
            InputProps={{
              endAdornment: getEndAdornment('postalCode'),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            label="Vergi Numarası"
            {...register('taxNumber')}
            error={!!errors.taxNumber}
            helperText={errors.taxNumber?.message}
            InputProps={{
              endAdornment: getEndAdornment('taxNumber'),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledTextField
            fullWidth
            label="Web Sitesi"
            {...register('website')}
            error={!!errors.website}
            helperText={errors.website?.message}
            InputProps={{
              endAdornment: getEndAdornment('website'),
              startAdornment: (
                <InputAdornment position="start">
                  https://
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Controller
            name="foundingDate"
            control={control}
            render={({ field, fieldState }) => (
              <DatePicker
                label="Kuruluş Tarihi"
                value={field.value}
                onChange={(date) => field.onChange(date)}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    error: !!fieldState.error,
                    helperText: fieldState.error?.message,
                  },
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default CompanyInfoStep;
