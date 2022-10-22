const getCountApi = (key: string): string => {
  return `https://api.countapi.xyz/hit/piery-web/${key}`;
};

export function countBake(): void {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", getCountApi("bakedpi"));
  xhr.send();
}
