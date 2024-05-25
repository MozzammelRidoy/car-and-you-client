// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

import slide1 from '../../../assets/1.jpg'
import slide2 from '../../../assets/2.jpg'
import slide3 from '../../../assets/3.jpg'
import slide4 from '../../../assets/4.jpg'
import slide5 from '../../../assets/5.jpg'
import slide8 from '../../../assets/8.jpg'



import './styles.css';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRef } from 'react';



const CompaniesBanner = () => {
    const progressCircle = useRef(null);
    const progressContent = useRef(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    };
    const slideImgs = [
        {id:1, img : slide1},
        {id:2, img : slide2},
        {id:3, img : slide3},
        {id:4, img : slide4},
        {id:5, img : slide5},
        {id:6, img : slide8},
    ]
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
            slideImgs.map(slide => <SwiperSlide key={slide.id}><div className='aspect-video'><img src={slide.img} className='image-full' alt="" /></div></SwiperSlide> )
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