import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";


const SwiperSlider = () => {
    SwiperCore.use([Navigation]);

    return (
        <>
            <Swiper navigation loop>
                {listing.imageUrls.map((url) => (
                    <SwiperSlide key={url}>
                        <div
                            className="h-[550px]"
                            style={{
                                background: `url(${url}) center no-repeat`,
                                backgroundSize: "cover",
                            }}
                        ></div>
                    </SwiperSlide>
                )}
    </Swiper>
        </>
  )                          
}