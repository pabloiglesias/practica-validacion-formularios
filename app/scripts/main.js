$(document).ready(function(){
	$("#form_973471").validate({
	event:blur,
    rules: {
      nombre: {
        required: true,
        lettersonly: true
      },
      apellidos: {
        required: true,
        lettersonly: true
      },
      telefono: {
        required: true,
        digits: true,
        minlength: 9,
	maxlength: 9
      },
      email: {
        required: true,
	email: true        
      },
      email2: {
        required: true       
      }, 
   
    },
    messages: {
 
      email: {
        remote: 'email erroneo'
              },
     
    }
   
    });
});

