import Car from "./Car";

const NewCar = () => {
    const cars = [
        {id:1, companyName : 'Toyota'},
        {id:1, companyName : 'Toyota'},
        {id:1, companyName : 'Toyota'},
        {id:1, companyName : 'Toyota'},
        {id:1, companyName : 'Toyota'},
        {id:2, companyName : 'Honda'},
        {id:3, companyName : 'Tesla'},
        {id:4, companyName : 'BMW'},
        {id:5, companyName : 'Ford'},
        {id:5, companyName : 'Ford'},
        {id:5, companyName : 'Ford'},
        {id:5, companyName : 'Ford'},
    ]; 
    
    // console.log(isEven)

        return (
        <div className="my-5 max-w-6xl mx-auto">

            <h2 className="text-2xl md:text-6xl font-bold mx-2 ">More New Car  Launching</h2>

            <div className={`grid grid-cols-1 md:grid-cols-3 gap-4`}>
               
               {
                    cars.map((car, index) => <Car index={index+1} key={car.id} car={car}  ></Car>)
                }
              
            </div>



            
        </div>
    );
};

export default NewCar;