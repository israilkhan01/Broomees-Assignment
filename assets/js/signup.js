// import { validateName } from "./validator";
$(document).ready(function(){
  function passwordVisibility(){
    return;
  }
    $("#signUpForm").submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        function passwordVisibility(){
          console.log('sdsds');
         }

        var form = document.getElementById('signUpForm');
        var firstnameInput = form.elements['firstname'];
        var lastnameInput = form.elements['lastname'];
        var emailInput = form.elements['email'];
        var usernameInput = form.elements['username'];
        var passwordInput = form.elements['password'];
        var confirmPasswordInput = form.elements['confirmPassword'];
        const values = [firstnameInput.value,lastnameInput.value,emailInput.value,usernameInput.value,passwordInput.value,confirmPasswordInput.value]
        // Retrieve form data
       
        // var errorSpans =  document.querySelectorAll("form .row span");
        // console.log(errorSpans)
        // var arrAtrSpans = [];
        //  errorSpans.forEach((ele)=>{
        //   arrAtrSpans.push(ele.getAttribute("name"));
        //   // console.log();
        // })
        // // for (var i = 0; i < errorSpans.length;i++) {
          
        // //   console.log(errorSpans[i].getAttribute("name"))
        // // }
        // console.log(validateName("ideidhe"))
        let isValid = true;
        function isAllValid(){

          if (firstnameInput.value.trim() === '') {
            isValid = false;
            let errSpan = document.querySelector("form .row span[name='name']")
            errSpan.style.display = 'unset';
            firstnameInput.focus();
            
          }else{
            let errSpan = document.querySelector("form .row span[name='name']")
            errSpan.style.display = 'none';
          }
        
          // Validate lastname
          if (lastnameInput.value.trim() === '') {
            isValid = false;
            let errSpan = document.querySelector("form .row span[name='name']")
            errSpan.style.display = 'unset';
            lastnameInput.focus();
            
          }else{
            let errSpan = document.querySelector("form .row span[name='name']")
            errSpan.style.display = 'none';
          }
        
          // Validate email
          if (emailInput.value.trim() === '') {
            isValid = false;
            let errSpan = document.querySelector("form .row span[name='email']")
            errSpan.style.display = 'unset';
            emailInput.focus();
            
          } else if (!isValidEmail(emailInput.value.trim())) {
            isValid = false;
            let errSpan = document.querySelector("form .row span[name='email']")
            errSpan.style.display = 'unset';
            emailInput.focus();
            
          }else{
            let errSpan = document.querySelector("form .row span[name='email']")
            errSpan.style.display = 'none';
          }
        
          // Validate username
          if (usernameInput.value.trim() === '') {
            isValid = false;
            let errSpan = document.querySelector("form .row span[name='username']")
            errSpan.style.display = 'unset';
            usernameInput.focus();
          }else{
            let errSpan = document.querySelector("form .row span[name='username']")
            errSpan.style.display = 'none';
          }
        
          // Validate password
          if (passwordInput.value.trim() === '') {
            isValid = false;
            let errSpan = document.querySelector("form .row span[name='password']")
            errSpan.style.display = 'unset';
            passwordInput.focus();
            
          }else{
            let errSpan = document.querySelector("form .row span[name='password']")
            errSpan.style.display = 'none';
          }
        
          // Validate confirm password
          if (confirmPasswordInput.value.trim() === '') {
            isValid = false;
            let errSpan = document.querySelector("form .row span[name='confirmpassword']")
            errSpan.style.display = 'unset';
            confirmPasswordInput.focus();
            
          } else if (passwordInput.value !== confirmPasswordInput.value) {
            isValid = false;
            passwordInput.value = '';
            confirmPasswordInput.value = '';
            let errSpan = document.querySelector("form .row span[name='confirmpassword']")
            errSpan.style.display = 'unset';
            passwordInput.focus();
            
          }else{
            let errSpan = document.querySelector("form .row span[name='confirmpassword']")
            errSpan.style.display = 'none';
          }

          return isValid;
        }
        

      
      function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }


      var formData = $(this).serialize();
      if(isAllValid()){
        $.ajax({
          url: '/create-user',
          type: 'POST',
          data: formData,
          success: function(response) {
            console.log(response); // Response from the server
            // Handle the response as needed
          },
          error: function(error) {
            console.error(error);
            // Handle any errors that occur during the request
          }
        });
      }
    })
});

