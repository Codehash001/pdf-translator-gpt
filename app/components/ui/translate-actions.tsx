import { useState } from 'react';
import { remark } from 'remark';
import remarkHTML from 'remark-html';
import { Compatible } from 'vfile';
import Markdown from 'react-markdown';
import FileSaver from 'file-saver';
import { toast } from 'react-toastify';

let translatedContent = '';

const TranslateActions = (language: any) => {
    const [isTranslated, setIsTranslated] = useState(false);
    const [isTranslating , setIsTranslating] = useState(false);


    const handleSaveMd = async () => {
        try {
            const res = await fetch('/api/combineMd', {
                method: 'POST',
            });
            if (res.status !== 200) throw new Error(await res.text());
        } catch (error) {
            // Handle errors here
            console.error(error);
        }
    };

    const handleLoad = async () => {
        setIsTranslating(true);
        try {
            console.log('languag is' , language.language);
            const targetlanguage = language.language;
          const resPromise = fetch('/api/translate', {
            method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ language: targetlanguage }),
          });
      
          const promiseOptions = {
            pending: `Translating file to ${targetlanguage}...`,
            success: 'Translation completed!', 
            error: 'Translation failed!'
          };
      
          // Use toast.promise to handle the toast messages based on the response
          await toast.promise(
            resPromise.then(async (res) => {
              if (!res.ok) {
                throw new Error(await res.text());
              }
              await handleSaveMd();
              setIsTranslated(true);
              return res.json();
            }),
            promiseOptions
          );
        } catch (e: any) {
          // Handle errors here
          console.error(e);
          toast.error('Translation failed!');
        }
        setIsTranslating(false)
      };

    return (
        <>
            <button
                onClick={handleLoad}
                className='w-full px-5 py-3 bg-gradient-to-t from-blue-500 to-blue-400 rounded-md hover:opacity-90 text-white font-medium mt-5'>
                {isTranslating ? 'Translating.. Please wait' : 'Translate'}
            </button>
            {
                isTranslated?
                <>
                <a href="/translated/translated.md" className='w-full h-full' download="translated.md">
            <button
                className='w-full px-5 py-3 bg-gradient-to-t from-black to-gray-900 rounded-md hover:opacity-90 text-white font-medium mt-5'>
                Download translated markdown file
            </button>
            </a>
            </>
            :
            <></>
            }
        </>
    );
};

export { TranslateActions, translatedContent };
