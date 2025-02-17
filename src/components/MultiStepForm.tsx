import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Step,
  StepLabel,
  Button,
  Paper,
  Container,
  Typography,
  useTheme,
  useMediaQuery,
  styled,
  Tooltip,
  IconButton,
  Zoom,
  StepConnector,
  stepConnectorClasses,
  alpha,
  Theme,
  CircularProgress,
} from '@mui/material';
import { formSchema } from '../validations/formSchemas';
import { PartnerProfileForm } from '../types/form';
import { useFormPersistence } from '../hooks/useFormPersistence';

// Form Adımları
import CompanyInfoStep from './steps/CompanyInfoStep';
import CustomerSegmentStep from './steps/CustomerSegmentStep';
import ProductPortfolioStep from './steps/ProductPortfolioStep';
import FinancialInfoStep from './steps/FinancialInfoStep';
import TeamInfoStep from './steps/TeamInfoStep';
import ServicesStep from './steps/ServicesStep';
import StrategyStep from './steps/StrategyStep';

// İkonlar
import BusinessIcon from '@mui/icons-material/Business';
import GroupsIcon from '@mui/icons-material/Groups';
import InventoryIcon from '@mui/icons-material/Inventory';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleIcon from '@mui/icons-material/People';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import BarChartIcon from '@mui/icons-material/BarChart';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

interface MultiStepFormProps {
  onFormSubmit: () => void;
}

const steps = [
  { label: 'Firma Bilgileri', component: CompanyInfoStep, icon: BusinessIcon },
  { label: 'Müşteri Segmenti', component: CustomerSegmentStep, icon: GroupsIcon },
  { label: 'Ürün Portföyü', component: ProductPortfolioStep, icon: InventoryIcon },
  { label: 'Finansal Bilgiler', component: FinancialInfoStep, icon: MonetizationOnIcon },
  { label: 'Ekip Bilgileri', component: TeamInfoStep, icon: PeopleIcon },
  { label: 'Servisler', component: ServicesStep, icon: MiscellaneousServicesIcon },
  { label: 'Strateji', component: StrategyStep, icon: BarChartIcon },
] as const;

// ... (styled components aynı)

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onFormSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const methods = useForm<PartnerProfileForm>({
    resolver: yupResolver(formSchema) as any,
    mode: 'onChange',
    defaultValues: {
      customerSegments: {},
      sectors: {},
      geographicRegions: {
        domesticCities: [],
        internationalCountries: [],
      },
      products: {},
      commercialPartners: {},
      yearlyRevenue: [{ year: new Date().getFullYear(), value: '' }],
      employeeCount: [{ year: new Date().getFullYear(), value: '' }],
      companyOfficials: [],
      services: {},
      backupTypes: {},
      technicalTeam: {
        hasTeam: false,
      },
      salesTeam: {
        hasTeam: false,
      },
    },
  });

  const { clearSavedData } = useFormPersistence(methods);
  const { handleSubmit, formState: { errors }, trigger, getValues } = methods;

  const onSubmit = async (data: PartnerProfileForm) => {
    try {
      setIsSubmitting(true);
      // Form verilerini API'ye gönderme simülasyonu
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Form Data:', data);
      clearSavedData();
      
      // Form başarıyla gönderildikten sonra onFormSubmit'i çağır
      if (typeof onFormSubmit === 'function') {
        onFormSubmit();
      }
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... (diğer fonksiyonlar aynı)

  return (
    <StyledContainer maxWidth="md">
      <StyledPaper elevation={3}>
        <FormTitle variant="h4">
          Narbulut Partner Profili
        </FormTitle>

        <StepperContainer>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              position: 'relative',
              zIndex: 1,
              flexDirection: isMobile ? 'column' : 'row',
              gap: isMobile ? 3 : 2,
              px: 4,
            }}
          >
            {steps.map((step, index) => {
              const { isActive, isCompleted, hasError } = getStepStatus(index);
              const Icon = step.icon;
              const isLastStep = index === steps.length - 1;

              const [firstWord, ...restWords] = step.label.split(' ');

              return (
                <React.Fragment key={step.label}>
                  <Tooltip
                    title={step.label}
                    placement="top"
                    TransitionComponent={Zoom}
                    arrow
                  >
                    <StepIconContainer>
                      <StepButton
                        onClick={() => handleStepClick(index)}
                        data-active={isActive}
                        data-completed={isCompleted}
                        data-error={hasError}
                        disabled={index > activeStep && !isCompleted}
                      >
                        {isCompleted ? (
                          <CheckCircleIcon />
                        ) : hasError ? (
                          <ErrorIcon />
                        ) : (
                          <Icon />
                        )}
                      </StepButton>
                      <StepText
                        data-active={isActive}
                        data-completed={isCompleted}
                        data-error={hasError}
                      >
                        <span>{firstWord}</span>
                        {restWords.length > 0 && <span>{restWords.join(' ')}</span>}
                      </StepText>
                    </StepIconContainer>
                  </Tooltip>
                  {!isLastStep && !isMobile && (
                    <Box sx={{ flex: 1, position: 'relative', minWidth: 20, maxWidth: 60 }}>
                      <StepConnectorLine completed={isCompleted.toString()} />
                    </Box>
                  )}
                </React.Fragment>
              );
            })}
          </Box>
        </StepperContainer>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ mb: 4 }}>
              <CurrentStepComponent />
            </Box>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              pt: 3,
              borderTop: `1px solid ${theme.palette.divider}`,
              mt: 3,
            }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={activeStep === 0 || isSubmitting}
                size="large"
                sx={{
                  minWidth: 120,
                  transition: 'all 0.3s ease',
                  '&:not(:disabled):hover': {
                    transform: 'translateX(-4px)',
                  },
                }}
              >
                Geri
              </Button>

              {activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                  size="large"
                  sx={{
                    minWidth: 120,
                    background: 'linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                    },
                  }}
                >
                  {isSubmitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    'Tamamla'
                  )}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={isSubmitting}
                  size="large"
                  sx={{
                    minWidth: 120,
                    background: 'linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateX(4px)',
                      boxShadow: `0 8px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
                    },
                  }}
                >
                  İleri
                </Button>
              )}
            </Box>
          </form>
        </FormProvider>
      </StyledPaper>
    </StyledContainer>
  );
};

export default MultiStepForm;
