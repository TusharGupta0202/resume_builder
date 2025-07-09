import { useEffect, useState } from 'react'
import { getLightColorFromImage } from '../../utils/helper';

const ResumeSummaryCard = ({imgUrl, title, lastUpdated, onSelect}) => {
    const [bgColor, setBgColor] = useState("#ffffff");
    useEffect(() => {
        if (imgUrl) {
            getLightColorFromImage(imgUrl)
            .then(color => {
                setBgColor(color);
            })
            .catch(() => {
                setBgColor("#ffffff");
            });
        }
    }, [imgUrl]);
    
  return (
    <div className='h-[300px] flex flex-col items-center justify-between bg-white rounded-lg border border-gray-200 hover:border-purple-200 overflow-hidden cursor-pointer' onClick={onSelect} style={{ backgroundColor: bgColor }}>
        <div className="p-4">
            {imgUrl ? (
            <img src={imgUrl} alt="Resume Thumbnail" className="w-[100%] h-[200px] rounded" />
            ) : (
                <div className="flex items-center justify-center w-full h-40 mb-2 bg-gray-200 rounded-lg">

                </div>
            )}
        </div>
        <div className='w-full px-4 py-3 bg-white'>
            <h5 className='overflow-hidden text-sm font-medium truncate whitespace-nowrap'>{title}</h5>
            <p className="text-xs font-medium mt-0.5 text-gray-500">Last Updated: {lastUpdated}</p>
        </div>
    </div>
  )
}

export default ResumeSummaryCard