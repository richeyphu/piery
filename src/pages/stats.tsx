import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Flex,
  Heading,
  Text,
  VStack,
  Divider,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import CountUp from "react-countup";
import { InfoIcon } from "@chakra-ui/icons";

const Stats: NextPage = () => {
  const [visits, setVisits] = useState<number>(0);
  const [searches, setBakes] = useState<number>(0);

  const router = useRouter();

  useEffect(() => {
    fetch("https://api.countapi.xyz/get/piery-web/visits")
      .then((res) => res.json())
      .then((data) => setVisits(data.value))
      .catch((err) => console.log(err));
    fetch("https://api.countapi.xyz/get/piery-web/bakedpi")
      .then((res) => res.json())
      .then((data) => setBakes(data.value))
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

      <Flex height="100vh" alignItems="center" justifyContent="center">
        <VStack spacing={4}>
          <Heading>🥧π-o-Meter🥧</Heading>
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
              end={searches}
              separator=","
              duration={2}
              enableScrollSpy={false}
            />
          </Heading>
          <Divider />
          <IconButton
            aria-label="Home"
            icon={<InfoIcon />}
            onClick={() => router.push("/")}
            variant="ghost"
          />
        </VStack>
      </Flex>
    </>
  );
};

export default Stats;
