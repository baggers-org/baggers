export type AvatarProps = {
  src?: string;
  alt: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'normal' | 'outlined';
  fallbackInitials: string;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;
