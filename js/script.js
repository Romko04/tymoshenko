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
})


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


function toggleMenu() {
    const btn = document.querySelector('.header__burger');
    menuBody.classList.toggle('active');
    btn.classList.toggle('active');
    btn.classList.contains('active') ? document.body.classList.add('scroll--block') : document.body.classList.remove('scroll--block')
}

const acc = document?.querySelectorAll('.accordeon');

if (acc) {
    for (let i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            acc[i].querySelector('.moduls__accordeon-btn').classList.toggle("active")
            acc[i].querySelector('.panel').classList.toggle("panelActive")
        });
    }
}