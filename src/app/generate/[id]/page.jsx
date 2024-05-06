"use client"
import React, { useEffect, useState } from 'react';

const Generate = ({ params }) => {
    const { id } = params;

    const [getdata, setgetdata] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pageReloaded, setPageReloaded] = useState(false); // State variable to track page reload

    // 9d13208c-b3c0-4717-989c-38c559a7bbf8
    useEffect(() => {
        fetchData();
    }, [id]); // Fetch data only once on component mount


    useEffect(() => {
        if (getdata.status === "success") {
            if (!localStorage.getItem('pageReloaded')) {
                console.log("page reload initiated");
                localStorage.setItem('pageReloaded', true);
                localStorage.setItem('savedVideoUrl', getdata.url); // Store video URL
                localStorage.setItem('savedGifUrl', getdata.gif_url); // Store GIF URL
                window.location.reload();
            }
        }
    }, [getdata.status]);

//    useEffect(() => {
//         if (getdata.status === "success" && !pageReloaded) {
//             localStorage.setItem('savedVideoUrl', getdata.url);
//             localStorage.setItem('savedGifUrl', getdata.gif_url);
//             window.location.reload();
//             setPageReloaded(true);
//         }
//     }, []); 

    const fetchData = () => {
        fetch(`https://runwayml.p.rapidapi.com/status?uuid=${id}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '8bdce9a8cemshd13478060ca5e16p1de2c8jsn3cf75b553f3c',
                'X-RapidAPI-Host': 'runwayml.p.rapidapi.com'
            }
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setgetdata(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setError('Failed to fetch data');
                setLoading(false);
                // setIsLoading(false); // Set loading to false in case of error
            });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url('https://i.gifer.com/J4o.gif')` }}>
            <div className=" text-white max-w-md mx-auto p-8 rounded-lg shadow-2xl bg-transparent backdrop-blur-lg border-2 border-blue-900">
            {loading ? (
                    <div>Generating... This will take a few minutes</div>
                ) : (
                    <div>
                        <h1 className="flex justify-center items-center text-3xl font-bold mb-4">{getdata.status}</h1>
                        <h1 className='  text-xl font-bold'>Video: </h1>
                        {getdata.url && (
                            <video controls className="mb-4">
                                <source src={getdata.url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        <h1 className='  text-xl font-bold'>GIF: </h1>
                        <img src={getdata.gif_url} alt="Generated GIF" className="w-full" />
                    </div>
                )}
                {error && <div>Error: {error}</div>}
            </div>
        </div>
    );
};

export default Generate;






