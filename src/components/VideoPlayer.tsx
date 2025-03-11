'use client';
import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  videoUrl: string;
  onClose: () => void;
}

export default function VideoPlayer({ videoUrl, onClose }: VideoPlayerProps) {
  // Create the proxy URL once, with a single encode
  //const proxyUrl = `/api/proxy?url=${encodeURIComponent(videoUrl)}`;
  
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-red-500 px-4 py-2 rounded"
      >
        Close
      </button>
      <ReactPlayer 
        // Use the proxyUrl directly - don't encode again
        url={videoUrl}
        playing={true}
        controls={true}
        width="80%"
        height="80%"
        config={{
          file: {
            forceVideo: true,
            attributes: {
              crossOrigin: "anonymous"
            }
          }
        }}
        onError={(e) => console.error('Player error:', e)}
      />
    </div>
  );
} 