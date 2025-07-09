import Input from '../../../components/Inputs/Input'
import { LuPlus, LuTrash2 } from 'react-icons/lu'

const WorkExperienceForm = ({workExperience, updateArrayItem, addArrayItem, removeArrayItem}) => {
  return (
    <div className='px-5 pt-5'>
        <h2 className='text-lg font-semibold text-gray-900'>
            Work Experience
        </h2>
        
        <div className='flex flex-col gap-4 mt-4 mb-3'>
            {workExperience.map((experience, index) => (
                <div key={index} className="relative p-4 border rounded-lg border-gray-200/80">
                    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                        <Input
                            label="Company"
                            type="text"
                            value={experience.company || ""}
                            placeholder="Company Name"
                            onChange={({target}) => updateArrayItem(index, "company", target.value)}
                        />
                        <Input
                            label="Role"
                            type="text"
                            value={experience.role || ""}
                            placeholder="Role / Job Title"
                            onChange={({target}) => updateArrayItem(index, "role", target.value)}
                        />
                        <Input
                            label="Start Date"
                            type="month"
                            value={experience.startDate || ""}
                            onChange={({target}) => updateArrayItem(index, "startDate", target.value)}
                        />
                        <Input
                            label="End Date"
                            type="month"
                            value={experience.endDate || ""}
                            onChange={({target}) => updateArrayItem(index, "endDate", target.value)}
                        />
                    </div>
                    
                    <div className='mt-4'>
                        <label className='text-xs font-medium text-gray-600'>
                            Description
                        </label>
                        <textarea
                            value={experience.description || ""}
                            onChange={({target}) => updateArrayItem(index, "description", target.value)}
                            placeholder="What did you do in this role?"
                            className="w-full mt-1 form-input"
                            rows={3}
                        />
                    </div>
                    {workExperience.length > 1 && (
                        <button
                            onClick={() => removeArrayItem(index)}
                            className="remove-section"
                        >
                            <LuTrash2 />
                        </button>
                    )}
                </div>
            ))}

            <button
                onClick={() => addArrayItem({ company: "", role: "", startDate: "", endDate: "", description: "" })}
                className="add-section"
            >
                <LuPlus /> Add Experience
            </button>
        </div>
    </div>
  )
}

export default WorkExperienceForm