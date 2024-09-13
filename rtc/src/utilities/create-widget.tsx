import React from 'react';
import ReactDOM from 'react-dom/client';

/**
 * Creates a widget from a component that can be rendered in a remote source.\
 * **Note:** This only needs to be added to the primary exported component. Any component used by the primary component does not need to be wrapped in this function.\
 * However, if the used component is also a remote widget, it will need an export added so it can be used both locally and remotely.
 * @param react The React instance that the widget is created with.
 * @param reactDOM The ReactDOM instance that the widget is created with.
 * @param component The component that is being converted into a widget.
 * @example
 * ### Creating a Remote Widget
 * ```tsx
 * // ./src/example.tsx
 * import { createWidget } from '@ecp/rtc/remote';
 *
 * // Create the widget
 * export const Box = createWidget(() => <div>Box</div>);
 * ```
 * ### Creating a Component that is Used Locally and Remotely
 * ```tsx
 * // ./src/example.tsx
 * import { createWidget } from '@ecp/rtc/remote';
 *
 * // Create the component
 * const _Box = () => <div>Box</div>;
 * // Create the remote widget
 * export const Box = createWidget(_Box);
 * // Create the local component
 * export default _Box;
 */
export const createWidget2 = (component: (...args: any[]) => JSX.Element) => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);
  return (props: { [key: string]: any }) => {
    const [uuid] = React.useState(() => crypto.randomUUID());
    const ref = React.useRef<HTMLDivElement>(null);

    // If the widget changes, we need to re-render the new widget and append it to the DOM
    React.useEffect(() => {
      if (!ref.current) return;
      const children = Array.isArray(props.children) ? props.children : [props.children];
      root.render(React.createElement(component, props, ...children));
      if (ref.current.children.length === 0) ref.current.appendChild(div);
    }, []);

    // If the props change, we need to re-render the widget but not append it to the DOM
    React.useEffect(() => {
      const children = Array.isArray(props.children) ? props.children : [props.children];
      root.render(React.createElement(component, props, ...children));
    }, [props]);

    return <div ref={ref} id={uuid} />;
  };
};

export const createWidget = (component: (...args: any[]) => JSX.Element) => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);

  return {
    component,
    react: React,
    renderer: root,
    domElement: div,
  };
};
