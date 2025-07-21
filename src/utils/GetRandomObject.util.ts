/**
 * 配列からランダムに1つのオブジェクトを取得する
 * @param array オブジェクトの配列
 * @returns ランダムに選択されたオブジェクト、配列が空の場合はundefined
 */
export function GetRandomObject<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }

  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}
