import React, { useEffect, useState } from 'react';

declare global {
  interface Window {
    modules: any;
  }
}

export const useDynamicLoader = (scope: string, name: string) => {
  const [module, setModule] = useState<any>({});

  useEffect(() => {
    if (!name) return;

    const loadComponent = async () => {
      // const script = document.createElement('script');
      // script.src = name;
      // script.type = 'module';
      // script.addEventListener('load', () => {
      //   console.log('window.modules', window.modules);
      //   setModule(window['shapes']);
      // });
      // document.body.appendChild(script);
      import(name).then(module => {
        const item = Object.assign({}, module, { React });
        console.log('item', item);
        setModule(item);
      });
    };
    loadComponent();
  }, []);

  return module;
};
