import { useDynamicLoader } from '@ecp/rtc/dynamic-loader';
import { Suspense } from 'react';
import './index.css';

export default () => {
  const { Box, Circle, WelcomeHeader } = useDynamicLoader('console', 'http://localhost:3000/console/shapes.js');
  // const { WelcomeHeader } = useDynamicLoader('console', 'http://localhost:3000/console/welcome.js');

  return (
    <div className="flex flex-col w-full">
      <div className="py-6 px-4 bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">Core App</h1>
      </div>
      <div className="flex flex-1 shrink-0 p-4 gap-4">
        <main className="flex place-content-center place-items-center gap-2">
          <Suspense fallback={<div>Loading...</div>}>
            <welcome-header name="Joe"></welcome-header>
            {WelcomeHeader && <WelcomeHeader name="Billy" />}
            {Box && <Box size={24} color="red" />}
            {Circle && <Circle radius={12} color="blue" />}
          </Suspense>
        </main>
      </div>
    </div>
  );
};
