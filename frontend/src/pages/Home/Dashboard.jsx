import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { LuCirclePlus } from "react-icons/lu";
import moment from "moment";
import ResumeSummaryCard from "../../components/Cards/ResumeSummaryCard";
import CreateResumeForm from "./CreateResumeForm";
import Modal from "../../components/Modal";

const Dashboard = () => {

  const navigate = useNavigate();

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [allResumes, setAllResumes] = useState(null)

  const fetchAllResumes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_ALL);
      setAllResumes(response.data);      
    } catch (error) {
      console.error("Error fetching resumes:", error);  
    }
  }
  useEffect(() => {
    fetchAllResumes();
  }, []);


  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-4 px-4 pt-1 pb-6 md:grid-cols-5 md:gap-7 md:px-0">
        <div onClick={() => setOpenCreateModal(true)} className="h-[300px] flex flex-col items-center justify-center rounded-lg border border-purple-100 bg-white cursor-pointer hover:border-purple-300 hover:bg-purple-50/5">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-200/60">
            <LuCirclePlus className="text-xl text-purple-500 " />
          </div>
          <h3 className="font-medium text-gray-800">Add New Resume</h3>
        </div>
        {allResumes?.map((resume) => {
         return (
          <ResumeSummaryCard
            key={resume._id}
            imgUrl = {resume?.thumbnailLink || null}
            title={resume.title}
            lastUpdated = {
              resume?.updatedAt 
              ? moment(resume.updatedAt).format("MMM DD, YYYY") 
              :  ""
            }
            onSelect={() => navigate(`/resume/${resume._id}`)}
          />
         )
        })}
      </div>
      <Modal 
        isOpen={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
        hideheader
      >
        <div>
          <CreateResumeForm />
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default Dashboard