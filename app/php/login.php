<?php
$email = trim(strtolower($_REQUEST['email']));
// Aceptamos peticiones cors
header('content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
//Cadena de conexión
$db = new mysqli("localhost", "pabloiglesias_bd", "provincias", "pabloiglesias_pro");
$errorbd = $db->connect_errno;
if ($errorbd == null) {
//inicializamos el cliente en utf-8:
	$db->set_charset("utf8");
//creamos la consulta sobre la usuarios
	$sql = "SELECT email FROM usuarios;";
	if (!$resultado = $db->query($sql)) {
		die('Ocurrio un error ejecutando el query [' . $db->error . ']');}
	$noexiste = 'true';
	while ($resul = $resultado->fetch_assoc()) {
		if ($email == $resul['email']) {
			$noexiste = 'Usuario Ya Registrado';
		}
	}

} else {
	// si la conexión da error
	print "Imposible conectar con la bbdd ";
}
$db->close();
unset($db);
echo $noexiste;
?>