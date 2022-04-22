export async function sleep(mil: number) {
  return await new Promise((resolve) => setTimeout(resolve, mil))
}
