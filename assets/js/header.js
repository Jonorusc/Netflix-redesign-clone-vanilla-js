class headerController{
    constructor(){
        //vars
        this._width = document.body.clientWidth
        // this._uMightLike = document.querySelector('#uMightLike')
        // this._uSlides = this._uMightLike.querySelectorAll('.movie-slide')
        this._btnConfig = document.querySelectorAll('.btn-config')
        this._btnNotifications = document.querySelector('.btn-notifications')
        this._notifications = document.querySelector('.notifications-js')
        // this._iconeNotifications = document.querySelector('.btn-notification')
        this._iconeConfig = document.querySelectorAll('i.fa-sliders-h')
        this._config = document.querySelector('.configurations-js')
        this._overflow = document.querySelector('body.index')
        this._btnTab = document.querySelectorAll('.btn-tab')
        this._fileImg = document.querySelectorAll('div.img-users')
        this._inputImg = document.querySelectorAll('input.file-img-js')
        this._labelUsername = document.querySelectorAll('label.username--js')
        this._body = document.querySelector('body.index')
        this._notifications = document.querySelector('.notifications-js')

        //initialize
        this.checkScreen(this._width)
        // this.uMightLike(this._uSlides)
        this.sideBar()
        this.dragForNotifications()
    }

    checkScreen(width){
        if(window.ActiveXObject)
            alert('Recomendamos usar um navegador mais atualizado\no site pode não funcionar como o desejado.')
    
        if(width <= 320)
            alert('O site pode ter quebra de layout devido a resolução do seu dispositivo\nQualquer dúvida entre em contato')
    }

    //active item in 'you might like'
    uMightLike(uSlides){
        let containsActive = 0
        uSlides.forEach((uSlide, i) =>{
            uSlide.addEventListener('mouseover', e =>{
                if(uSlide.classList.contains('active')){
                    containsActive = i
                } else {
                    uSlides[containsActive].classList.remove('active')
                    uSlides[containsActive].childNodes[1].classList.remove('active')
                }
            })
            uSlide.addEventListener('mouseout', e =>{
                containsActive = i
                uSlides[containsActive].classList.add('active')
                uSlides[containsActive].childNodes[1].classList.add('active')
            })
        }) 
    } 
    
    //sidebar

    sideBar(){
        //configurations
        this._btnConfig.forEach((btn,i)=>{
            btn.addEventListener('click', ()=>{
                this._iconeConfig[i].classList.toggle('fa-times')
                this._config.classList.toggle('active')
                this._overflow.classList.toggle('overflow')
            })
        })

        //notifications
        this._btnNotifications.addEventListener('click', ()=>{
            this._btnNotifications.classList.toggle('active')
            this._notifications.classList.toggle('active')
        })

        //configurations tabs
        this._btnTab.forEach(btn => {
            btn.addEventListener("click", () => {
            
                this._btnTab.forEach(btn => btn.classList.remove("active"));
        
                btn.classList.add("active");

                    const tabContents = document.querySelectorAll(".tab-content");
                    tabContents.forEach(tab => tab.classList.remove("active"));
            
                document.querySelector(btn.dataset.targetTab).classList.add("active");
            });
        });

        //filereader    
        this._inputImg.forEach((input, i) =>{
            input.onchange = () =>{
                let reader = new FileReader()
                reader.onload = () =>{
                    this._fileImg[i].style.backgroundImage = `url(${reader.result})`;
                }
                
                if(input.files[0]){
                    reader.readAsDataURL(input.files[0])
                } else {
                    console.log(input,'error')
                }
            }
        })    

        //change username
        this._labelUsername.forEach((label,i)=>{
            let id = `username-${i}`
            label.addEventListener('click', e =>{
                document.getElementById(id).disabled = false
            })
        })
    }

    // notifications mobile
    dragForNotifications(){
        const movies = ['movie', 'movie-slides', 'movie-slide', 'movie-wrapper']
        let posX1 = 0, posX2 = 0, posFinal, result

        this._body.addEventListener('touchstart', e => {
            e = e || windows.event
            posX1 = e.touches[0].clientX
        })

        this._body.addEventListener('touchmove', e => {
            e = e || windows.event
        
            posX2 = e.touches[0].clientX
            if(e.target.offsetParent != null){
                result = e.target.offsetParent.classList.value.split(' ', 1)
            } 

            
            if(movies.indexOf(result.toString()) !== -1){
                posFinal = 0
            } else {
                posFinal = posX2 - posX1
            }

            if(this._width <= 768){
                //mobile
                if(posFinal >= 130){ //open
                    this._notifications.classList.add('active')
                } else if(posFinal <= -100){ //close
                    this._notifications.classList.remove('active')
                }
            } 
            //in desktop do nothing, there we've got a button for notifications
        })

    }
}