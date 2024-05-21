import { NextRequest, NextResponse } from 'next/server';
import { Translate } from '@/app/lib/langchain-load';

export async function POST(request: NextRequest) {
    try {
        const { language } = await request.json();
        console.log('passed language is' , language)
        const translatedResponses = await Translate(language);
        return NextResponse.json({ success: true, text: translatedResponses });
    } catch (error) {
        return NextResponse.json({ success: false, message: error });
    }
}
