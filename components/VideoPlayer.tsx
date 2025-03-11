import ReactPlayer from 'react-player';

interface VideoPlayerProps {
  videoUrl: string;
  onClose: () => void;
}

export default function VideoPlayer({ videoUrl, onClose }: VideoPlayerProps) {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-white bg-red-500 px-4 py-2 rounded"
      >
        Close
      </button>
      <ReactPlayer 
        url={videoUrl}
        playing={true}
        controls={true}
        width="80%"
        height="80%"
      />
    </div>
  );
} 