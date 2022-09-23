import { Grid } from '@mui/material';
import { Form } from '@remix-run/react';
import React, { useState } from 'react';
import { PortfolioSummary } from '@baggers/graphql-types';
import { PortfolioCard } from '../PortfolioCard/PortfolioCard';
import { PortfolioCardToolbar } from '../PortfolioCardToolbar';

export type PortfolioCardListProps = {
  portfolios: PortfolioSummary[];
};
export const PortfolioCardList: React.FC<PortfolioCardListProps> = ({
  portfolios,
}) => {
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  return (
    <Form method="post">
      <PortfolioCardToolbar
        onToggleSelectMode={() => setIsSelectMode((p) => !p)}
        isSelectMode={isSelectMode}
        disableSelectMode={!portfolios?.length}
        selectedIds={selectedIds}
        onSelectAll={() => setSelectedIds(() => portfolios.map((p) => p._id))}
        onDeselectAll={() => setSelectedIds([])}
      />
      <Grid container spacing={3} ml="-24px !important" mt="0 !important">
        {portfolios?.map((portfolio) => (
          <Grid item xs={12} sm={6} lg={4} xl={3} key={portfolio._id}>
            <PortfolioCard
              portfolio={portfolio}
              isSelectable={isSelectMode}
              selected={selectedIds.includes(portfolio._id)}
              onSelect={(id) =>
                setSelectedIds((p) => {
                  if (p.includes(id)) {
                    return p.filter((v) => v !== id);
                  }
                  return [...p, id];
                })
              }
            />
          </Grid>
        ))}
      </Grid>
    </Form>
  );
};
