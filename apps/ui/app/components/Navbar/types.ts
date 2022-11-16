export type NavbarOption = {
  key: string;
  label: string;
  to?: string;
  additionalOptions?: NavbarOption[];
};

export type NavbarProps = {
  options: NavbarOption[];
};
export type NavbarLinkProps = {
  option: NavbarOption;
  active?: boolean;
};
