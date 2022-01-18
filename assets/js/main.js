/* LADDING PAGE */
if(document.body.classList.contains('ladding-page')){
    let rl = new registerAndLogin()
    const item = document.querySelector('#slides')
    new initCarousel(item, null, null, false)
    rl.clickRegister()
} 
/* REGISTER AND LOGIN */
else if(document.body.classList.contains('rl-register')){
    let rl = new registerAndLogin()
    rl.initServices()   
    rl.progressbarFormRegister()
    rl.checkService()
        
    document.querySelector('input#email').value = localStorage.getItem('email')
} 
/* INDEX */
else if(document.body.classList.contains('index')){
    let useful = new usefulController(),
    /* HEADER */
    header = new headerController()
        /* PREVIEW */
        try{
            const uMightLike = document.querySelector('#uMightLike'),
                  uSlides = uMightLike.querySelectorAll('.movie-slide')
            header.uMightLike(uSlides)
        } catch(e){}
        useful.clearSearch()
    /* MAIN */
        /* CAROUSEL */
        useful.mainCarousel();
    /* FOOTER */
}
else{
    window.location.href = 'ladding-page.html'
}