export default async function () {
  if (globalThis.__APP__) {
    await globalThis.__APP__.close();
  }
}
