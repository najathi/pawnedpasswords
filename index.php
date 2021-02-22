<?php

function checkPawnedPasswords(string $password) : int
{
    $sha1 = strtoupper(sha1($password));
    $data = file_get_contents('https://api.pwnedpasswords.com/range/'.substr($sha1, 0, 5));

    if (FALSE !== strpos($data, substr($sha1, 5))) {
        $data = explode(substr($sha1, 5).':', $data);
        $count = (int) $data[1];
    }

    return $count ?? 0;
}

echo "<br/><br/>";

echo checkPawnedPasswords("abcd1234");