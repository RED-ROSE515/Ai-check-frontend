import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import DarkNobleblocks from "../public/NOBLEBLOCKS-dark.png";
import LightNobleblocks from "../public/NOBLEBLOCKS-light.png";
import DarkNerdNuggets from "../public/NerdNuggets-darke.png";
import LightNerdNuggets from "../public/NerdNuggets-light.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Mousewheel,
} from "swiper/modules";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function AdPlayer() {
  const { theme, resolvedTheme } = useTheme();
  const [ads, setAds] = useState<any>([]);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const NOBLEBLOCKS_DOMAIN = process.env.NEXT_PUBLIC_NOBLEBLOCKS_DOMAIN;

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + "</span>";
    },
  };

  useEffect(() => {
    if (theme === "dark") {
      setAds([
        { image: LightNobleblocks, link: NOBLEBLOCKS_DOMAIN },
        { image: LightNerdNuggets, link: "https://nerdnuggets.org/" },
        { image: LightNobleblocks, link: NOBLEBLOCKS_DOMAIN },
        { image: LightNerdNuggets, link: "https://nerdnuggets.org/" },
        { image: LightNobleblocks, link: NOBLEBLOCKS_DOMAIN },
        { image: LightNerdNuggets, link: "https://nerdnuggets.org/" },
      ]);
    } else {
      setAds([
        { image: DarkNobleblocks, link: NOBLEBLOCKS_DOMAIN },
        { image: DarkNerdNuggets, link: "https://nerdnuggets.org/" },
        { image: DarkNobleblocks, link: NOBLEBLOCKS_DOMAIN },
        { image: DarkNerdNuggets, link: "https://nerdnuggets.org/" },
        { image: DarkNobleblocks, link: NOBLEBLOCKS_DOMAIN },
        { image: DarkNerdNuggets, link: "https://nerdnuggets.org/" },
      ]);
    }
  }, [theme]);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 60000,
          disableOnInteraction: false,
        }}
        mousewheel={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 75,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={pagination}
        modules={[Autoplay, EffectCoverflow, Pagination, Mousewheel]}
        className="mySwiper"
      >
        {ads.map((ad: any) => {
          return (
            <SwiperSlide className="swiper-slide flex flex-col justify-center items-center">
              <Image
                priority
                onClick={() => window.open(ad.link, "_blank")}
                alt="NERDBUNNY LOGO"
                className="rounded-lg cursor-pointer"
                src={ad.image}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
