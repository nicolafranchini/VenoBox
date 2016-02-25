<?php if(isset($_GET['file'])){
	$file = $_GET['file'];
	$hit_count = @file_get_contents('count.txt');
	$hit_count++;
	@file_put_contents('count.txt', $hit_count);
	header('Location: http://lab.veno.it/venobox/'.$file); // redirect to the real file to be downloaded
} ?>