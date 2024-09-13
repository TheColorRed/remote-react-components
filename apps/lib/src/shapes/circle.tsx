import { createWidget } from '@ecp/rtc/remote';

export const Circle = createWidget(({ radius, color }: { radius: number; color: string }) => {
  return <div style={{ width: radius * 2, height: radius * 2, borderRadius: '50%', backgroundColor: color }} />;
});
