const Modal = ({children, isOpen, onClose, title, hideHeader, showActionBtn, actionBtnIcon=null, actionBtnText, onActionClick}) => {
  if (!isOpen) return null;
  return <div className='fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black/40'>
    <div className={`relative flex flex-col bg-white shadow-lg rounded-lg overflow-hidden`}>
        {!hideHeader && (
            <div className='flex items-center justify-between border-b border-gray-200'>
                <h3 className='font-medium text-gray-900 md:text-lg'>{title}</h3>

                {showActionBtn && (
                    <button className='mr-12 btn-small-light'
                     onClick={()=> onActionClick()}>
                        {actionBtnIcon}
                        {actionBtnText}
                    </button>
                )}
            </div>
        )}

        <button type='button' className='flex items-center justify-center w-8 h-8 text-sm text-gray-400 bg-transparent rounded-lg hover:bg-gray-200 hover:text-gray-900 absolute top-3.5 right-3.5' onClick={onClose}>
            <svg 
                className='w-3 h-3'
                aria-hidden="true"
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
            >
                <path 
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth="2"
                    d='M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6'
                />
            </svg>
        </button>
        <div className='flex-1 overflow-y-auto custom-scrollbar'>
            {children}
        </div>
    </div>
  </div>
}

export default Modal