import GithubCorner from "react-github-corner";
import { Box, useColorMode } from "@chakra-ui/react";

type Props = {};

const _GithubCorner = (props: Props) => {
  return (
    <Box pos="fixed" top={0} right={0}>
      <GithubCorner
        href="https://github.com/richeyphu/piery"
        octoColor={useColorMode().colorMode === "dark" ? "#151513" : "#fff"}
        bannerColor={useColorMode().colorMode === "dark" ? "#fff" : "#151513"}
      />
    </Box>
  );
};

export default _GithubCorner;
