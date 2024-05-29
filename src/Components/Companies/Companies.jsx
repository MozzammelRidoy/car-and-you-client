import { TypeAnimation } from "react-type-animation";
import CompaniesBanner from "./CompaniesBanner/CompaniesBanner";
import CompaniesCards from "./CompaniesCards/CompaniesCards";
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

const Companies = () => {
  const loadedComanyInfo = useLoaderData();
  const { name, details } = loadedComanyInfo;
  const [brandSliders, setBrandSliders] = useState([]); 
  

  useEffect(()=>{
    fetch(`http://localhost:5000/brandSlider`)
    .then(res => res.json())
    .then(data => {
      const searchCompany = data.filter(company => company.companyName.toLowerCase() === name.toLowerCase()); 
      setBrandSliders(searchCompany)
    })
  },[name])



  return (
    <div className="space-y-4 ">
      <div>
        <CompaniesBanner brandSliders={brandSliders} />
      </div>
      <div className="px-2 text-justify">
        <span className="text-3xl font-bold">{name} : </span>{" "}
        <TypeAnimation
          splitter={(str) => str.split(/(?= )/)}
          sequence={[`${details}`, 3000]}
          speed={{ type: "keyStrokeDelayInMs", value: 30 }}
          omitDeletionAnimation={true}
          repeat={Infinity}
        />
      </div>

      <div>
        <CompaniesCards name={name}/>
      </div>
    </div>
  );
};

export default Companies;
