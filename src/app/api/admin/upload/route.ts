import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

// Configura o Cloudinary com as suas variáveis de ambiente
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'Nenhum arquivo enviado.' }, { status: 400 });
  }

  // Converte o arquivo para um buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Faz o upload do buffer para o Cloudinary
  try {
    const response = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      }).end(buffer);
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error('Erro no upload para o Cloudinary:', error);
    return NextResponse.json({ error: 'Erro ao fazer upload da imagem.' }, { status: 500 });
  }
}