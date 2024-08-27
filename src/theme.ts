import { createTheme } from "@mantine/core";

const theme = createTheme({
  primaryColor: 'green',
  primaryShade: 6,
  defaultGradient: {
    from: 'green',
    to: 'cyan',
  }
});

export default theme;
