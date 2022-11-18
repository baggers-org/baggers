export type AvatarProps = {
  src?: string;
  alt: string;
  fallbackInitials: string;
} & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;
