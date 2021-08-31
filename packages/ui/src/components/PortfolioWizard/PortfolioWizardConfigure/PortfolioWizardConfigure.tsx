import BaggersSelect from '@/components/BaggersSelect/BaggersSelect';
import BaggersTextField from '@/components/BaggersTextField/BaggersTextField';
import useEditPortfolio from '@/hooks/useEditPortfolio';
import useIsMobile from '@/hooks/useIsMobile/useIsMobile';
import { MenuItem, Grid, Typography, Tooltip } from '@material-ui/core';
import { Help } from '@material-ui/icons';

type Props = {
  portfolioId?: string;
};
const PortfolioWizardConfigure: React.FC<Props> = ({ portfolioId }) => {
  const { setCash, setIsPrivate, portfolio } = useEditPortfolio(portfolioId);

  const isMobile = useIsMobile();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="subtitle1">CONFIGURE PORTFOLIO</Typography>
      </Grid>
      <Grid container item xs={12} spacing={4}>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <Typography>
              How much free cash does this portfolio have?{` `}
              <Tooltip title="This is the amount of money not yet invested">
                <Help fontSize="small" />
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <BaggersTextField
              isMonetaryInput
              margin="none"
              variant="outlined"
              fullWidth={isMobile}
              color="secondary"
              loading={!portfolio}
              defaultValue={portfolio?.cash}
              type="number"
              onChange={(event) => setCash(parseInt(event.target.value, 10))}
            />
          </Grid>
        </Grid>
        <Grid container item xs={12} spacing={2}>
          <Grid item xs={12}>
            <Typography>
              Do you want to make this portfolio private?
              <Tooltip title="A private portfolio is only visible to you">
                <Help fontSize="small" />
              </Tooltip>
            </Typography>
          </Grid>
          <Grid item xs={12} md={2}>
            <BaggersSelect
              onChange={(event) => setIsPrivate(!!event.target.value)}
              color="secondary"
              loading={!portfolio}
              defaultValue={portfolio?.private ? 1 : 0}
              variant="outlined"
            >
              <MenuItem value={1}>Yes</MenuItem>
              <MenuItem value={0}>No</MenuItem>
            </BaggersSelect>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default PortfolioWizardConfigure;
