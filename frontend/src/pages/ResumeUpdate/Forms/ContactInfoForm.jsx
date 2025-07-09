import Input from '../../../components/Inputs/Input'

const ContactInfoForm = ({contactInfo,updateSection}) => {
  return (
    <div className='px-5 pt-5'>
        <h2 className='text-lg font-semibold text-gray-900'>
            Contact Information
        </h2>

        <div className='grid grid-cols-1 gap-4 mt-4 md:grid-cols-2'>
            <div className='col-span-2'>
                <Input
                    label="Address"
                    value={contactInfo?.location || ""}
                    onChange={({target}) => updateSection("location", target.value)}
                    placeholder="Enter your Address"
                    type="text"
                />
            </div>

            <Input
                label="Email"
                value={contactInfo?.email || ""}
                onChange={({target}) => updateSection("email", target.value)}
                placeholder="Enter your Email"
                type="email"
            />

            <Input
                label="Phone Number"
                value={contactInfo?.phone || ""}
                onChange={({target}) => updateSection("phone", target.value)}
                placeholder="Enter your Phone Number"
                type="text"
            />

            <Input
                label="LinkedIn"
                value={contactInfo?.linkedIn || ""}
                onChange={({target}) => updateSection("linkedIn", target.value)}
                placeholder="Enter your LinkedIn Profile URL"
                type="text"
            />
            <Input
                label="GitHub"
                value={contactInfo?.github || ""}
                onChange={({target}) => updateSection("github", target.value)}
                placeholder="Enter your GitHub Profile URL"
                type="text"
            />
            <div className='md:col-span-2'>
                <Input
                    label="Portfolio / Website"
                    value={contactInfo?.website || ""}
                    onChange={({target}) => updateSection("website", target.value)}
                    placeholder="Enter your Website URL"
                    type="text"
                />
            </div>
        </div>
    </div>
  )
}

export default ContactInfoForm