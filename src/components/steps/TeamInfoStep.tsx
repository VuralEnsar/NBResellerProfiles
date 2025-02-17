import React from 'react';
import { useFormContext, useFieldArray } from 'react-hook-form';
import {
  Grid,
  Paper,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  TextField,
  IconButton,
  Box,
  FormHelperText,
  Divider,
  styled,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { PartnerProfileForm } from '../../types/form';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 500,
}));

interface ContactFieldsProps {
  prefix: 'technicalContact' | 'salesContact';
  title: string;
}

const ContactFields: React.FC<ContactFieldsProps> = ({ prefix, title }) => {
  const { register, formState: { errors } } = useFormContext<PartnerProfileForm>();
  const error = errors[prefix];

  return (
    <StyledPaper>
      <SectionTitle variant="h6">
        {title}
      </SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Ad Soyad"
            {...register(`${prefix}.name`)}
            error={!!error?.name}
            helperText={error?.name?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Görevi"
            {...register(`${prefix}.position`)}
            error={!!error?.position}
            helperText={error?.position?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Telefon"
            {...register(`${prefix}.phone`)}
            error={!!error?.phone}
            helperText={error?.phone?.message}
            placeholder="5XXXXXXXXX"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="E-posta"
            type="email"
            {...register(`${prefix}.email`)}
            error={!!error?.email}
            helperText={error?.email?.message}
          />
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

interface TeamSectionProps {
  prefix: 'technicalTeam' | 'salesTeam';
  title: string;
}

const TeamSection: React.FC<TeamSectionProps> = ({ prefix, title }) => {
  const { register, watch, formState: { errors } } = useFormContext<PartnerProfileForm>();
  const hasTeam = watch(`${prefix}.hasTeam`);
  const error = errors[prefix];

  return (
    <StyledPaper>
      <SectionTitle variant="h6">
        {title}
      </SectionTitle>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                {...register(`${prefix}.hasTeam`)}
                checked={hasTeam}
              />
            }
            label="Uzman ekip mevcut"
          />
        </Grid>
        {hasTeam && (
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              label="Ekip Büyüklüğü"
              {...register(`${prefix}.teamSize`)}
              error={!!error?.teamSize}
              helperText={error?.teamSize?.message}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </Grid>
        )}
      </Grid>
    </StyledPaper>
  );
};

const TeamInfoStep: React.FC = () => {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<PartnerProfileForm>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'companyOfficials',
  });

  const addOfficial = () => {
    append({
      name: '',
      position: '',
      phone: '',
      email: '',
    });
  };

  return (
    <Grid container spacing={3}>
      {/* Teknik ve Satış Ekipleri */}
      <Grid item xs={12}>
        <TeamSection prefix="technicalTeam" title="Teknik Ekip" />
        <TeamSection prefix="salesTeam" title="Satış Ekibi" />
      </Grid>

      {/* Firma Yetkilileri */}
      <Grid item xs={12}>
        <StyledPaper>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <SectionTitle variant="h6">
              Firma Yetkilileri
            </SectionTitle>
            <IconButton onClick={addOfficial} color="primary">
              <AddIcon />
            </IconButton>
          </Box>
          {fields.map((field, index) => (
            <Box key={field.id} sx={{ mb: 3 }}>
              {index > 0 && <Divider sx={{ my: 3 }} />}
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Ad Soyad"
                    {...register(`companyOfficials.${index}.name`)}
                    error={!!errors.companyOfficials?.[index]?.name}
                    helperText={errors.companyOfficials?.[index]?.name?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Görevi"
                    {...register(`companyOfficials.${index}.position`)}
                    error={!!errors.companyOfficials?.[index]?.position}
                    helperText={errors.companyOfficials?.[index]?.position?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={5}>
                  <TextField
                    fullWidth
                    label="Telefon"
                    {...register(`companyOfficials.${index}.phone`)}
                    error={!!errors.companyOfficials?.[index]?.phone}
                    helperText={errors.companyOfficials?.[index]?.phone?.message}
                    placeholder="5XXXXXXXXX"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="E-posta"
                    type="email"
                    {...register(`companyOfficials.${index}.email`)}
                    error={!!errors.companyOfficials?.[index]?.email}
                    helperText={errors.companyOfficials?.[index]?.email?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={1}>
                  <IconButton onClick={() => remove(index)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))}
          {errors.companyOfficials && !Array.isArray(errors.companyOfficials) && (
            <FormHelperText error>
              {errors.companyOfficials.message}
            </FormHelperText>
          )}
        </StyledPaper>
      </Grid>

      {/* İletişim Kişileri */}
      <Grid item xs={12}>
        <ContactFields prefix="technicalContact" title="Narbulut Teknik Sorumlusu" />
        <ContactFields prefix="salesContact" title="Narbulut Satış ve Pazarlama Sorumlusu" />
      </Grid>
    </Grid>
  );
};

export default TeamInfoStep;
