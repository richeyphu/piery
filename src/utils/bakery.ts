export { powBigInt } from "powbigint";
// export function powBigInt(x: bigint, y: bigint): bigint {
//   let z = 1n;
//   for (let i = 0n; i < y; i++) {
//     z *= x;
//   }
//   return z;
// }

export const garnishPi = (pi: string): string => `3.${pi.slice(1)}`;

export const calElapsed = (t1: number, t2: number): string => {
  const elapsed = (t2 - t1) / 1000;
  return elapsed.toFixed(3);
};
