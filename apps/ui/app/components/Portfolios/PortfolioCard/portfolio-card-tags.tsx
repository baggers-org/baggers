import { Tag } from '@baggers/ui-components';
import { useTranslation } from 'react-i18next';
import { Link } from 'tabler-icons-react';
import { PortfolioCardProps } from './portfolio-card';

export function PortfolioCardTags({ portfolio }: PortfolioCardProps) {
  const { t } = useTranslation();
  return (
    <div className="px-6 mt-2 flex gap-2">
      <span className="font-semibold">{t('tags', 'Tags')}:</span>
      <span className="flex gap-2 place-items-center flex-wrap">
        <Tag>Dividend</Tag>
        <Tag>Growth</Tag>
        <Tag>Value</Tag>
        <Tag>Tech</Tag>
        <Tag>Consumer</Tag>
        {portfolio?.plaidItem ? (
          <Tag>
            <Link size={16} />
            Linked
          </Tag>
        ) : null}
      </span>
    </div>
  );
}
