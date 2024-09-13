import { createWidget } from '@ecp/rtc/remote';

export const Box = createWidget(({ size, color }: { size: number; color: string }) => {
  return <div style={{ width: size, height: size, backgroundColor: color }} />;
});
