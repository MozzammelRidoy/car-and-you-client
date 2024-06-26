import { TypeAnimation } from "react-type-animation";
const Banner = ({loadedBannerAndHeader}) => {
  const {banner, header} = loadedBannerAndHeader[0]; 

  return (
    <div className="relative aspect-video w-full overflow-hidden">
      <img
        src={banner}
        alt="Banner"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 flex ">
        <h1 className="text-white text-2xl md:text-7xl w-1/2 md:w-2/5 ms-3 md:p-10 font-semibold space-y-5">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed once, initially
              `${header}`,
              1000,
              
              
            ]}
            speed={50}
            
            repeat={0}
          />
        </h1>
      </div>
    </div>
  );
};

export default Banner;
