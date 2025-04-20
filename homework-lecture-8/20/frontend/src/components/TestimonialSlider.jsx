import { useRef } from 'react';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'boxicons';
import 'swiper/css';

export default function TestimonialSlider({ testimonials }) {
  const swiperRef = useRef(null);

  return (
    <Swiper 
      spaceBetween={50} 
      slidesPerView={1} 
      loop={true}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => (swiperRef.current = swiper)}
      className='md:h-3/5 h-full mt-28 mx-16 relative'
      >
      {testimonials.map((t, i) => (
        <SwiperSlide key={i}>
          <div className="flex gap-10 items-center md:flex-nowrap flex-wrap ">
            <div className="md:w-1/2 w-full">
              <p className="text-4xl italic">“{t.review}”</p>
              <p className="mt-4 text-xl font-bold">{t.name} <span className="text-gray-400">{t.title}</span></p>
            </div>
            <img src={t.photo} className="rounded object-cover w-96 h-96 shadow-2xl" />
          </div>
        </SwiperSlide>
      ))}
       {/* Prev/Next buttons */}
       <div className="absolute bottom-0 z-10 left-1/2 transform -translate-1/2 mt-4 flex">
        <button
          className="bg-white px-4 py-2 rounded-bl-3xl rounded-tl-3xl hover:bg-gray-300 flex items-center cursor-pointer border"
          onClick={() => swiperRef.current.slidePrev()}
        >
          <box-icon name='chevron-left'></box-icon>
        </button>
        <button
          className="bg-white px-4 py-2 rounded-br-3xl rounded-tr-3xl hover:bg-gray-300 flex items-center cursor-pointer border"
          onClick={() => swiperRef.current.slideNext()}
        >
          <box-icon name='chevron-right'></box-icon>
        </button>
      </div>
      
    </Swiper>
  );
}