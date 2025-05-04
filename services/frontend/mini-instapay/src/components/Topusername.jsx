import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';


function Topusername( {username} ) {
  return (
    
    <div className="  self-end flex gap-2 items-center  text-sm   md:text-xl font-bold">
        <span>Mohamed Ahmed</span>
        <FontAwesomeIcon icon={faUser} />
    </div>
  )
}

export default Topusername


