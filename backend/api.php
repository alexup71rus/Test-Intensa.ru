<?php
$entityBody = file_get_contents('php://input');

$result = json_decode($entityBody);

if (json_last_error() === JSON_ERROR_NONE && $result->{'phone'} && $result->{'time'}) {
    if (file_put_contents(__DIR__ . '/data/' . strtotime('now') . '.json', $entityBody)) {
        echo 'ok';
    } else {
        echo 'some error';
    }
} else {
    echo 'error json';
}

