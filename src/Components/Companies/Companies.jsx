import { TypeAnimation } from "react-type-animation";
import CompaniesBanner from "./CompaniesBanner/CompaniesBanner";
import CompaniesCards from "./CompaniesCards/CompaniesCards";

const Companies = () => {
  const details =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus amet doloribus a minus hic, aliquam optio quidem? Facilis dicta suscipit ullam sunt, incidunt nesciunt odit aliquam natus";

    
   
  return (
    <div className="space-y-4 ">
      <div>
        <CompaniesBanner />
      </div>
      <div className="px-2 text-justify">
        <span className="text-3xl font-bold">Toyota : </span>{" "}
        <TypeAnimation
          splitter={(str) => str.split(/(?= )/)}
          sequence={[`${details}`, 3000]}
          speed={{ type: "keyStrokeDelayInMs", value: 30 }}
          omitDeletionAnimation={true}
          repeat={Infinity}
        />
      </div>

      <div>
        <CompaniesCards/>
      </div>
      
    </div>
  );
};

export default Companies;
