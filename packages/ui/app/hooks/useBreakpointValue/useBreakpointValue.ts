import { Breakpoint, useMediaQuery, useTheme } from "@mui/material";

export const useBreakpointValue = <TValue>(values: {
  [key in Breakpoint]?: TValue;
}) => {
  const theme = useTheme();
  const matches = {
    xs: useMediaQuery(theme.breakpoints.up(`xs`)),
    sm: useMediaQuery(theme.breakpoints.up(`sm`)),
    md: useMediaQuery(theme.breakpoints.up(`md`)),
    lg: useMediaQuery(theme.breakpoints.up(`lg`)),
    xl: useMediaQuery(theme.breakpoints.up(`xl`)),
  };

  const validBreakpoints = Object.entries(matches)
    .filter(
      ([breakpoint, isMatch]) =>
        Object.keys(values).includes(breakpoint) && isMatch
    )
    .map(([key]) => key);

  const largestBreakpoint = validBreakpoints.pop();

  return values[largestBreakpoint];
};
