import {
  useTheme,
  darken,
  List,
  ListItemButton,
  Avatar,
  lighten,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import { useLocation, useNavigate } from '@remix-run/react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSubMenu } from './useSubMenu';

export const SubSidebar = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const subMenu = useSubMenu();

  const { pathname } = useLocation();

  return (
    <AnimatePresence>
      {subMenu?.options.length ? (
        <motion.div
          style={{
            width: 220,
            background:
              theme.palette.mode === 'light'
                ? darken(theme.palette.background.paper, 0.02)
                : '#1e1e1e',
            boxShadow: theme.shadows[1],
          }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Box position="fixed" width={220}>
            <Typography variant="h5" textAlign="center" sx={{ mt: 2, mb: 1 }}>
              {subMenu?.title}
            </Typography>
            <List sx={{ width: '100%' }}>
              {subMenu?.options.map((option) =>
                option.href ? (
                  <ListItemButton
                    selected={pathname.includes(option.href)}
                    onClick={() => navigate(option.href || '')}
                    sx={{ mt: 0 }}
                  >
                    <Avatar
                      variant="rounded"
                      sx={{
                        width: 28,
                        height: 28,

                        color: theme.palette.primary.dark,
                        bgcolor: lighten(theme.palette.primary.light, 0.5),
                      }}
                    >
                      {option.icon}
                    </Avatar>
                    <motion.li style={{ marginLeft: 16, padding: 4 }}>
                      {option.label}
                    </motion.li>
                  </ListItemButton>
                ) : (
                  <Divider sx={{ my: 2 }} />
                )
              )}
            </List>
          </Box>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
