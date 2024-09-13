import type { FunctionComponent } from 'react';
import React from 'react';
import type { Root } from 'react-dom/client';

import { useEffect, useRef, useState } from 'react';

/**
 * A remote widget that is loaded from a remote source. It is created using the `createWidget` function.
 * @example
 * ### Creating a Remote Widget
 * ```tsx
 * import { createWidget } from '@ecp/rtc/create-widget';
 * export const Example = createWidget(() => <div>Example</div>);
 * ```
 *
 * ### Using a Remote Widget
 * ```tsx
 * import { Widget } from '@ecp/rtc/widget';
 * import { useDynamicLoader } from '@ecp/rtc/dynamic-loader';
 *
 * export default () => {
 *   // A URL or a name can be used to load the module
 *   // If a name is used, the endpoint manager will need to be set up
 *   const { Example } = useDynamicLoader('http://localhost:3000/example.mjs');
 *   // Pass optional props to the widget using the `props={{ value: 'Example' }}` syntax
 *   return <Widget widget={Example} />;
 * };
 * ```
 */
export interface RemoteWidget {
  /**
   * The component from the remote source.
   * @example
   * export default () => <div>Remote Component</div>
   */
  component: FunctionComponent;
  /**
   * The React instance that comes from the remote source.
   */
  react: typeof React;
  /**
   * The renderer that comes from the remote source.
   * @example
   * ReactDOM.createRoot(document.createElement('div'));
   */
  renderer: Root;
  /**
   * The DOM element from the remote source.
   * @example
   * document.createElement('div');
   */
  domElement: HTMLElement;
}

export const Widget = ({
  widget,
  props,
  children,
}: {
  widget: RemoteWidget;
  props: { [key: string]: any };
  children?: React.ReactNode | React.ReactNode[];
}) => {
  const [uuid] = useState(() => crypto.randomUUID());
  const ref = useRef<HTMLDivElement>(null);

  // If the widget changes, we need to re-render the new widget and append it to the DOM
  useEffect(() => {
    if (!widget || !ref.current) return;
    children = Array.isArray(children) ? children : [children];
    widget.renderer.render(widget.react.createElement(widget.component, props, ...children));
    if (ref.current.children.length === 0) ref.current.appendChild(widget.domElement);
  }, [widget]);

  // If the props change, we need to re-render the widget but not append it to the DOM
  useEffect(() => {
    if (!widget) return;
    children = Array.isArray(children) ? children : [children];
    widget.renderer.render(widget.react.createElement(widget.component, props, ...children));
  }, [props]);

  return <div ref={ref} id={uuid}></div>;
};
