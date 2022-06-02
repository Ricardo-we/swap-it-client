import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Autoplay, Navigation } from "swiper";

interface SliderProps {
    sliderItems: string[] | JSX.Element[];
    style?: object | any;
    slideStyles?: object 
}

export default function Slider({sliderItems, style, slideStyles}: SliderProps){
    return (
        <>
        <style>{`
            .swiper {
                width: 100%;
                height: 100%;
              }
              
            .swiper-slide {
                text-align: center;
                font-size: 18px;
                background: #fff;
                display: flex;
                justify-content: center;
                height: 100%;
                width: 100%;
                align-items: center;
            }

            
            .swiper-slide img {
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
              
        `}</style>
            <Swiper 
                modules={[Pagination, Autoplay, Navigation]} 
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }} 
                pagination={{
                    clickable: true,
                }}
                style={style}
            >
                {sliderItems && sliderItems.map((slide, index) => (
                    <SwiperSlide key={index} style={slideStyles}>{slide}</SwiperSlide>
                    ))}
            </Swiper>
        </>
    )
}
