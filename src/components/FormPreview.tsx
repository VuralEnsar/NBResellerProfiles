import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Paper,
  Grid,
  useTheme,
} from '@mui/material';
import { PartnerProfileForm } from '../types/form';

interface FormPreviewProps {
  open: boolean;
  onClose: () => void;
  data: PartnerProfileForm;
}

const FormPreview = ({ open, onClose, data }: FormPreviewProps) => {
  const theme = useTheme();

  const renderSection = (title: string, content: React.ReactNode) => (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2, 
        mb: 2,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      }}
    >
      <Typography variant="h6" gutterBottom color="primary">
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {content}
    </Paper>
  );

  const renderCompanyInfo = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2">Partner ID</Typography>
        <Typography>{data.companyInfo.partnerID}</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2">Firma Adı</Typography>
        <Typography>{data.companyInfo.companyName}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2">Adres</Typography>
        <Typography>{data.companyInfo.address}</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2">İlçe</Typography>
        <Typography>{data.companyInfo.district}</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2">İl</Typography>
        <Typography>{data.companyInfo.city}</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2">Vergi No</Typography>
        <Typography>{data.companyInfo.taxNumber}</Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2">Website</Typography>
        <Typography>{data.companyInfo.website}</Typography>
      </Grid>
    </Grid>
  );

  const renderCustomerSegments = () => (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle2">Müşteri Segmentleri</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
          {data.customerSegments.sme && (
            <Typography variant="body2" sx={{ bgcolor: 'primary.main', color: 'white', p: 0.5, borderRadius: 1 }}>
              KOBİ
            </Typography>
          )}
          {data.customerSegments.enterprise && (
            <Typography variant="body2" sx={{ bgcolor: 'primary.main', color: 'white', p: 0.5, borderRadius: 1 }}>
              Kurumsal
            </Typography>
          )}
          {data.customerSegments.government && (
            <Typography variant="body2" sx={{ bgcolor: 'primary.main', color: 'white', p: 0.5, borderRadius: 1 }}>
              Kamu
            </Typography>
          )}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2">Sektörler</Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
          {data.sectors.map((sector) => (
            <Typography 
              key={sector}
              variant="body2" 
              sx={{ bgcolor: 'secondary.main', color: 'white', p: 0.5, borderRadius: 1 }}
            >
              {sector}
            </Typography>
          ))}
        </Box>
      </Grid>
    </Grid>
  );

  const renderTeamInfo = () => (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2">Teknik Ekip</Typography>
        <Typography>
          {data.technicalTeam.hasTeam ? `${data.technicalTeam.teamSize} kişi` : 'Yok'}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="subtitle2">Satış Ekibi</Typography>
        <Typography>
          {data.salesTeam.hasTeam ? `${data.salesTeam.teamSize} kişi` : 'Yok'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle2">Firma Yetkilileri</Typography>
        {data.companyOfficials.map((official, index) => (
          <Box key={index} sx={{ mt: 1 }}>
            <Typography>{official.name} - {official.position}</Typography>
            <Typography variant="body2" color="text.secondary">
              {official.email} | {official.phone}
            </Typography>
          </Box>
        ))}
      </Grid>
    </Grid>
  );

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          bgcolor: theme.palette.background.default,
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" align="center">
          Form Önizleme
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          {renderSection('Firma Bilgileri', renderCompanyInfo())}
          {renderSection('Müşteri Segmenti', renderCustomerSegments())}
          {renderSection('Ekip Bilgileri', renderTeamInfo())}
          {/* Diğer bölümler benzer şekilde eklenebilir */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained">
          Kapat
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormPreview;
