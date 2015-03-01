<?php
$cp = substr($_GET["cp"], 0, 2);
// Cargar provincias
header("Access-Control-Allow-Origin: *"); // permite usar CORS
//Cadena de conexión seleccionando bd:
@$userv = new mysqli("localhost", "pabloiglesias_pro", "", "provincias");
$errorbd = $userv->connect_errno;
// si la conexión con la base de datos NO da error
if ($errorbd == null) {
//inicializamos el cliente en utf-8:
	$userv->set_charset("utf8");
//creamos la consulta sobre la tabla provincias y localidades
	$cp = $_REQUEST['cp'];
	$cp . substr($cp, 0, 1);
	echo $cp;

	$sql = "SELECT  cod_prov FROM poblaciones where cod_prov=" . $cp+";";

	$json = $sql;
} else {
	// si la conexión da error
	print "Imposible conectar con la bbdd de provincias";
}
$userv->close();

unset($userv);
