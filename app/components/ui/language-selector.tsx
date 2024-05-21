import React, { useState } from 'react';
import { Languages } from '@/app/utils/languages';
import {TranslateActions }from './translate-actions';


const LanguageSelector = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
  
    const handleInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
      setSearchTerm(event.target.value);
    };
  
    const handleSelectLanguage = (language: React.SetStateAction<string>) => {
      setSelectedLanguage(language);
      setSearchTerm(language)
      setIsOpen(false);
    };

  
    const filteredLanguages = Languages.filter(language =>
      language.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
        <>
        <h1 className='font-medium mb-1'>Please select the target language</h1>
      <div className="relative w-64">
        <input
          type="text"
          placeholder="Select language to translate..."
          value={searchTerm}
          onChange={handleInputChange}
          onClick={() => setIsOpen(true)}
          className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-500"
        />
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded  max-h-[200px] overflow-y-auto">
            {filteredLanguages.map(language => (
              <div
                key={language.value}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectLanguage(language.name)}
              >
                {language.name}
              </div>
            ))}
          </div>
        )}
        { selectedLanguage ?
          <TranslateActions language={selectedLanguage}/>
          :
          <></>
          }
      </div>
      </>
    );
  };
  
  export { LanguageSelector};
