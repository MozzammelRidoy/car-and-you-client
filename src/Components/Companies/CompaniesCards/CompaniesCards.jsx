import { useEffect, useState } from 'react';
import CompaniesCard from './CompaniesCard';


const CompaniesCards = ({name}) => {

    const [companiesProducts, setCompaniesProducts] = useState([]); 


    useEffect(()=>{
        fetch(`https://car-and-you-server.vercel.app/companiesProduct`)
        .then(res => res.json())
        .then(data => {
          const searchCompany = data.filter(company => company.companyName.toLowerCase() === name.toLowerCase()); 
          setCompaniesProducts(searchCompany)
        })
      },[name])
   
    
    return (
        <div className='grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2 mb-10'>
            {
                companiesProducts.map(product => <CompaniesCard key={product._id} product={product}></CompaniesCard>)
            }
            
        </div>
    );
};

export default CompaniesCards;