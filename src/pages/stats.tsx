import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import NextLink from "next/link";
import {
  Flex,
  Heading,
  Text,
  VStack,
  Divider,
  IconButton,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import CountUp from "react-countup";
import { GithubCorner, SponsorButton } from "@components";
import { getCountApiUrl } from "@utils";

const Stats: NextPage = () => {
  const [visits, setVisits] = useState<number>(0);
  const [bakes, setBakes] = useState<number>(0);
  const [totalDigits, setTotalDigits] = useState<number>(0);

  useEffect(() => {
    fetch(getCountApiUrl("get", "visits"))
      .then((res) => res.json())
      .then((data) => setVisits(data.value))
      .catch((err) => console.log(err));
    fetch(getCountApiUrl("get", "bakedpi"))
      .then((res) => res.json())
      .then((data) => setBakes(data.value))
      .catch((err) => console.log(err));
    fetch(getCountApiUrl("get", "sumdigits"))
      .then((res) => res.json())
      .then((data) => setTotalDigits(data.value))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <Head>
        <title>🥧 πery | Stats 🥧</title>
        <meta
          name="description"
          content="Fresh baked PI from your browser! - Statistics"
        />
        <meta
          name="theme-color"
          content={useColorMode().colorMode === "dark" ? "#1a202c" : "#fff"}
        />
      </Head>

      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        minH="500px"
      >
        <VStack spacing={4}>
          <Heading>🥧 π-o-Meter 🥧</Heading>
          <Divider />
          <Text fontWeight="bold" fontSize="1.5rem">
            Oven Hits
          </Text>
          <Heading>
            <CountUp
              end={visits}
              separator=","
              duration={2}
              enableScrollSpy={false}
            />
          </Heading>
          <Text fontWeight="bold" fontSize="1.5rem">
            Pi Baked
          </Text>
          <Heading>
            <CountUp
              end={bakes}
              separator=","
              duration={2}
              enableScrollSpy={false}
            />
          </Heading>
          <Text fontWeight="bold" fontSize="1.5rem">
            Total Digits
          </Text>
          <Heading>
            <CountUp
              end={totalDigits}
              separator=","
              duration={2}
              enableScrollSpy={false}
            />
          </Heading>
          <Divider />
          <SponsorButton />
          <Text fontSize="sm">
            Back to{" "}
            <NextLink href="/" passHref>
              <Link color="yellow.500">Home</Link>
            </NextLink>
          </Text>
        </VStack>
      </Flex>
      <GithubCorner />
    </>
  );
};

export default Stats;
