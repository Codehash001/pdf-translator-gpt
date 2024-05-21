import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';
import {remark }from 'remark';
import html from 'remark-html';


export async function POST(request: NextRequest) {
  try {
    const directory ='translated'
    const files = fs.readdirSync(directory).filter(file => file.endsWith('.md')).sort();
    let combinedMarkdown = '';

    for (const file of files) {
        const filePath = path.join(directory, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const processedMarkdown = await remark().use(html).process(fileContent);
        combinedMarkdown += processedMarkdown.toString();
    }
    
    return NextResponse.json({ success: true , text:combinedMarkdown});
} catch (error) {
  return NextResponse.json({ success: false, message:error });

} 
}