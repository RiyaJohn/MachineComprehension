<?php
define('SEM_KEY', 1000);
noconcurrency();

function noconcurrency() {
    $semRes = sem_get(SEM_KEY, 1, 0666, 0); // get the resource for the semaphore

    if(sem_acquire($semRes)) { // try to acquire the semaphore. this function will block until the sem will be available
        // do the work 
		echo shell_exec("py C:/Software/xampp/htdocs/glint/php/MC/similarity.py");

        sem_release($semRes); // release the semaphore so other process can use it
    }
	
	echo "end";
}

?>