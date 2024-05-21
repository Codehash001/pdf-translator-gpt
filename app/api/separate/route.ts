import fs, { access, mkdir } from 'fs-extra';
import { NextRequest, NextResponse } from 'next/server';
import { PDFDocument } from 'pdf-lib';


async function directoryExists(path: string) {
  try {
    await access(path);
    return true;
  } catch (error) {
    return false;
  }
}


export async function POST(request: NextRequest) {

    async function splitPDF(inputPath: string, outputPath: string) {
        // Read the input PDF
        const pdfBytes = fs.readFileSync(inputPath);
      
        // Load the PDF
        const pdfDoc = await PDFDocument.load(pdfBytes);
      
        // Loop through each page and save it as a separate PDF
        for (let i = 0; i < pdfDoc.getPageCount(); i++) {
          // Create a new PDF document
          const newPDF = await PDFDocument.create();
      
          // Add the current page to the new PDF
          const [copiedPage] = await newPDF.copyPages(pdfDoc, [i]);
      
          // Add the copied page to the new PDF
          newPDF.addPage(copiedPage);
      
          // Save the new PDF with the current page
          const newPDFBytes = await newPDF.save();
      
          // Write the new PDF to the output file
          const pageNumber = i + 1;
          const pageOutputPath = `${outputPath}/page${pageNumber}.pdf`;
          fs.writeFileSync(pageOutputPath, newPDFBytes);
        }
      }

    try {

    const {fileName} = await request.json();

    const pdfPath = `docs/${fileName}`;
    const outputPath = 'separated';
    const dataDirExists = await directoryExists(outputPath);

    if (!dataDirExists) {
      console.log(`${outputPath} not found! trying to create dir..`)
      try {
        // Create the "data" folder directory if it doesn't exist
        await mkdir(outputPath, { recursive: true });
        console.log(`created ${outputPath} directory!`)
      } catch (error) {
        console.error('Error creating "seperated" directory:', error);
        return NextResponse.json({ success: false });
      }
    }
    splitPDF(pdfPath, outputPath)
        .then(() => console.log('PDF separated by pages'))
        .catch(error => console.error('Error separating PDF by pages:', error));
        return NextResponse.json({ success: true });
        
    } catch (error) {
        console.error('Error separating PDF by pages:', error)
        return NextResponse.json({ success: false, message:error });
    }
    

}

