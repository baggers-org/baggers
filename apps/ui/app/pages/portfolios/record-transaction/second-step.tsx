import { Step } from '@baggers/ui-components';

export type SecondStepProps = {
  title: string;
  subtitle: string;
};
export function SecondStep({ title, subtitle }: SecondStepProps) {
  return <Step title={title} number={2} active subtitle={subtitle} />;
}
