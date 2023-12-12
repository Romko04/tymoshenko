document.addEventListener('DOMContentLoaded', ()=>{

    let unlockPopup = true
    const body = document.querySelector('body')
    const timeout = 500



    if (window.innerWidth >= 999) {
        handleTextTruncation();
    }
    
    
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 999) {
            handleTextTruncation();
        }
    });
    
    new Swiper('.swiper', {
        slidesPerView: 1,
        spaceBetween: 70,
        autoHeight: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true,
        },
        breakpoints: {
          1051: {
            slidesPerView: 3,
          },
          725: {
            slidesPerView: 2,
          },
        },
      });
    
    const menuBody = document.querySelector('.menu__body');
    // Event listeners
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('anchor') || e.target.classList.contains('buy__btn')) {
            e.preventDefault()
            e.target.classList.contains('buy__btn') ? anchorClick(e.target.parentElement) : anchorClick(e.target)
        }
        if (e.target.classList.contains('header__burger')) {
            e.preventDefault()
            toggleMenu()
        }

        //Прослушка для попапа
        if (e.target.classList.contains('swiper-slide__btn')) {
            const swiperStartAndFinish = document.querySelector('.swiper-slide__popup')
            let popupContent = document.querySelector('.popup__content')

            popupContent.innerHTML = swiperStartAndFinish.innerHTML


            const popup = document.querySelector('.popup')



            if (unlockPopup) {
                bodyLock()
                popup.classList.add('active')
                popup.addEventListener('click',(e)=>{
                    if (!e.target.closest('.popup__content')) {
                        popup.classList.remove('active')
                        bodyUnLock()
                    }
                })
            }
            
        }

    })
    
    // Якоря
    
    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px'
        body.classList.add('body--lock')
        body.style.paddingRight = lockPaddingValue

        unlockPopup = false

        setTimeout(() => {
            unlockPopup = true
        }, timeout);
    }

    function bodyUnLock() {
        setTimeout(() => {
            body.style.paddingRight = '0px'
            body.classList.remove('body--lock')

        }, timeout);

        unlockPopup = false

        setTimeout(() => {
            unlockPopup = true
        }, timeout);
    }
    
    function anchorClick(e) {
        const v = 0.5
        const activeAnchor = document.querySelector('.menu__link-active')
        activeAnchor.classList.remove('menu__link-active')
        e.classList.add('menu__link-active')
        if (menuBody.classList.contains('active')) {
            toggleMenu()
        }
        const w = window.pageYOffset
    
        const blockId = e.getAttribute('href').substring(1),
            scrollTarget = document.getElementById(blockId),
            t = scrollTarget.getBoundingClientRect().top
        start = null
    
        requestAnimationFrame(step)
    
        function step(time) {
            if (start == null) start = time
    
            let progress = time - start,
                r = (t < 0 ? Math.max(w - progress / v, w + t) : Math.min(w + progress / v, w + t))
    
            window.scrollTo(0, r)
    
            if (r != w + t) {
                requestAnimationFrame(step)
            } else {
                location.hash = '#' + blockId;
            }
        }
    }
    
    //Бургер
    function toggleMenu() {
        const btn = document.querySelector('.header__burger');
        menuBody.classList.toggle('active');
        btn.classList.toggle('active');
        btn.classList.contains('active') ? document.body.classList.add('scroll--block') : document.body.classList.remove('scroll--block')
    }
    
    
    //Аккордеон
    
    const acc = document?.querySelectorAll('.accordeon');
    
    if (acc) {
        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                acc[i].querySelector('.moduls__accordeon-btn').classList.toggle("active")
                acc[i].querySelector('.panel').classList.toggle("panelActive")
            });
        }
    }
    
    // Обрізання тексту в карточках курсу
    
    function handleTextTruncation() {
        const courseTextList = document.querySelectorAll('.courses__text')
    
    if (courseTextList) {
        for (let i = 0; i < courseTextList.length; i++) {
            const textElement = courseTextList[i]
    
            let textContent = textElement.textContent
            if (textContent.length > 36) {
                textElement.classList.add('courses__text--hidden')
    
                const changedText = textContent.slice(0, 36 - 3) + "..."
    
                textElement.textContent = changedText
            }
        }
    }
    }




});

