import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold">BPO OS</h3>
            <p className="mt-2 text-gray-400">Ai-Powered BPO Operating System</p>
          </div>
          <div>
            <h3 className="text-lg font-bold">Links</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="/" className="hover:text-gray-300">Home</a></li>
              <li><a href="/jobs" className="hover:text-gray-300">Jobs</a></li>
              <li><a href="/bposchool" className="hover:text-gray-300">BPO School</a></li>
              <li><a href="/about" className="hover:text-gray-300">About</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold">Contact</h3>
            <ul className="mt-2 space-y-2">
              <li><p className="text-gray-400">Email: contact@bpo-os.com</p></li>
              <li><p className="text-gray-400">Phone: +251 900 000 000</p></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BPO OS. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
