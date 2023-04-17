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
$('form').on('submit', function (e) {
  e.preventDefault();

  let form = $(this);
  let formData = {};
  formData.data = {};

  // Serialize
  form.find('input, textarea').each(function () {
    let name = $(this).attr('name');
    let title = $(this).attr('data-name');
    let value = $(this).val();

    formData.data[name] = {
      title: title,
      value: value,
    };

    if (name === 'subject') {
      formData.subject = {
        value: value,
      };
      delete formData.data.subject;
    }
  });

  $.ajax({
    type: 'POST',
    url: 'mail/mail.php',
    dataType: 'json',
    data: formData,
  }).done(function (data) {
    if (data.status === 'success') {
      if (form.closest('.mfp-wrap').hasClass('mfp-ready')) {
        form.find('.form-result').addClass('form-result--success');
      } else {
        mfpPopup('#success');
      }

      setTimeout(function () {
        if (form.closest('.mfp-wrap').hasClass('mfp-ready')) {
          form.find('.form-result').removeClass('form-result--success');
        }
        $.magnificPopup.close();
        form.trigger('reset');
      }, 3000);
    } else {
      alert('Ajax result: ' + data.status);
    }
  });
  return false;
});

const mfpPopup = function (popupID, source) {
  // https://dimsemenov.com/plugins/magnific-popup/
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
    closeMarkup: '<button type="button" class="mfp-close">&times;</button>',
    mainClass: 'mfp-fade-zoom',
    // callbacks: {
    // 	open: function() {
    // 		$('.source').val(source);
    // 	}
    // }
  });
};

// SLIDERS

$('.slider').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: true,
  autoplaySpeed: 2000,
  prevArrow: false,
  adaptiveHeight: true,
  nextArrow: $('.next'),
  // autoplay: true,
});

$('.personal').slick({
  slidesToShow: 3,
  slidesToScroll: 1,
  variableWidth: true,
  autoplaySpeed: 2000,
  prevArrow: false,
  nextArrow: $('.next'),
});

$('.next').on('click', function () {
  $(this).closest('.slider-block').find('.slider').slick('slickNext');
});

$('.quote-form__spoiler-btn').click(function (event) {
  $(this).toggleClass('active').next().slideToggle(300);
  $('.quote-form__spoiler-wrap').toggleClass('active');
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
        content.style.opacity = 0;
        content.style.display = 'none';
      });

      tabContentItems[index].style.display = 'block';
      tabContentItems[index].style.opacity = 1;
    }
  });
});
