import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DocxLoader } from "langchain/document_loaders/fs/docx";
import fs, { access, mkdir } from 'fs-extra';
import path from 'path'; // Import path module for resolving file paths
import { Document } from "langchain/document";
import OpenAI from 'openai';

async function directoryExists(path: string) {
    try {
      await access(path);
      return true;
    } catch (error) {
      return false;
    }
  }
  

export async function Translate(language:any) {
    try {
        const files = await fs.readdir('separated');
        const outputPath = 'translated';
        const dataDirExists = await directoryExists(outputPath);
    
        if (!dataDirExists) {
          console.log(`${outputPath} not found! trying to create dir..`)
          try {
            // Create the "data" folder directory if it doesn't exist
            await mkdir(outputPath, { recursive: true });
            console.log(`created ${outputPath} directory!`)
          } catch (error) {
            console.error('Error creating "seperated" directory:', error);
          }
        }
        
        for (const file of files) {
            let fileContent = '';
            const filePath = path.join('separated', file);
            if (file.endsWith('.pdf')) {
                const loader = new PDFLoader(filePath);
                const docs = await loader.load();
                console.log(docs[0]);
                if(!docs[0]){
                    continue;
                }
                
                if(docs[0].pageContent){
                    fileContent = docs[0].pageContent
                }
                
            }
            if (file.endsWith('.docx')) {
                const loader = new DocxLoader(filePath);
                const docs = await loader.load();
                console.log(docs[0]);
                if(!docs[0]){
                    continue;
                }
                
                if(docs[0].pageContent){
                    fileContent = docs[0].pageContent
                }
                
            }
                
                const openai = new OpenAI({
                    apiKey: process.env.OPENAI_API_KEY
                });
                
                const res = await openai.chat.completions.create({
                    messages: [{
                            role: 'system',
                            content: `You are a helpful assistant that convert the given pdf file content into 'Given language'. Please provide markdown format response to identify headers, texts, subheadings, etc. and the rendered markdown answer should look like a PDF document. Just give the translated content no need for explanations or any other texts. Use bold and bigger letters for headers and subheadings and align all text to start. Give better line spaces for every 12-14 words. Markdown output should only contains Headings and paragrpahs. donot wrap anything inside '''markdown''' in your response. `
                        },
                        {
                            role: 'user',
                            content: `File content:\n${fileContent}\n Given language: ${language}`
                        }
                    ],
                    model: 'gpt-4o',
                });
                
                console.log(res.choices[0]);
                if(res.choices[0].message.content) {
                fs.writeFileSync(`${outputPath}/${file.replace('.pdf', '.md')}`, `${res.choices[0].message.content}`);
                }
                
            
        }
    } catch (err) {
        console.error('Error:', err);
    }
}
