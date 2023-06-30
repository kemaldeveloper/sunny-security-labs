// RESPONSIVE

// Breakpoints
const breakpoints = {
  xl: 1200,
  lg: 992,
  md: 768,
  sm: 576,
  xsm: 375,
};

// Media quires
const MQ = {
  wWidth: 0,
  isXL: false,
  isLG: false,
  isMD: false,
  isSM: false,
  isXSM: false,
  updateState: function () {
    this.wWidth = $(window).width();

    for (let key in breakpoints) {
      this['is' + key.toUpperCase()] = this.wWidth <= breakpoints[key];
    }
  },
};

MQ.updateState();

$(document).ready(function () {
  //
});

$(window).on('load', function () {
  //
});

$(window).on('resize', function () {
  MQ.updateState();
  setValidSliderTextHeight();
});

// COMMON FUNCTIONS

// Popup opener
$('.js-popup').on('click', function (event) {
  event.preventDefault();
  let popupID = $(this).attr('href');

  mfpPopup(popupID);
});

// Mobile menu toggle

const toggleMenuClass = () => {
  const mobileMenu = $('.mobile-menu');
  const headerHamburgerBtn = $('.header__hamburger-btn');
  const headerHamburgerCloseBtn = $('.mobile-menu__close-btn');
  const elements = ['.header__hamburger-btn', '.mobile-menu__close-btn'];

  elements.forEach((element) => {
    $(element).on('click', function (e) {
      e.stopPropagation();

      if (headerHamburgerBtn.hasClass('active')) {
        headerHamburgerBtn.removeClass('active');
      } else {
        $(this).addClass('active');
      }

      if (headerHamburgerCloseBtn.hasClass('active')) {
        headerHamburgerCloseBtn.removeClass('active');
      } else {
        headerHamburgerCloseBtn.addClass('active');
      }

      if (mobileMenu.hasClass('is-opened')) {
        mobileMenu.removeClass('is-opened');
      } else {
        $('.mobile-menu').addClass('is-opened');
      }
    });
  });

  $(document).on('click', function (event) {
    const target = $(event.target).closest('.header__hamburger-btn, .mobile-menu__close-btn, .mobile-menu').length;

    if (!!target) {
      return;
    }

    $('.header__hamburger-btn, .mobile-menu__close-btn').removeClass('active');
    $('.mobile-menu').removeClass('is-opened');
    event.stopPropagation();
  });
};

toggleMenuClass();

// Phone input mask
$('input[type="tel"]').inputmask({
  mask: '+7 (999) 999-99-99',
  showMaskOnHover: false,
});

const mfpPopup = function (popupID, source) {
  $.magnificPopup.open({
    items: { src: popupID },
    type: 'inline',
    fixedContentPos: false,
    fixedBgPos: true,
    overflowY: 'auto',
    closeBtnInside: true,
    preloader: false,
    midClick: true,
    removalDelay: 300,
    closeMarkup: '<button type="button" class="mfp-close"></button>',
    mainClass: 'mfp-fade-zoom',
    // callbacks: {
    // 	open: function() {
    // 		$('.source').val(source);
    // 	}
    // }
  });
};

// SLIDERS

$('.slider').on('init', function (event, slick, currentSlide, nextSlide) {
  setValidSliderTextHeight();
});

$('.slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: true,
  prevArrow: false,
  nextArrow: $('.next'),
  responsive: [
    {
      breakpoint: 575,
      settings: {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        edgeFriction: 0,
      },
    },
  ],
});

$('.service').slick({
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  variableWidth: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 3000,
      settings: 'unslick',
    },
    {
      breakpoint: 992,
      settings: 'slick',
    },
    {
      breakpoint: 575,
      settings: {
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        edgeFriction: false,
      },
    },
  ],
});

$('.personal').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: true,
  prevArrow: false,
  nextArrow: $('.personal-next'),
  responsive: [
    {
      breakpoint: 576,
      settings: {
        infinite: false,
        slidesToShow: 2,
        edgeFriction: false,
      },
    },
  ],
});

$('.next').on('click', function () {
  $(this).closest('.slider-block').find('.slider').slick('slickNext');
});

// Custom select

const multiSelect = () => {
  const selects = document.querySelectorAll('.js-choice');
  selects.forEach((item) => {
    const choices = new Choices(item, {
      searchEnabled: false,
      itemSelectText: '',
      allowHTML: false,
    });
  });
};

multiSelect();

function setValidSliderTextHeight() {
  $('.slider__text-wrap').height(getSliderTextLineHeight() * 5);
}

function getSliderTextLineHeight() {
  const windowWidth = $(window).width();

  if (windowWidth <= breakpoints.sm) {
    return 22;
  }
  return 26;
}

// cookies
const cookieName = 'visit';
const cookieAlert = document.querySelector('.cookie-alert--js');
const cookieAcceptBtn = document.querySelector('.accept-btn--js');
const cookieRejectBtn = document.querySelector('.reject-btn--js');

// console.log(expires);

if (!Cookies.get('visit')) {
  setTimeout(() => {
    cookieAlert.classList.add('active');
  }, 1000);

  cookieAcceptBtn.addEventListener('click', () => {
    cookieAlert.classList.remove('active');

    Cookies.set(cookieName, true, { expires: 7 });
  });

  cookieRejectBtn.addEventListener('click', () => {
    cookieAlert.classList.remove('active');
  });
}
