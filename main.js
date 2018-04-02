let $signUpForm = $('form[name=signUp]')
$signUpForm .on('submit', (e)=>{
    e.preventDefault()
    let string = $signUpForm . serialize()
    //check form
    let email = $signUpForm.find('[name=email]').val()
    let password = $signUpForm.find('[name=password]').val()
    let password_confirmation = $signUpForm.find('[name=password_confirmation]').val()
    let errors = {}
      //check email,password
      if(email.indexOf('@')<=0){
        errors.email = '邮箱不合法'
      }
      if(password.length<6){
        errors.password = '密码太短'
      }
      if(password_confirmation !== password){
        errors.password_confirmation = '两次输入密码不匹配'
      }
      //clear errors
      $signUpForm.find(`span[name$=_error]`).each(function(index,span){
         $(span).text('')
      })
     if(Object.keys(errors).length !== 0){
         for(var key in errors){
             let value = errors[key]
             $signUpForm.find(`[name=${key}_error]`).text(value)
         }
         return
     }

    $.ajax({
        url:$signUpForm.attr('action'),
        method:$signUpForm.attr('method'),
        data:string,
        success:function(response){
            let object = JSON.parse(response)
            console.log(object)
        }
    })
})