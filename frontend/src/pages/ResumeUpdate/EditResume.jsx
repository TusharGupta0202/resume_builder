import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {LuArrowLeft, LuCircleAlert, LuDownload,LuSave,LuPalette,LuTrash2} from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import TitleInput from "../../components/Inputs/TitleInput";
import { useReactToPrint } from "react-to-print";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import StepProgress from "../../components/StepProgress";
import ProfileInfoForm from "./Forms/ProfileInfoForm";
import ContactInfoForm from "./Forms/ContactInfoForm";
import WorkExperienceForm from "./Forms/WorkExperienceForm";
import EducationDetailsForm from "./Forms/EducationDetailsForm";
import SkillsInfoForm from "./Forms/SkillsInfoForm";
import ProjectsDetailForm from "./Forms/ProjectsDetailForm";
import CertificationInfoForm from "./Forms/CertificationInfoForm";
import AdditionalInfoForm from "./Forms/AdditionalInfoForm";
import RenderResume from "../../components/ResumeTemplates/RenderResume";
import { captureElementAsImage, dataURLToFile, fixTailwindColors } from "../../utils/helper";
import ThemeSelector from "./ThemeSelector";
import Modal from "../../components/Modal";

const EditResume = () => {

  const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];

  const {  resumeId } = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setBaseWidth] = useState(800);

  const [openThemeSelector, setOpenThemeSelector] = useState(false);

  const [openPreviewModal, setOpenPreviewModal] = useState(false);

  const [currentPage, setCurrentPage] = useState("profile-info");

  const [progress, setProgress ] = useState(0);

  const [resumeData, setResumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg:null,
      profilePreviewUrl: "",
      fullName: "",
      designation: "",
      summary: ""
    },
    template : {
      theme : "",
      colorPalette: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      website: "",
      linkedIn: "",
      github: "",
    },
    workExperience: [{
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
    },],
    education: [{
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
    }],
    skills: [{
        name: "",
        progress: 0,
    }],
    projects: [{
        title: "",
        description: "",
        github: "",
        liveDemo: "",
    }],
    certifications: [{
        title: "",
        issuer: "",
        year: "",
    }],
    languages: [{
        name: "",
        progress: 0,
    }],
    interests : [""],
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const progressChange = (goToIndex) => {
    const percent = Math.round((goToIndex/(pages.length-1)) *100);
      setProgress(percent);
      window.scrollTo({top : 0, behavior : "smooth" });
  };
  
  const validateAndNext = (e) => {
    const errors = [];

    switch (currentPage) {
      case "profile-info":
        const {fullName,designation,summary} = resumeData.profileInfo;
        if(!fullName.trim()) errors.push("Full Name is required");
        if(!designation.trim()) errors.push("Designation is required");
        if(!summary.trim()) errors.push("Summary is required");
        break;
      
      case "contact-info" :
        const {email,phone} = resumeData.contactInfo;
        if(!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
          errors.push("Valid email is required");
        if(!phone.trim())
          errors.push("Valid 10-digit phone is required");
        break;
      
      case "work-experience":
        resumeData.workExperience.forEach(
          ({company, role, startDate, endDate }, index) => {
            if(!company.trim())
              errors.push(`Company is required in experience ${index+1}`);
            if(!role.trim())
              errors.push(`Role is required in experience ${index+1}`);
            if(!startDate || !endDate)
              errors.push(`Start and End dates are required in experience ${index+1}`);
          }
        );
        break;
      
      case "education-info" :
        resumeData.education.forEach(
          ({degree, institution, startDate, endDate }, index) => {
            if(!degree.trim())
              errors.push(`Degree is required in education ${index+1}`);
            if(!institution.trim())
              errors.push(`Institution is required in education ${index+1}`);
            if(!startDate || !endDate)
              errors.push(`Start and End dates are required in education ${index+1}`);
          }
        );
        break;
      
      case "skills" :
        resumeData.skills.forEach(({ name, progress}, index) => {
            if(!name.trim())
              errors.push(`Skill name is required in skill ${index+1}`);
            if(progress < 1 || progress > 100) 
              errors.push(`Skill Progress must be between 1 and 100 in skill ${index+1}`)
          }
        );
        break;

      case "projects" :
        resumeData.projects.forEach(({ title, description}, index) => {
            if(!title.trim())
              errors.push(`Project title is required in project ${index+1}`);
            if(!description.trim()) 
              errors.push(`Project description is required in Project ${index+1}`)
          }
        );
        break;

      case "certifications" : 
        resumeData.certifications.forEach(({ title, issuer}, index) => {
            if(!title.trim())
              errors.push(`Certification title is required in Certification ${index+1}`);
            if(!issuer.trim()) 
              errors.push(`Issuer is required in Certification ${index+1}`)
          }
        );
        break;
      
      case "additionalInfo" :
        if(resumeData.languages.length===0 || !resumeData.languages[0].name?.trim())
          errors.push("At least one language is required")
        if(resumeData.interests.length===0 || !resumeData.interests[0]?.trim())
          errors.push("At least one interest is required")
        break;
      
      default: break;
    }

    if(errors.length >0){
      setErrorMsg(errors.join(", "));
      return;
    }
    setErrorMsg("");
    goToNextStep();
  };

  const goToNextStep = () => {

    if(currentPage === "additionalInfo") setOpenPreviewModal(true);
        
    const currentIndex = pages.indexOf(currentPage);
    if(currentIndex !==-1 && currentIndex < pages.length - 1) {
      const nextIndex = currentIndex +1;
      setCurrentPage(pages[nextIndex]);
      progressChange(nextIndex);
    }
  };
  
  const goBack = () => {
    if(currentPage === "profile-info") navigate("/dashboard");

    const currentIndex = pages.indexOf(currentPage);
    if(currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentPage(pages[prevIndex]);
      progressChange(prevIndex);
    }
  };

  const renderForm = () => {
    switch (currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm 
            profileData={resumeData?.profileInfo}
            updateSection={(key, value) => {
              updateSection("profileInfo", key, value);
            }}
            onNext={validateAndNext}
          />
        );
      case "contact-info":
        return (
          <ContactInfoForm
            contactInfo={resumeData?.contactInfo}
            updateSection={(key, value) => {
              updateSection("contactInfo", key, value);
            }}
          />
        );
      case "work-experience":
        return (
          <WorkExperienceForm
            workExperience={resumeData?.workExperience || []}
            updateArrayItem={(index, key, value) => updateArrayItem("workExperience", index, key, value)}
            addArrayItem={(newItem) => addArrayItem("workExperience", newItem)}
            removeArrayItem={(index) => removeArrayItem("workExperience", index)}
          />
        );
      case "education-info":
        return (
          <EducationDetailsForm
            educationInfo={resumeData?.education}
            updateArrayItem={(index, key, value) => updateArrayItem("education", index, key, value)}
            addArrayItem={(newItem) => addArrayItem("education", newItem)}
            removeArrayItem={(index) => removeArrayItem("education", index)}
          />
        );
      case "skills":
        return (
          <SkillsInfoForm
            skillsInfo={resumeData?.skills}
            updateArrayItem={(index, key, value) => updateArrayItem("skills", index, key, value)}
            addArrayItem={(newItem) => addArrayItem("skills", newItem)}
            removeArrayItem={(index) => removeArrayItem("skills", index)}
          />
        );
      case "projects":
        return (
          <ProjectsDetailForm 
            projectInfo={resumeData?.projects}
            updateArrayItem={(index, key, value) => updateArrayItem("projects", index, key, value)}
            addArrayItem={(newItem) => addArrayItem("projects", newItem)}
            removeArrayItem={(index) => removeArrayItem("projects", index)}
          />
        );
      case "certifications":
        return (
          <CertificationInfoForm 
            certificationInfo={resumeData?.certifications}
            updateArrayItem={(index, key, value) => updateArrayItem("certifications", index, key, value)}
            addArrayItem={(newItem) => addArrayItem("certifications", newItem)}
            removeArrayItem={(index) => removeArrayItem("certifications", index)}
          />
        )
      case "additionalInfo" :
        return (
          <AdditionalInfoForm 
            languages={resumeData?.languages}
            interests={resumeData?.interests}
            updateArrayItem={(section, index, key, value) => updateArrayItem(section, index, key, value)}
            addArrayItem={(section, newItem) => addArrayItem(section, newItem)}
            removeArrayItem={(section, index) => removeArrayItem(section, index)}
          />
        )
      default:
        return null;
    }
  };

  const updateSection = (section,key,value) => {
    setResumeData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: value
      }
    }));
  };

  const updateArrayItem = (section, index, key, value) => {
    setResumeData((prevState) => {
      const updatedArray = [...prevState[section]];
      if(key === null)
      {
        updatedArray[index] = value;
      }
      else {
        updatedArray[index] = {
        ...updatedArray[index],
        [key]: value
      };
      }
  
      return {
        ...prevState,
        [section]: updatedArray
      };
    });
  };

  const addArrayItem = (section,newItem) => {
    setResumeData((prevState) => ({
      ...prevState,
      [section]: [...prevState[section], newItem]
    }));
  };

  const removeArrayItem = (section, index) => {
    setResumeData((prevState) => {
      const updatedArray = [...prevState[section]];
      updatedArray.splice(index, 1);
      return {
        ...prevState,
        [section]: updatedArray
      };
    });
  };

  const fetchResumeDetailsById = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.RESUME.GET_BY_ID(resumeId));
      
      if(response.data && response.data.profileInfo) { 
        const resumeInfo = response.data;

        setResumeData((prevState) => {
          const updatedData = {
            ...prevState,
            title: resumeInfo?.title || "Untitled",
            template: resumeInfo?.template || prevState?.template,
            profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
            contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
            workExperience: resumeInfo?.workExperience || prevState?.workExperience,
            education: resumeInfo?.education || prevState?.education,
            skills: resumeInfo?.skills || prevState?.skills,
            projects: resumeInfo?.projects || prevState?.projects,
            certifications: resumeInfo?.certifications || prevState?.certifications,
            languages: resumeInfo?.languages || prevState?.languages,
            interests: resumeInfo?.interests || prevState?.interests,
          };
          return updatedData;
        });
        
      }
    } catch (error) {
      console.error("Error fetching resume details:", error);
    }
  };

const uploadResumeImages = async () => {
  try {
    setIsLoading(true);
    fixTailwindColors(resumeRef.current);

    // Capture thumbnail from resume preview
    const imageDataUrl = await captureElementAsImage(resumeRef.current);

    const thumbnailFile = dataURLToFile(
      imageDataUrl,
      `resume-${resumeId}.png`
    );

    const profileImageFile =
      resumeData?.profileInfo?.profileImg || null;

    const formData = new FormData();

    if (profileImageFile) {
      formData.append("profileImg", profileImageFile);
    }

    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }

    // 🚀 Upload to backend
    const uploadResponse = await axiosInstance.put(
      API_PATHS.RESUME.UPLOAD_IMAGES(resumeId),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const { thumbnailLink, profilePreviewUrl } =
      uploadResponse.data;

    // Update local state immediately so preview updates
    setResumeData((prev) => ({
      ...prev,
      thumbnailLink: thumbnailLink || prev.thumbnailLink,
      profileInfo: {
        ...prev.profileInfo,
        profilePreviewUrl:
          profilePreviewUrl || prev.profileInfo.profilePreviewUrl,
      },
    }));

    // Update DB resume data
    await updateResumeDetails(
      thumbnailLink,
      profilePreviewUrl
    );

    toast.success("Resume Updated Successfully!");
    navigate("/dashboard");
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    toast.error("Failed to upload Images");
  } finally {
    setIsLoading(false);
  }
};


  const updateResumeDetails = async (thumbnailLink,profilePreviewUrl) => {
    try {
      setIsLoading(true);

      const response =await axiosInstance.put(
        API_PATHS.RESUME.UPDATE(resumeId),
        {
          ...resumeData,
          thumbnailLink:thumbnailLink || "",
          profileInfo : {
            ...resumeData.profileInfo,
            profilePreviewUrl : profilePreviewUrl || "",
          },
        }
      );
    } catch (err) {
      console.error("Error capturing Image : ", err)
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteResume = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.delete(API_PATHS.RESUME.DELETE(resumeId));
      toast.success("Resume deleted successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error deleting resume:", err);
    } finally {
      setIsLoading(false);
    }
  }

  const reactToPrintFn = useReactToPrint({ contentRef : resumeDownloadRef });

const updateBaseWidth = () => {
  if (resumeRef.current && resumeRef.current.offsetWidth !== baseWidth) {
    setBaseWidth(resumeRef.current.offsetWidth);
  }
};

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);
    if (resumeId) {
      fetchResumeDetailsById();
    }
    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    }
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto">
        <div className="flex items-center justify-between gap-4 px-4 mb-4 bg-white border border-purple-100 rounded-lg py3">
          <TitleInput 
            title={resumeData.title}
            setTitle={(value) => 
              setResumeData((prevState) => (
                { ...prevState,
                  title: value,
                 }
              )
              )
            }
          />
          <div className="flex items-center gap-4">
            <button onClick={() => setOpenThemeSelector(true)}  className="btn-small-light">
              <LuPalette className="text-[16px]"  />
              <span className="hidden md:block">Change Theme</span>
            </button>

            <button onClick={handleDeleteResume} className="btn-small-light">
              <LuTrash2 className="text-[16px]"/>
              <span className="hidden md:block">Delete</span>
            </button>

            <button onClick={() => setOpenPreviewModal(true)} className="btn-small-light">
              <LuCircleAlert className="text-[16px]"/>
              <span className="hidden md:block">Preview and Download</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="overflow-hidden bg-white border border-purple-100 rounded-lg">

            <StepProgress progress={progress} />

            { renderForm() }
            <div className="mx-5">
              {errorMsg && (
                <div className="flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded">
                  <LuCircleAlert className="text-md"/>{errorMsg}
                </div>
              )}

              <div className="flex items-end justify-end gap-3 mt-3 mb-5">
                <button onClick={goBack} className="btn-small-light" disabled={isLoading}>
                  <LuArrowLeft className="text-[16px]"/>Back
                </button>

                <button onClick={uploadResumeImages} className="btn-small-light" disabled={isLoading}>
                  <LuSave className="text-[16px]"/>
                  {isLoading ? "Updating..." : "Save and Exit"}
                </button>

                <button onClick={validateAndNext} className="btn-small" disabled={isLoading}>
                  
                  {currentPage === "additionalInfo" && (
                    <LuDownload className="text-[16px]"/>)}
                  
                  {currentPage === "additionalInfo" ? "Preview and Download" : "Next"}
                  
                  { currentPage !== "additionalInfo" && (
                    <LuArrowLeft className="text-[16px] rotate-180 "/>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div ref={resumeRef} className="h-[100vh]">
            <RenderResume
              templateId={resumeData?.template?.theme ||""}
              resumeData={resumeData}
              colorPalette={resumeData?.template?.colorPalette || []}
              containerWidth={baseWidth}
            />
          </div>
        
        </div>
      </div>
      <Modal
        isOpen={openThemeSelector}
        onClose={() => setOpenThemeSelector(false)}
        title="Change Theme"
      >
        <div className="w-[90vw] h-[80vh]">
          <ThemeSelector
            selectedTheme={resumeData?.template}
            setSelectedTheme={(value) => {
              setResumeData((prevState) => ({
                ...prevState,
                template: value || prevState.template
              }));
            }}
            resumeData={null}
            onClose={() => setOpenThemeSelector(false)} 
          />
        </div>  
      </Modal>

      <Modal
        isOpen={openPreviewModal}
        onClose={() => setOpenPreviewModal(false)}
        title={resumeData.title}
        showActionBtn
        actionBtnText="Download"
        actionBtnIcon={<LuDownload className="text-[16px]"/>}
        onActionClick={()=> reactToPrintFn()}
      >
        <div ref={resumeDownloadRef} className="w-[98vw] h-[90vh]">
          <RenderResume
            templateId={resumeData?.template?.theme ||""}
            resumeData={resumeData}
            colorPalette={resumeData?.template?.colorPalette || []}
          />
        </div>
      </Modal>
    </DashboardLayout>
  )
}

export default EditResume