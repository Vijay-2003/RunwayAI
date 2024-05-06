"use client"
import React, { useState, useEffect } from 'react';

const Saveddata = () => {
    const [savedVideoUrl, setSavedVideoUrl] = useState('');
    const [savedGifUrl, setSavedGifUrl] = useState('');

    useEffect(() => {
        console.log("Fetching saved data...");
        const videoUrl = localStorage.getItem('savedVideoUrl');
        const gifUrl = localStorage.getItem('savedGifUrl');
        console.log("Video URL:", videoUrl);
        console.log("GIF URL:", gifUrl);
        if (videoUrl && gifUrl) {
            setSavedVideoUrl(videoUrl);
            setSavedGifUrl(gifUrl);
        }
    }, []);

    const clearSavedData = () => {
        localStorage.removeItem('savedVideoUrl');
        localStorage.removeItem('savedGifUrl');
        setSavedVideoUrl('');
        setSavedGifUrl('');
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url('https://i.gifer.com/J4o.gif')` }}>
            <div className="text-white max-w-md mx-auto p-8 rounded-lg shadow-md bg-transparent backdrop-blur-lg border-2 border-blue-900">
                <h1 className="text-3xl font-bold mb-4">Saved Data</h1>
                {savedVideoUrl && savedGifUrl ? (
                    <div>
                        <h1 className="text-xl font-bold">Video:</h1>
                        <video controls className="mb-2">
                            <source src={savedVideoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        <h1 className="text-xl font-bold">GIF:</h1>
                        <img src={savedGifUrl} alt="Generated GIF" className="w-full mb-2" />
                        <button onClick={clearSavedData} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Clear Saved Data</button>
                    </div>
                ) : (
                    <div>No saved data</div>
                )}
            </div>
        </div>
    );
};

export default Saveddata;
