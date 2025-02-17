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

const StyledContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const StyledPaper = styled(Paper)(({ theme }: { theme: Theme }) => ({
  padding: theme.spacing(6),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
  position: 'relative',
  overflow: 'hidden',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
  },
}));

const FormTitle = styled(Typography)(({ theme }: { theme: Theme }) => ({
  marginBottom: theme.spacing(6),
  fontWeight: 600,
  textAlign: 'center',
  background: 'linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -12,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 60,
    height: 3,
    background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
    borderRadius: 1.5,
  },
}));

const StepperContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(8),
  padding: theme.spacing(4, 0),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2, 0),
    marginBottom: theme.spacing(4),
  },
}));

const StepConnectorLine = styled(Box)<{ completed: string }>(({ theme, completed }: { theme: Theme; completed: string }) => ({
  position: 'absolute',
  top: '50%',
  left: 0,
  right: 0,
  height: 2,
  backgroundColor: completed === 'true'
    ? theme.palette.primary.main 
    : alpha(theme.palette.primary.main, 0.12),
  transform: 'translateY(-50%)',
  transition: 'background-color 0.3s ease',
}));

const StepIconContainer = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  position: 'relative',
  zIndex: 1,
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  width: '100%',
  maxWidth: 100,
  minWidth: 80,
  padding: theme.spacing(1),
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const StepButton = styled(IconButton, {
  shouldForwardProp: (prop: string) => !['data-active', 'data-completed', 'data-error'].includes(prop),
})<{ 'data-active'?: boolean; 'data-completed'?: boolean; 'data-error'?: boolean }>(({ theme }: { theme: Theme }) => ({
  width: 44,
  height: 44,
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.secondary,
  border: `2px solid ${theme.palette.divider}`,
  boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  zIndex: 2,
  marginBottom: theme.spacing(1),

  '&[data-active="true"]': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    border: `2px solid ${theme.palette.primary.main}`,
    boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.2)}, 0 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,

    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      transform: 'translateY(-2px)',
      boxShadow: `0 0 0 4px ${alpha(theme.palette.primary.main, 0.3)}, 0 8px 16px ${alpha(theme.palette.primary.main, 0.4)}`,
    },
  },

  '&[data-completed="true"]': {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
    border: `2px solid ${theme.palette.success.main}`,
    boxShadow: `0 0 0 4px ${alpha(theme.palette.success.main, 0.2)}, 0 4px 12px ${alpha(theme.palette.success.main, 0.3)}`,

    '&:hover': {
      backgroundColor: theme.palette.success.dark,
      transform: 'translateY(-2px)',
      boxShadow: `0 0 0 4px ${alpha(theme.palette.success.main, 0.3)}, 0 8px 16px ${alpha(theme.palette.success.main, 0.4)}`,
    },
  },

  '&[data-error="true"]': {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.main,
    border: `2px solid ${theme.palette.error.main}`,
  },

  '&:hover': {
    backgroundColor: alpha(theme.palette.action.hover, 0.8),
    transform: 'translateY(-2px)',
    boxShadow: `0 4px 12px ${alpha(theme.palette.common.black, 0.2)}`,
  },

  '& svg': {
    fontSize: 20,
    transition: 'transform 0.2s ease',
  },

  '&:hover svg': {
    transform: 'scale(1.1)',
  },
}));

const StepText = styled(Typography)<{ 'data-active'?: boolean; 'data-completed'?: boolean; 'data-error'?: boolean }>(
  ({ theme }: { theme: Theme }) => ({
    fontSize: '0.85rem',
    fontWeight: 500,
    color: theme.palette.text.secondary,
    textAlign: 'center',
    width: '100%',
    transition: 'all 0.3s ease',
    opacity: 0.8,
    transform: 'scale(1)',
    lineHeight: 1.3,
    marginTop: theme.spacing(1.5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '2.6em',
    whiteSpace: 'pre-line',
    gap: 2,

    '& > span': {
      display: 'block',
      '&:first-of-type': {
        marginBottom: 2,
      },
    },

    '&[data-active="true"]': {
      fontWeight: 600,
      color: theme.palette.primary.main,
      opacity: 1,
      transform: 'scale(1.05)',
    },

    '&[data-completed="true"]': {
      fontWeight: 600,
      color: theme.palette.success.main,
    },

    '&[data-error="true"]': {
      color: theme.palette.error.main,
    },
  })
);

const MultiStepForm: React.FC<MultiStepFormProps> = ({ onFormSubmit }) => {
  const [activeStep, setActiveStep] = useState(0);
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
      console.log('Form Data:', data);
      clearSavedData();
      onFormSubmit();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const validateCurrentStep = async () => {
    let fieldsToValidate: (keyof PartnerProfileForm)[] = [];

    switch (activeStep) {
      case 0:
        fieldsToValidate = ['companyName', 'address', 'district', 'city', 'postalCode', 'taxNumber', 'website', 'foundingDate'];
        break;
      case 1:
        fieldsToValidate = ['customerSegments', 'sectors', 'geographicRegions'];
        break;
      case 2:
        fieldsToValidate = ['products', 'mainRevenue'];
        break;
      case 3:
        fieldsToValidate = ['employeeCount'];
        break;
      case 4:
        fieldsToValidate = ['technicalTeam', 'salesTeam', 'companyOfficials', 'technicalContact', 'salesContact'];
        break;
      case 5:
        fieldsToValidate = ['services', 'backupTypes'];
        break;
      case 6:
        fieldsToValidate = ['competitors', 'competitiveAnalysis', 'pastYearSales', 'sixMonthTarget', 'targetStrategy', 'pricingModel', 'customerFeedback'];
        break;
    }

    const result = await trigger(fieldsToValidate);
    return result;
  };

  const handleStepClick = async (stepIndex: number) => {
    if (stepIndex < activeStep) {
      setActiveStep(stepIndex);
    } else if (stepIndex > activeStep) {
      const isValid = await validateCurrentStep();
      if (isValid) {
        setActiveStep(stepIndex);
      }
    }
  };

  const handleNext = async () => {
    const isStepValid = await validateCurrentStep();
    if (isStepValid) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const CurrentStepComponent = steps[activeStep].component;

  const getStepStatus = (stepIndex: number) => {
    const isActive = activeStep === stepIndex;
    const isCompleted = activeStep > stepIndex;
    const hasError = false;

    return { isActive, isCompleted, hasError };
  };

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
                disabled={activeStep === 0}
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
                  Tamamla
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
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
