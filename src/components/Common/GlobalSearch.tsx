import React, { useState } from 'react';
import { globalSearch, SearchResultItem } from '../../data/collegeData'; // اضبط المسار حسب مكان ملف collegeData لديك

export const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResultItem[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setResults(globalSearch(val));
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-6 px-4 dir-rtl">
      {/* شريط البحث */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="ابحث عن مادة، محاضرة، شيت، أو امتحان..."
          className="w-full py-3 pr-11 pl-4 text-sm md:text-base text-gray-800 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all placeholder-gray-400"
        />
        <svg
          className="w-5 h-5 absolute right-4 text-gray-400 pointer-events-none"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* قائمة النتائج السريعة */}
      {query.trim() !== '' && (
        <div className="absolute z-50 right-4 left-4 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-80 overflow-y-auto divide-y divide-gray-100">
          {results.length > 0 ? (
            results.map((item, index) => (
              <a
                key={index}
                href={item.materialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 hover:bg-blue-50/60 transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="font-semibold text-gray-900 text-sm md:text-base">
                    {item.courseName}
                  </span>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    {item.materialName}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                  <span>{item.yearName}</span>
                  <span>•</span>
                  <span>{item.deptName}</span>
                  <span>•</span>
                  <span>{item.semesterName}</span>
                </div>
              </a>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              لا توجد نتائج تطابق بحثك "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};