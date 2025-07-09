import Input from "../../../components/Inputs/Input"
import { LuPlus, LuTrash2 } from 'react-icons/lu'

const EducationDetailsForm = ({educationInfo, updateArrayItem, addArrayItem, removeArrayItem}) => {
  return (
    <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-gray-900 ">Education</h2>
        <div className="flex flex-col gap-4 mt-4 mb-3" >
            {educationInfo.map((education, index) => (
                <div key={index} className="relative p-4 border rounded-lg border-gray-200/80">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                            label="Degree"
                            type="text"
                            placeholder="Enter your degree"
                            value={education.degree || ""}
                            onChange={({target}) => updateArrayItem(index, 'degree', target.value)}
                        />
                        <Input
                            label="Institution"
                            type="text"
                            placeholder="Enter institution name"
                            value={education.institution || ""}
                            onChange={({target}) => updateArrayItem(index, 'institution', target.value)}
                        />
                        <Input
                            label="Start Date"
                            type="month"
                            value={education.startDate || ""}
                            onChange={({target}) => updateArrayItem(index, 'startDate', target.value)}
                        />
                        <Input
                            label="End Date"
                            type="month"
                            value={education.endDate || ""}
                            onChange={({target}) => updateArrayItem(index, 'endDate', target.value)}
                        />
                    </div>
                    {educationInfo.length > 1 && (
                        <button 
                            type="button" 
                            className="remove-section"
                            onClick={() => removeArrayItem(index)}
                        >
                            <LuTrash2 />
                        </button>
                    )}
                </div>    
            ))}
            <button 
                type="button" 
                className="add-section"
                onClick={() => addArrayItem({ degree: "", institution: "", startDate: "", endDate: "" })}
            >
                <LuPlus /> Add Education
            </button>
        </div>
    </div>
  )
}

export default EducationDetailsForm