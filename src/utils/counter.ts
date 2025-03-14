export function getCountApiUrl(method: string, key: string): string {
  return `https://api.countapi.xyz/${method}/piery-web/${key}`;
}

export function countBake(): void {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", getCountApiUrl("hit", "bakedpi"));
  xhr.send();
}

export function countDigit(amount: number): void {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    getCountApiUrl("update", `sumdigits?amount=${String(amount)}`)
  );
  xhr.send();
}

export function countStats(amount: number): void {
  countBake();
  countDigit(amount);
}
