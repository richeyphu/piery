export function countBake() {
  var xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://api.countapi.xyz/hit/piery-web/bakedpi",
  );
  xhr.send();
}
