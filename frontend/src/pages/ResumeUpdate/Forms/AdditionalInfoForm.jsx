import Input from "../../../components/Inputs/Input"
import { LuPlus, LuTrash2 } from 'react-icons/lu'
import RatingInput from "../../../components/ResumeSections/RatingInput"

const AdditionalInfoForm = ({languages, interests, updateArrayItem, addArrayItem, removeArrayItem}) => {
  return (
    <div className="px-5 pt-5">
        <h2 className="text-lg font-semibold text-gray-900">Additional Info</h2>

        <div className="mt-6">
            <h3 className="mb-2 text-sm font-semibold text-gray-700">Languages</h3>
            <div className="flex flex-col gap-4">
                {languages?.map((language,index) => (
                    <div
                        key={index}
                        className="relative p-4 border border-gray-200 rounded-lg"
                    >
                        <div className="grid items-start grid-cols-1 gap-4 md:grid-cols-2">
                            <Input
                                label="Language"
                                placeholder="Language"
                                value={language.name ||""}
                                onChange={(e) => updateArrayItem("languages", index, "name", e.target.value)}
                            />
                            <div>
                                <label  className="block text-xs font-medium text-slate-600 mb-7">
                                    Proficiency 
                                </label>
                                <RatingInput
                                    value={language.progress || 0}
                                    onChange={(value) => updateArrayItem("languages", index, "progress", value)}
                                    total={5}
                                    activeColor="#0ea5e9"
                                    inactiveColor="#e0f2fe"
                                />
                            </div>
                        </div>
                        {languages.length > 1 && (
                            <button
                                type="button"
                                className="remove-section"
                                onClick={(index) => removeArrayItem("languages", index)}
                            >
                                <LuTrash2 />
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className="add-section"
                    onClick={() => addArrayItem("languages", {name : "", progress : 0})}
                >
                    <LuPlus /> Add Language
                </button>
            </div>

            <div className="mt-8 mb-4">
                <h3 className="text-sm font-semibold text-gray-700">Interests</h3>
                <div className="flex flex-col">
                    {interests?.map((interest,index) => (
                    <div
                        key={index}
                        className="relative rounded-lg"
                    >
                        <Input
                            value={interest || ""}
                            placeholder="Your Interests"
                            onChange={(e) => updateArrayItem("interests", index, null, e.target.value)}
                        />
                        {interests.length > 1 &&(
                            <button
                                type="button"
                                className="absolute text-sm text-red-600 cursor-pointer top-6.5 right-3 hover:underline"
                                onClick={(index) => removeArrayItem("interests", index)}
                            >
                                <LuTrash2 />
                            </button>
                        )}
                    </div>
                ))}
                <button
                    type="button"
                    className="add-section"
                    onClick={() => addArrayItem("interests", "")}
                >
                    <LuPlus /> Add Interest
                </button>
                </div> 
            </div>
        </div>
    </div>
  )
}

export default AdditionalInfoForm