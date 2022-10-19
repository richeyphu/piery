import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
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
  Progress,
  useColorMode,
} from "@chakra-ui/react";
import { ColorToggle, GithubCorner } from "@components";

const Home: NextPage = () => {
  const [digits, setDigits] = useState<number>(0);
  const [result, setResult] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [timeStart, setTimeStart] = useState<number>(0);
  const [timeEnd, setTimeEnd] = useState<number>(0);

  const handleBake = () => {
    setIsLoading(true);
    setProgress(0);
    setTimeout(() => {
      setTimeStart(Date.now());
      heatOven(digits)
        .then((res) => {
          setResult(res + "");
        })
        .catch((err) => {
          console.error(err);
          setResult("");
        })
        .finally(() => {
          setTimeEnd(Date.now());
          setIsLoading(false);
          setProgress(100);
        });
    }, 50);
    // alert(result);
  };

  const heatOven = async (d: number) => {
    const i = 1n;
    const x = 3n * powBigInt(10n, BigInt(d) + 20n);
    const pi = x;
    return bakePi(i, x, pi);
  };

  const powBigInt = (x: bigint, y: bigint) => {
    let z = 1n;
    for (let i = 0n; i < y; i++) {
      z *= x;
    }
    return z;
  };

  const bakePi = (i: bigint, x: bigint, pi: bigint): string => {
    if (x > 0) {
      for (let j = 0; j < 100; ++j) {
        x = (x * i) / ((i + 1n) * 4n);
        pi += x / (i + 2n);
        i += 2n;
      }

      const pistr16 = pi.toString(16);
      // setResult(x.toString());

      const currentTerms = ((i - 1n) / 2n).toString(10);

      const currentDigit = (
        (pistr16.length - x.toString(16).length) * 1.20412 -
        20
      ).toFixed();
      const currentProgress = (parseInt(currentDigit) / digits) * 100;
      setTimeout(() => setProgress(currentProgress), 10);

      console.log(currentProgress);

      return bakePi(i, x, pi);
    } else {
      // After the last calculation, show in decimal
      const pistr10 = (pi / powBigInt(10n, 20n)).toString(10);
      return pistr10;
    }
  };

  const garnishPi = (res: string) => `3.${res.slice(1)}`;

  const calElapsed = () => {
    const elapsed = (timeEnd - timeStart) / 1000;
    return elapsed.toFixed(3);
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
                if (e.key === "Enter") {
                  handleBake();
                }
              }}
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
            {isLoading ? (
              <Center mt={10}>
                <span className={styles["spin-me"]}>⏳</span>
              </Center>
            ) : (
              result && (
                <Center>
                  <Text mt={1}>⏱ Done in {calElapsed()} s ⏱</Text>
                </Center>
              )
            )}
          </Stack>
          <Spacer />
          {isLoading ? (
            <Center fontSize="9xl" mt={10}>
              <span className={styles["spin-me"]}>🥧</span>
            </Center>
          ) : (
            result && (
              <Text mt={8} fontFamily="mono">
                {garnishPi(result)}
              </Text>
            )
          )}
        </Flex>
      </Container>
      <GithubCorner />
    </>
  );
};

export default Home;
