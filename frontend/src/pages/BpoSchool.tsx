import React, { useState, useMemo } from 'react';
import bpoSchoolContent from '../data/bpoSchoolContent.json';

export default function BpoSchool() {
  const [selectedCategory, setSelectedCategory] = useState('Getting Started');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = useMemo(() => {
    const uniqueCategories = new Set(bpoSchoolContent.map(item => item.category));
    return Array.from(uniqueCategories);
  }, []);

  const filteredContent = useMemo(() => {
    return bpoSchoolContent.filter(item => {
      const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchesSearch = searchTerm ? 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.content.toLowerCase().includes(searchTerm.toLowerCase()) 
        : true;
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <section className="text-text-white flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 p-4 border-r border-navy-blue-light bg-navy-blue-light rounded-lg shadow-lg mb-4 md:mb-0 md:mr-4">
        <h3 className="text-xl font-semibold mb-4">Categories</h3>
        <input 
          type="text" 
          placeholder="Search documentation..." 
          className="w-full p-2 rounded-md bg-navy-blue border border-gray-700 text-text-white placeholder-text-light-gray mb-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <nav>
          <ul>
            {categories.map(category => (
              <li key={category} className="mb-2">
                <button 
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left p-2 rounded-md ${selectedCategory === category ? 'bg-soft-cyan text-text-white' : 'hover:bg-navy-blue'}`}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 p-4 bg-navy-blue-light rounded-lg shadow-lg">
        {filteredContent.length > 0 ? (
          filteredContent.map((item, index) => (
            <div key={index} className="mb-6 pb-6 border-b border-navy-blue last:border-b-0">
              <h2 className="text-2xl font-semibold mb-2 text-neon-green">{item.title}</h2>
              <p className="text-text-light-gray leading-relaxed">{item.content}</p>
            </div>
          ))
        ) : (
          <p className="text-text-light-gray">No content found for this category or search term.</p>
        )}
      </main>
    </section>
  );
}






