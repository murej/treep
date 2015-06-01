<?php

/*
phpinfo();
die;
*/

/*
function countAlreadySaved() {

	// integer starts at 0 before counting
    $i = 0; 
    $dir = 'uploads/';
    if ($handle = opendir($dir)) {
        while (($file = readdir($handle)) !== false){
            if (!in_array($file, array('.', '..')) && !is_dir($dir.$file)) 
                $i++;
        }
    }
    
    return $i;
}
*/

$imageData = $_POST['imgData'];

// Remove the headers (data:,) part.
// A real application should use them according to needs such as to check image type
$filteredData = substr($imageData, strpos($imageData, ",")+1);

// Need to decode before saving since the data we received is already base64 encoded
$unencodedData = base64_decode($filteredData);

// Save file.
$fp = fopen( 'uploads/' . time() . '.png', 'xb' );
// if file exists
while( $fp === false ) {
	$i++;
	$fp = fopen( 'uploads/' . time() . '_' . $i . '.png', 'xb' );
};

fwrite( $fp, $unencodedData);
fclose( $fp );

var_dump($fp);
break;


//date("Y-m-d_H-i-s-u")

?>