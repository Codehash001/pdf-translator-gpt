'use client'

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, PackagePlus, Loader } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {LanguageSelector} from './language-selector';


const FileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [isUploaded , setIsUploaded] = useState(false);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setUploading(true);
    toast.info('Uploding your file...');
    e.preventDefault();
    try {
      await handleDelete();

      await handleUpload();
      await handleSeparate();
    } catch (error) {
      console.error('Error Uploading File', error);
      toast.error('Failed to upload or make chunks');
    } finally {
      setUploading(false);
      setIsUploaded(true);
      toast.success('File uploaded!');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });


  const handleSeparate = async () => {
    toast.info('Seperating pages');
    try {
      const res = await fetch('/api/separate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fileName: files[0].name }),
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      toast.error('Please select at least one file');
      throw new Error('No files selected');
    }

    try {
      const data = new FormData();
      files.forEach((file, index) => {
        data.append(`file${index}`, file);
      });

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
      toast.error('Uploading files failed!');
    }
  };


  const handleDelete = async () => {
    try {
      const res = await fetch('/api/removeFiles', {
        method: 'POST',
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <div  className='flex flex-col h-full items-center justify-center max-w-xs'>
    <form onSubmit={onSubmit} className='space-y-4 mb-3'>
      {isUploaded? <></> :<div {...getRootProps()} className='border-2 border-dashed border-black p-8 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-slate-200'>
        <input {...getInputProps()} />
        <Upload size={48} />
        <p className='text-center text-lg font-medium'>Drag & drop file here, or click to select files</p>
      </div>}
      <ul className='w-full max-h-[300px] overflow-y-auto flex-grow'>
        {files.map((file, index) => (
          <li key={index} className='border-2 rounded-full px-3 py-2 text-sm flex space-x-2 items-center mb-1 bg-slate-400'>
            <div><File size={16} /></div>
            <div>{file.name}</div>
          </li>
        ))}
      </ul>
      {files.length > 0 && isUploaded == false?
    <button className={`${uploading ?'opacity-45' : ''} w-full px-5 py-3 bg-gradient-to-t from-blue-500 to-blue-400 rounded-md hover:opacity-90 text-white font-medium`}>
      <input type="submit" value={uploading ? "Uploading" : "Upload"}/>
    </button> : <></>}
    </form>
    {/* <LanguageSelector/> */}
    {isUploaded?
    <>
        <LanguageSelector/>
    </>
:<></>}
{/* <button onClick={handleDelete}>Delete</button> */}
    </div>
  );
};

export default FileUpload;
