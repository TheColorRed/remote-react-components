import { AppLoader } from './runtime-loader';

export interface WidgetLoaderProps {
  runtime: string;
  version?: string;
  config?: any;
}

export const Widget = (props: WidgetLoaderProps) => {
  return <AppLoader {...props} />;
};
