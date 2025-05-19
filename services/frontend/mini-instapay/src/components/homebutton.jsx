import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Homebutton({onClick , text , icon   , className}) {
  
  
    return (
    <>
        <div className="h-30">
            <Button onClick={onClick} className={`flex flex-col gap-2 items-center justify-center   hover:scale-103 transition-transform duration-300 ease-in-out ${className} `} >
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12  flex items-center justify-center">
                <img className="w-4 sm:w-6 xl:w-fit" src={icon} alt="transaction" />
                </div>
                {text}  
            </Button> 
        </div>
      
    </>
  )
}

export default Homebutton
