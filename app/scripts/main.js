 'use strict';
 $('#formulario').each (function(){
this.reset();
});
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
	cifES: "Por favor, escribe un CIF válido.",
	repetircontraseña: "Escribe la misma contraseña"
});
  $('#formulario').validate({
  	focusCleanup: true,	
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
		remote:'php/login.php'
	},
	email2:{
		equalTo: '#email'
	},
	cifnif: {
		required:true,
		minlength:9,
		remote:'php/validarNif.php',
	nifES:function(){
// Si el demandante es particular se comprueba formato nif.
		if ($('#particular').is(':checked')){
		$('#cifnif').val().toUpperCase();
		return 'nifES';
		}
	},
	cifES: function(){
	// Si el demandante es empresa se comprueba formato cif.
		if ($('#empresa').is(':checked')){
		$('#cifnif').val().toUpperCase();
		return 'cifES';
		}
	}
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
	required:true,
	minlength:8
	},
	repetircontraseña:{
		equalTo:password
	},
	messages:{
	nombre:{
		required:'Campo obligatorio'
	},
	apellidos:{
		required:'Campo requerido'
	},
	iban: {
		required:true,
		iban:'iban'
	}
	},
submitHandler : function (){
	var nombre =$('#usuario').val();
	var registrar=confirm('Esta en proceso de alta para el usuario '+ nombre +' y su cuota sera '+$('#sel2').val());
	if(registrar == 1){
	alert("  Usuario Registrado  ");
	 
	}
	else
	{
		alert("  Usuario No registrado ");

	}
	window.location.reload();
}
}
});
 
$('#particular').change(function(){
if($('#particular').is(':checked')){
$('#nombreemp').html('Nombre');
$('#cifniflabel').html('NIF');
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
//metodo para rellenar provincia con cp
$('#cp').focusout(function(){
var dig= $('#cp').val();
if(dig.length === 4){
$('#cp').val('0' + dig);
}
var cp=null;
 cp= $('#cp').val();
 var promise = $.ajax({
url: 'php/provincias.php',
type: 'GET',
dataType: 'json',
data: {cp: $('#cp').val()}
});
promise.done(function(data){
	$('#provincia').val(data);
});
promise.fail(function(){
console.log('Error al importar municipio y provincia');
});
});
$('#cp').focusout(function(){
var cp=null;
 cp= $('#cp').val();
 var promise = $.ajax({
url: 'php/provincias2.php',
type: 'GET',
dataType: 'json',
data: {cp: $('#cp').val()}
});
promise.done(function(data){
	$('#localidad').val(data);
});
promise.fail(function(){
console.log('Error al importar municipio y provincia');
});
});
$('#email').focusout(function(){
	$('#usuario').attr('value',$('#email').val());
	$('#usuario').prop('readonly',true);

});
//complexyty para complejidad de contraseña con barra indicativa
$('#password').focusin(function () {
$('#password').complexify({}, function (valid, complexity) {
$('#complex').attr('value',complexity);

});
});

//metodo para rellenar nombre de empresa con apellido y nombre 
$('#apellidos').focusout(function(){
var completo = $('#nombre').val() +' '+ $('#apellidos').val();
$('#nombreempresa').val(completo);
$('#nombreempresa').prop('readonly',true);
});
$.validator.addMethod('iban', function(value, element) {
if (this.optional(element)) {
return true;
}
var iban = value.replace(/ /g, '').toUpperCase(),
ibancheckdigits = '',
leadingZeroes = true,
cRest = '',
cOperator = '',
countrycode, ibancheck, charAt, cChar, bbanpattern, bbancountrypatterns, ibanregexp, i, p;
if (!(/^([a-zA-Z0-9]{4} ){2,8}[a-zA-Z0-9]{1,4}|[a-zA-Z0-9]{12,34}$/.test(iban))) {
return false;
}
// check the country code and find the country specific format
countrycode = iban.substring(0, 2);
bbancountrypatterns = {
"AL": "\\d{8}[\\dA-Z]{16}",
"AD": "\\d{8}[\\dA-Z]{12}",
"AT": "\\d{16}",
"AZ": "[\\dA-Z]{4}\\d{20}",
"BE": "\\d{12}",
"BH": "[A-Z]{4}[\\dA-Z]{14}",
"BA": "\\d{16}",
"BR": "\\d{23}[A-Z][\\dA-Z]",
"BG": "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
"CR": "\\d{17}",
"HR": "\\d{17}",
"CY": "\\d{8}[\\dA-Z]{16}",
"CZ": "\\d{20}",
"DK": "\\d{14}",
"DO": "[A-Z]{4}\\d{20}",
"EE": "\\d{16}",
"FO": "\\d{14}",
"FI": "\\d{14}",
"FR": "\\d{10}[\\dA-Z]{11}\\d{2}",
"GE": "[\\dA-Z]{2}\\d{16}",
"DE": "\\d{18}",
"GI": "[A-Z]{4}[\\dA-Z]{15}",
"GR": "\\d{7}[\\dA-Z]{16}",
"GL": "\\d{14}",
"GT": "[\\dA-Z]{4}[\\dA-Z]{20}",
"HU": "\\d{24}",
"IS": "\\d{22}",
"IE": "[\\dA-Z]{4}\\d{14}",
"IL": "\\d{19}",
"IT": "[A-Z]\\d{10}[\\dA-Z]{12}",
"KZ": "\\d{3}[\\dA-Z]{13}",
"KW": "[A-Z]{4}[\\dA-Z]{22}",
"LV": "[A-Z]{4}[\\dA-Z]{13}",
"LB": "\\d{4}[\\dA-Z]{20}",
"LI": "\\d{5}[\\dA-Z]{12}",
"LT": "\\d{16}",
"LU": "\\d{3}[\\dA-Z]{13}",
"MK": "\\d{3}[\\dA-Z]{10}\\d{2}",
"MT": "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
"MR": "\\d{23}",
"MU": "[A-Z]{4}\\d{19}[A-Z]{3}",
"MC": "\\d{10}[\\dA-Z]{11}\\d{2}",
"MD": "[\\dA-Z]{2}\\d{18}",
"ME": "\\d{18}",
"NL": "[A-Z]{4}\\d{10}",
"NO": "\\d{11}",
"PK": "[\\dA-Z]{4}\\d{16}",
"PS": "[\\dA-Z]{4}\\d{21}",
"PL": "\\d{24}",
"PT": "\\d{21}",
"RO": "[A-Z]{4}[\\dA-Z]{16}",
"SM": "[A-Z]\\d{10}[\\dA-Z]{12}",
"SA": "\\d{2}[\\dA-Z]{18}",
"RS": "\\d{18}",
"SK": "\\d{20}",
"SI": "\\d{15}",
"ES": "\\d{20}",
"SE": "\\d{20}",
"CH": "\\d{5}[\\dA-Z]{12}",
"TN": "\\d{20}",
"TR": "\\d{5}[\\dA-Z]{17}",
"AE": "\\d{3}\\d{16}",
"GB": "[A-Z]{4}\\d{14}",
"VG": "[\\dA-Z]{4}\\d{16}"
};
bbanpattern = bbancountrypatterns[countrycode];
// As new countries will start using IBAN in the
// future, we only check if the countrycode is known.
// This prevents false negatives, while almost all
// false positives introduced by this, will be caught
// by the checksum validation below anyway.
// Strict checking should return FALSE for unknown
// countries.
if (typeof bbanpattern !== "undefined") {
ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
if (!(ibanregexp.test(iban))) {
return false; // invalid country specific format
}
}
// now check the checksum, first convert to digits
ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
for (i = 0; i < ibancheck.length; i++) {
charAt = ibancheck.charAt(i);
if (charAt !== "0") {
leadingZeroes = false;
}
if (!leadingZeroes) {
ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
}
}
// calculate the result of: ibancheckdigits % 97
for (p = 0; p < ibancheckdigits.length; p++) {
cChar = ibancheckdigits.charAt(p);
cOperator = "" + cRest + "" + cChar;
cRest = cOperator % 97;
}
return cRest === 1;
}, "Por favor introduce un IBAN correcto");

});
jQuery.validator.addMethod("nifES", function (value, element) {
if(/^([0-9]{8})*[a-zA-Z]+$/.test(value)){
var dni = value.substr(0,value.length-1);
var l = value.charAt(value.length-1);
var pos = dni % 23;
var letra='TRWAGMYFPDXBNJZSQVHLCKET';
letra=letra.toUpperCase();
letra=letra.substring(pos,pos+1);
if (letra==l.toUpperCase()){
return true;
}
else{
return false;
}
}
});
jQuery.validator.addMethod( "cifES", function ( value, element ) {
 "use strict";
  
 var sum,
  num = [],
  controlDigit;
  
 value = value.toUpperCase();
  
 // Basic format test
 if ( !value.match( '((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)' ) ) {
  return false;
 }
  
 for ( var i = 0; i < 9; i++ ) {
  num[ i ] = parseInt( value.charAt( i ), 10 );
 }
  
 // Algorithm for checking CIF codes
 sum = num[ 2 ] + num[ 4 ] + num[ 6 ];
 for ( var count = 1; count < 8; count += 2 ) {
  var tmp = ( 2 * num[ count ] ).toString(),
   secondDigit = tmp.charAt( 1 );
   
  sum += parseInt( tmp.charAt( 0 ), 10 ) + ( secondDigit === '' ? 0 : parseInt( secondDigit, 10 ) );
 }
  
 // CIF test
 if ( /^[ABCDEFGHJNPQRSUVW]{1}/.test( value ) ) {
  sum += '';
  controlDigit = 10 - parseInt( sum.charAt( sum.length - 1 ), 10 );
  value += controlDigit;
  return ( num[ 8 ].toString() === String.fromCharCode( 64 + controlDigit ) || num[ 8 ].toString() === value.charAt( value.length - 1 ) );
 }
  
 return false;
  
}, "Numero de CIF No valido." );