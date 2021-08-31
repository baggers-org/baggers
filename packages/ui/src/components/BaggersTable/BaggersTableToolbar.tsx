import {
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  makeStyles,
  lighten,
} from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import clsx from 'clsx';
import { TableConfig } from './BaggersTableTypes';

type Props<ObjectType> = {
  onDelete: () => void;
  numSelected: number;
} & TableConfig<ObjectType>;
const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === `light`
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.9),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: `1 1 100%`,
  },
}));

function BaggersTableToolbar<ObjectType>({
  numSelected,
  onDelete,
  tableTitle,
}: Props<ObjectType>) {
  const classes = useToolbarStyles();

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography color="textPrimary" variant="subtitle1">
          {tableTitle?.toUpperCase()}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Close">
          <IconButton aria-label="delete" onClick={onDelete}>
            <DeleteOutline />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
}

export default BaggersTableToolbar;
