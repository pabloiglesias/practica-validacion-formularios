 'use strict';
$(document).ready(function(){
	$.extend($.validator.messages, {
	required: "Este campo es obligatorio.",
	remote: "Por favor, rellena este campo.",
	email: "Por favor, escribe una dirección de correo válida.",
	url: "Por favor, escribe una URL válida.",
	date: "Por favor, escribe una fecha válida.",
	dateISO: "Por favor, escribe una fecha (ISO) válida.",
	number: "Por favor, escribe un número válido.",
	digits: "Por favor, escribe sólo dígitos.",
	creditcard: "Por favor, escribe un número de tarjeta válido.",
	equalTo: "Por favor, escribe el mismo valor de nuevo.",
	extension: "Por favor, escribe un valor con una extensión aceptada.",
	maxlength: $.validator.format("Por favor, no escribas más de {0} caracteres."),
	minlength: $.validator.format("Por favor, no escribas menos de {0} caracteres."),
	rangelength: $.validator.format("Por favor, escribe un valor entre {0} y {1} caracteres."),
	range: $.validator.format("Por favor, escribe un valor entre {0} y {1}."),
	max: $.validator.format("Por favor, escribe un valor menor o igual a {0}."),
	min: $.validator.format("Por favor, escribe un valor mayor o igual a {0}."),
	nifES: "Por favor, escribe un NIF válido.",
	nieES: "Por favor, escribe un NIE válido.",
	cifES: "Por favor, escribe un CIF válido."
});
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
	remote:'login.php'
	},
	email2:{
	required: true,
	equalTo: '#email'
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
	required: true,
	iban: true,
	minlength: 24,
	maxlength: 24
	},
	usuario:{
	required: true,
	minlength: 4
	},
	password:{
	required:true
	},
	repetircontraseña:{
		required:true,
		equalTo:'#password'
	},
	messages:{
	nombre:{
		required:'Campo obligatorio'
	},
	apellidos:{
		required:'Campo requerido'
	},
	iban: {
		iban:'Introduzca un IBAN correcto'
	}
	},
submitHanler:function(){
	confirm('Esta en proceso de alta y su cuota sera '+$('#sel2').val()+' '+ $);
}
}
});
 
$('#particular').change(function(){
if($('#particular').is(':checked')){
$('#nombreemp').html('Nombre');
$('#cifnif').html('NIF');
var completo = $('#nombre').val() + '' + $('#apellidos').val();
$('#nombreempresa').val(completo);
$('#nombreempresa').prop('readonly' , true);
}
});
$('#empresa').change(function(){
if($('#empresa').is(':checked')){
$('#nombreemp').html('Empresa');
$('#cifnif').html('CIF');
$('#nombreempresa').val('');
$('#nombreempresa').prop('readonly', false);
}
});
$('#cp').focusout(function(){
var dig= $('#cp').val();
if(dig.lenght()===4){
$('#cp').val('0' + dig);
}
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
});
$('#email').focusout(function(){
var email=null;
 email= $('#email').val();
var promise = $.ajax({
type: 'GET',
'url': 'php/login.php',
'dataType': 'json'
});
promise.done(function(data){
if(data===null){
var usu=$('email').val();
	$('#usuario').val(usu);
	$('#usuario').prop('readonly' , true);

}
else
{
	alert('Error: Usuario ya existe');
}
});
promise.fail(function(){
	alert('Error: al importar el correo');
});
});
//complexyty
$('#password').focusin(function () {
$('#password').complexify({}, function (valid, complexity) {
$('#complex').attr('value',complexity);

});
});

//cuando se completan los apellidos se rellena Nombre en los datos de facturación
$('#apellidos').focusout(function(){
var completo = $('#nombre').val() +' '+ $('#apellidos').val();
$('#nombreempresa').val(completo);
$('#nombreempresa').prop('readonly',true);
});
});