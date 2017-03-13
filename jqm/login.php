<?php
header('Content-type: application/json');
$data = array ('result'=>"true",'role'=>'admin','c'=>3,'d'=>4,'e'=>5);
echo json_encode($data);
