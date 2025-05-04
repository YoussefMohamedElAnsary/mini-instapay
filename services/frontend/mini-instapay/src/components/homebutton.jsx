import Button from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



function Homebutton({onClick , text , icon ,color , textcolor}) {
  
  
    return (
    <>

        <div className="h-30">
            <Button onClick={onClick} className={`flex flex-col gap-2 items-center justify-center text-${textcolor}`}   color={color} >
                <div className=" w-12 h-12 flex items-center justify-center rounded-4xl bg-white">
                    <FontAwesomeIcon className="text-2xl" icon={icon} />
                </div>
                {text}  
            </Button> 
        </div>
      
    </>
  )
}

export default Homebutton
