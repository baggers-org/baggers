module.exports = async function () {
  await globalThis.__MONGOD__.stop();
  await globalThis.__APP__.close();
};
