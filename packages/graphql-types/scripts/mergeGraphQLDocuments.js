const { readFileSync, writeFileSync } = require(`fs`);
const { join } = require('path');
const glob = require(`glob`);
const { promisify } = require(`util`);

const g = promisify(glob);

const mergeDocs = async () => {
  const docs = await g(join(__dirname, `../src/graphql/**/*.gql`));

  let combinedContents = ``;
  docs.forEach((path) => {
    const docContents = readFileSync(path, `utf-8`);
    combinedContents += `\n\n${docContents}`;
  });

  const outPath = join(__dirname, `../src/graphql.document.gql`);

  writeFileSync(outPath, combinedContents, {
    encoding: `utf-8`,
  });
};

(async () => {
  await mergeDocs();
})();
