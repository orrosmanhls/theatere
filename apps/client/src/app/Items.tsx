import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

interface IItems {
  _id: string;
  value: string;
}

// Create your functional component:
export const Items: React.FC = () => {
  const [items, setItems] = useState<IItems[]>([]);

  const getItems = useCallback(() => {
    return axios.get('/items').then((res) => {
      setItems(res.data);
    });
  }, []);

  useEffect(() => {
    try {
      getItems();
    } catch (e) {
      console.error(e);
    }
  }, [getItems]);

  const addItem = useCallback(async () => {
    const randomString = (Math.random() + 1).toString(36).substring(2); // simple way for creating random string
    const res = await axios.post('/items', { value: randomString });
    setItems([...items, res.data]);
  }, [items]);

  return (
    <main>
      <h3>Items from server: </h3>
      <button onClick={addItem} data-testid="add-button">
        add
      </button>
      <ul data-testid="items-list">
        {items?.map((item: IItems) => (
          <li key={item._id}>{item.value}</li>
        ))}
      </ul>
    </main>
  );
};
