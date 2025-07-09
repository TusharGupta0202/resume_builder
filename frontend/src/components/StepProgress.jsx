const StepProgress = ({progress}) => {
  return (
    <div className='w-full bg-purple-50 rounded-[2px] h-1 overflow-hidden'>
        <div style={{ width: `${progress}%` }} className="h-1 transition-all rounded bg-linear-to-r from-purple-500/85 to-purple-700">
        </div>
    </div>
  )
}

export default StepProgress