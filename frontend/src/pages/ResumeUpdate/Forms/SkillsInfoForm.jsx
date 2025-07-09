import Input from "../../../components/Inputs/Input"
import { LuPlus, LuTrash2 } from 'react-icons/lu'
import RatingInput from "../../../components/ResumeSections/RatingInput"

const SkillsInfoForm = ({skillsInfo, updateArrayItem, addArrayItem, removeArrayItem}) => {
  return (
    <div className="px-5 pt-3">
        <h2 className="text-lg font-semibold text-gray-900">Skills</h2>
        <div className="flex flex-col gap-4 mt-4 mb-3">
            {skillsInfo.map((skill, index) => (
                <div key={index} className="relative p-4 border rounded-lg border-gray-200/80">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Input
                            label="Skill Name"
                            type="text"
                            placeholder="Enter your skill"
                            value={skill.name || ""}
                            onChange={({target}) => updateArrayItem(index, 'name', target.value)}
                        />

                        <div className="flex flex-col">
                            <label className="text-[13px] mb-1 text-slate-800">
                                Proficiency ({skill.progress / 20 || 0}/5)
                            </label>
                            <div className="mt-5">
                                <RatingInput 
                                    value={skill.progress || 0}
                                    onChange={(value) => updateArrayItem(index, 'progress', value)}
                                    total={5}  
                                />
                            </div>
                        </div>
                    </div>

                    {skillsInfo.length > 1 && (
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
                onClick={() => addArrayItem({ name: "", progress: 0 })}
            >
                <LuPlus /> Add Skill
            </button>
        </div>
    </div>
  )
}

export default SkillsInfoForm