import { useRemoteLoader, Widget } from '@ecp/rtc/client';
import { useEffect, useState } from 'react';
import './index.css';

const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Hank', 'Ivy', 'Jack'];
const getRandomName = () => names[Math.floor(Math.random() * names.length)];

export default () => {
  const { WelcomeHeader } = useRemoteLoader('common');
  const { Circle, Box } = useRemoteLoader('shapes');
  const [name, setName] = useState(() => getRandomName());

  useEffect(() => {
    setInterval(() => setName(getRandomName()), 2500);
  }, []);

  return (
    <div className="flex flex-col w-full">
      <div className="py-6 px-4 bg-blue-500 text-white">
        <h1 className="text-3xl font-bold">Core App</h1>
      </div>
      <div className="flex flex-1 shrink-0 p-4 gap-4">
        <main className="flex place-content-center place-items-center gap-2">
          <Widget widget={Box} props={{ size: 24, color: 'red' }} />
          <Widget widget={WelcomeHeader} props={{ name }} />
          <Widget widget={Circle} props={{ radius: 12, color: 'blue' }} />
        </main>
      </div>
    </div>
  );
};
