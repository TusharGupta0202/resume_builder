import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const CreateResumeForm = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCreateResume = async (e) => {
    e.preventDefault();

    if (!title) {
      setError("Please enter a resume title.");
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.RESUME.CREATE, { title });

      if (response.data?._id) {
        navigate(`/resume/${response.data?._id}`); 
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      }
      else {
        setError("An error occurred while creating the resume.");
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='w-[90vw] md:w-[70vw] p-7 flex flex-col justify-center'>
      <h3 className='text-lg font-semibold text-black'>
        Create New Resume
      </h3>
      <p className='text-xs text-slate-700 mt-[5px] mb-3'>
        Give your resume a title to get started. You can edit all the details later.
      </p>

      <form onSubmit={handleCreateResume}>
        <Input 
          autoFocus={true}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="My Resume Title"
          label="Resume Title"
          type="text"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type='submit' className='btn-primary' disabled={loading}>
          {loading ? "Creating..." : "Create Resume"}
        </button>
      </form>
    </div>
  )
}

export default CreateResumeForm