<?php

	$JAVA_HOME = "C:/Program Files/Java/jdk1.8.0_25";
	#$PYTHONPATH = "C:\Users\Johny_Mathew\AppData\Local\Programs\Python\Python36\Lib\site-packages\tensorflow"; 
	$PATH = "$JAVA_HOME/bin:".getenv('PATH');
	putenv("JAVA_HOME=$JAVA_HOME");
	putenv("PATH=$PATH");
	#putenv("PYTHONPATH=$PYTHONPATH");
	echo shell_exec("java -jar SentenceSimplification1/out/artifacts/SentenceSimplification1_jar/SentenceSimplification1.jar 2>&1");
?>