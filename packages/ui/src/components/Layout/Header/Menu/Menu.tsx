import MenuIcon from '@material-ui/icons/Menu';
import FolderIcon from '@material-ui/icons/Folder';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import {
  AppBar,
  makeStyles,
  Toolbar,
  Button,
  Collapse,
  Drawer,
  Link as MaterialLink,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Grow,
  Typography,
} from '@material-ui/core';

import FolderSharedIcon from '@material-ui/icons/FolderShared';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import { useState, useEffect } from 'react';
import { Create, ExpandLess, ExpandMore, MenuOpen } from '@material-ui/icons';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import theme from '@/styles/theme';
import Link from 'next/link';
import {
  Portfolio,
  useMyPortfoliosSummaryLazyQuery,
  useMyPortfoliosSummaryQuery,
} from '@/graphql/Queries.document.gql';
import useCurrentUser from '@/hooks/useCurrentUser/useCurrentUser';
import Logo from '../../../../../public/Logo/Logo Beta.svg';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const drawerWidth = 240;
const YEAR = new Date().getFullYear();

const useStyles = makeStyles(() => ({
  root: {
    display: `flex`,
  },
  appBar: {
    background: theme.palette.primary.main,
    verticalAlign: `center`,
    justifyContent: `center`,
    minHeight: `59px`,

    zIndex: theme.zIndex.drawer + 1,
  },

  logo: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,

    background: theme.palette.background.paper,
  },
  drawerHeader: {
    display: `flex`,

    alignItems: `center`,
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    minHeight: `59px`,
    justifyContent: `flex-end`,
  },
  drawerContainer: {
    overflowY: `auto`,
    overflowX: `hidden`,
    flexGrow: 2,
  },
  drawerFooter: {
    display: `flex`,
    flexDirection: `column`,
    justifyItems: `center`,
    alignContent: `center`,
    textAlign: `center`,
    alignItems: `center`,
    padding: theme.spacing(2),
  },
  content: {
    flexGrow: 1,
    marginTop: `5rem`,
    transition: theme.transitions.create(`margin`, {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  profile: {
    justifySelf: `right`,
  },
  contentShift: {
    transition: theme.transitions.create(`margin`, {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  list: {
    width: `250px`,
  },
  nested: {
    paddingLeft: `${theme.spacing(4)}px`,
  },
}));

const Menu: React.FC = ({ children }) => {
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isPortfoliosMenuExpanded, setIsPortfolioMenusExpanded] = useState(
    false,
  );
  const classes = useStyles();

  const user = useCurrentUser();
  // TODO: remove cache-and-network and modify cache when a porfolio is added instead
  const [fetchPortfolios, { data }] = useMyPortfoliosSummaryLazyQuery({
    fetchPolicy: `cache-and-network`,
  });

  const portfolios = data?.myPortfolios as Portfolio[];

  useEffect(() => {
    if (isMenuDrawerOpen) {
      fetchPortfolios();
    }
  }, [isMenuDrawerOpen, fetchPortfolios]);

  const { push } = useRouter();

  return (
    <div className={classes.root}>
      <AppBar className={clsx(classes.appBar)}>
        <Toolbar variant="dense">
          {user ? (
            <IconButton
              onClick={() => setIsMenuDrawerOpen((t) => !t)}
              className={clsx(classes.menuButton)}
            >
              {!isMenuDrawerOpen ? (
                <MenuIcon style={{ color: `white` }} fontSize="large" />
              ) : (
                <MenuOpen style={{ color: `white` }} fontSize="large" />
              )}
            </IconButton>
          ) : null}
          <div className={clsx(classes.logo)}>
            <Logo />
          </div>
          {user ? (
            <ProfileMenu />
          ) : (
            <Button color="secondary" onClick={() => push(`/signup`)}>
              Sign up
            </Button>
          )}
        </Toolbar>
      </AppBar>
      {user ? (
        <Drawer
          anchor="left"
          className={classes.drawer}
          variant="persistent"
          open={isMenuDrawerOpen}
          classes={{ paper: classes.drawerPaper }}
        >
          <Toolbar />
          <div className={classes.drawerContainer}>
            <List className={classes.list}>
              <ListItem button>
                <ListItemIcon>
                  <InsertChartIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem
                button
                onClick={() => setIsPortfolioMenusExpanded((p) => !p)}
              >
                <ListItemIcon>
                  <FolderSharedIcon />
                </ListItemIcon>
                <ListItemText primary="My Portfolios" />
                {isPortfoliosMenuExpanded ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={isPortfoliosMenuExpanded}>
                <List disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <TrendingUpIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary="Overview"
                      onClick={() => push(`/portfolios`)}
                    />
                  </ListItem>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <Create />
                    </ListItemIcon>
                    <ListItemText
                      primary="Create New"
                      onClick={() => push(`/portfolios/create/1`)}
                    />
                  </ListItem>
                  {portfolios?.map(({ _id, name }) => (
                    <ListItem button className={classes.nested}>
                      <ListItemIcon>
                        <FolderIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={name}
                        onClick={() => push(`/portfolios/${_id}`)}
                      />
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </List>
          </div>

          <Divider />
          <div className={classes.drawerFooter}>
            <Typography variant="body2" color="textSecondary">
              Version: <Link href="/changelog">0.2.1</Link>
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              style={{ fontSize: `9px` }}
            >
              Last deployed at {process.env.NEXT_PUBLIC_BUILD_TIME}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              &copy; {YEAR} Baggers Ltd.
            </Typography>
          </div>
        </Drawer>
      ) : null}
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: isMenuDrawerOpen,
        })}
      >
        {children}
      </main>
    </div>
  );
};

export default Menu;
