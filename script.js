// ---------------------
// CARREGAMENTO DA PAGINA
// ---------------------

const loadScreen = document.querySelector('.screen-load')
const trailer = document.querySelector('#trailer')

if (document.querySelector('#trailer')) {
    trailer.addEventListener('loadedmetadata', () => {

        loadScreen.classList.add('off')
        setTimeout(() => {
            loadScreen.classList.add('d-none')
        }, 600)

        // ---------------------
        // TRAILER HOME
        // ---------------------

        if (window.innerWidth >= 768) {

            function trailerOn() {

                const banner = document.querySelector('.banner')
                const trailer = document.querySelector('.trailer-off')

                banner.classList.add('banner-off')
                trailer.classList.remove('trailer-off')
                trailer.classList.add('trailer-on')

                trailer.currentTime = 0
                trailer.volume = 0

                const bntMute = document.querySelector('.btn-mute')
                bntMute.classList.add('btn-mute-active')
                bntMute.addEventListener('click', mute)
                bntMute.innerHTML = 'volume_off'

                function mute() {
                    if (trailer.volume == 0) {
                        trailer.volume = 1
                        bntMute.innerHTML = 'volume_up'
                    } else {
                        trailer.volume = 0
                        bntMute.innerHTML = 'volume_off'
                    }
                }

                trailer.play()

                trailer.addEventListener('ended', () => {
                    trailerOff()
                })
            }

            function trailerOff() {
                const banner = document.querySelector('.banner')
                const trailer = document.querySelector('.trailer-on')
                const bntMute = document.querySelector('.btn-mute')

                if (document.querySelector('.trailer-on')) {
                    const fadeAudio = setInterval(() => {
                        if (trailer.volume > 0.10) {
                            trailer.volume -= 0.10
                        } else {
                            clearInterval(fadeAudio)
                            trailer.pause()
                            trailer.volume = 1
                            banner.classList.remove('banner-off')
                            trailer.classList.remove('trailer-on')
                            trailer.classList.add('trailer-off')
                            bntMute.classList.remove('btn-mute-active')
                            bntMute.addEventListener('click', mute)

                            function mute() {
                                if (trailer.volume == 0) {
                                    trailer.volume = 1
                                    bntMute.innerHTML = 'volume_up'
                                } else {
                                    trailer.volume = 0
                                    bntMute.innerHTML = 'volume_off'
                                }
                            }
                        }
                    }, 80)
                }
            }

            let timer

            function userObserver(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        timer = setTimeout(() => {
                            trailerOn()
                        }, 3000)
                    } else {
                        clearTimeout(timer)
                        trailerOff()
                    }
                })
            }

            const bannerObserver = new IntersectionObserver(userObserver)
            const banner = document.querySelector('.banner')
            bannerObserver.observe(banner)

        }
    })
}

// ---------------------
// MENU
// ---------------------

if (window.innerWidth <= 768) {

    const hamburger = document.querySelector('.hamburguer')
    const barra = document.querySelector('.barra')
    const menu = document.querySelector('.menu')
    hamburger.addEventListener('click', clickNav)

    function clickNav() {
        barra.classList.toggle('barra-active')
        menu.classList.toggle('menu-active')
        hamburger.classList.toggle('hamburger-active')
    }
}

// ---------------------
// BOTOES TRAILER
// ---------------------

if (document.querySelector('.banner-buttons')) {
    const btnAssistir = document.querySelector('#banner-button-play')
    const btnDetalhes = document.querySelector('#banner-button-detalhes')

    btnAssistir.addEventListener('click', () => {
        alert('não é um site pirata não meu mano kkkkkkkkkkkkkkkkkkkkkkkkkkk, ainda')
    })

    btnDetalhes.addEventListener('click', () => {
        alert('não é um site pirata não meu mano kkkkkkkkkkkkkkkkkkkkkkkkkkk, ainda')
    })
}

// ---------------------
// CARROSSEL HOME
// ---------------------

const wrapper1 = document.querySelector(".wrapper1")
const carousel1 = wrapper1.querySelector(".carousel1")
const firstCardWidth1 = carousel1.querySelector(".card-carousel").offsetWidth
const arrowBtns1 = wrapper1.querySelectorAll("i")

const wrapper2 = document.querySelector(".wrapper2")
const carousel2 = wrapper2.querySelector(".carousel2")
const firstCardWidth2 = carousel2.querySelector(".card-carousel").offsetWidth
const arrowBtns2 = wrapper2.querySelectorAll("i")

const wrapper3 = document.querySelector(".wrapper3")
const carousel3 = wrapper3.querySelector(".carousel3")
const firstCardWidth3 = carousel3.querySelector(".card-carousel").offsetWidth
const arrowBtns3 = wrapper3.querySelectorAll("i")

function setupCarousel1(wrapper1, carousel1, firstCardWidth1, arrowBtns1) {

    const carouselChildrens1 = [...carousel1.children]

    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId

    let cardPerView1 = Math.round(carousel1.offsetWidth / firstCardWidth1)

    carouselChildrens1.slice(-cardPerView1).reverse().forEach(card => {
        carousel1.insertAdjacentHTML("afterbegin", card.outerHTML)
    })

    carouselChildrens1.slice(0, cardPerView1).forEach(card => {
        carousel1.insertAdjacentHTML("beforeend", card.outerHTML)
    })

    arrowBtns1.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel1.scrollLeft += btn.id == "left1" ? -firstCardWidth1 : firstCardWidth1
        })
    })

    const dragStart = (e) => {
        isDragging = true
        carousel1.classList.add("dragging")
        startX = e.pageX
        startScrollLeft = carousel1.scrollLeft
    }

    const dragging = (e) => {
        if (!isDragging) return
        carousel1.scrollLeft = startScrollLeft - (e.pageX - startX)
    }

    const dragStop = () => {
        isDragging = false
        carousel1.classList.remove("dragging")
    }

    const infiniteScroll = () => {
        if (carousel1.scrollLeft === 0) {
            carousel1.classList.add("no-transition")
            carousel1.scrollLeft = carousel1.scrollWidth - (2 * carousel1.offsetWidth)
            carousel1.classList.remove("no-transition")
        }
        else if (Math.ceil(carousel1.scrollLeft) === carousel1.scrollWidth - carousel1.offsetWidth) {
            carousel1.classList.add("no-transition")
            carousel1.scrollLeft = carousel1.offsetWidth
            carousel1.classList.remove("no-transition")
        }

        clearTimeout(timeoutId)
        if (!wrapper1.matches(":hover")) autoPlay()
    }

    const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return
        timeoutId = setTimeout(() => carousel1.scrollLeft += firstCardWidth1, 2500)
    }

    autoPlay()

    carousel1.addEventListener("mousedown", dragStart)
    carousel1.addEventListener("mousemove", dragging)
    document.addEventListener("mouseup", dragStop)
    carousel1.addEventListener("scroll", infiniteScroll)
    wrapper1.addEventListener("mouseenter", () => clearTimeout(timeoutId))
    wrapper1.addEventListener("mouseleave", autoPlay)
}

function setupCarousel2(wrapper2, carousel2, firstCardWidth2, arrowBtns2) {
    const carouselChildrens2 = [...carousel2.children]

    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId

    let cardPerView2 = Math.round(carousel2.offsetWidth / firstCardWidth2)

    carouselChildrens2.slice(-cardPerView2).reverse().forEach(card => {
        carousel2.insertAdjacentHTML("afterbegin", card.outerHTML)
    })

    carouselChildrens2.slice(0, cardPerView2).forEach(card => {
        carousel2.insertAdjacentHTML("beforeend", card.outerHTML)
    })

    arrowBtns2.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel2.scrollLeft += btn.id == "left2" ? -firstCardWidth2 : firstCardWidth2
        })
    })

    const dragStart = (e) => {
        isDragging = true
        carousel2.classList.add("dragging")
        startX = e.pageX
        startScrollLeft = carousel2.scrollLeft
    }

    const dragging = (e) => {
        if (!isDragging) return
        carousel2.scrollLeft = startScrollLeft - (e.pageX - startX)
    }

    const dragStop = () => {
        isDragging = false
        carousel2.classList.remove("dragging")
    }

    const infiniteScroll = () => {
        if (carousel2.scrollLeft === 0) {
            carousel2.classList.add("no-transition")
            carousel2.scrollLeft = carousel2.scrollWidth - (2 * carousel2.offsetWidth)
            carousel2.classList.remove("no-transition")
        }
        else if (Math.ceil(carousel2.scrollLeft) === carousel2.scrollWidth - carousel2.offsetWidth) {
            carousel2.classList.add("no-transition")
            carousel2.scrollLeft = carousel2.offsetWidth
            carousel2.classList.remove("no-transition")
        }

        clearTimeout(timeoutId)
        if (!wrapper2.matches(":hover")) autoPlay()
    }

    const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return
        timeoutId = setTimeout(() => carousel2.scrollLeft += firstCardWidth1, 2500)
    }

    autoPlay()

    carousel2.addEventListener("mousedown", dragStart)
    carousel2.addEventListener("mousemove", dragging)
    document.addEventListener("mouseup", dragStop)
    carousel2.addEventListener("scroll", infiniteScroll)
    wrapper2.addEventListener("mouseenter", () => clearTimeout(timeoutId))
    wrapper2.addEventListener("mouseleave", autoPlay)
}

function setupCarousel3(wrapper3, carousel3, firstCardWidth3, arrowBtns3) {
    const carouselChildrens3 = [...carousel3.children]

    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId

    let cardPerView3 = Math.round(carousel3.offsetWidth / firstCardWidth3)

    carouselChildrens3.slice(-cardPerView3).reverse().forEach(card => {
        carousel3.insertAdjacentHTML("afterbegin", card.outerHTML)
    })

    carouselChildrens3.slice(0, cardPerView3).forEach(card => {
        carousel3.insertAdjacentHTML("beforeend", card.outerHTML)
    })

    arrowBtns3.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel3.scrollLeft += btn.id == "left3" ? -firstCardWidth3 : firstCardWidth3
        })
    })

    const dragStart = (e) => {
        isDragging = true
        carousel3.classList.add("dragging")
        startX = e.pageX
        startScrollLeft = carousel3.scrollLeft
    }

    const dragging = (e) => {
        if (!isDragging) return
        carousel3.scrollLeft = startScrollLeft - (e.pageX - startX)
    }

    const dragStop = () => {
        isDragging = false
        carousel3.classList.remove("dragging")
    }

    const infiniteScroll = () => {
        if (carousel3.scrollLeft === 0) {
            carousel3.classList.add("no-transition")
            carousel3.scrollLeft = carousel3.scrollWidth - (2 * carousel3.offsetWidth)
            carousel3.classList.remove("no-transition")
        }
        else if (Math.ceil(carousel3.scrollLeft) === carousel3.scrollWidth - carousel3.offsetWidth) {
            carousel3.classList.add("no-transition")
            carousel3.scrollLeft = carousel3.offsetWidth
            carousel3.classList.remove("no-transition")
        }

        clearTimeout(timeoutId)
        if (!wrapper2.matches(":hover")) autoPlay()
    }

    const autoPlay = () => {
        if (window.innerWidth < 800 || !isAutoPlay) return
        timeoutId = setTimeout(() => carousel3.scrollLeft += firstCardWidth3, 2500)
    }

    autoPlay()

    carousel3.addEventListener("mousedown", dragStart)
    carousel3.addEventListener("mousemove", dragging)
    document.addEventListener("mouseup", dragStop)
    carousel3.addEventListener("scroll", infiniteScroll)
    wrapper3.addEventListener("mouseenter", () => clearTimeout(timeoutId))
    wrapper3.addEventListener("mouseleave", autoPlay)
}

setupCarousel1(wrapper1, carousel1, firstCardWidth1, arrowBtns1)
setupCarousel2(wrapper2, carousel2, firstCardWidth2, arrowBtns2)
setupCarousel3(wrapper3, carousel3, firstCardWidth3, arrowBtns3)