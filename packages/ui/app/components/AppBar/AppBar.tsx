import {
  AppBar as MuiAppBar,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useLocation, useNavigate } from '@remix-run/react';
import { useActiveTab } from '~/hooks';
import Logo from '../../../public/svg/logo_white_small.svg';
import { ProfileButton } from '../ProfileButton';
import { MobileMenu } from './components/MobileMenu';
import { useMenuOptions } from './useMenuOptions';

export const AppBar = () => {
  const options = useMenuOptions();
  const tab = useActiveTab();
  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <MuiAppBar
      sx={{
        background: pathname === `/` ? `transparent` : undefined,
        position: pathname === `/` ? `absolute` : undefined,
      }}
    >
      <Toolbar>
        <Box
          flexGrow={1}
          justifyContent="start"
          display={{ xs: `flex`, md: `none` }}
        >
          <MobileMenu />
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent={{ xs: `center`, md: `start` }}
          flexGrow={1}
        >
          <Logo />
          <Typography fontFamily="Archivo Black" fontSize="24px" ml={1}>
            BAGGERS
          </Typography>
        </Box>
        <Box display={{ xs: `none`, md: `flex` }}>
          <ToggleButtonGroup
            exclusive
            value={tab}
            color={theme.palette.mode === `dark` ? `primary` : undefined}
            sx={{
              border: `none`,
              '.MuiToggleButtonGroup-grouped:not(:last-of-type)': {
                borderTopRightRadius: 3,
                borderBottomRightRadius: 3,
              },
              '.MuiToggleButtonGroup-grouped:last-of-type': {
                borderTopLeftRadius: 3,
                borderBottomLeftRadius: 3,
              },

              '.MuiToggleButton-root': {
                borderRadius: `3 !important`,
                border: `none`,
                mr: 2,
              },
            }}
          >
            {options.map((option) => (
              <ToggleButton
                value={option.value}
                onClick={() => navigate(option.href)}
                sx={
                  theme.palette.mode === `light`
                    ? {
                        color: `#fafafa`,
                        '&.Mui-selected': {
                          color: `#fafafa`,
                          backgroundColor: `rgba(240,240,240,0.2)`,
                        },
                      }
                    : undefined
                }
              >
                {option.label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
        <Box flexGrow={1} display="flex" justifyContent="end">
          <ProfileButton />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};
