<?php
$cp = $_GET['cp'];
header('content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *"); // permite usar CORS
//Cadena de conexión seleccionando bd:
$db = new mysqli("localhost", "pabloiglesias_bd", "provincias", "pabloiglesias_pro");
$errorbd = $db->connect_errno;
// si la conexión con la base de datos NO da error
if ($errorbd == null) {
//inicializamos el cliente en utf-8:
	$db->set_charset("utf8");
//creamos la consulta sobre la tabla provincias y localidades
	$sql = 'SELECT poblacion FROM poblaciones where cod_postal=' . $cp . ';';
	if (!$resultado = $db->query($sql)) {
		die('Ocurrio un error ejecutando el query [' . $db->error . ']');}
	while ($resul = $resultado->fetch_assoc()) {
		$data = $resul['poblacion'];
	}
	$json = json_encode($data);
	echo isset($_GET['callback'])
	? "{$_GET['callback']}($json)"
	: $json;

} else {
	// si la conexión da error
	print "Imposible conectar con la bbdd de provincias";
}
$db->close();

unset($db);