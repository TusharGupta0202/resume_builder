import ProfilePhotoSelector from "../../../components/Inputs/ProfilePhotoSelector"
import Input from "../../../components/Inputs/Input"

const ProfileInfoForm = ({profileData, updateSection, onNext}) => {
  return (
    <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>

        <div className="mt-4">
            <ProfilePhotoSelector 
                image={profileData?.profileImg || profileData?.profilePreviewUrl}
                setImage={(value) => updateSection("profileImg", value)}
                preview={profileData?.profilePreviewUrl}
                setPreview={(value) => updateSection("profilePreviewUrl", value)}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input 
                    label="Full Name"
                    value={profileData?.fullName || ""}
                    onChange={({target}) => updateSection("fullName", target.value)}
                    placeholder="Enter your full name"
                    type="text"
                />
                <Input 
                    label="Designation"
                    value={profileData?.designation || ""}
                    onChange={({target}) => updateSection("designation", target.value)}
                    placeholder="Enter your designation"
                    type="text"
                />
                <div className="col-span-2 mt-3">
                    <label className="text-xs font-medium text-slate-600">
                        Summary
                    </label>

                    <textarea 
                        value={profileData?.summary || ""}
                        onChange={({target}) => updateSection("summary", target.value)}
                        placeholder="Write a brief summary about yourself"
                        className="form-input"
                        rows={4}    
                    />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileInfoForm