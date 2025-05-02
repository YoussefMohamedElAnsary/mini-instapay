import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';


function Arrow( {label , onClick}) {
  return (
    <>

        <button className=' absolute cursor-pointer' onClick={onClick} >
            <div className='flex items-center gap-2 m-2.5'>
                <div className=' w-6 h-6  md:w-10 md:h-10 rounded-xl bg-[#99C445] flex items-center justify-center'>
                    <FontAwesomeIcon icon={faAngleLeft} color='white'  className=' text-sm  md:text-lg' />
                </div>
                <span className='font-normal  text-sm md:text-l underline'> {label} </span>
            </div>
        </button>

      
    </>
  )
}

export default Arrow
