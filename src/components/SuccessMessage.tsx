import React, { useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Container,
  styled,
  keyframes,
  Button,
  CircularProgress,
  useTheme,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LoginIcon from '@mui/icons-material/Login';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CelebrationIcon from '@mui/icons-material/Celebration';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  0% {
    transform: scale(0) rotate(-45deg);
    opacity: 0;
  }
  50% {
    transform: scale(1.2) rotate(15deg);
  }
  100% {
    transform: scale(1) rotate(0);
    opacity: 1;
  }
`;

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(5, 150, 105, 0.4);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(5, 150, 105, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(5, 150, 105, 0);
  }
`;

const float = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  padding: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at center, rgba(37, 99, 235, 0.1) 0%, rgba(37, 99, 235, 0) 70%)',
    zIndex: -1,
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(8),
  textAlign: 'center',
  animation: `${fadeIn} 0.8s ease-out`,
  maxWidth: 600,
  width: '100%',
  borderRadius: 24,
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: 'linear-gradient(90deg, #2563eb, #059669)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(4),
    borderRadius: 16,
  },
}));

const SuccessIconWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(4),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 120,
    height: 120,
    borderRadius: '50%',
    animation: `${pulse} 2s infinite`,
    zIndex: 0,
  },
}));

const StyledSuccessIcon = styled(CheckCircleIcon)(({ theme }) => ({
  fontSize: 100,
  color: theme.palette.success.main,
  animation: `${scaleIn} 0.5s ease-out forwards`,
  position: 'relative',
  zIndex: 1,
}));

const CelebrationIconLeft = styled(CelebrationIcon)(({ theme }) => ({
  position: 'absolute',
  left: -20,
  top: '50%',
  fontSize: 40,
  color: theme.palette.primary.main,
  opacity: 0.6,
  animation: `${float} 3s ease-in-out infinite`,
  transform: 'rotate(-30deg)',
}));

const CelebrationIconRight = styled(CelebrationIcon)(({ theme }) => ({
  position: 'absolute',
  right: -20,
  top: '50%',
  fontSize: 40,
  color: theme.palette.success.main,
  opacity: 0.6,
  animation: `${float} 3s ease-in-out infinite 1.5s`,
  transform: 'rotate(30deg)',
}));

const Title = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontWeight: 700,
  background: 'linear-gradient(45deg, #2563eb 30%, #059669 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.75rem',
  },
}));

const Message = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  color: theme.palette.text.secondary,
  fontSize: '1.1rem',
  lineHeight: 1.6,
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
  },
}));

const CountdownText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(3),
  color: theme.palette.primary.main,
  fontSize: '0.9rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
}));

const LoginButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 4),
  borderRadius: 12,
  fontSize: '1.1rem',
  textTransform: 'none',
  background: 'linear-gradient(45deg, #2563eb 30%, #059669 90%)',
  color: '#fff',
  boxShadow: '0 4px 20px rgba(37, 99, 235, 0.3)',
  '&:hover': {
    background: 'linear-gradient(45deg, #1d4ed8 30%, #047857 90%)',
    boxShadow: '0 6px 24px rgba(37, 99, 235, 0.4)',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

const SuccessMessage: React.FC = () => {
  const [countdown, setCountdown] = React.useState(5);
  const theme = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          window.location.href = 'https://login.narbulut.com/login';
          clearInterval(timer);
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <StyledContainer maxWidth="sm">
      <StyledPaper elevation={3}>
        <SuccessIconWrapper>
          <CelebrationIconLeft />
          <StyledSuccessIcon />
          <CelebrationIconRight />
        </SuccessIconWrapper>
        
        <Title variant="h4">
          Tebrikler! İşlem Başarılı
        </Title>
        
        <Message>
          Partner profil bilgileriniz başarıyla kaydedildi. Artık Narbulut Partner ailesinin bir parçasısınız! 
          Sizi yeni fırsatlar ve başarılar bekliyor.
        </Message>

        <LoginButton
          variant="contained"
          startIcon={<LoginIcon />}
          endIcon={<ArrowForwardIcon />}
          href="https://login.narbulut.com/login"
        >
          Giriş Yap
        </LoginButton>

        <CountdownText>
          <CircularProgress size={16} thickness={6} sx={{ color: theme.palette.primary.main }} />
          {countdown} saniye içinde yönlendiriliyorsunuz...
        </CountdownText>
      </StyledPaper>
    </StyledContainer>
  );
};

export default SuccessMessage;
