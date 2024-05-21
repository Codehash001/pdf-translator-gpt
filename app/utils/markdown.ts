import fs from 'fs';
import path from 'path';
import {remark }from 'remark';
import html from 'remark-html';

export async function combineMarkdownFiles(directory: string): Promise<string> {
    const files = fs.readdirSync(directory).filter(file => file.endsWith('.md')).sort();
    let combinedMarkdown = '';

    for (const file of files) {
        const filePath = path.join(directory, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const processedMarkdown = await remark().use(html).process(fileContent);
        combinedMarkdown += processedMarkdown.toString();
    }

    return combinedMarkdown;
}
