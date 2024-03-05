import notices from '../data/notice';
import imgUrl from '../data/imgUrl';

function addActive (el) {
  el.classList.add('active');
}
function removeActive (el) {
  el.classList.remove('active');
}

function siblingActive (click, arr) {
  arr.forEach(el => {
    el.classList.remove('active');
  })

  click.classList.add('active');
}

/* 헤더 메뉴창 제어 */
const headerEl = document.querySelector('header');
const menuEl = document.querySelector('.box_menu');
const gnbEls = document.querySelectorAll('.gnb');

menuEl.setAttribute('data-hovered', 'false');

window.addEventListener('scroll', () => {
  if (window.scrollY > 0) {
    headerEl.classList.add('bg_white_01');
  }
  else {
    if(menuEl.getAttribute('data-hovered') === 'false') {
      headerEl.classList.remove('bg_white_01');
    }
  }
});

menuEl.addEventListener('mouseenter', () => {
    headerEl.classList.add('bg_white_02');
    menuEl.setAttribute('data-hovered', 'true');
    document.body.classList.add('filter');
});
menuEl.addEventListener('mouseleave', () => {
    headerEl.classList.remove('bg_white_02');
    menuEl.setAttribute('data-hovered', 'false');
    document.body.classList.remove('filter');
  });

[...gnbEls].forEach((gnbEl) => {
  gnbEl.addEventListener('mouseenter', () => {
    addActive(gnbEl);
  })

  gnbEl.addEventListener('mouseleave', () => {
    removeActive(gnbEl);
  })
});

/* 검색창 제어 */
const searchEl = document.querySelector('.box_search');
const searchInputEl = searchEl.querySelector('input')

searchEl.addEventListener('click', () => {
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', () => {
  searchEl.classList.add('focused');
});

searchInputEl.addEventListener('blur', () => {
  searchEl.classList.remove('focused');
});

/* 사이드 퀵메뉴 제어 */
const sideMenuEl = document.querySelector('#snb');
const sideMenuImgEl = document.querySelector('#snb img');
const quickMenuEl = document.querySelector('.quick_menu');
const closeQuickMenuEl = document.querySelector('.snb_close');

sideMenuImgEl.addEventListener('click', () => {
  quickMenuEl.classList.add('show');
});
closeQuickMenuEl.addEventListener('click', (event) => {
  quickMenuEl.classList.remove('show');

  event.stopPropagation();
});

document.addEventListener('DOMContentLoaded', () => {
  quickMenuEl.classList.add('show');
});

/* top,bottom 버튼 제어 */
const toTopEl = document.querySelector('.to_top');
const toBottomEl = document.querySelector('.to_bottom');

toTopEl.addEventListener('click', () => {
  gsap.to(window, .5, {
    scrollTo: 0
  })
})
toBottomEl.addEventListener('click', () => {
  gsap.to(window, .5, {
    scrollTo: { y: 'max' }
  })
})

/* 햄버거 메뉴창 제어 */
const openNavEl = document.querySelector('.box_open_nav');
const closeNavEl = document.querySelector('.lnb_close');
const lnbEl = document.querySelector('#lnb');
const lnbMenuEls = document.querySelectorAll('.lnb_menu');
const innerMenuEls = document.querySelectorAll('.box_lnb_menu');

openNavEl.addEventListener('click', () => {
  lnbEl.style.display = 'block';
  document.body.style.overflow = 'hidden';
});

closeNavEl.addEventListener('click', () => {
  lnbEl.style.display = 'none';
  document.body.style.overflow = 'auto';
});

[...lnbMenuEls].forEach((lnbMenuEl) => {
  lnbMenuEl.addEventListener('mouseenter', () => {
    addActive(lnbMenuEl);
  })
  lnbMenuEl.addEventListener('mouseleave', () => {
    removeActive(lnbMenuEl);
  })
});

[...innerMenuEls].forEach((innerMenuEl) => {
  innerMenuEl.addEventListener('mouseenter', () => {
    addActive(innerMenuEl);
  })
  innerMenuEl.addEventListener('mouseleave', () => {
    removeActive(innerMenuEl);
  })
});

/* 스크롤에 따른 요소 감시 */
const spyEls = document.querySelectorAll('.scroll-spy')
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl,
      triggerHook: .9
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});


/* 공지사항 탭 제어 */
const contentsEl = document.querySelector('#container_01 .content');

function sortDate(data) {
  return data.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
}

const allItemEls = sortDate(notices).slice(0, 6);

const notificationEls = sortDate(notices).filter(notice => notice.type === '공지');

const collusionEls = sortDate(notices).filter(notice => notice.type === '공모');

const employmentEls = sortDate(notices).filter(notice => notice.type === '채용');


const contentArray = [allItemEls, notificationEls, collusionEls, employmentEls]

contentArray.forEach((items, index) => {
  const ulEl = document.createElement('ul');
  ulEl.classList.add('list_content');
  
  items.forEach(item => {
    const liEl = document.createElement('li');
    const type = item.type;
    liEl.classList.add('item_content');

    liEl.innerHTML = /* html */ `
      <span class="${type === '공지' ? 'notification' : type === '공모' ? 'collusion' : 'employment'}">${type}</span>
      <p>${item.title}</p>
    `;

    ulEl.append(liEl);
  })
  ulEl.dataset.num = 'item_0' + (index + 1);

  contentsEl.append(ulEl);
});

const listContentELs = document.querySelectorAll('.list_content');
const itemSubTitEls = document.querySelectorAll('.item_subTit');
const firstChild = listContentELs[0];
const iconEl = document.querySelector('#container_01 .xi-plus');

firstChild.classList.add('active');

itemSubTitEls.forEach((subTit) => {
  const $span = subTit.querySelector('span');
  const dataNum = subTit.getAttribute('data-num');
  const siblings = [...subTit.parentElement.children];

  $span.addEventListener('click', (event) => {
    if(event.currentTarget.parentElement.dataset.num === 'item_01') {
      iconEl.classList.add('hidden');
    }
    else {
      iconEl.classList.remove('hidden');
    }

    siblings.forEach((sibling) => {
      sibling.classList.remove('active');
    })

    event.currentTarget.parentElement.classList.add('active');

    listContentELs.forEach((listContentEl) => {
      listContentEl.classList.remove('active');

      if(listContentEl.dataset.num === dataNum) {
        listContentEl.classList.add('active');
      }
    })
  })
});

/* slider 제어 */
var mySwiper = new Swiper('#container_01 .swiper', {
  autoplay: { 
    delay: 3000
  },
  loop: true,
  slidesPerView: 1,
  pagination: {
    el: '#container_01 .swiper-pagination',
    type: "fraction",
    clickable: true,
  },
  navigation: {
    prevEl: '#container_01 .swiper-button-prev',
    nextEl: '#container_01 .swiper-button-next'
  },
});

// 시작 버튼, 멈춤 버튼
const playBtnEl = document.querySelector('#container_01 .swiper-button-play');
const stopBtnEl = document.querySelector('#container_01 .swiper-button-pause');

playBtnEl.addEventListener('click', function () {
  mySwiper.autoplay.start();
  playBtnEl.classList.remove('show');
  stopBtnEl.classList.add('show');
});

stopBtnEl.addEventListener('click', function () {
  mySwiper.autoplay.stop();
  stopBtnEl.classList.remove('show');
  playBtnEl.classList.add('show');
});


/* 아코디언 메뉴 제어 */
const openMenuEls = document.querySelectorAll('#container_02 .item_img');

[...openMenuEls].forEach((MenuEl) => {
  MenuEl.addEventListener('click', () => {
    if(!MenuEl.classList.contains('active')) {
      
      const activeMenuEl = document.querySelector('#container_02 .item_img.active');

      activeMenuEl.classList.remove('active');

      MenuEl.classList.add('active');
    }
  })
})


/* 이미지 불러오기 */
const imgEls = document.querySelectorAll('#container_02 .ImportImg');
const errorImageURL = 'https://www.lh.or.kr/error/img/noimage.jpg';

function addImageToContainer(container, url) {
  const img = new Image();
  img.src = url;

  container.prepend(img);

  img.addEventListener('error', () => {
    const errorImg = new Image();
    errorImg.src = errorImageURL;
    container.prepend(errorImg);
  });
}

imgEls.forEach((container, index) => {
  addImageToContainer(container, imgUrl[index] || errorImageURL);
});

/* 유튜브 슬라이드 */
new Swiper('#container_02 .inner_04 .swiper', {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 1,
  loop: true,
  coverflowEffect: {
    rotate: 10,
    stretch: 0,
    depth: 500,
    modifier: 1,
    slideShadows: true,
  },
  initialSlide: 1,
  navigation: {
    prevEl: '#container_02 .swiper-button-prev',
    nextEl: '#container_02 .swiper-button-next'
  },
});

/* 유튜브 제어 */
const playEls = document.querySelectorAll('#container_02 .swiper .xi-play');

playEls.forEach((playEl, index) => {
  const youtubeEls = document.querySelectorAll('.wrap_video');
  
  playEl.addEventListener('click', () => {
    const youtubeEl = youtubeEls[index];
    const closeEl = youtubeEl.querySelector('.xi-close');

    youtubeEl.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    closeEl.addEventListener('click', () => {
      youtubeEl.classList.remove('active');
      document.body.style.overflow = 'auto';
  })
  })
})

/* 유튜브 링크 */
const linkYoutebeEl = document.querySelector('#container_02 .inner_05 .box_img');

linkYoutebeEl.addEventListener('click', () => {
  window.open('https://www.youtube.com/watch?v=LZhpnarxOHM', '_blank');
})

/* 배너 슬라이드 제어 */
let initialSlidesPerView = 6;

const bnrSwiper = new Swiper("#bnr .swiper", {
  autoplay: { 
    delay: 3000
  },
  slidesPerView: initialSlidesPerView,
  loop: true,
  navigation: {
    nextEl: "#bnr .swiper-button-next",
    prevEl: "#bnr .swiper-button-prev",
  },
});

// 반응형 slidesPerView 제어
function updateSlidesPerView() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    bnrSwiper.params.slidesPerView = 2;
  } else if (window.matchMedia("(max-width: 1024px)").matches) {
    bnrSwiper.params.slidesPerView = 4;
  } else {
    bnrSwiper.params.slidesPerView = initialSlidesPerView;
  }
  bnrSwiper.update();
}

updateSlidesPerView();
window.addEventListener("resize", updateSlidesPerView);

// 시작 버튼, 멈춤 버튼
const bnrPlayBtnEl = document.querySelector('#bnr .swiper-button-play');
const bnrStopBtnEl = document.querySelector('#bnr .swiper-button-pause');

bnrPlayBtnEl.addEventListener('click', function () {
  bnrSwiper.autoplay.start();
  bnrPlayBtnEl.classList.remove('show');
  bnrStopBtnEl.classList.add('show');
});

bnrStopBtnEl.addEventListener('click', function () {
  bnrSwiper.autoplay.stop();
  bnrStopBtnEl.classList.remove('show');
  bnrPlayBtnEl.classList.add('show');
});

/* 모바일 lnb 제어 */
const mobilePackMeunEls = document.querySelectorAll('#lnb .package_menu li');
const mobileLnbTitEls = document.querySelectorAll('#lnb .item_title');
const mobileLnbSubTitEls = document.querySelectorAll('#lnb .item_main_menu');

[...mobilePackMeunEls].forEach((el, index) => {
  el.addEventListener('click', () => {
    el.parentElement.classList.add('hide');

    mobileLnbTitEls[index].classList.add('active');
  })
});

[...mobileLnbTitEls].forEach((el) => {
  el.addEventListener('click', (event) => {
    siblingActive(event.currentTarget, mobileLnbTitEls);
  })
});

[...mobileLnbSubTitEls].forEach((el) => {
  el.addEventListener('click', (event) => {
    if(event.currentTarget.innerHTML.includes('<i class="xi-angle-down-min"></i>')) {
      siblingActive(event.currentTarget, mobileLnbSubTitEls);
    }
  })
})

/* 모바일 관련사이트 제어 */
const mobileLinkEl = document.querySelector('.link_mobile');

mobileLinkEl.addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('active');
})
