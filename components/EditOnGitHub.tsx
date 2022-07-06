import { HiOutlineExternalLink } from "react-icons/hi";

const EditOnGitHub = ({ href }: { href: string }) => {
    return (
        <div className='text-blue-500 cursor-pointer py-2 font-semibold'>
            <a href={href}>Edit this page on GitHub
                <HiOutlineExternalLink className='inline ml-2 -mt-1 w-5 h-5' />
            </a>
        </div>
    )
}

export default EditOnGitHub;