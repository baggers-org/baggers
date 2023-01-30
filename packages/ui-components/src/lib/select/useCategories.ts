import { useMemo } from 'react';
import { OptionWithCategories, SelectOption } from './select.props';

export function useCategories(options: SelectOption[]) {
  const categories = options
    .map((o) => o?.category)
    ?.filter((option, i, all) => option && all.indexOf(option) === i);

  const optionsWithCategories: OptionWithCategories[] | null =
    useMemo(() => {
      if (categories.length) {
        return categories
          .filter((c): c is string => !!c)
          .map((category) => ({
            category: category,
            options:
              options.filter((o) => o.category === category) || [],
          }));
      }

      return null;
    }, [categories, options]);

  return optionsWithCategories;
}
