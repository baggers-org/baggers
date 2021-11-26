export const AppBar: React.FC = ({ children }) => {
  if (typeof window === undefined) {
    return <div>unreachable</div>;
  }
  return <div>App bar {children}</div>;
};
