export const Box = ({ size, color }: { size: number; color: string }) => {
  return <div style={{ width: size, height: size, backgroundColor: color }} />;
};
