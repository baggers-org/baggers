const { createGraphQLSchema } = require('../build/db/createGraphQLSchema');

(async () => {
  console.log(await createGraphQLSchema());
})();
