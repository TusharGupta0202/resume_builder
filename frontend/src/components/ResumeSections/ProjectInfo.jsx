import { LuExternalLink, LuGithub } from 'react-icons/lu'
import ActionLink from './ActionLink'

const ProjectInfo = ({title, description, githubLink, liveDemoUrl, bgColor, isPreview}) => {
  return (
    <div className='mb-5'>
        <h3 className={`${isPreview ? "text-xs" : "text-base"} font-semibold text-gray-900`}>{title}</h3>
        <p className='mt-1 text-sm font-medium text-gray-700'>{description}</p>
        <div className='flex gap-3 mt-2 items-cenetr'>
            {githubLink && <ActionLink icon={<LuGithub />} link={githubLink} bgColor={bgColor} /> }
            
            {liveDemoUrl && <ActionLink icon={<LuExternalLink />} link={liveDemoUrl} bgColor={bgColor} /> }
        </div>
    </div>
  )
}

export default ProjectInfo