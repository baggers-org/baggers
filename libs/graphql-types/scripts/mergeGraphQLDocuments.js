const {
  readFileSync,
  writeFileSync,
  writeFile
} = require(`fs`);

const glob = require(`glob`);
const {
  promisify
} = require(`util`);
const path = require(`path`);

const g = promisify(glob);

const mergeDocs = async () => {
  const docs = await g(`libs/graphql-types/src/graphql/**/*.gql`);

  let combinedContents = ``;
  docs.forEach((path) => {
    const docContents = readFileSync(path, `utf-8`);
    combinedContents += `\n\n${docContents}`;
  });

  const outPath = path.join(__dirname, `../src/graphql.document.gql`);

  writeFileSync(outPath, combinedContents, {
    encoding: `utf-8`
  });
};

(async () => {
  await mergeDocs();
})();
