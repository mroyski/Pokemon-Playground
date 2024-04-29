import { useEffect, useState } from 'react';

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/items')
      .then((res) => res.json())
      .then((data) => setItems(data));
  }, []);

  return (
    <main>
      <h1>Example store</h1>
      {items.map((item) => {
        return (
          <>
            <p>{item.name}</p>
            <p>{item.price}</p>
          </>
        );
      })}
    </main>
  );
}

export default App;
