'use client'
import FileUpload from "./components/ui/upload-file";

// const scrollElement = document.documentElement;

export default function Home() {

  return (
    <>
      <div className="flex items-center justify-center h-full relative">
        <div className="w-[50%] h-full flex flex-col items-center justify-center border-r-2 border-black bg-gradient-to-br from-slate-100 to-slate-50">
          <FileUpload />
        </div>
        <div className="w-[50%] h-full flex flex-col items-center justify-center bg-white text-start overflow-y-auto overflow-x-hidden p-4">
            <>
              <div className="flex flex-col items-center justify-start p-4 space-y-3">
                <h1 className="text-4xl font-semibold text-center mb-6">Translate documents using GPT</h1>
                <div className="text-start space-y-3 px-3 font-medium">
                <h1>1. First Upload your documents, you can choose from device or drag and drop files.</h1>
                <h1>2. Then Click on upload button.</h1>
                <h1>3. Once files are uploaded and ready choose your target language.</h1>
                <h1>4. Finally click on Translate button and it will start translation.</h1>
                <h1 className="text-red-500 mt-4 italic">Please note: translation process may take some time to complete , depend on the size of your document.</h1>
                <h1>5. After translation complete it will show a button to download the translated file in markdown/md format.</h1>
                <div className="flex items-center font-semibold">After download the translated md file go to <a href="/editTranslated" className='mx-1' >
            <button
                className='w-full px-2 py-1 bg-gradient-to-r from-indigo-600 via-violet-700 to-fuchsia-800 border-2 hover:opacity-90 text-white font-medium rounded-lg'>
                Preview
            </button>
            </a> page to edit and save as PDF.</div>
                </div>
              </div>
            </>
        </div>
      </div>
    </>
  );
}
