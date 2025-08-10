import React, { useEffect, useState } from 'react';
import api from '../lib/api';

const TestBackend: React.FC = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    api.get('/api/test')
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error('Error fetching data from backend:', error);
        setMessage('Error connecting to backend');
      });
  }, []);

  return (
    <div>
      <h2>Backend Connection Test</h2>
      <p>{message}</p>
    </div>
  );
};

export default TestBackend;
