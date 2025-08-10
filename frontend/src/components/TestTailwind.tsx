import React from 'react';

const TestTailwind: React.FC = () => {
  return (
    <div className="bg-blue-500 text-white p-4 m-4 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold">Hello Tailwind!</h1>
      <p className="text-lg mt-2">This is a test component to check Tailwind CSS styling.</p>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
        Test Button
      </button>
    </div>
  );
};

export default TestTailwind;
