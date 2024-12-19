'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

// Define the interface for the disaster data
interface DisasterData {
  id: string;
  title: string;
  cause: string;
  prevention: string;
  youtubeLinks: string[];
  areasProne: string[];
}

const DisasterPage = () => {
  const { disaster } = useParams(); // Get the dynamic route parameter
  const [disasterData, setDisasterData] = useState<DisasterData | null>(null);

  useEffect(() => {
    if (disaster) {
      fetch('/disasters.json')
        .then((res) => res.json())
        .then((data: DisasterData[]) => {
          const disasterInfo = data.find((item) => item.id === disaster);
          if (disasterInfo) {
            setDisasterData(disasterInfo);
          }
        });
    }
  }, [disaster]);

  if (!disasterData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-800 py-12">
      <div className="container mx-auto px-8">
        <h1 className="text-4xl font-extrabold text-white mb-8">{disasterData.title}</h1>

        <div className="bg-gray-900 rounded-lg p-8 mb-12">
          <h2 className="text-2xl text-white mb-4">Cause</h2>
          <p className="text-lg text-white">{disasterData.cause}</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-8 mb-12">
          <h2 className="text-2xl text-white mb-4">Preventive Measures</h2>
          <p className="text-lg text-white">{disasterData.prevention}</p>
        </div>

        <div className="bg-gray-900 rounded-lg p-8 mb-12">
          <h2 className="text-2xl text-white mb-4">YouTube Videos</h2>
          <div className="space-y-4">
            {disasterData.youtubeLinks.map((link, index) => {
              return (
                <div key={index}>
                  <ReactPlayer url={link} width="640px" height="390px" />
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-8">
          <h2 className="text-2xl text-white mb-4">Areas Prone to {disasterData.title}</h2>
          <ul className="list-disc text-lg text-white pl-8">
            {disasterData.areasProne.map((area, index) => (
              <li key={index}>{area}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DisasterPage;
