import * as React from 'react';
import {
  AppBar as MuiAppBar,
  Toolbar,
  IconButton,
  Button,
  makeStyles,
} from '@material-ui/core';
import { MenuOpen, Menu } from '@material-ui/icons';
import clsx from 'clsx';
import useCurrentUser from '@/hooks/useCurrentUser/useCurrentUser';
import { useRouter } from 'next/router';
import GlobalSearch from '../GlobalSearch';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import Logo from '../../../../../public/Logo/Logo Mono Small.svg';

export type AppBarProps = {
  onClickMenuHamburger: () => void;
  isMenuDrawerOpen: boolean;
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    background: theme.palette.primary.main,
    verticalAlign: `center`,
    justifyContent: `center`,
    minHeight: `59px`,

    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  logo: {
    display: `flex`,
    justifyItems: `center`,
    flexGrow: 1,
  },
  search: {
    flexGrow: 1,
  },
}));
const AppBar: React.FC<AppBarProps> = ({
  onClickMenuHamburger,
  isMenuDrawerOpen,
}) => {
  const user = useCurrentUser();
  const { push } = useRouter();

  const classes = useStyles();

  return (
    <MuiAppBar className={clsx(classes.appBar)}>
      <Toolbar variant="dense">
        {user ? (
          <IconButton
            onClick={onClickMenuHamburger}
            className={clsx(classes.menuButton)}
          >
            {!isMenuDrawerOpen ? (
              <Menu style={{ color: `white` }} fontSize="large" />
            ) : (
              <MenuOpen style={{ color: `white` }} fontSize="large" />
            )}
          </IconButton>
        ) : null}
        <div className={clsx(classes.logo)}>
          <Logo />
        </div>
        <div className={clsx(classes.search)}>
          <GlobalSearch />
        </div>
        {user ? (
          <ProfileMenu />
        ) : (
          <Button color="secondary" onClick={() => push(`/signup`)}>
            Sign up
          </Button>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};
export default AppBar;
