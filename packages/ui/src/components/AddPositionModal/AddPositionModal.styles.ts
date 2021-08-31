import theme from '@/styles/theme';
import styled from 'styled-components';

export const Container = styled.div`
  border: 1px dashed ${theme.palette.grey[400]};
  box-sizing: border-box;
  display: grid;
  position: absolute;
  width: 100%;
  background: white;
  padding-left: 24px;
`;
export const CloseContainer = styled.div`
  display: grid;
  justify-items: end;
`;
export const TickerCardContainer = styled.div`
  padding-top: 8px;
`;
export const BasicContainer = styled.div`
  margin-top: ${theme.spacing(3)}px;
`;

export const AdvancedContainer = styled.div`
  margin-top: ${theme.spacing(3)}px;
`;

export const AddButtonContainer = styled.div`
  display: grid;
  justify-items: end;
`;
