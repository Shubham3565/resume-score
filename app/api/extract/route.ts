import { NextRequest, NextResponse } from "next/server";
import { DocuText, PdfParseError, PdfUnsupportedError } from "docutext";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

/**
 * POST /api/extract
 *
 * Accepts a PDF file via multipart FormData, extracts text using docutext,
 * and returns the plain text content with page count.
 *
 * Returns:
 *   200 with { text, pages } on success.
 *   400 for missing/invalid file or size limit exceeded.
 *   422 for PDFs that cannot be parsed or contain no extractable text.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid form data. Please upload a PDF file." },
      { status: 400 }
    );
  }

  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: "No file provided. Please upload a PDF." },
      { status: 400 }
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024} MB.` },
      { status: 400 }
    );
  }

  if (file.type && file.type !== "application/pdf") {
    return NextResponse.json(
      { error: "Only PDF files are supported." },
      { status: 400 }
    );
  }

  try {
    const bytes = new Uint8Array(await file.arrayBuffer());
    const doc = DocuText.fromBuffer(bytes);
    const text = doc.text;
    const pages = doc.pageCount;

    doc.dispose();

    if (!text.trim()) {
      return NextResponse.json(
        { error: "No extractable text found in this PDF. It may be a scanned image. Try pasting your resume text instead." },
        { status: 422 }
      );
    }

    return NextResponse.json({ text: text.trim(), pages });
  } catch (error) {
    if (error instanceof PdfParseError) {
      return NextResponse.json(
        { error: "Could not parse this PDF. The file may be corrupted." },
        { status: 422 }
      );
    }
    if (error instanceof PdfUnsupportedError) {
      return NextResponse.json(
        { error: "This PDF uses an unsupported format. Try pasting your resume text instead." },
        { status: 422 }
      );
    }

    return NextResponse.json(
      { error: "Failed to extract text from PDF. Please try again." },
      { status: 500 }
    );
  }
}
