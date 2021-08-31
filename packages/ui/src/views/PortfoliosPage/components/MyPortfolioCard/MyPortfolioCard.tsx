import { Portfolio } from '@/graphql/Queries.document.gql';
import { BasePortfolioCardProps } from '@/views/PortfoliosPage/types';
import {
  Grid,
  makeStyles,
  CardActionArea,
  CardContent,
  CardMedia,
  Card,
  CardHeader,
  Typography,
  Avatar,
} from '@material-ui/core';

type Props = {} & BasePortfolioCardProps;
const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: `200px`,
    minHeight: `200px`,
    display: `flex`,
    flexDirection: `column`,
    justifyContent: `left`,
    alignItems: `start`,
  },
}));
const MyPortfolioCard: React.FC<Props> = ({ portfolio, onOpenPortfolio }) => {
  const classes = useStyles();
  return (
    <Card>
      <CardActionArea
        className={classes.root}
        onClick={() => onOpenPortfolio(portfolio?._id)}
      >
        <CardHeader title={portfolio?.name} />
        <CardMedia image="" />
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            {portfolio?.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
export default MyPortfolioCard;
