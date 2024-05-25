import { useEffect, useState } from "react";
import Car from "./Car";

const NewCar = () => {
    const [cars, setCars] = useState([]); 
    useEffect(()=>{
        fetch('http://localhost:5000/moreNewCarLaunching')
        .then(res => res.json())
        .then(data => {
            setCars(data); 
        })
    },[])
    
    
    // console.log(isEven)

        return (
        <div className="my-5 max-w-6xl mx-auto">

            <h2 className="text-2xl md:text-6xl font-bold mx-2 my-4 ">More New Car  Launching</h2>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>
               
               {
                    cars.map((car, index) => <Car index={index+1} key={car.id} car={car}  ></Car>)
                }
              
            </div>



            
        </div>
    );
};

export default NewCar;