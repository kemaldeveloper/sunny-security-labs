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

// E-mail Ajax Send
// $('form').on('submit', function (e) {
//   e.preventDefault();

//   let form = $(this);
//   let formData = {};
//   formData.data = {};

//   // Serialize
//   form.find('input, textarea').each(function () {
//     let name = $(this).attr('name');
//     let title = $(this).attr('data-name');
//     let value = $(this).val();

//     formData.data[name] = {
//       title: title,
//       value: value,
//     };

//     if (name === 'subject') {
//       formData.subject = {
//         value: value,
//       };
//       delete formData.data.subject;
//     }
//   });

//   $.ajax({
//     type: 'POST',
//     url: 'mail/mail.php',
//     dataType: 'json',
//     data: formData,
//   }).done(function (data) {
//     if (data.status === 'success') {
//       if (form.closest('.mfp-wrap').hasClass('mfp-ready')) {
//         form.find('.form-result').addClass('form-result--success');
//       } else {
//         mfpPopup('#success');
//       }

//       setTimeout(function () {
//         if (form.closest('.mfp-wrap').hasClass('mfp-ready')) {
//           form.find('.form-result').removeClass('form-result--success');
//         }
//         $.magnificPopup.close();
//         form.trigger('reset');
//       }, 3000);
//     } else {
//       alert('Ajax result: ' + data.status);
//     }
//   });
//   return false;
// });

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

const tabNavItems = document.querySelectorAll('.tab-nav__link');
const tabContentItems = document.querySelectorAll('.tab-content__item');

tabNavItems.forEach((tab, index) => {
  tab.addEventListener('click', (event) => {
    event.preventDefault();

    if (!tab.classList.contains('active')) {
      tabNavItems.forEach((tab) => tab.classList.remove('active'));
      tab.classList.add('active');

      tabContentItems.forEach((content) => {
        content.classList.remove('animate__animated', 'animate__fadeIn');
        content.style.opacity = 0;
        content.style.display = 'none';
      });

      tabContentItems[index].style.display = 'block';
      tabContentItems[index].classList.add('animate__animated', 'animate__fadeIn');
      tabContentItems[index].style.opacity = 1;
    }
  });
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

// menu links active class toggler
const menuLinks = () => {
  const pageHref = window.location.href.split('/').slice('-1').join('/');
  const currentElement = $(`.header__sub-link[href='${pageHref}']`);
  const subList = currentElement.closest('.header__sub-list');

  currentElement.addClass('active');
  subList.addClass('active');
  subList.siblings('.header__link').addClass('active');
};

menuLinks();
//

$('.header__link').on('mouseenter', (e) => {
  // $('.header__link').removeClass('active');
  $('.header__sub-list').removeClass('active');
});

// $('.header__link').on('mouseleave', (e) => {
//   menuLinks();
// });

// function reduceText(itemText, maxLengthOfLink = 120) {
//   const itemTextArray = itemText.trim().split(' '); // splitting the string into an array
//   let reducedFlag = -1; // using a flag to identify if we have acquired the correct length and then to add the ellipsis

//   return itemTextArray.reduce((accumulator, currentVal) => {
//     if (accumulator.length + currentVal.length > maxLengthOfLink) {
//       reducedFlag++;
//       return reducedFlag ? accumulator : `${accumulator}...`;
//     } else {
//       return `${accumulator} ${currentVal}`;
//     }
//   });
//   //you can read more about the reduce function on mozilla.org
// }

// function textLineClamp(element) {
//   element.each((_, item) => {
//     const currentItem = $(item);
//     const itemText = currentItem.text();
//     const splicedItemText = reduceText(itemText, 180);

//     currentItem.text(splicedItemText);
//   });
// }

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
