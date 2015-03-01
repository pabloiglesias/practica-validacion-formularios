<?php
$cp = $_GET["cp"];
// Cargar provincias
header('content-type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *"); // permite usar CORS
//Cadena de conexión seleccionando bd:
@$userv = new mysqli("localhost", "pabloiglesias_bd", "provincias", "pabloiglesias_pro");
$errorbd = $userv->connect_errno;
// si la conexión con la base de datos NO da error
if ($errorbd == null) {
//inicializamos el cliente en utf-8:
	$userv->set_charset("utf8");
//creamos la consulta sobre la tabla provincias y localidades
	$sql = "SELECT  poblacion FROM poblaciones where cod_postal=" . $cp+";";
	while ($row = $result->fetch_assoc()) {
		$data = $row['poblacion'];
	}
	$json = json_encode($data);
	echo isset($_GET['callback'])
	? "{$_GET['callback']}($json)"
	: $json;

} else {
	// si la conexión da error
	print "Imposible conectar con la bbdd de provincias";
}
$userv->close();

unset($userv);
