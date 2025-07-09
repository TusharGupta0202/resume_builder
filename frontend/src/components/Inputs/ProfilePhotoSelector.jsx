import { useRef, useState } from 'react'
import {LuUser, LuUpload, LuTrash} from 'react-icons/lu'

const ProfilePhotoSelector = ({image, setImage, preview, setPreview}) => {

    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = ({target}) => {
        const file = target.files[0];
        if (file) {
            setImage(file); 
            const preview = URL.createObjectURL(file);
            if (setPreview) {
                setPreview(preview);
            }
            setPreviewUrl(preview);
        }
    }

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
        if (setPreview) {
           setPreview(null);
        }
    }

    const onChooseFile = () => {
        inputRef.current.click();
    }


  return (
    <div className='flex justify-center mb-6'>
         <input
            type="file"
            accept="image/*"
            ref={inputRef}
            onChange={handleImageChange}
            className="hidden"
        />

        {!image ? (
            <div className='relative flex items-center justify-center w-20 h-20 rounded-full cursor-pointer bg-purple-50 '>
                <LuUser className="text-4xl text-purple-500" />

                <button
                    type='button'
                    className='absolute flex items-center justify-center w-8 h-8 text-white rounded-full cursor-pointer bg-linear-to-r from-purple-500/85 to-purple-700 -bottom-1 -right-1'
                    onClick={onChooseFile}
                >
                    <LuUpload/>
                </button>
            </div>
        ) : (
            <div className='relative'>
                <img
                    src={preview || previewUrl}
                    alt="Profile"
                    className='object-cover w-20 h-20 rounded-full'
                />
                <button
                    type='button'
                    className='absolute flex items-center justify-center w-8 h-8 text-white bg-red-500 rounded-full cursor-pointer -bottom-1 -right-1'
                    onClick={handleRemoveImage}
                >
                    <LuTrash/>
                </button>
            </div>
        )} 
    </div>
  )
}

export default ProfilePhotoSelector