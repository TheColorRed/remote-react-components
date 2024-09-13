import { createWidget } from '@ecp/rtc/remote';
import { useEffect, useState } from 'react';

const welcomeMessages = [
  'Welcome Back',
  'Hello',
  'Hi',
  'Howdy',
  'Greetings',
  'Good Day',
  'Good Morning',
  'Good Afternoon',
  'Good Evening',
  'Good Night',
  'Welcome',
];
const getRandomMessage = () => welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

export const WelcomeHeader = createWidget(({ name, children }: { name: string; children: React.ReactNode }) => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [message] = useState(() => getRandomMessage());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
  }, []);

  return (
    <div>
      <h2 className="text-2xl">
        {message} {name}, Your current time is {time} {children}
      </h2>
    </div>
  );
});
