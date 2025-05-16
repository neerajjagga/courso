import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { videoPlayerOptions } from 'types/videoPlayer';

type VideoJSPlayer = ReturnType<typeof videojs>;

const VideoPlayer = ({ options }: { options: videoPlayerOptions }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<VideoJSPlayer | null>(null);

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = videoRef.current;
            if (!videoElement) return;

            playerRef.current = videojs(videoElement, options);
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, [options]);

    return (
        <div data-vjs-player className='w-full'>
            <video ref={videoRef} className="w-full video-js vjs-default-skin h-[800px]" controls preload="auto" />
        </div>
    );
};

export default VideoPlayer;
