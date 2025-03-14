import { theme as base, extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  ...{
    fonts: {
      heading: `Noto Sans Thai, ${base.fonts?.heading}`,
      body: `Noto Sans Thai, ${base.fonts?.body}`,
    },
  },
});

export default theme;
