import {
  useAddPositionMutation,
  useUpdatePortfolioMutation,
  useRemovePositionMutation,
  useRemovePositionsMutation,
  useCreatePortfolioMutation,
  useRemovePortfolioMutation,
} from '@/graphql/Mutations.document.gql';
import { MutationAddPositionArgs } from '@/graphql/Queries.document.gql';
import { useRouter } from 'next/router';

import { v4 as uuid } from 'uuid';
import { useNotifications } from '@/hooks';

export const useEditPortfolio = (portfolioId?: string) => {
  const [updatePortfolioMutation] = useUpdatePortfolioMutation();
  const [addPositionMutation] = useAddPositionMutation();
  const [removePositionMutation] = useRemovePositionMutation();
  const [removePositionsMutation] = useRemovePositionsMutation();
  const [createPortfolioMutation] = useCreatePortfolioMutation();

  const [removePortfolioMutation] = useRemovePortfolioMutation();

  const { sendNotification } = useNotifications();

  const { push } = useRouter();
  const createPortfolio = async () => {
    const { data: createPortfolioData } = await createPortfolioMutation({
      variables: {
        record: {
          name: ``,
          description: ``,
        },
      },
    });
    const id = createPortfolioData?.createPortfolio?.record?._id;
    push(`/portfolios/${id}/positions`);
  };

  const removePortfolio = async () => {
    removePortfolioMutation({
      variables: {
        id: portfolioId,
      },
      optimisticResponse: {
        removePortfolio: {
          recordId: portfolioId,
          error: null,
        },
      },
      update: (cache) => {
        cache.evict({
          id: `Portfolio:${portfolioId}`,
        });
      },
    });
    push(`/portfolios/created`);
  };
  const addPosition = async (
    position: Omit<MutationAddPositionArgs['record'], 'portfolio'>,
  ) => {
    addPositionMutation({
      variables: {
        record: {
          portfolio: portfolioId,
          symbol: position.symbol?._id,
          positionSize: position.positionSize,
          averagePrice: position.averagePrice,
          direction: position.direction,
          openDate: position.openDate,
          closeDate: position.closeDate,
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
        if (!addedPosition) return;

        cache.modify({
          id: `Portfolio:${portfolioId}`,
          fields: {
            totalValue: (oldVal) => oldVal + addedPosition.marketValue,
            numberOfPositions: (oldVal) => {
              return oldVal + 1;
            },
          },
          broadcast: true,
        });

        cache.modify({
          fields: {
            getPositions: (previous, { toReference }) => {
              return {
                ...previous,
                items: [...(previous?.items || []), toReference(addedPosition)],
              };
            },
          },
          broadcast: false,
        });
      },
    });
  };

  const removePosition = (id: string) => {
    removePositionMutation({
      variables: {
        id,
      },

      optimisticResponse: {
        removePosition: {
          recordId: id,
          record: {
            _id: id,
            __typename: `Position`,
          },
          error: null,
        },
      },

      update: (cache) => {
        cache.modify({
          id: `Portfolio:${portfolioId}`,
          fields: {
            totalValue: (oldVal, { toReference, readField }) => {
              const marketValue = readField({
                from: toReference(`Position:${id}`),
                fieldName: `marketValue`,
              }) as number;

              if (!marketValue) {
                return oldVal;
              }

              return oldVal - marketValue;
            },
            numberOfPositions: (oldVal) => oldVal - 1,
          },
        });
        cache.evict({
          id: `Position:${id}`,
        });
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
          __typename: `RemoveManyPositionPayload`,
          numAffected: ids.length,
        },
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

      optimisticResponse: {
        updatePortfolio: {
          record: {
            _id: portfolioId,
            description: d,
            __typename: `Portfolio`,
          },
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
            _id: portfolioId,
            name: n,
            __typename: `Portfolio`,
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
    removePortfolio,
    setName,
    setDescription,
    setIsPrivate,
    setCash,
    addPosition,
    removePosition,
    removePositions,
  };
};
