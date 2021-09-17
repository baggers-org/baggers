import fetch from 'node-fetch';

const fetchQuotes = async (symbols: string[]) => {
  const quoteData = [];

  const url = `${
    process.env.IEX_BASE_URL
  }stock/market/batch?symbols=${symbols.join(`,`)}&types=quote&token=${
    process.env.IEX_TOKEN
  }`;

  const res = await fetch(url, {
    headers: {
      'Content-Type': `application/json`,
    },
  });

  // TODO: replace SYMBol with id to prevent collisions for same stock names
  if (res.ok) {
    quoteData.push(await res.json());
  } else {
    console.error(await res.text());
  }
  // Flatten quoteData into object
  return quoteData.reduce((finalObject, currentObject) => {
    finalObject = {
      ...finalObject,
      ...currentObject,
    };

    return finalObject;
  }, {});
};

export default fetchQuotes;
