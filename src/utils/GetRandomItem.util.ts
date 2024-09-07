export const GetRandomItem = (arr: string[] | number[]) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};
