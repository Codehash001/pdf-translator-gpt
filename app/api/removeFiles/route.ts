import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from 'fs';


export async function POST(req: NextRequest) {

    try {
        const folderPath = path.join(process.cwd(), 'public', 'translated');

        // Delete all files in the folder
        fs.readdirSync(folderPath).forEach((file) => {
          fs.unlinkSync(path.join(folderPath, file));
        });

        const rootpaths = ['separated', 'translated' , 'docs']

        for(const subpath of rootpaths) {

        const subFolderpaths = path.join(subpath)
        fs.readdirSync(subFolderpaths).forEach((file) => {
          fs.unlinkSync(path.join(subFolderpaths, file));
        });
        }
        console.log('Cleaned all directories!')
        return NextResponse.json({ success: true});
  
      } catch (error) {
          return NextResponse.json({ success: false, message: error });
      }
  }