import { RadioGroup } from '@headlessui/react';
import { PortfolioType as Pt } from '@baggers/graphql-types';
import { PortfolioTypeCard } from './portfolio-type-card';
import { useState } from 'react';
import { Theme, useTheme } from '~/components/theme';

export function PortfolioType() {
  const [selected, setSelected] = useState();
  const [theme] = useTheme();
  return (
    <section>
      <RadioGroup
        className="grid grid-cols-1 gap-4 lg:grid-cols-3"
        name="portfolioType"
        onChange={setSelected}
      >
        <PortfolioTypeCard
          selected={selected}
          name="Holdings"
          description={`Simplest kind of portfolio - add investment holdings directly without including any date/time information`}
          value={Pt.Holdings}
          iconUrl={
            theme === Theme.DARK
              ? '/svg/holdings-portfolio-dark.svg'
              : '/svg/holdings-portfolio-light.svg'
          }
        />
        <PortfolioTypeCard
          selected={selected}
          name="Transactions"
          value={Pt.Transactions}
          description={`More complex, but allows for a better analysis. Input investment transactions and include date/time information. `}
          iconUrl={
            theme === Theme.DARK
              ? '/svg/transactions-portfolio-dark.svg'
              : '/svg/transactions-portfolio-light.svg'
          }
        />
        <PortfolioTypeCard
          selected={selected}
          name="Simulated"
          description="Start with $50,000 in a paper trading portfolio and hone your skills as the market advances."
          value={Pt.Simulated}
          iconUrl={
            theme === Theme.DARK
              ? '/svg/simulated-portfolio-dark.svg'
              : '/svg/simulated-portfolio-light.svg'
          }
        />
      </RadioGroup>
    </section>
  );
}
