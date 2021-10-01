import MenuIcon from '@material-ui/icons/Menu';
import FolderIcon from '@material-ui/icons/Folder';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import SearchIcon from '@material-ui/icons/SearchOutlined';
import {
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
  InputBase,
} from '@material-ui/core';

import FolderSharedIcon from '@material-ui/icons/FolderShared';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import { useState, useEffect } from 'react';
import { Create, ExpandLess, ExpandMore, MenuOpen } from '@material-ui/icons';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Link from 'next/link';
import {
  Portfolio,
  useMyPortfoliosSummaryLazyQuery,
} from '@/graphql/Queries.document.gql';
import useCurrentUser from '@/hooks/useCurrentUser/useCurrentUser';
import BaggersTextField from '@/components/BaggersTextField/BaggersTextField';
import { styled } from '@material-ui/styles';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import GlobalSearch from '../GlobalSearch';
import AppBar from '../AppBar';

const drawerWidth = 240;
const YEAR = new Date().getFullYear();

const useStyles = makeStyles((theme) => ({
  root: {
    display: `flex`,
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
      <AppBar
        isMenuDrawerOpen={isMenuDrawerOpen}
        onClickMenuHamburger={() => setIsMenuDrawerOpen((o) => !o)}
      />

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
            <Typography variant="body2" color="textPrimary">
              Version:{` `}
              {process.env.NEXT_PUBLIC_BUILD_VERSION}
              {` `}({process.env.NEXT_PUBLIC_BUILD_ALIAS})
            </Typography>
            <Typography variant="body3" color="textSecondary">
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
