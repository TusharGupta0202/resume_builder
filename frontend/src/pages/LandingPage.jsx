import { useNavigate } from 'react-router-dom'
import HERO_IMG from '../assets/hero-img.png'
import { useContext, useState } from 'react';
import Login from './Auth/Login';
import SignUp from './Auth/SignUp';
import Modal from '../components/Modal';
import { UserContext } from '../context/userContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const LandingPage = () => {

  const { user } = useContext(UserContext);

  const navigate = useNavigate();
  
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if(!user) {
      setOpenAuthModal(true);
      return;
    } else {
      navigate("/dashboard");
    }
  };
  
  return (
    <div className='w-full min-h-full bg-white'>
      <div className="container px-4 py-6 mx-auto">
        <header className="flex items-center justify-between mb-16 ">
          <div className='text-xl font-bold'>Resume Builder</div>
          {user 
          ?  <ProfileInfoCard />
          : <button
            className='text-sm font-semibold bg-purple-100 text-black px-7 py-2.5 rounded-lg hover:bg-gray-800 hover:text-white transition-color cursor-pointer'
            onClick={() => setOpenAuthModal(true)}
          >
            Login / Signup
          </button>}
        </header>

        <div className='flex flex-col items-center md:flex-row'>
          <div className='w-full pr-4 mb-8 md:w-1/2 md:mb-0'>
            <h1 className='mb-6 text-5xl font-bold leading-tight'>
              Build Your{" "}
              <span className='text-transparent bg-clip-text bg-[radial-gradient(circle,#7182ff_0%,_#3cff52_100%)] bg-[length:200%_200%] animate-text-shine'>
                Resume Effortlessly
              </span>
            </h1>
            <p className='mb-8 text-lg text-gray-700'>
              Craft a standout Resume in minutes with out smart and intuitive resume builder.
            </p>
            <button
              className='px-8 py-3 text-sm font-semibold text-white transition-colors bg-black rounded-lg cursor-pointer hover:bg-gray-800'
              onClick={handleCTA}
            >
              Get Started
            </button>
          </div>
          <div className='w-full md:w-1/2'>
            <img 
              src={HERO_IMG}
              alt='Hero Image'
              className='w-full rounded-lg'
            />
          </div>
        </div>

        <section className='mt-5'>
          <h2 className='text-2xl font-bold text-center mb-22'>
            Features That Make You Shine
          </h2>
          <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
            <div className='p-6 transition shadow-sm bg-gray-50 rounded-xl hover:shadow-md'>
              <h3 className='mb-3 text-lg font-semibold'>
                Easy Editing
              </h3>
              <p className='text-gray-600'>
                Update your resume sections with live preview and instat formatting.
              </p>
            </div>

            <div className='p-6 transition shadow-sm bg-gray-50 rounded-xl hover:shadow-md'>
              <h3 className='mb-3 text-lg font-semibold'>
                Beautiful Templates
              </h3>
              <p className='text-gray-600'>
                Choose from moern, professional templates that are easy to customize.
              </p>
            </div>

            <div className='p-6 transition shadow-sm bg-gray-50 rounded-xl hover:shadow-md'>
              <h3 className='mb-3 text-lg font-semibold'>
                One-Click Export
              </h3>
              <p className='text-gray-600'>
                Download your resume instantly as a high-quality PDF with one click.
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className='p-5 mt-5 text-sm text-center bg-gray-50 text-secondary'>
        Made with ❤️.... Happy Coding
      </div>

      <Modal
        isOpen={openAuthModal}
        onClose={()=> {
          setOpenAuthModal(false)
          setCurrentPage("login")
        }}
        hideHeader
      >
        <div>
          {currentPage==="login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage==="signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </div>
  )
}

export default LandingPage