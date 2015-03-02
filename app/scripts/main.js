 'use strict';
 $('#formulario').validate({
	rules:{
	nombre:{
	required: true,
	minlength: 2
	},
	apellidos: {
		required:true,

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
	nombreempresa: {
	required:true},
	direccion:{
	required:true,
	},
	cp: {
	required: true,
	minlength: 4,
	maxlength: 5,
	digits: true,
	remote:'provincias.php'
	},
	localidad: {
	required:true,
	},
	provincia:{ 
	required:true
	},
	pais:{
	required:true
	},
	iban:{
	required: true	
	},
	usuario:{
	required: true,
	minlength: 4
	},
	contraseña:{
	required:true
	},
	messages:{
	nombre:{
		required:'Campo obligatorio'
	},
	apellidos:{
		required:'Campo requerido'
	}
	},
submitHanler:function(){
	alert('Esta en proceso de alta y su cuota sera '+$('#sel2').val()+' '+ $);
}
}
});
 /*
$('#particular').change(function(){
if($('#particular').is(":checked")){
$("#nombreemp").html("Nombre");
$("#cifnif").html("NIF");
var completo = $("#nombre").val() + " " + $("#apellidos").val();
$("#nombreempresa").val(completo);
$("#nombreempresa").prop("readonly" , true);
}
});*/
$('#empresa').change(function(){
if($('#empresa').is(':checked')){
$('#nombreemp').html('Empresa');
$('#cifnif').html('CIF');
$('#nombreempresa').val('');
$('#nombreempresa').prop('readonly', false);
}
});/*
//relleno el CP con ceros si no tiene 5 dígitos busco provincia en la base de datos
$('#cp').focusout(function(){
var dig= $('#cp').val();
if(dig.lenght()===4){
$('#cp').val('0' + dig);
}*/
var cp=null;
 cp= $('#cp').val();
var promise = $.ajax({
type: 'GET',
'url': 'php/provincias.php',
'dataType': 'json'
});
promise.done(function(data){
$('#provincia').attr('value',data).html();
});
promise.fail(function(){
console.log('Error al importar municipio y provincia');
});
$('#email').focusout(function(){

	var usu=$('email').val();
	$('#usuario').val(usu);
	$('#usuario').prop('readonly' , true);

});
/*
//cuando se completan los apellidos se rellena Nombre en los datos de facturación
$("#apellidos").focusout(function(){
var completo = $('#nombre').val() +' '+ $('#apellidos').val();
$('#nombreempresa').val(completo);
$('#nombreempresa').prop('readonly',true);
});

//establecer la password compleja
$("#password").focusin(function(){
$("#password").complexify(options, callback(valid, complexity)){
	alert('Password complexity: '+ complexity);
}
});
$('#password').focusin(function () {
$('#password').complexify({}, function (valid, complexity) {
$('#complex').attr('value',complexity);
});
});
*/