import { Link } from "react-router-dom";

const CompaniesCard = ({brand}) => {
    return (
        <div className="aspect-square">
            <img className="image-full" src={brand.image} alt="" />
            <div className="w-full grid grid-cols-2">
            <button className="py-2 md:py-3 font-bold text-white bg-red-500 hover:bg-red-900">My Cart</button>
            <Link  to={`/details/${brand.id}`}> <button className="py-2 md:py-3 font-bold w-full text-white bg-red-500 hover:bg-red-900">Details</button></Link>

            </div>
        </div>
    );
};

export default CompaniesCard;