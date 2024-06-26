// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';



import './styles.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRef } from 'react';



const CompaniesBanner = ({brandSliders}) => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };

    return (
        <div>
              <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
        
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >

        {
            brandSliders.map(slide => <SwiperSlide key={slide._id}><div className='aspect-video'><img src={slide.slider} className='image-full' alt="" /></div></SwiperSlide> )
        }
       
        


       <div className="autoplay-progress md:w-12 md:h-12 w-7 h-7" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
        
      </Swiper>
            
        </div>
    );
};

export default CompaniesBanner;