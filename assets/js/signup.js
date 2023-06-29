$(document).ready(function(){
  let visible = document.querySelectorAll("form .row span[visible='on']");
  let notvisible = document.querySelectorAll("form .row span[visible='off']");
  
  for(let i=0 ;i<2;i++){
    visible[i].addEventListener('click',function(event){
      event.preventDefault();
      visible[i].style.visibility = 'hidden';
      notvisible[i].style.visibility = 'visible';
      let pass = document.getElementById(`${event.target.getAttribute('accesatr')}`);
      pass.type = "text";
     
    });
    notvisible[i].addEventListener('click',function(event){
      event.preventDefault();
      visible[i].style.visibility = 'visible';
      notvisible[i].style.visibility = 'hidden';
      let pass = document.getElementById(`${event.target.getAttribute('accesatr')}`);
      pass.type = "password";
    })
  }
  // validate password for its chars
  function validatePassword(password) {
      var regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[a-zA-Z\d@$!%*?&]{7,}$/;
      return regex.test(password);
  }
  function onChangeHandler(event){
      event.preventDefault(); // Prevent the form from submitting normally
      let password = String(event.target.value);
      
      console.log("change password  ",event.target.name)
      let flag = 1;
      if(event.target.name === "password"){
        flag = 0
      }
      if(password.trim() === ''){
        visible[flag].style.visibility = 'hidden';
        notvisible[flag].style.visibility = 'hidden';
      }else{
        visible[flag].style.visibility = 'visible';
        notvisible[flag].style.visibility = 'hidden';
      }
      if(validatePassword(event.target.value)){
        let errSpan = document.querySelector(`form .row span[name=${event.target.name}]`);
        errSpan.style.display = 'none';
      }else{
        let errSpan = document.querySelector(`form .row span[name=${event.target.name}]`)
        errSpan.style.display = 'unset';
      };
    }
    $('#pass').on("change", onChangeHandler);
    $('#confirmpass').on("change", onChangeHandler);

    $("#signUpForm").submit(function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        var form = document.getElementById('signUpForm');
        var firstnameInput = form.elements['firstname'];
        var lastnameInput = form.elements['lastname'];
        var emailInput = form.elements['email'];
        var usernameInput = form.elements['username'];
        var passwordInput = form.elements['password'];
        var confirmPasswordInput = form.elements['confirmPassword'];
        const values = [firstnameInput.value,lastnameInput.value,emailInput.value,usernameInput.value,passwordInput.value,confirmPasswordInput.value]
       

        //validation errors
        let isValid = true;

        function isAllValid(){
          //validate firstname
            if (firstnameInput.value.trim() === '') {
              isValid = false;
              let errSpan = document.querySelector("form .row span[name='name']")
              errSpan.style.display = 'unset';
              firstnameInput.focus();
              
            }else if(validateInput(firstnameInput.value.trim())){
              let errSpan = document.querySelector("form .row span[name='name']")
              errSpan.style.display = 'none';
            }
          
            // Validate lastname
            if (lastnameInput.value.trim() === '') {
              isValid = false;
              let errSpan = document.querySelector("form .row span[name='name']")
              errSpan.style.display = 'unset';
              lastnameInput.focus();
              
            }else if(validateInput(lastnameInput.value.trim())){
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
            }
            else if(validateInput(usernameInput.value.trim())){
              let errSpan = document.querySelector("form .row span[name='username']")
              errSpan.style.display = 'none';
            }
          
            // Validate password
            if (passwordInput.value.trim() === '') {
              isValid = false;
              let errSpan = document.querySelector("form .row span[name='password']")
              errSpan.style.display = 'unset';
              passwordInput.focus();
              
            }else if(!validatePassword(passwordInput.value.trim())){
              isValid = false;
              let errSpan = document.querySelector("form .row span[name='password']")
              errSpan.style.display = 'unset';
              passwordInput.focus();
            }else{
              let errSpan = document.querySelector("form .row span[name='password']")
              errSpan.style.display = 'none';
            }
        
            // Validate confirm password
            if (passwordInput.value.trim() === '') {
              isValid = false;
              let errSpan = document.querySelector("form .row span[name='confirmPassword']")
              errSpan.style.display = 'unset';
              passwordInput.focus();
              
            }else if (passwordInput.value !== confirmPasswordInput.value) {
              isValid = false;
              passwordInput.value = '';
              confirmPasswordInput.value = '';
              let errSpan = document.querySelector("form .row span[name='confirmPassword']")
              errSpan.style.display = 'unset';
              passwordInput.focus();
              
            }else{
              let errSpan = document.querySelector("form .row span[name='confirmPassword']")
              errSpan.style.display = 'none';
            }

            return isValid;
        }
        

      function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }
      function validateInput(inputValue) {
        // Regular expression to check for HTML tags or entities
        var htmlRegex = /<[^>]+>|&[^;]+;/g;
        
        // Check if the input value contains HTML tags 
        if (htmlRegex.test(inputValue)) {
          return false; // Input contains HTML
        }
        
        return true; // Input is valid
      }

      var formData = $(this).serialize();
      let statusMessage = document.getElementById("message");
      statusMessage.innerHTML = ""
      statusMessage.style.height = "0px"
      statusMessage.style.color = "red";
      // statusMessage.style.backgroundColor = 'lightgrey'
      if(isAllValid()){
        $.ajax({
          url: '/create-user',
          type: 'POST',
          data: formData,
          success: function(response) {
            statusMessage.style.height = "28px"
            if(response.error){
              statusMessage.innerHTML = response.error;
            }else if(response.success){
              statusMessage.style.color = "green";
              statusMessage.style.backgroundColor = 'var(--grey)'
              statusMessage.innerHTML = response.success;
              window.alert("Redirecting to localhost:3000/results to get all users");
              setTimeout(()=>{
                window.location.href = '/results';
              },3000)
            }
            console.log("reponse -",response); // Response from the server
            // Handle the response as needed
          },
          error: function(error) {
            console.error(error.error);
            statusMessage.style.height = "28px"
            statusMessage.innerHTML = error.error;
            console.log(error.error); 
            // Handle any errors that occur during the request
          }
        });
      }else{
        statusMessage.style.height = "28px"
        // console.log("not valid credentials",message)
        statusMessage.innerHTML = "Plesase enter valid credentials."
      }
    })
});

