const menuBody = document.querySelector('.menu__body');
// Event listeners
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('anchor')) {
        e.preventDefault()
        anchorClick(e.target)
    }
    if (e.target.classList.contains('header__burger')) {
        e.preventDefault()
        toggleMenu()
    }
})


function anchorClick(e) {
  const activeAnchor = document.querySelector('.menu__link-active')
      activeAnchor.classList.remove('menu__link-active')
      e.classList.add('menu__link-active')
      if (menuBody.classList.contains('active')) {
          toggleMenu() 
      }
      const blockId = e.getAttribute('href')
      document.querySelector(''+ blockId).scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
      })
}
function toggleMenu() {
  const btn = document.querySelector('.header__burger');
  menuBody.classList.toggle('active');
  btn.classList.toggle('active');
  btn.classList.contains('active') ? document.body.classList.add('scroll--block') : document.body.classList.remove('scroll--block')
}

