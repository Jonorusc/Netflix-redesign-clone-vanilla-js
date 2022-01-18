class registerAndLogin{
    constructor(){
        this._chosenPlan = document.querySelector('span.chosen-plan')
        this._echoPrice = document.querySelector('span.price-plan')
        this._check = document.querySelectorAll('.s-check')
        this._checkTerms = document.querySelector('button.checkTerms')
        this._prevBtns = document.querySelectorAll('.btn-prev')
        this._nextBtns = document.querySelectorAll('.btn-next')
        this._progress = document.querySelector('#progress')
        this._formSteps = document.querySelectorAll('.form')
        this._progressSteps = document.querySelectorAll('.progressStep')
        this._labelServices = document.querySelectorAll('.servicesLabel')
        this._changeColor = document.querySelectorAll('.serviceLogo i')
        this._vCheck = document.querySelectorAll('.s-check')
        this._changeShadow = document.querySelectorAll('.service')
        this._label = document.querySelector('label[for="inputRegister"]')
        this._form = document.querySelector('form.register')
        this._input = document.querySelector('#inputRegister')
        this._contentInput = document.querySelector('.contentInput')
        this._register = document.querySelector('#clickRegister')
        //
        this.steps = 0
    }

    //check-service
    checkService(){
        let price = null,
            plan = null
    
            this._checkTerms.addEventListener('click', ()=>{
            if(this._check[0].checked){
                plan = 'básico';
                price = 'R$15,00';
            } else if(this._check[1].checked){
                plan = 'premium';
                price = 'R$35,00';
            }    
    
            this._chosenPlan.innerHTML = plan;
            this._echoPrice.innerHTML = price;
        })
    }
    //form progressbar
    progressbarFormRegister(){
        this._nextBtns.forEach(btn =>{
            btn.addEventListener('click', ()=>{
                this.steps++
                this.updateForm(this._formSteps)
                this.updateProgressBar(this._progressSteps)
            })
        })
    
        this._prevBtns.forEach(btn =>{
            btn.addEventListener('click', ()=>{
               this.steps--
                this.updateForm(this._formSteps)
                this.updateProgressBar(this._progressSteps)
            })
        })
    }

    updateForm(formSteps){
        formSteps.forEach(step =>{
            step.classList.contains('active') && 
                step.classList.remove('active')
        });
    
        formSteps[this.steps].classList.add('active')
    }
    
    updateProgressBar(progressSteps){
        progressSteps.forEach((ProgressStep, i) =>{
            if(i < this.steps + 1){
                ProgressStep.classList.add('progressStep-active')
            } else {
                ProgressStep.classList.remove('progressStep-active')
            }
        })
    
        const progressActive = document.querySelectorAll('.progressStep-active')
    
        this._progress.style.width = 
            ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%"
    }

    // changeColor of the servicies to buy
    initServices(){    
        this._labelServices.forEach((btn,i)=>{
            btn.addEventListener('click', ()=>{
                for (let index = 0; index < this._vCheck.length; index++) {
                    if(this._vCheck[index].checked && this._changeColor[index].classList.contains('active')){
                        this._changeColor[index].classList.remove('active')
                        this._changeShadow[index].classList.remove('active')
                        this._vCheck[index].checked = false
                    }
                }
                this._changeColor[i].classList.contains('active') ? this._changeColor[i].classList.remove('active') : this._changeColor[i].classList.add('active'), this._changeShadow[i].classList.add('active') 
            })
        })
    }

    // redirect to register
    clickRegister(){
        this._input.addEventListener('focus', () =>{
            this._label.classList.add('active')
            this._label.style.color = "rgba(242, 242, 242, 0.808)"
        })

        this._form.addEventListener('submit', e =>{
            e.preventDefault();

            if(this.getRegisterError(this._input) === true){
                this._label.innerHTML = 'Email'
                //send to register route
                localStorage.setItem('email', this._input.value)
                window.location.href = 'register-form.html'
            } else {
                this._label.style.color = "#fa9609"
                this._label.innerHTML = this.getRegisterError(this._input)
            }

        })

        document.addEventListener('click', e =>{
            if(!this._contentInput.contains(e.target) && !this._register.contains(e.target)){
                this._label.classList.remove('active')
                this._label.innerHTML = "Email"
                this._label.style.color = "#222"
                this._input.value = ""
            }
            
        })

    }

    getRegisterError(input){
        let response;
        if(input.value === ""){
            response =  'Email é obrigatório'
        } else if(input.value.indexOf('@') === -1 && input.value.indexOf('.') === -1){
            response = 'Insíra um email valido'
        } else {
            response = true
        }
        return response
    }
}



