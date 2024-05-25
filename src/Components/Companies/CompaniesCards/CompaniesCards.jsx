import brandImage1 from '../../../assets/tesla.jpg'; 
import CompaniesCard from './CompaniesCard';


const CompaniesCards = () => {
    const brandCollection = [
        {id: 1, image : brandImage1 },
        {id: 2, image : brandImage1 },
        {id: 3, image : brandImage1 },
        {id: 4, image : brandImage1 },
        {id: 5, image : brandImage1 },
        {id: 6, image : brandImage1 },
        {id: 7, image : brandImage1 },
    ]
    
    return (
        <div className='grid md:grid-cols-4 grid-cols-2 md:gap-4 gap-2 mb-10'>
            {
                brandCollection.map(brand => <CompaniesCard key={brand.id} brand={brand}></CompaniesCard>)
            }
            
        </div>
    );
};

export default CompaniesCards;