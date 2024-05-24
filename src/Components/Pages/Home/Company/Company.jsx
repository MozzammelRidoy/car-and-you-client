import { Link } from "react-router-dom";
import tesla from "../../../../assets/tesla.jpg";
import ford from "../../../../assets/ford.jpg";
import bmw from "../../../../assets/bmw.jpg";
import honda from "../../../../assets/honda.jpg";
import marce from "../../../../assets/marce.jpg";
import toyota from "../../../../assets/toyota.jpg";

const Company = () => {
  const companyData = [
    { id: 1, name: "TOYOTA", image: toyota },
    { id: 2, name: "TESLA", image: tesla },
    { id: 3, name: "BMW", image: bmw },
    { id: 4, name: "FORD", image: ford },
    { id: 5, name: "HONDA", image: honda },
    { id: 6, name: "MERCEDES", image: marce },
  ];
  return (
    <div data-aos="flip-up" data-aos-duration="1000" className="grid grid-cols-3 md:grid-cols-6 gap-2 m-2">
      {companyData.map((company) => (
        <div key={company.id}>
          <Link to={`/companies/${company.id}`}>
            <img src={company.image} alt="" />{" "}
            <button className="w-full animate-bounce bg-red-500 text-white font-bold rounded-none py-1 md:py-3 border-0">
              {company.name}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Company;
