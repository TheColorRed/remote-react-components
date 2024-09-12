import { useState } from 'react';

export default ({ name }: { name: string }) => {
  const [name2] = useState('Mike');
  return (
    <div>
      <h1>Console Application Hello, {name2 ?? ''}!</h1>
    </div>
  );
};
