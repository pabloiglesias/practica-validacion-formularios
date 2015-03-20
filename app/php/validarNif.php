<?php
$dni = trim(strtolower($_GET['cifnif']));
header('content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
$db = new mysqli("localhost", "pabloiglesias_bd", "provincias", "pabloiglesias_pro");
$errorbd = $db->connect_errno;
if ($errorbd == null) {
	$db->set_charset("utf8");
	$sql = "SELECT dni FROM usuarios;";
	if (!$resultado = $db->query($sql)) {
		die('Ocurrio un error ejecutando el query [' . $db->error . ']');}
	$noexiste = true;
	while ($resul = $resultado->fetch_assoc()) {
		if ($dni === $resul['dni']) {
			$noexiste = 'NIF Registrado Imposible Registrar';
		}
	}

} else {
	// si la conexión da error
	print "Imposible conectar con la bbdd ";
}
$db->close();
unset($db);
echo $noexiste;