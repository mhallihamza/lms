import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Autoplay, Pagination, Navigation]);

function Why2() {
  const paginationButtons = [
    { index: 0, image: '/images/businessman.svg', title: 'Administration' },
    { index: 1, image: '/images/parents.svg', title: 'Parents' },
    { index: 2, image: '/images/manager.svg', title: 'Teachers' },
  ];
  return (
    <div className='relative lg:ml-[10%]'>
      <div className="swiper-container mt-36 ml-4 lg:ml-24">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{ delay: 2000 }}
          pagination={{
            clickable: true,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            el: '.custom-pagination',
            renderBullet: function (index, className) {
              return `
              <button class="${className} custom-pagination-button h-20 w-20 flex justify-center hover:bg-fuchsia-500 items-center" data-index="${index}">
                <img src="${paginationButtons[index].image}" class="h-9 w-9" alt="Pagination button ${index + 1}"><span class="absolute top-20 hover:text-fuchsia-500">${paginationButtons[index].title}</span>
              </button>
            `;
            },
          }}
          navigation={false}
        >
          <SwiperSlide>
            <div className='h-[35rem] lg:h-[20rem]'>
              <ul className="text-sm absolute flex flex-col space-y-4 lg:space-y-10 w-full">
                <li className='flex lg:ml-20'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Discipline tracking</div>
                </li>
                <li className='flex lg:ml-10'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Expense tracking</div>
                </li>
                <li className='flex lg:ml-4'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Payment tracking and reminders</div>
                </li>
                <li className='flex lg:ml-4'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Student academic tracking</div>
                </li>
                <li className='flex lg:ml-10'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Document generation</div>
                </li>
                <li className='flex lg:ml-20'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Student and parent account management</div>
                </li>
                <li className='flex lg:absolute lg:-top-10 lg:left-[40rem]'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Parent academic tracking</div>
                </li>
                <li className='flex lg:absolute lg:top-7 lg:left-[43rem]'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>School news sharing</div>
                </li>
                <li className='flex lg:absolute lg:top-[5.6rem] lg:left-[45rem]'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Instant notifications</div>
                </li>
                <li className='flex lg:absolute lg:top-[10rem] lg:left-[45rem]'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Internal messaging</div>
                </li>
                <li className='flex lg:absolute lg:top-[14rem] lg:left-[43rem]'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-8 mr-3'></img>
                  <div>Administrative requests</div>
                </li>
              </ul>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='h-[35rem] lg:h-[20rem]'>
              <ul className="text-sm absolute flex flex-col space-y-4 lg:space-y-12 w-full">
                <li className='flex lg:ml-20'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Parent requests</div>
                </li>
                <li className='flex lg:ml-10'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Absences and tardiness</div>
                </li>
                <li className='flex lg:ml-4'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Discipline and attendance</div>
                </li>
                <li className='flex lg:ml-4'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Evaluations and grades</div>
                </li>
                <li className='flex lg:absolute lg:-top-10 lg:left-[40rem]'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>News and announcements</div>
                </li>
                <li className='flex lg:absolute lg:top-7 lg:left-[43rem]'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Pedagogical resources and assignments</div>
                </li>
                <li className='flex lg:absolute lg:top-[5.6rem] lg:left-[45rem]'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Class schedule</div>
                </li>
                <li className='flex lg:absolute lg:top-[10rem] lg:left-[45rem]'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Communication with the school</div>
                </li>
              </ul>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className='h-[35rem] lg:h-[20rem]'>
              <ul className="text-sm absolute flex flex-col space-y-4 lg:space-y-12 w-full">
                <li className='flex lg:ml-20'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Absence and discipline monitoring</div>
                </li>
                <li className='flex lg:ml-10'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Exam planning</div>
                </li>
                <li className='flex lg:ml-4'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Grade entry</div>
                </li>
                <li className='flex lg:ml-4'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>School news monitoring</div>
                </li>
                <li className='flex lg:absolute lg:-top-10 lg:left-[40rem]'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Pedagogical resources sharing</div>
                </li>
                <li className='flex lg:absolute lg:top-7 lg:left-[43rem]'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Assignment and homework sharing</div>
                </li>
                <li className='flex lg:absolute lg:top-[5.6rem] lg:left-[45rem]'>
                  <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img>
                  <div>Class schedule consultation</div>
                </li>
              </ul>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="flex absolute space-x-4 !-top-[8.3rem] pl-[4rem] lg:ml-0 lg:pl-[23rem] lg:space-x-20 custom-pagination w-full "></div>
    </div>
  );
}

export default Why2;






