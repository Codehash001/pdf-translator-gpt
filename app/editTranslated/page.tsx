'use client'

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { remark } from 'remark';
import remarkHTML from 'remark-html';
import FileUpload from "../components/ui/upload-file";
import { Compatible } from "vfile";
import Markdown from "react-markdown";
import { useDropzone } from "react-dropzone";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { MdEditor, config } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';

import { ExportPDF } from '@vavt/rt-extension';
// All CSS for this extension library
// import '@vavt/rt-extension/lib/asset/style.css';
// Or individual style for Emoji
import '@vavt/rt-extension/lib/asset/ExportPDF.css';

export default function Home() {
     const [value, setValue] = useState(`"
     
     "`);

return (
<div className="w-full h-screen overflow-hidden">
      <iframe
        src="https://md-preview-tau.vercel.app/"
        className="w-full h-full border-none"
        title="Embedded Website"
      ></iframe>
    </div>
);
};
