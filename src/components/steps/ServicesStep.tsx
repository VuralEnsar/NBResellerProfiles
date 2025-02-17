import React from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Autocomplete,
  Chip,
  Box,
} from '@mui/material';
import { PartnerProfileForm } from '../../types/form';

const backupTypes = [
  { key: 'fileFolder', label: 'Dosya ve Klasör' },
  { key: 'databases', label: 'Veritabanları' },
  { key: 'emailData', label: 'Mail Verileri' },
  { key: 'userBackups', label: 'Kullanıcı Yedekleri' },
  { key: 'computerImages', label: 'Bilgisayar Disk İmajları' },
  { key: 'serverImages', label: 'Sunucu Disk İmajları' },
  { key: 'virtualMachines', label: 'VM Sanal Makineler' },
];

const ServicesStep: React.FC = () => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<PartnerProfileForm>();

  const services = watch('services');
  const backupTypesValue = watch('backupTypes');

  // Seçili yedekleme türlerini etiketlere dönüştür
  const selectedBackupTypes = backupTypes
    .filter(({ key }) => backupTypesValue?.[key as keyof typeof backupTypesValue])
    .map(({ label }) => label);

  const handleServiceChange = (
    field: keyof PartnerProfileForm['services'],
    value: string[]
  ) => {
    setValue(`services.${field}`, value.join(', '), { shouldValidate: true });
  };

  const handleBackupTypeToggle = (type: string) => {
    const key = backupTypes.find(item => item.label === type)?.key;
    if (key) {
      setValue(
        `backupTypes.${key as keyof PartnerProfileForm['backupTypes']}`,
        !backupTypesValue?.[key as keyof typeof backupTypesValue],
        { shouldValidate: true }
      );
    }
  };

  return (
    <Grid container spacing={3}>
      {/* Verilen Hizmetler */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Verilen Hizmetler ve Kullanılan Ürünler
          </Typography>

          <Grid container spacing={3}>
            {/* Yedekleme */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={services?.backup ? services.backup.split(', ').filter(Boolean) : []}
                onChange={(_, newValue) => handleServiceChange('backup', newValue)}
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
                    label="Yedekleme"
                    placeholder="Marka/firma adı yazıp enter'a basın"
                    helperText="Hangi marka ve/veya firmaların ürünlerini satıyorsunuz?"
                  />
                )}
              />
            </Grid>

            {/* Bulut Sunucu */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={services?.cloudServer ? services.cloudServer.split(', ').filter(Boolean) : []}
                onChange={(_, newValue) => handleServiceChange('cloudServer', newValue)}
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
                    label="Bulut Sunucu"
                    placeholder="Marka/firma adı yazıp enter'a basın"
                    helperText="Hangi marka ve/veya firmaların ürünlerini satıyorsunuz?"
                  />
                )}
              />
            </Grid>

            {/* Bulut Depolama */}
            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={services?.cloudStorage ? services.cloudStorage.split(', ').filter(Boolean) : []}
                onChange={(_, newValue) => handleServiceChange('cloudStorage', newValue)}
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
                    label="Bulut Depolama (S3)"
                    placeholder="Marka/firma adı yazıp enter'a basın"
                    helperText="Hangi marka ve/veya firmaların ürünlerini satıyorsunuz?"
                  />
                )}
              />
            </Grid>
          </Grid>
        </Paper>
      </Grid>

      {/* Yedekleme Türleri */}
      <Grid item xs={12}>
        <Paper elevation={2} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Müşterilerinizde Hangi Tür Verileri Yedekliyorsunuz?
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {backupTypes.map(({ key, label }) => (
              <Chip
                key={key}
                label={label}
                onClick={() => handleBackupTypeToggle(label)}
                color={backupTypesValue?.[key as keyof typeof backupTypesValue] ? 'primary' : 'default'}
                sx={{ m: 0.5 }}
              />
            ))}
          </Box>
          {errors.backupTypes && (
            <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
              {errors.backupTypes.message}
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ServicesStep;
