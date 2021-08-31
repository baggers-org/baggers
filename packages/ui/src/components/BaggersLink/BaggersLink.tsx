import {
  Link as MuiLink,
  LinkProps as MuiLinkProps,
  makeStyles,
} from '@material-ui/core';

import Skeleton from 'react-loading-skeleton';
import Link, { LinkProps as NextLinkProps } from 'next/link';

type Props = {
  loading?: boolean;
  href: string;
  nextLinkProps?: NextLinkProps;
} & MuiLinkProps;

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.action.focus,
    fontWeight: `bold`,
  },
}));
const BaggersLink: React.FC<Props> = ({
  loading,
  nextLinkProps,
  href,
  children,
  ...muiProps
}) => {
  const classes = useStyles();
  if (loading) {
    return <Skeleton />;
  }

  return (
    <Link {...nextLinkProps} href={href}>
      <MuiLink href="#" className={classes.root} {...muiProps}>
        {children}
      </MuiLink>
    </Link>
  );
};
export default BaggersLink;
