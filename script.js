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

const banner = document.querySelector('.banner')

if (banner) {
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

    const urlApi = 'https://api.themoviedb.org/3/'
    const apiKey = '062d176f3e0565c0e81c67fb76be2bb9'
    const ptBr = '&language=pt-BR'
    let obj = {}
    let objTitle1 = []
    let objPP1 = []
    let objTitle2 = []
    let objPP2 = []
    let objTitle3 = []
    let objPP3 = []
    let imgUrl = ''
    const carrossel1 = document.querySelector('.carousel1')
    const carrossel2 = document.querySelector('.carousel2')
    const carrossel3 = document.querySelector('.carousel3')
    carrossel1.innerHTML = ''
    carrossel2.innerHTML = ''
    carrossel3.innerHTML = ''

    async function cartazCarousel1() {
        try {
            fetch(`${urlApi}movie/upcoming?api_key=${apiKey}${ptBr}`)
                .then(response => response.json())
                .then(data => {
                    obj = data
                    for (let i = 0; i < 8; i++) {
                        objTitle1.push(obj.results[i].title)
                        objPP1.push(obj.results[i].poster_path)
                        imgUrl = `https://image.tmdb.org/t/p/w500${objPP1[i]}`

                        const liElement = document.createElement('li')
                        liElement.classList.add('card-carousel')
                        const imgElement = document.createElement('img')
                        imgElement.classList.add('img-cartaz')
                        imgElement.src = imgUrl
                        imgElement.draggable = false

                        liElement.appendChild(imgElement)
                        carrossel1.appendChild(liElement)

                    }
                    setupCarousel1(wrapper1, carousel1, firstCardWidth1, arrowBtns1)
                    console.log(objTitle1, objPP1)
                })
        }
        catch (error) {
            console.error("Erro ao chamar a API:", error);
        }
    }

    cartazCarousel1()

    async function cartazCarousel2() {
        try {
            fetch(`${urlApi}movie/popular?api_key=${apiKey}${ptBr}`)
                .then(response => response.json())
                .then(data => {
                    obj = data
                    for (let i = 0; i < 8; i++) {
                        objTitle2.push(obj.results[i].title)
                        objPP2.push(obj.results[i].poster_path)
                        imgUrl = `https://image.tmdb.org/t/p/w500${objPP2[i]}`

                        const liElement = document.createElement('li')
                        liElement.classList.add('card-carousel')
                        const imgElement = document.createElement('img')
                        imgElement.classList.add('img-cartaz')
                        imgElement.src = imgUrl
                        imgElement.draggable = false

                        liElement.appendChild(imgElement)
                        carrossel2.appendChild(liElement)

                    }
                    setupCarousel2(wrapper2, carousel2, firstCardWidth2, arrowBtns2)
                    console.log(objTitle2, objPP2)
                })
        }
        catch (error) {
            console.error("Erro ao chamar a API:", error);
        }
    }

    cartazCarousel2()

    async function cartazCarousel3() {
        try {
            fetch(`${urlApi}tv/popular?api_key=${apiKey}${ptBr}&page=3`)
                .then(response => response.json())
                .then(data => {
                    obj = data
                    for (let i = 0; i < 8; i++) {
                        objTitle3.push(obj.results[i].title)
                        objPP3.push(obj.results[i].poster_path)
                        imgUrl = `https://image.tmdb.org/t/p/w500${objPP3[i]}`

                        const liElement = document.createElement('li')
                        liElement.classList.add('card-carousel')
                        const imgElement = document.createElement('img')
                        imgElement.classList.add('img-cartaz')
                        imgElement.src = imgUrl
                        imgElement.draggable = false

                        liElement.appendChild(imgElement)
                        carrossel3.appendChild(liElement)

                    }
                    setupCarousel3(wrapper3, carousel3, firstCardWidth3, arrowBtns3)
                    console.log(objTitle3, objPP3)
                })
        }
        catch (error) {
            console.error("Erro ao chamar a API:", error);
        }
    }

    cartazCarousel3()
}

// ---------------------
// API
// ---------------------

const containerGradeFilmes = document.querySelector('#container-grade-filmes')
const containerGradeIndicacoes = document.querySelector('#container-grade-indicacoes')
const containerGradeSeries = document.querySelector('#container-grade-series')

const urlApi = 'https://api.themoviedb.org/3/'
const apiKey = '062d176f3e0565c0e81c67fb76be2bb9'
const ptBr = '&language=pt-BR'
let obj = {}
let objTitle = ''
let objNota = ''
let objMedia = ''
let objPP = ''
let imgUrl = ''
let objId = ''
let objSinopse = ''
let objLancamento = ''
let videoUrl = ''
let videoKey = ''

if (containerGradeFilmes) {
    async function chamarFilmesAPI() {
        try {
            for (let a = 1; a <= 2; a++) {
                fetch(`${urlApi}movie/popular?api_key=${apiKey}${ptBr}&page=${a}`)
                    .then(response => response.json())
                    .then(data => {
                        obj = data
                        for (let i = 0; i < 20; i++) {
                            objTitle = obj.results[i].title
                            objNota = obj.results[i].vote_average.toFixed(1)
                            objPP = obj.results[i].poster_path
                            objId = obj.results[i].id
                            imgUrl = `https://image.tmdb.org/t/p/w500${objPP}`

                            function criarEstrutura() {

                                const htmlCartaz = document.createElement('div')
                                htmlCartaz.className = 'cartaz'
                                htmlCartaz.id = objId

                                const htmlImg = document.createElement('img')
                                htmlImg.className = 'img-cartaz'
                                htmlImg.src = imgUrl
                                htmlCartaz.appendChild(htmlImg)

                                const htmlDetalhesCartaz = document.createElement('div')
                                htmlDetalhesCartaz.className = 'detalhes-cartaz'
                                htmlCartaz.appendChild(htmlDetalhesCartaz)

                                const htmlTitle = document.createElement('h2')
                                htmlTitle.className = 'film-title'
                                if (objTitle.length > 32) {
                                    htmlTitle.textContent = `${objTitle.slice(0, 30)}...`
                                } else {
                                    htmlTitle.textContent = objTitle
                                }
                                htmlDetalhesCartaz.appendChild(htmlTitle)

                                const htmlNota = document.createElement('h2')
                                htmlNota.className = 'film-nota'
                                htmlNota.textContent = `${objNota}/10`
                                htmlDetalhesCartaz.appendChild(htmlNota)

                                const containerCartazes = document.querySelector('.container-cartazes')
                                containerCartazes.appendChild(htmlCartaz)
                            }
                            criarEstrutura()
                            loadScreen.classList.add('off')
                            setTimeout(() => {
                                loadScreen.classList.add('d-none')
                            }, 600)
                        }
                    })
            }
        }
        catch (error) {
            console.error('Erro ao chamar a API: ', error)
        }
    }
    chamarFilmesAPI()
}

if (containerGradeSeries) {
    let contagemSeries = 0
    let limiteContagemSeries = 3

    async function chamarSeriesAPI() {
        try {
            for (let a = 1; a <= limiteContagemSeries; a++) {
                if (contagemSeries >= 20 && contagemSeries < 40) {
                    limiteContagemSeries++
                }
                await fetch(`${urlApi}tv/popular?api_key=${apiKey}${ptBr}&page=${a + 6}`)
                    .then(response => response.json())
                    .then(data => {
                        obj = data
                        for (let i = 0; i < 20; i++) {
                            if (obj.results[i].original_language == 'en') {
                                objTitle = obj.results[i].name
                                objNota = obj.results[i].vote_average.toFixed(1)
                                objPP = obj.results[i].poster_path
                                objId = obj.results[i].id
                                imgUrl = `https://image.tmdb.org/t/p/w500${objPP}`
                                contagemSeries++

                                function criarEstrutura() {

                                    const htmlCartaz = document.createElement('div')
                                    htmlCartaz.className = 'cartaz'
                                    htmlCartaz.id = objId

                                    const htmlImg = document.createElement('img')
                                    htmlImg.className = 'img-cartaz'
                                    htmlImg.src = imgUrl
                                    htmlCartaz.appendChild(htmlImg)

                                    const htmlDetalhesCartaz = document.createElement('div')
                                    htmlDetalhesCartaz.className = 'detalhes-cartaz'
                                    htmlCartaz.appendChild(htmlDetalhesCartaz)

                                    const htmlTitle = document.createElement('h2')
                                    htmlTitle.className = 'film-title'
                                    if (objTitle.length > 32) {
                                        htmlTitle.textContent = `${objTitle.slice(0, 30)}...`
                                    } else {
                                        htmlTitle.textContent = objTitle
                                    }
                                    htmlDetalhesCartaz.appendChild(htmlTitle)

                                    const htmlNota = document.createElement('h2')
                                    htmlNota.className = 'film-nota'
                                    htmlNota.textContent = `${objNota}/10`
                                    htmlDetalhesCartaz.appendChild(htmlNota)

                                    const containerCartazes = document.querySelector('.container-cartazes')
                                    containerCartazes.appendChild(htmlCartaz)
                                }
                                criarEstrutura()
                                loadScreen.classList.add('off')
                                setTimeout(() => {
                                    loadScreen.classList.add('d-none')
                                }, 600)
                            }
                        }
                    })
            }
        }
        catch (error) {
            console.error('Erro ao chamar a API: ', error)
        }
    }
    chamarSeriesAPI()
}

if (containerGradeIndicacoes) {
    async function chamarindicacoesAPI() {
        try {
            for (let a = 1; a <= 2; a++) {
                await fetch(`${urlApi}movie/top_rated?api_key=${apiKey}${ptBr}&page=${a}`)
                    .then(response => response.json())
                    .then(data => {
                        obj = data
                        for (let i = 0; i < 20; i++) {
                            objTitle = obj.results[i].title
                            objNota = obj.results[i].vote_average.toFixed(1)
                            objPP = obj.results[i].poster_path
                            objId = obj.results[i].id
                            imgUrl = `https://image.tmdb.org/t/p/w500${objPP}`

                            function criarEstrutura() {

                                const htmlCartaz = document.createElement('div')
                                htmlCartaz.className = 'cartaz'
                                htmlCartaz.id = objId

                                const htmlImg = document.createElement('img')
                                htmlImg.className = 'img-cartaz'
                                htmlImg.src = imgUrl
                                htmlCartaz.appendChild(htmlImg)

                                const htmlDetalhesCartaz = document.createElement('div')
                                htmlDetalhesCartaz.className = 'detalhes-cartaz'
                                htmlCartaz.appendChild(htmlDetalhesCartaz)

                                const htmlTitle = document.createElement('h2')
                                htmlTitle.className = 'film-title'
                                if (objTitle.length > 32) {
                                    htmlTitle.textContent = `${objTitle.slice(0, 30)}...`
                                } else {
                                    htmlTitle.textContent = objTitle
                                }
                                htmlDetalhesCartaz.appendChild(htmlTitle)

                                const htmlNota = document.createElement('h2')
                                htmlNota.className = 'film-nota'
                                htmlNota.textContent = `${objNota}/10`
                                htmlDetalhesCartaz.appendChild(htmlNota)

                                const containerCartazes = document.querySelector('.container-cartazes')
                                containerCartazes.appendChild(htmlCartaz)
                            }
                            criarEstrutura()
                            loadScreen.classList.add('off')
                            setTimeout(() => {
                                loadScreen.classList.add('d-none')
                            }, 600)
                        }
                    })
            }
        }
        catch (error) {
            console.error('Erro ao chamar a API: ', error)
        }
    }
    chamarindicacoesAPI()
}

async function detalhesFilmes() {
    const containerCartazes = document.querySelector('.container-cartazes')

    if (document.querySelector('#container-grade-filmes') || document.querySelector('#container-grade-indicacoes')) {
        containerCartazes.addEventListener('click', (event) => {
            const clickedElement = event.target.closest('.cartaz')
            const idClicado = clickedElement ? clickedElement.id : null
            if (idClicado) {
                try {
                    fetch(`https://api.themoviedb.org/3/movie/${idClicado}?api_key=${apiKey}${ptBr}`)
                        .then(response => response.json())
                        .then(data => {
                            obj = data
                            objTitle = obj.title
                            objLancamento = obj.release_date
                            objNota = obj.vote_average.toFixed(1)
                            objMedia = obj.vote_average.toFixed(1) / 2
                            objSinopse = obj.overview
                            objPP = obj.poster_path
                            objId = obj.id
                            imgUrl = `https://image.tmdb.org/t/p/w500${objPP}`
                            videoUrl = `${urlApi}movie/${objId}/videos?api_key=${apiKey}${ptBr}`

                            localStorage.setItem('titulo', objTitle)
                            localStorage.setItem('Lancamento', objLancamento)
                            localStorage.setItem('Nota', objNota)
                            localStorage.setItem('media', objMedia)
                            localStorage.setItem('Sinopse', objSinopse)
                            localStorage.setItem('id', objId)
                            localStorage.setItem('imgUrl', imgUrl)
                            localStorage.setItem('videoUrl', videoUrl)

                            window.location.href = 'detalhes.html'
                        })
                } catch (error) {
                    console.error('Erro ao chamar a API: ', error)
                }
            }
        })
    }
}
detalhesFilmes()

async function detalhesSeries() {
    const containerCartazes = document.querySelector('.container-cartazes')

    if (document.querySelector('#container-grade-series')) {
        containerCartazes.addEventListener('click', (event) => {
            const clickedElement = event.target.closest('.cartaz')
            const idClicado = clickedElement ? clickedElement.id : null
            if (idClicado) {
                try {
                    fetch(`https://api.themoviedb.org/3/tv/${idClicado}?api_key=${apiKey}${ptBr}`)
                        .then(response => response.json())
                        .then(data => {
                            obj = data
                            objTitle = obj.name
                            objLancamento = obj.first_air_date
                            objNota = obj.vote_average.toFixed(1)
                            objMedia = obj.vote_average.toFixed(1) / 2
                            objSinopse = obj.overview
                            objPP = obj.poster_path
                            objId = obj.id
                            imgUrl = `https://image.tmdb.org/t/p/w500${objPP}`
                            videoUrl = `${urlApi}tv/${objId}/videos?api_key=${apiKey}${ptBr}`

                            localStorage.setItem('titulo', objTitle)
                            localStorage.setItem('Lancamento', objLancamento)
                            localStorage.setItem('Nota', objNota)
                            localStorage.setItem('media', objMedia)
                            localStorage.setItem('Sinopse', objSinopse)
                            localStorage.setItem('id', objId)
                            localStorage.setItem('imgUrl', imgUrl)
                            localStorage.setItem('videoUrl', videoUrl)

                            window.location.href = 'detalhes.html'
                        })
                } catch (error) {
                    console.error('Erro ao chamar a API: ', error)
                }
            }
        })
    }
}
detalhesSeries()

function exibirDetalhes() {
    const containerDetalhes = document.querySelector('.container-detalhes')
    const imgHtml = document.querySelector('#img_detalhes')
    const titleHtml = document.querySelector('#tittle_detalhes')
    const lancamentoHtml = document.querySelector('#lancamento')
    const notaHtml = document.querySelector('#nota')
    const containerEstrelas = document.querySelector('#container_estrelas')
    const sinopseHtml = document.querySelector('#sinopse')
    const Iframe = document.querySelector('#iframe')

    if (titleHtml) {
        window.addEventListener('load', () => {
            const title = localStorage.getItem('titulo')
            const lancamento = localStorage.getItem('Lancamento')
            const nota = localStorage.getItem('Nota')
            const media = localStorage.getItem('media')
            const sinopse = localStorage.getItem('Sinopse')
            const id = localStorage.getItem('id')
            const imgUrl = localStorage.getItem('imgUrl')
            const videoUrl = localStorage.getItem('videoUrl')

            titleHtml.textContent = title
            imgHtml.src = imgUrl
            lancamentoHtml.textContent = lancamento.slice(0, 4)
            notaHtml.textContent = nota

            if (sinopse == '') {
                sinopseHtml.textContent = 'Não foi possível encontrar a sinopse para este filme'
            } else {
                sinopseHtml.textContent = sinopse
            }

            if (window.innerWidth <= 768) {
                if (title.length > 15 && title.length < 25) {
                    containerDetalhes.style.paddingTop = '220px'
                    titleHtml.style.top = '-440px'
                } else if (title.length > 25) {
                    containerDetalhes.style.paddingTop = '300px'
                    titleHtml.style.top = '-530px'
                }
            } else {
                containerDetalhes.style.paddingTop = '141px'
                titleHtml.style.top = '-380px'
            }

            function criarEstrela(tipo) {
                let estrela = document.createElement('i')
                estrela.className = tipo
                return estrela
            }

            converterEstrela(media)

            function converterEstrela(media) {

                if (media >= 4.8 && media <= 5) {
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                } else if (media >= 4.3 && media < 4.8) {
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star-half-stroke estrela'))
                } else if (media >= 3.8 && media < 4.3) {
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                } else if (media >= 3.3 && media < 3.8) {
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star-half-stroke estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                } else if (media >= 2.8 && media < 3.3) {
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                } else if (media >= 2.3 && media < 3.8) {
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star-half-stroke estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                } else if (media >= 1.8 && media < 2.3) {
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                } else if (media >= 1.3 && media < 1.8) {
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star-half-stroke estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                } else if (media >= 0.8 && media < 1.3) {
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                } else if (media >= 0.3 && media < 0.8) {
                    containerEstrelas.appendChild(criarEstrela('fa-solid fa-star-half-stroke estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                } else {
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                    containerEstrelas.appendChild(criarEstrela('fa-regular fa-star estrela'))
                }
            }

            fetch(videoUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.results.length > 0) {
                        videoKey = data.results[0].key
                        Iframe.src = `https://www.youtube.com/embed/${videoKey}`
                    } else {
                        const notBrUrl = `${urlApi}movie/${id}/videos?api_key=${apiKey}`
                        fetch(notBrUrl)
                            .then(response => response.json())
                            .then(data => {
                                if (data.results.length > 0) {
                                    videoKey = data.results[0].key
                                    Iframe.src = `https://www.youtube.com/embed/${videoKey}`
                                } else {
                                    const msgErro = document.querySelector('#msg_erro')
                                    msgErro.innerHTML = 'Não foi possível encontrar nenhum trailer para este filme'
                                    Iframe.remove()
                                }
                            })
                    }
                })
            loadScreen.classList.add('off')
            setTimeout(() => {
                loadScreen.classList.add('d-none')
            }, 600)
        })
    }
}
exibirDetalhes()