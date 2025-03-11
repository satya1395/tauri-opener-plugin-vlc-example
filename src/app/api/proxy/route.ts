import { NextResponse } from 'next/server';
import http from 'http';
import https from 'https';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const config = {
  api: {
    // Disable body parsing, let http-proxy handle the stream
    bodyParser: false,
    // Enable response streaming
    responseLimit: false,
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const videoUrl = searchParams.get('url');

  if (!videoUrl) {
    return NextResponse.json({ error: 'Video URL is required' }, { status: 400 });
  }

  return new Promise((resolve, reject) => {
    const protocol = videoUrl.startsWith('https') ? https : http;

    const proxyReq = protocol.get(videoUrl, (proxyRes) => {
      // Forward headers from the target response
      const headers = new Headers();
      Object.entries(proxyRes.headers).forEach(([key, value]) => {
        if (value) headers.set(key, value.toString());
      });
      headers.set('Content-Type', proxyRes.headers['content-type'] || 'video/mp4');

      // Create a ReadableStream from the response
      const stream = new ReadableStream({
        start(controller) {
          proxyRes.on('data', (chunk) => {
            controller.enqueue(chunk);
          });
          proxyRes.on('end', () => {
            controller.close();
          });
          proxyRes.on('error', (err) => {
            controller.error(err);
          });
        }
      });

      resolve(new NextResponse(stream, {
        status: proxyRes.statusCode || 200,
        headers: headers,
      }));
    });

    proxyReq.on('error', (error) => {
      console.error('Proxy request error:', error);
      resolve(NextResponse.json(
        { error: 'Failed to proxy video' },
        { status: 500 }
      ));
    });
  });
}
