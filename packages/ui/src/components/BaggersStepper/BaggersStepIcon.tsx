import theme from '@/styles/theme';
import { makeStyles } from '@material-ui/core';
import { CheckCircle as Check } from '@material-ui/icons';
import clsx from 'clsx';

const useBaggersStepIconStyles = makeStyles({
  root: {
    color: `#eaeaf0`,
    display: `flex`,
    height: 22,
    alignItems: `center`,
  },
  active: {
    color: `${theme.palette.secondary.main}`,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: `50%`,
    backgroundColor: `currentColor`,
  },
  completed: {
    color: `${theme.palette.secondary.main}`,
    zIndex: 1,
    fontSize: 18,
  },
});

type Props = {
  active?: boolean;
  completed?: boolean;
};
const BaggersStepIcon: React.FC<Props> = ({ active, completed }) => {
  const classes = useBaggersStepIconStyles();

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
      })}
    >
      {completed ? (
        <Check className={classes.completed} />
      ) : (
        <div className={classes.circle} />
      )}
    </div>
  );
};

export default BaggersStepIcon;
