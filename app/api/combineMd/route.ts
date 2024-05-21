import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import MarkdownIt from 'markdown-it';
import { access, mkdir } from 'fs-extra';

async function mergeMarkdownFiles(folderPath: string, outputPath: string) {

    try {
        // Read all files in the folder
        const files = fs.readdirSync(folderPath);

        // Initialize the merged markdown content
        let mergedContent = '';

        // Loop through each file
        for (const file of files) {
            // Check if the file is a markdown file
            if (file.endsWith('.md')) {
                // Read the content of the markdown file
                const filePath = path.join(folderPath, file);
                const fileContent = fs.readFileSync(filePath, 'utf-8');


                // Append the parsed content to the merged content
                mergedContent += fileContent + '\n\n';
            }
        }

        // Write the merged content to the output file
        fs.writeFileSync(outputPath, mergedContent, 'utf-8');
        console.log('Merged markdown files successfully.');
    } catch (err) {
        console.error('Error merging markdown files:', err);
    }
}

async function directoryExists(path: string) {
    try {
      await access(path);
      return true;
    } catch (error) {
      return false;
    }
  }
  


export async function POST(req: NextRequest) {

  try {
    // Define your folder path and output path
const translatedFolderPath = 'translated';
const outputPath = 'public/translated';
const outputFilePath = `${outputPath}/translated.md`;
const dataDirExists = await directoryExists(outputPath);

if (!dataDirExists) {
  console.log(`${outputPath} not found! trying to create dir..`)
  try {
    // Create the "data" folder directory if it doesn't exist
    await mkdir(outputPath, { recursive: true });
    console.log(`created ${outputPath} directory!`)
  } catch (error) {
    console.error('Error creating  directory:', error);
    return NextResponse.json({ success: false });
  }
}

// Call the function to merge markdown files
mergeMarkdownFiles(translatedFolderPath, outputFilePath);
        return NextResponse.json({ success: true});
    } catch (error) {
        return NextResponse.json({ success: false, message: error });
    }
}
