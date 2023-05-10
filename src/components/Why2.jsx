import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core';
import 'swiper/swiper-bundle.css';

SwiperCore.use([Autoplay, Pagination, Navigation]);

function Why2() {
  const paginationButtons = [
    { index: 0, image: '/images/businessman.svg',title:'Administration' },
    { index: 1, image: '/images/parents.svg',title:'parents' },
    { index: 2, image: '/images/manager.svg',title:'Enseignants' },
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
        <ul class="text-sm absolute flex flex-col space-y-4 lg:space-y-10 w-full">
            <li className='flex lg:ml-20'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Suivi de la discipline</div>
            </li>
            <li className='flex lg:ml-10'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Suivi des dépenses</div>
            </li>
            <li className='flex lg:ml-4'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Suivi des encaissements et relances</div>
            </li>
            <li className='flex lg:ml-4'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Suivi pédagogique des élèves</div>
            </li>
            <li className='flex lg:ml-10'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Edition de documents</div>
            </li>
            <li className='flex lg:ml-20'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Gestion des élèves et comptes parents</div>
            </li>
            <li className='flex lg:absolute lg:-top-10 lg:left-[40rem]'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Suivi pédagogiques des parents</div>
            </li>
            <li className='flex lg:absolute lg:top-7 lg:left-[43rem]'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Partage de nouveautés de l'école</div>
            </li>
            <li className='flex lg:absolute lg:top-[5.6rem] lg:left-[45rem]'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Notifications instantannées</div>
            </li>
            <li className='flex lg:absolute lg:top-[10rem] lg:left-[45rem]'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Messagerie interne</div>
            </li>
            <li className='flex lg:absolute lg:top-[14rem] lg:left-[43rem]'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-8 mr-3'></img> 
            <div>Demandes administratives</div>
            </li>
           </ul>
           </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='h-[35rem] lg:h-[20rem]'>
        <ul class="text-sm absolute flex flex-col space-y-4 lg:space-y-12 w-full">
            <li className='flex lg:ml-20'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Demandes des parents</div>
            </li>
            <li className='flex lg:ml-10'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Absences et retards</div>
            </li>
            <li className='flex lg:ml-4'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Discipline et présence</div>
            </li>
            <li className='flex lg:ml-4'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Evaluations et notes</div>
            </li>
            <li className='flex lg:absolute lg:-top-10 lg:left-[40rem]'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Nouveautés et avis</div>
            </li>
            <li className='flex lg:absolute lg:top-7 lg:left-[43rem]'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Ressources pédagogiques et devoirs</div>
            </li>
            <li className='flex lg:absolute lg:top-[5.6rem] lg:left-[45rem]'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Emploi du temps</div>
            </li>
            <li className='flex lg:absolute lg:top-[10rem] lg:left-[45rem]'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Messagerie avec l'école</div>
            </li>
           </ul>
           </div>
        </SwiperSlide>
        <SwiperSlide>
        <div className='h-[35rem] lg:h-[20rem]'>
        <ul class="text-sm absolute flex flex-col space-y-4 lg:space-y-12 w-full">
            <li className='flex lg:ml-20'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Suivi de l'absence et discipline</div>
            </li>
            <li className='flex lg:ml-10'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Planification d'examens</div>
            </li>
            <li className='flex lg:ml-4'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Saisie des notes</div>
            </li>
            <li className='flex lg:ml-4'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Suivi de l'actualité de l'école</div>
            </li>
            <li className='flex lg:absolute lg:-top-10 lg:left-[40rem]'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Partage de ressources pédagogiques</div>
            </li>
            <li className='flex lg:absolute lg:top-7 lg:left-[43rem]'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Partage des devoirs et travaux</div>
            </li>
            <li className='flex lg:absolute lg:top-[5.6rem] lg:left-[45rem]'>
            <img src='./images/check_fonctionalite.png' alt='logo' className='w-7 h-7 mr-3'></img> 
            <div>Consultation du planning des cours</div>
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





