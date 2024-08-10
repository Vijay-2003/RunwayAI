"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const MainHome = () => {
    const router = useRouter();
    const [textPrompt, setTextPrompt] = useState('');
    const [width, setWidth] = useState(1344);
    const [height, setHeight] = useState(768);
    const [motion, setMotion] = useState(5);
    const [seed, setSeed] = useState(0);
    const [upscale, setUpscale] = useState(true);
    const [interpolate, setInterpolate] = useState(true);
    const [id, setId] = useState('');

    const fetchImage = async (ev) => {
        ev.preventDefault();
        try {
            const response = await fetch('https://runwayml.p.rapidapi.com/generate/text', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': '8bdce9a8cemshd13478060ca5e16p1de2c8jsn3cf75b553f3c',
                    'X-RapidAPI-Host': 'runwayml.p.rapidapi.com'
                },
                body: JSON.stringify({
                    text_prompt: textPrompt,
                    width,
                    height,
                    motion,
                    seed,
                    upscale,
                    interpolate
                })
            });

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            const uuid = data.uuid;
            console.log(data);
            console.log("UUID:", uuid);
            setId(uuid)
            router.push(`/generate/${uuid}`);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
<div className="min-h-screen flex flex-col md:flex-row justify-center items-center relative space-y-8 md:space-y-0 md:space-x-8">
    <div className="text-white w-full sm:w-[45%] md:w-[45%] text-center z-10 shadow-2xl bg-transparent backdrop-blur-lg p-6 rounded-lg border-2 border-blue-900">
        <details className="text-left" open={true}>
            <summary className="cursor-pointer text-2xl sm:text-3xl font-bold mb-4">Description</summary>
            <p className="text-lg sm:text-xl">
                <span className="font-bold">text_prompt (required, string):</span> &quot;a flying bird&quot; <br />
                <span className="font-bold">width (optional, int):</span> default to be 1344; output video width <br />
                <span className="font-bold">height (optional, int):</span> default to be 768; output video height <br />
                <span className="font-bold">motion (optional, int):</span> default to be 5; Increase or decrease the intensity of motion in your video. Higher values result in more motion. <br />
                <span className="font-bold">seed (optional, int):</span> default to be 0, means random value <br />
                <span className="font-bold">upscale (optional, bool):</span> default to be true <br />
                <span className="font-bold">interpolate (optional, bool):</span> default to be true
            </p>
        </details>
    </div>

    <div className="relative z-10 w-full sm:w-[45%] md:w-[45%] p-6 bg-transparent backdrop-blur-lg rounded-lg shadow-blue-900 shadow-2xl text-white border-2 border-blue-900">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">AI Video & Gif Generator</h1>

        <form onSubmit={fetchImage} className='flex flex-col gap-4 text-lg'>
            <input
                type='text'
                value={textPrompt}
                onChange={(ev) => setTextPrompt(ev.target.value)}
                placeholder="Text Prompt"
                className="w-full p-3 mb-2 border bg-gray-900 rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                    type='number'
                    value={width}
                    onChange={(ev) => setWidth(Number(ev.target.value))}
                    placeholder="Width..."
                    className="w-full p-3 border bg-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                />
                <input
                    type='number'
                    value={height}
                    onChange={(ev) => setHeight(Number(ev.target.value))}
                    placeholder="Height"
                    className="w-full p-3 border bg-gray-900 rounded-md focus:outline-none focus:border-blue-500"
                />
            </div>
            <input
                type='number'
                value={motion}
                onChange={(ev) => setMotion(Number(ev.target.value))}
                placeholder="Motion"
                className="w-full p-3 border bg-gray-900 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
                type='number'
                value={seed}
                onChange={(ev) => setSeed(Number(ev.target.value))}
                placeholder="Seed"
                className="w-full p-3 border bg-gray-900 rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="flex items-center">
                <input
                    type='checkbox'
                    checked={upscale}
                    onChange={(ev) => setUpscale(ev.target.checked)}
                    className="mr-2"
                />
                <label>Upscale</label>
            </div>
            <div className="flex items-center">
                <input
                    type='checkbox'
                    checked={interpolate}
                    onChange={(ev) => setInterpolate(ev.target.checked)}
                    className="mr-2"
                />
                <label>Interpolate</label>
            </div>
            <button type="submit" className="w-full p-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Generate
            </button>
        </form>
    </div>

    <div className="absolute inset-0 z-0">
        <img src="https://i.gifer.com/J4o.gif" alt="Background" className="object-cover w-full h-full bg-blue-700" />
    </div>
</div>


    );
}

export default MainHome;
