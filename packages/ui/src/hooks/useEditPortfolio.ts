import {
  useAddPositionMutation,
  useUpdatePortfolioMutation,
  useRemovePositionMutation,
  useRemovePositionsMutation,
  useCreatePortfolioMutation,
} from '@/graphql/Mutations.document.gql';
import {
  Portfolio,
  Position,
  useGetPortfolioByIdLazyQuery,
} from '@/graphql/Queries.document.gql';
import { useRouter } from 'next/router';

import { useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce/lib';
import { v4 as uuid } from 'uuid';
import { useNotifications } from '@/hooks';

export const useEditPortfolio = (portfolioId?: string) => {
  const [updatePortfolioMutation] = useUpdatePortfolioMutation();
  const [addPositionMutation] = useAddPositionMutation();
  const [removePositionMutation] = useRemovePositionMutation();
  const [removePositionsMutation] = useRemovePositionsMutation();
  const [createPortfolioMutation] = useCreatePortfolioMutation();

  const { sendNotification } = useNotifications();

  // Fetch the profile using a cache-first approach, as it will be unlikely that the profile is not already in the cache
  const [getPortfolio, { data, loading }] = useGetPortfolioByIdLazyQuery({
    fetchPolicy: `cache-first`,
    returnPartialData: true,
  });

  useEffect(() => {
    if (portfolioId) {
      getPortfolio({
        variables: {
          id: portfolioId,
        },
      });
    }
  }, [portfolioId, getPortfolio]);

  const portfolio = data?.getPortfolioById as Portfolio;

  const { push, asPath } = useRouter();
  const createPortfolio = async () => {
    const { data: createPortfolioData } = await createPortfolioMutation({
      variables: {
        record: {},
      },
    });
    const id = createPortfolioData?.createPortfolio?.record?._id;
    push(`${asPath}?id=${id}`);
  };
  const addPosition = async (position: Position) => {
    if (!position) {
      return;
    }
    if (!position.symbol?._id) {
      return;
    }
    if (!position.numberOfShares) {
      return;
    }
    if (!position.averagePrice) {
      return;
    }

    addPositionMutation({
      variables: {
        record: {
          portfolio: portfolioId,
          symbol: position.symbol?._id,
          numberOfShares: position.numberOfShares,
          averagePrice: position.averagePrice,
        },
      },
      optimisticResponse: {
        addPosition: {
          record: {
            ...position,
            _id: uuid(),
            __typename: `Position`,
          },
        },
      },

      update: (cache, result) => {
        if (result.errors) {
          sendNotification({
            type: `error`,
            message: `An error ocurred whilst adding the position`,
          });
        }
        const addedPosition = result.data?.addPosition?.record;

        cache.modify({
          id: cache.identify(portfolio),
          fields: {
            positions(existingPositions) {
              if (addedPosition) {
                const positionRef = { __ref: cache.identify(addedPosition) };

                if (existingPositions?.items) {
                  return {
                    ...existingPositions,
                    items: [...existingPositions.items, positionRef],
                  };
                }
                return { items: [positionRef] };
              }

              return existingPositions;
            },
          },
        });
      },
    });
  };

  const removePosition = (id: string) => {
    removePositionMutation({
      variables: {
        id,
      },
    });
  };

  const removePositions = (ids: string[]) => {
    removePositionsMutation({
      variables: {
        ids,
      },
      optimisticResponse: {
        removePositions: {
          numAffected: ids.length,
        },
      },
      update: (cache) => {
        cache.modify({
          id: cache.identify(portfolio),
          fields: {
            positions(existingPosRefs, { readField }) {
              return existingPosRefs.items.filter((r: any) => {
                const id = readField(`_id`, r) as string;
                if (id) {
                  return !ids.includes(id);
                }
                return true;
              });
            },
          },
        });
      },
    });
  };

  const setDescription = (d: string) => {
    updatePortfolioMutation({
      variables: {
        id: portfolioId,
        record: {
          description: d,
        },
      },
    });
  };

  const setIsPrivate = (isPrivate: boolean) => {
    updatePortfolioMutation({
      variables: {
        id: portfolioId,
        record: {
          private: isPrivate,
        },
      },
    });
  };

  const setName = (n: string) => {
    updatePortfolioMutation({
      variables: {
        id: portfolioId,
        record: {
          name: n,
        },
      },
      optimisticResponse: {
        updatePortfolio: {
          record: {
            _id: `test`,
            name: n,
          },
        },
      },
    });
  };

  const setCash = (cash: number) => {
    updatePortfolioMutation({
      variables: {
        id: portfolioId,
        record: {
          cash,
        },
      },
    });
  };

  return {
    createPortfolio,
    portfolio:
      portfolio && Object.keys(portfolio).length > 0 ? portfolio : undefined,
    loadingPortfolio: loading,
    setName: useDebouncedCallback(setName, 500),
    setDescription: useDebouncedCallback(setDescription, 500),
    setIsPrivate,
    setCash: useDebouncedCallback(setCash, 500),
    addPosition,
    removePosition,
    removePositions,
  };
};
