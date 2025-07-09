import Input from "../../../components/Inputs/Input"
import { LuPlus, LuTrash2 } from 'react-icons/lu'

const ProjectsDetailForm = ({projectInfo, updateArrayItem, addArrayItem, removeArrayItem}) => {
  return (
    <div className="px-5 py-5">
        <h2 className="text-lg font-semibold text-gray-900">Projects</h2>
        <div className="flex flex-col gap-4 mt-4 mb-3">
            {projectInfo.map((project,index) => (
                <div
                    key={index}
                    className="relative p-4 border rounded-lg border-gray-200/80"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="col-span-2">
                            <Input 
                                label="Project Title"
                                placeholder="Enter Your Project Name"
                                type="text"
                                value={project.title || ""}
                                onChange={({target}) => updateArrayItem(index,"title",target.value)}
                            />
                        </div>
                        <div className="col-span-2">
                            <label className="text-xs font-medium text-slate-600">
                                Description
                            </label>
                            <textarea 
                                placeholder="Short Description About The Project"
                                className="w-full mt-1 form-input"
                                rows={3}
                                value={project.description || ""}
                                onChange={({target}) => updateArrayItem(index, "description", target.value)}
                            />
                        </div>
                        <Input 
                            label="GitHub Link"
                            placeholder="Your GitHub Repository"
                            type="url"
                            value={project.github || ""}
                            onChange={({target}) => updateArrayItem(index, "github", target.value)}
                        />
                        <Input 
                            label="Live Demo URL"
                            placeholder="Your Application Demo"
                            type="url"
                            value={project.liveDemo || ""}
                            onChange={({target}) => updateArrayItem(index, "liveDemo", target.value)}
                        />
                    </div>
                    {projectInfo.length >1 && (
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
                onClick={() => addArrayItem({title : "", designation : "", github : "", liveDemo : ""})}
            >
                <LuPlus /> Add Project
            </button>
        </div>
    </div>
  )
}

export default ProjectsDetailForm