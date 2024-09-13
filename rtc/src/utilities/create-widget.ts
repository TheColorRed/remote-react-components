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
export const createWidget = (
  // react: typeof React,
  // reactDOM: typeof ReactDOM,
  component: (...args: any[]) => JSX.Element
) => {
  const div = document.createElement('div');
  const root = ReactDOM.createRoot(div);

  return {
    component,
    react: React,
    renderer: root,
    domElement: div,
  };
};
