
import { PuffLoader } from "react-spinners";
const LoadingPage = ({ smallHeight }) => {
  return (
    <div
      className={`${smallHeight ? 'h-62.5' : 'h-[70vh]'}
      flex 
      flex-col 
      justify-center 
      items-center `}>
      <PuffLoader size={100} color='lime' />
    </div>
  )
}

export default LoadingPage;