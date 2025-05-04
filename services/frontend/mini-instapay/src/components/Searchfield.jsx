
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

function Searchfield(  {placeholder , value , onChange}  ) {


  return (
    <>
        <div className="px-4 py-2 bg-[#D2E4FF] flex items-center gap-2 rounded-xl">
            <FontAwesomeIcon icon={faMagnifyingGlass} className='text-[#5E99CA]' />
          
            <input
             type="text" 
             placeholder={placeholder}  
             className=" text-neutral-700 w-full border-none outline-none"  
             value={value} 
             onChange={onChange}    
             />

        </div>
     
    </>
  )
}

export default Searchfield
