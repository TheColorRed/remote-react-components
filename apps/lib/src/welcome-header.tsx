// const { useState } = React;

import { useState } from 'react';

// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import r2wc from 'react-to-webcomponent';

export const WelcomeHeader = (props: { name: string }) => {
  const [name, setName] = useState(props.name ?? '');
  // const name = props.name ?? '';
  return (
    <div>
      <h2 className="text-2xl">Welcome Back, {name}</h2>
    </div>
  );
};

// export const WelcomeHeader = customElements.define(
//   'welcome-header',
//   r2wc(Welcome, React, ReactDOM, {
//     props: ['name'],
//   })
// );
