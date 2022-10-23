import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import NextLink from "next/link";
import styles from "../styles/Home.module.css";
import {
  Container,
  Flex,
  Stack,
  Spacer,
  Text,
  Heading,
  Center,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  Badge,
  Box,
  Progress,
  Link,
  useColorMode,
} from "@chakra-ui/react";
import { ColorToggle, GithubCorner, ScrollToTop } from "@components";
import { countStats, powBigInt, garnishPi, calElapsed } from "@utils";

const Home: NextPage = () => {
  const [digits, setDigits] = useState<number>(0);
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [timeStart, setTimeStart] = useState<number>(0);
  const [timeEnd, setTimeEnd] = useState<number>(0);
  const [currentI, setCurrentI] = useState<bigint>(1n);
  const [currentX, setCurrentX] = useState<bigint>(0n);
  const [currentPi, setCurrentPi] = useState<bigint>(currentX);
  const [currentDigit, setCurrentDigit] = useState<number>(0);

  const handleBake = () => {
    if (digits > 0) {
      setIsLoading(true);
      setProgress(0);
      countStats(digits);
      setTimeout(() => {
        setTimeStart(Date.now());
        setTimeEnd(Date.now());
        heatOven(digits)
          // .then((res) => {
          //   setResult(res + "");
          // })
          .catch((err) => {
            console.error(err);
            // setResult("");
          })
          .finally(() => {
            if (currentDigit === digits || digits === 1) {
              setTimeEnd(Date.now());
              setIsLoading(false);
              setProgress(100);
              setCurrentDigit(0);
            }
          });
      }, 100);
    }
  };

  const heatOven = async (d: number) => {
    const i = 1n;
    const x = 3n * powBigInt(10n, BigInt(d) + 20n);
    const pi = x;
    return bakePi(i, x, pi);
  };

  useEffect(() => {
    if (currentX > 0 && digits > 0) {
      const i = currentI;
      const x = currentX;
      const pi = currentPi;
      bakePi(i, x, pi);
      setTimeEnd(Date.now());
    } else {
      setTimeEnd(Date.now());
      setIsLoading(false);
      setProgress(result ? 100 : 0);
      setCurrentDigit(0);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDigit, currentX]);

  const bakePi = (i: bigint, x: bigint, pi: bigint) => {
    if (x > 0n) {
      for (let j = 0; j < 100; ++j) {
        x = (x * i) / ((i + 1n) * 4n);
        pi += x / (i + 2n);
        i += 2n;
      }

      setCurrentI(i);
      setCurrentX(x);
      setCurrentPi(pi);

      const pistr16 = pi.toString(16);
      const pistr10 = pi.toString(10);
      setResult(pistr10.slice(0, pistr10.length - 20));

      const currentTerms = ((i - 1n) / 2n).toString(10);

      const currentDigit = (
        (pistr16.length - x.toString(16).length) * 1.20412 -
        20
      ).toFixed();
      setCurrentDigit(parseInt(currentDigit));

      const currentProgress = (parseInt(currentDigit) / digits) * 100;
      // setTimeout(() => setProgress(currentProgress), 10);
      setProgress(currentProgress);

      console.log(
        `%: ${currentProgress.toFixed(
          2
        )}, Digit: ${currentDigit}, Terms: ${currentTerms}`
      );

      // return bakePi(i, x, pi);
    } else {
      // After the last calculation, show in decimal
      const pistr10 = (pi / powBigInt(10n, 20n)).toString(10);
      setResult(pistr10);
      setProgress(100);
      // return pistr10;
    }
  };

  return (
    <>
      <Head>
        <title>🥧 πery | Piery 🥧</title>
        <meta name="description" content="Fresh baked PI from your browser!" />
        <meta
          name="theme-color"
          content={useColorMode().colorMode === "dark" ? "#1a202c" : "#fff"}
        />
        <script async src="https://api.countapi.xyz/hit/piery-web/visits" />
      </Head>

      {/* 
      <main className={styles.main}></main> 
      */}

      <Container maxW="3xl">
        <Flex flexDir="column" mt={20} mb={12}>
          <Flex flexDir="column" textAlign="center">
            <Heading mb={3} size="2xl" letterSpacing={2}>
              🥧 πery 🥧
            </Heading>
            <Text mt={2} letterSpacing={1.5} fontWeight="light">
              Fresh baked PI from your browser!
            </Text>
            <Center mt={3}>
              <ColorToggle />
            </Center>
          </Flex>
          <Spacer />
          <Stack mt={10}>
            <NumberInput
              min={0}
              max={1000000}
              step={1}
              // value={digits}
              onChange={(v: string) => setDigits(Number(v))}
              onKeyPress={(e) => {
                if (e.key === "Enter" && digits > 0 && digits <= 1000000) {
                  handleBake();
                }
              }}
              isDisabled={isLoading}
            >
              <NumberInputField placeholder="Enter digits..." />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Spacer />
            <Button
              colorScheme="orange"
              onClick={handleBake}
              isLoading={isLoading}
            >
              ♨️ Bake ♨️
            </Button>
            <Progress value={progress} size="xs" colorScheme="yellow" />
            {result && (
              <Center>
                <Text mt={1}>
                  {isLoading
                    ? `⏳ Baking: ${calElapsed(timeStart, timeEnd)} s ⏳`
                    : `✨ Done in ${calElapsed(timeStart, timeEnd)} s ✨`}
                </Text>
              </Center>
            )}
          </Stack>
          <Spacer />
          {result && (
            <>
              <Text mt={8} fontFamily="mono">
                {garnishPi(result)}
              </Text>
              <Center mt={6}>
                <ScrollToTop />
              </Center>
            </>
          )}
          <Center mt={10}>
            <Text fontSize="sm" color="gray.500">
              Try{" "}
              <NextLink href="/lite" passHref>
                <Link color="yellow.500">πery Lite</Link>
              </NextLink>
              !
            </Text>
          </Center>
        </Flex>
      </Container>
      <GithubCorner />
    </>
  );
};

export default Home;
