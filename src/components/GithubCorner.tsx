import GithubCorner from "react-github-corner";
import { Box } from "@chakra-ui/react";

type Props = {};

const _GithubCorner = (props: Props) => {
  return (
    <Box pos="fixed" top={0} right={0}>
      <GithubCorner href="https://github.com/richeyphu/piery" />
    </Box>
  );
};

export default _GithubCorner;
