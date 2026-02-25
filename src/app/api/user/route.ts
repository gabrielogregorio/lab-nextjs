import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'; // muda para um ambiente sem apis do nodejs

const data: { name: string | null; image: string | null } = {
  name: 'Example',
  image: 'ImageExample',
};

export async function PATCH(request: NextRequest) {
  const { name, image } = await request.json();

  if (name !== undefined) {
    data.name = name;
  }

  if (image !== undefined) {
    data.image = image;
  }

  return NextResponse.json({ name, image });
}

export async function GET() {
  return NextResponse.json(data);
}

export async function POST() {}
export async function PUT() {}
export async function DELETE() {}
