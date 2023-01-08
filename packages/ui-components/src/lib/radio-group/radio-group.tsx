import { RadioGroup as Rg } from '@headlessui/react';
import { RadioGroupProps } from './radio-group.props';
export function RadioGroup(props: RadioGroupProps) {
  return (
    <Rg {...props} className="flex place-content-center gap-8">
      <Rg.Label>{props.label}</Rg.Label>
      {props.options.map((option) => (
        <Rg.Option value={option.id} key={option.id}>
          {option.renderOption}
        </Rg.Option>
      ))}
    </Rg>
  );
}
