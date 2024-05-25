import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Company = () => {
  const [companyData, setCompanyData] = useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/companiesNameAndLogo')
    .then(res => res.json())
    .then(data => {
      setCompanyData(data)
    })

  },[])
  return (
    <div data-aos="flip-up" data-aos-duration="1000" className="grid grid-cols-3 md:grid-cols-6 gap-2 m-2">
      {companyData.map((company) => (
        <div key={company._id}>
          <Link to={`/companies/${company._id}`}>
            <img src={company.logo} alt="" />{" "}
            <button className="w-full animate-bounce bg-red-500 text-white font-bold rounded-none py-1 md:py-3 border-0">
              {company.name.toUpperCase()}
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Company;
