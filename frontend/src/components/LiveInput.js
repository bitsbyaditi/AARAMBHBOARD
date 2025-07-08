import { useState } from 'react';

function LiveInput() {
  const [text, setText] = useState('');
  return (
    <div>
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
      />
      <p>You typed: {text}</p>
    </div>
  );
}

export default LiveInput;
