import { useLoaderData } from 'react-router-dom';
const BrandDetails = () => {
    const productDetails = useLoaderData(); 
    const {image, description,moreImages    } = productDetails; 

    
        return (
        <div className="grid md:grid-cols-6 grid-cols-3 mb-6">
           <div className="w-full  md:col-span-6 col-span-3">
            <img className='w-full' src={image} alt="" />
           </div>
           {
            moreImages.map( (image, index) =>
            <div key={index}><img src={image} alt="" /></div>)
           }
           <div className='col-span-3 md:col-span-6 text-justify px-2'>
            <p><span className='font-bold'>Description : </span>{description}</p>
           </div>
          
        </div>
    );
};

export default BrandDetails;