class initCarousel{
    constructor(item, btnPrev, btnNext, action){
        this._slides = item
        this._prev = btnPrev
        this._next = btnNext
        this._buttons = action

        this.carousel(this._slides, this._prev, this._next, this._buttons)
    }

    carousel(items, prev, next, buttons){
        let posX1 = 0,
            posX2 = 0,
            posInitial,
            posFinal,
            threshold = 100,
            slides = items.getElementsByClassName('movie-slide'),
            slidesLength = slides.length,
            slideSize = items.getElementsByClassName('movie-slide')[0].offsetWidth,
            firstSlide = slides[0],
            lastSlide = slides[slidesLength - 1],
            cloneFirst = firstSlide.cloneNode(true),
            cloneLast = lastSlide.cloneNode(true),
            index = 0,
            allowShift = true
        
        items.appendChild(cloneFirst)
        items.insertBefore(cloneLast, firstSlide)

        items.onmousedown = dragStart

        items.addEventListener('touchstart', dragStart)
        items.addEventListener('touchend', dragEnd)
        items.addEventListener('touchmove', dragAction)
        
        if(buttons){
            prev.addEventListener('click', function () { shiftSlide(-1) })
            next.addEventListener('click', function () { shiftSlide(1) })
        }
        
        items.addEventListener('transitionend', checkIndex)
        
        function dragStart (e) {
            e = e || window.event
            // e.preventDefault();
            posInitial = items.offsetLeft
            
            if (e.type == 'touchstart') {
                
            } else {
                posX1 = e.clientX
                document.onmouseup = dragEnd
                document.onmousemove = dragAction
            }
        }

        function dragAction (e) {
            e = e || window.event
            
            if (e.type == 'touchmove') {
                posX2 = posX1 - e.touches[0].clientX
                posX1 = e.touches[0].clientX
            } else {
                posX2 = posX1 - e.clientX
                posX1 = e.clientX
            }
            items.style.left = (items.offsetLeft - posX2) + "px"
        }
        
        function dragEnd (e) {
            posFinal = items.offsetLeft
            if (posFinal - posInitial < -threshold) {
                shiftSlide(1, 'drag')
            } else if (posFinal - posInitial > threshold) {
                shiftSlide(-1, 'drag')
            } else {
                items.style.left = (posInitial) + "px"
            }

            document.onmouseup = null
            document.onmousemove = null
        }
        
        function shiftSlide(dir, action) {
            items.classList.add('shifting')
            
            if (allowShift) {
            if (!action) { posInitial = items.offsetLeft; }

            if (dir == 1) {
                items.style.left = (posInitial - slideSize) + "px"
                index++
            } else if (dir == -1) {
                items.style.left = (posInitial + slideSize) + "px"
                index--     
            }
            };
            
            allowShift = false
        }
            
        function checkIndex (){
            items.classList.remove('shifting')

            if (index == -1) {
                items.style.left = -(slidesLength * slideSize) + "px"
                index = slidesLength - 1
            }

            if (index == slidesLength) {
                items.style.left = -(1 * slideSize) + "px"
                index = 0
            }
            
            allowShift = true
        }
    }
}

class usefulController{
    constructor(){
        this._allSearchInputs = document.querySelectorAll('input.search')
        // this._allLabelUsername = document.querySelectorAll('label.username--js')
    }

    addEventListeners(btn, events, func) {
        events.split(' ').forEach(event => {
            btn.addEventListener(event, func, false)
        });
    }
    
    clearSearch(){
        document.addEventListener('click', e =>{
            this._allSearchInputs.forEach(input =>{
                input.onblur = function(){
                    input.value = ""
                }
            })
        })
    }

    mainCarousel(){
        try{
            const movieSlides = document.querySelectorAll('.movie-slides'),
            prev = document.querySelectorAll('button.prev'),   
            next = document.querySelectorAll('button.next') 
    
            movieSlides.forEach((item, i) =>{
                new initCarousel(item, prev[i], next[i], true)
            })
        } catch(e){}
    }
}