export default function getRandomValue (x,y) {
  const randomNum = Math.random();
  return randomNum > 0.5 ? x : y || randomNum< 0.5 ? y : x;
};