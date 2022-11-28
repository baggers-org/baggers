export type AvatarProps = {
  src?: string;
  alt: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  fallbackInitials: string;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;
