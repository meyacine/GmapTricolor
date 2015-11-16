<?php
    header('Content-Type: application/json');
	$resultat = '[]';
	try{
		$dbh = new PDO('mysql:host=127.0.0.1;port=3306;dbname=ep', 'root', '');
		$stmt = $dbh->prepare("SELECT * FROM light_stops");
		$stmt->execute();
		$feuxTricolors=$stmt->fetchAll(PDO::FETCH_ASSOC);
		$resultat = json_encode($feuxTricolors);
	}catch(PDOException $Exceptio){
		$resultat = "{\"error\":\"Un probleme de communication avec la BDD est survenue\"}";	
	}
	echo $resultat;
?>