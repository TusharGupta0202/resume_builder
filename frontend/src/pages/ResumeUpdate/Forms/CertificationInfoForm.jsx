import Input from "../../../components/Inputs/Input"
import { LuPlus, LuTrash2 } from 'react-icons/lu'

const CertificationInfoForm = ({certificationInfo, updateArrayItem, addArrayItem, removeArrayItem}) => {
  return (
    <div className="px-5 pt-5">
         <h2 className="text-lg font-semibold text-gray-900">Certifications</h2>
        <div className="flex flex-col gap-4 mt-4 mb-3">
            {certificationInfo.map((certificate,index) => (
                <div
                    key={index}
                    className="relative p-4 border rounded-lg border-gray-200/80"
                >
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">  
                        <Input 
                            label="Certificate Title"
                            placeholder="Certification Name"
                            type="text"
                            value={certificate.title || ""}
                            onChange={(e) => updateArrayItem(index,"title",e.target.value)}
                        />
                        <Input 
                            label="Issuer"
                            placeholder="Name Of Issuer"
                            type="text"
                            value={certificate.issuer || ""}
                            onChange={(e) => updateArrayItem(index, "issuer", e.target.value)}
                        />
                        <Input 
                            label="Year"
                            placeholder="Year of Issuance"
                            type="text"
                            value={certificate.year || ""}
                            onChange={(e) => updateArrayItem(index, "year", e.target.value)}
                        />
                    </div>
                    {certificationInfo.length >1 && (
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
                onClick={() => addArrayItem({title : "",issuer : "", year : ""})}
            >
                <LuPlus /> Add Certificate
            </button>
        </div>
    </div>
  )
}

export default CertificationInfoForm