"use client"
import React, { useEffect, useState } from 'react';

const Generate = ({ params }) => {
    const { id } = params;

    const [getdata, setgetdata] = useState({});
    // const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchData();
    }, [id]); // Fetch data only once on component mount

    const fetchData = () => {
        fetch(`https://runwayml.p.rapidapi.com/status?uuid=${id}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '5b79a64edbmsh42751b43f11af57p17f943jsn21e7b4d8851a',
                'X-RapidAPI-Host': 'runwayml.p.rapidapi.com'
            }
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setgetdata(data);
                if (data.status === "success") {
                    window.location.reload(); // Reload the page if status is "success"
                }
                // if (data.status !== "success") {
                //     setTimeout(fetchData, 1000); // Fetch again after 1 second if status is not "success"
                // } else {
                //     setIsLoading(false); // Set loading to false when status is "success"
                // }
            })
            .catch(error => {
                console.error('Error:', error);
                setError('Failed to fetch data');
                // setIsLoading(false); // Set loading to false in case of error
            });
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-cover bg-center" style={{ backgroundImage: `url('https://i.gifer.com/J4o.gif')` }}>
            <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
                {getdata.status === "success" ? (
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
                ): (
                    <div>Generating... This will take a few minutes</div>
                )}
                {error && <div>Error: {error}</div>}
            </div>
        </div>
    );
};

export default Generate;






