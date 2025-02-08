import { useState } from "react";
import "./App.css";
import { VideoPlayer } from "./component/VideoPlayer";
import { useRef } from "react";

function App() {
    const playerRef = useRef(null);
    const [error, setError] = useState(null);
    const videoUrl =
        "http://localhost:8080/upload/videos/1bf18e7b-368c-4f4d-acca-de35167993d7/master.m3u8";

    const videoPlayerOptions = {
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
            {
                src: videoUrl,
                type: "application/x-mpegURL",
            },
        ],
    };

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.on("error", () => {
            const error = player.error();
            setError(
                `Video Error: ${error?.message || "Failed to load video"}`
            );
        });

        player.on("waiting", () => {
            console.log("player is waiting");
        });

        player.on("dispose", () => {
            console.log("player will dispose");
        });
    };

    return (
        <>
            <div>
                <h1>Video player</h1>
                {error && (
                    <div style={{ color: "red", marginBottom: "1rem" }}>
                        {error}
                    </div>
                )}
            </div>
            <VideoPlayer
                options={videoPlayerOptions}
                onReady={handlePlayerReady}
            />
        </>
    );
}

export default App;
