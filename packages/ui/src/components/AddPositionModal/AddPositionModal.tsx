import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Typography,
  Collapse,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { Position, Symbol } from '@/graphql/Mutations.document.gql';
import theme from '@/styles/theme';
import BaggersSymbolCard from '../BaggersTickerCard/BaggersTickerCard';
import { TickerCardContainer } from './AddPositionModal.styles';
import AddPositionBasicForm from './AddPositionBasicForm';
import AddPositionAdvancedForm from './AddPositionAdvancedForm';

type Props = {
  symbol?: Symbol;
  onPositionAdded: (position: Position) => void;
  open: boolean;
  onClose: () => void;
};

const AddPositionModal: React.FC<Props> = ({
  symbol,
  onPositionAdded,
  open,
  onClose,
}) => {
  const [position, setPosition] = useState<Position | undefined>({
    _id: undefined,
    symbol,
  });

  const [isAdvancedVisible, setIsAdvancedVisible] = useState(false);

  useEffect(() => {
    if (symbol) {
      setPosition({
        _id: undefined,
        symbol,
      });
    }
  }, [symbol]);

  if (!symbol) return null;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle
        style={{
          background: theme.palette.primary.dark,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Typography variant="h4" style={{ display: `inline` }}>
          Add
        </Typography>
        {` `}
        <Typography
          variant="h4"
          style={{ display: `inline` }}
          color="secondary"
        >
          ${symbol.symbol?.toUpperCase()}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Grid>
          <TickerCardContainer>
            <BaggersSymbolCard symbol={symbol} />
          </TickerCardContainer>
          <AddPositionBasicForm
            symbol={symbol}
            setPosition={(pos: any) => {
              if (pos) {
                setPosition(pos);
              }
            }}
          />
          <Collapse in={isAdvancedVisible}>
            <AddPositionAdvancedForm
              symbol={symbol}
              setPosition={(pos: any) => {
                if (pos) {
                  setPosition(pos);
                }
              }}
            />
          </Collapse>

          <Button
            tabIndex="-1"
            fullWidth
            style={{ marginTop: `${theme.spacing(3)}px` }}
            onClick={() => setIsAdvancedVisible((a) => !a)}
          >
            {!isAdvancedVisible && <ExpandMoreIcon />}
            {isAdvancedVisible && <ExpandLessIcon />}
            Advanced
          </Button>
          <DialogActions>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              onClick={() => {
                if (position) {
                  onPositionAdded(position);
                }
              }}
            >
              CANCEL
            </Button>
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              onClick={() => {
                if (position) {
                  onPositionAdded(position);
                }
              }}
            >
              ADD
            </Button>
          </DialogActions>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AddPositionModal;
