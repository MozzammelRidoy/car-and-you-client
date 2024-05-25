import image from '../../../assets/4.jpg'; 
const BrandDetails = () => {
    const brandImage = [
        {id:1, image: image},
        {id:1, image: image},
        {id:1, image: image},
        {id:1, image: image},
        {id:1, image: image},
        {id:1, image: image},
    ]
        return (
        <div className="grid md:grid-cols-6 grid-cols-3 mb-6">
           <div className="w-full aspect-video md:col-span-6 col-span-3">
            <img className='' src={image} alt="" />
           </div>
           {
            brandImage.map( image =>
            <div key={image.id}><img src={image.image} alt="" /></div>)
           }
           <div className='col-span-3 md:col-span-6 text-justify px-2'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem sequi cupiditate laudantium eum! Quo, molestiae? Placeat veniam tempore iure nobis nesciunt eum optio temporibus id nam laborum alias, amet nihil?</p>
           </div>
          
        </div>
    );
};

export default BrandDetails;