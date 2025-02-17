import { styled } from '@mui/material/styles';
import { Select, SelectProps } from '@mui/material';

export const StyledSelect = styled(Select)<SelectProps>(() => ({
  '& .MuiSelect-select': {
    padding: '8.5px 14px',
  },
}));
