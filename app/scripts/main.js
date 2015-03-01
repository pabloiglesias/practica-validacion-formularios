 'use strict';
 $('#formulario').validate({
	rules:{
	nombre:{
	required: true,
	minlength: 2
	},
	apellidos: {
		required=true,

	},
	telefono: {
	required: true,
	minlength: 9,
	maxlength: 20,
	digits: true
	},
	email: {
	required: true,
	email: true
	},
	email2:{
	required: true,
	equalTo: email
	},
	cif: {
	required:true,
	},
nombreempresa: {required},
direccion:{required:true,},
cp: {
required: true,
minlength: 4,
maxlength: 5,
digits: true,
remote:"provincias.php",
},
localidad: {
	required:true,
},
provincia: "required",
pais: "required",
iban: {
required: true,
iban: true
},
usuario:{
required: true,
minlength: 4
},
contraseña: "required"
},
messages:(
	nombre:"Campo obligatorio"
	),
	apellidos:"Campo requerido"
	),



});
$("#particular").change(function(){
if($('#particular').is(":checked")){
$("#nombreemp").html("Nombre");
$("#cifnif").html("NIF");
var completo = $("#nombre").val() + " " + $("#apellidos").val();
$("#nombreempresa").val(completo);
$("#nombreempresa").prop("readonly" , true);
}
});
$("#empresa").change(function(){
if($("#empresa").is(":checked")){
$("#nombreemp").html("Empresa");
$("#cifnif").html("CIF");
$("#nombreempresa").val("");
$("#nombreempresa").prop("readonly" , false);
}
})
//relleno el CP con ceros si no tiene 5 dígitos y busco municipio y provincia en la base de datos
$("#cp").focusout(function(){
var dig= $("#cp").val();
if(dig.lenght()==4){
$("#cp").val("0" + dig);
}
var cp= $("#cp").val();
var promise = $.ajax({
type: 'POST',
"url" : "../php/provincias.php",
"dataType": "json",
data : {cp : cp}
});
promise.done(function(data){

$('#provincia').attr('val',data['municipio']);
});
promise.fail(function(){
console.log("Error al importar municipio y provincia");
});
});
//cuando se completan los apellidos se rellena Nombre en los datos de facturación
$("#apellidos").focusout(function(){
var completo = $('#nombre').val() +' '+ $('#apellidos').val();
$('#nombreempresa').val(completo);
$('#nombreempresa').prop('readonly',true);
});
//se rellena el nombre de usuario con el mail
$("#email").focusout(function(){
var mail = $("#email").val();
$('#usuario').val(mail);
$('#usuario').prop('readonly' , true);
});
//establecer la password compleja
$("#password").focusin(function(){
$("#password").complexify(options, callback(valid, complexity){
alert("Password complexity: " + complexity);
});
});
$("#password").focusin(function () {
$("#password").complexify({}, function (valid, complexity) {
$("#complex").attr("value",complexity);
});
});
