import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface IRecords {
  reference: string;
}
// Create your functional component:
export const Records: React.FC = () => {
  const [records, setRecords] = useState<IRecords[]>([]);

  useEffect(() => {
    getRecords();
  }, []);

  const getRecords = () => {
    return axios.get(`/items`).then((res) => {
      console.log(res.data);
      setRecords(res.data);
    });
  };

  return (
    <main>
      <h3>Records from server: </h3>
      <ul>
        {records?.map((item) => (
          <li key={item?.reference}>{JSON.stringify(item) + ''}</li>
        ))}
      </ul>
    </main>
  );
};
