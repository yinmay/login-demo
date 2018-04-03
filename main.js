let $signUpForm = $('form[name=signUp]')
let $loginForm = $('form[name=login]')
$loginForm.on('submit', (e)=>{
    e.preventDefault()
    let string = $loginForm . serialize()
    //表单验证...
    $.ajax({
        url:$loginForm.attr('action'),
        method:$loginForm.attr('method'),
        success:function(){
            location.href = '/home'
        },
        error:function(){}
    })  
})

$signUpForm.on('submit', (e)=>{
    e.preventDefault()
    //get data
    let string = $signUpForm . serialize()
    //check form
    let errors = checkForm($signUpForm)
    if(Object.keys(errors).length !== 0){
        showErrors(errors,$signUpForm)
     }else{
        $.ajax({
            url:$signUpForm.attr('action'),
            method:$signUpForm.attr('method'),
            data:string,
            success:function(response){
                location.href = '/home'
            },
            error: function(xhr){
                let errors = JSON.parse(xhr.responseText)
                showErrors(errors,$signUpForm)
            }
        })
     }
})

function checkForm($signUpForm){
    //check form
    let email = $signUpForm.find('[name=email]').val()
    let password = $signUpForm.find('[name=password]').val()
    let password_confirmation = $signUpForm.find('[name=password_confirmation]').val()
    let errors = {}
     // check email,password
      if(email.indexOf('@')<=0){
        errors.email = '邮箱不合法'
      }
      if(password.length<6){
        errors.password = '密码太短'
      }
      if(password_confirmation !== password){
        errors.password_confirmation = '两次输入密码不匹配'
      }
      return errors
}
function showErrors(errors,$signUpForm){
    //clear errors
    $signUpForm.find(`span[name$=_error]`).each(function(index,span){
    $(span).text('')
    })
    //show errors
    for(var key in errors){
        let value = errors[key]
        $signUpForm.find(`[name=${key}_error]`).text(value)
    }
}