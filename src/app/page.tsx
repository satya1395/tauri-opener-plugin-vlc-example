// pages/index.js
"use client"
import { useState } from 'react'
import Head from 'next/head'
import VideoPlayer from '@/components/VideoPlayer'
import { openUrl } from '@tauri-apps/plugin-opener';
import { openPath } from '@tauri-apps/plugin-opener';

export default function Home() {
  const [showVideo, setShowVideo] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Define a default video URL if env variable is not set
  const videoUrl = process.env.NEXT_PUBLIC_VIDEO_URL || 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'

  const handleOpenVLC = async () => {
    try {
      setIsLoading(true)
      setError(null)
      
      await openPath(videoUrl, '-a VLC')
      
      console.log('Video opened in VLC')
    } catch (err: unknown) {
      console.error('Failed to open video:', err)
      // Safely handle the error object
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to open video')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Tauri Video Opener</title>
        <meta name="description" content="Open videos in VLC with Tauri" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16 flex flex-col items-center justify-center gap-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">
          Video Opener
        </h1>

        <p className="text-xl text-center mb-8 text-gray-600">
          Click the button to open a video in VLC
        </p>

        <div className="flex flex-col items-center">
          <button 
            className={`px-6 py-3 rounded-lg text-white font-medium transition-colors ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
            }`}
            onClick={handleOpenVLC}
            disabled={isLoading}
          >
            {isLoading ? 'Opening...' : 'Open Video in VLC'}
          </button>
          
          {error && (
            <p className="mt-4 text-red-600">Error: {error}</p>
          )}
        </div>

        <button 
          onClick={() => setShowVideo(true)}
          className="bg-green-500 text-white px-6 py-3 rounded"
        >
          Play Movie
        </button>

        {showVideo && (
          <VideoPlayer 
            // Pass the raw URL - don't encode it here
            videoUrl={videoUrl}
            onClose={() => setShowVideo(false)}
          />
        )}
      </main>
    </div>
  )
}