<?php

$JAVA_HOME = "C:/Program Files/Java/jdk1.8.0_25";
#$PYTHONPATH = "C:\Users\Johny_Mathew\AppData\Local\Programs\Python\Python36\Lib\site-packages\tensorflow"; 
$PATH = "$JAVA_HOME/bin:".getenv('PATH');
putenv("JAVA_HOME=$JAVA_HOME");
putenv("PATH=$PATH");
#putenv("PYTHONPATH=$PYTHONPATH");
echo "<strong>Compile:</strong>";
echo "<strong>Run:</strong>";
#echo shell_exec("java -jar SentenceSimplification1/out/artifacts/SentenceSimplification1_jar/SentenceSimplification1.jar 2>&1");
				
        // echo "<strong>Java Version After Setting Environmental Variable</strong>";
        // echo "<hr/>";
        // echo $output;
		
		///$output = shell_exec("javac test.java 2>&1");
        //echo $output;
        // echo "<hr/>";
		// $output = shell_exec("java test 2>&1");
        // echo "<strong>Java Version After run code</strong>";
		// echo "<hr/>";
        // echo $output;

	extract($_POST);
	
	if(strcmp($file_path, 'C:/Software/xampp/htdocs/glint/resources/question.txt') == 0)
	{
		
		#set_time_limit(60);
		writeToFile($file_path , $file_content);
		//RUN SIMILARITY CODE:
		$status = runSimilarity();
		if($status == 0)
			readFromAnswerFile();;
	}
	else if(strcmp($file_path, 'C:/Software/xampp/htdocs/glint/resources/passage.txt') == 0)
	{
		set_time_limit(300);
		writeToFile($file_path , $file_content);
		//RUN JAVA CODE -> APP1.py:
		$status = runSimplifyAndQuesGen();
		#$status = runQuesGen();
	}
	function runQuesGen(){
		echo shell_exec("py C:/Software/xampp/htdocs/glint/php/MC/app1.py");

	}
	function writeToFile($file_path , $file_content){
		if($file_path && $file_content){
			$my_file = $file_path;
			$handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);
			fwrite($handle, $file_content);
		}
		
	}
	
	function readFromAnswerFile(){
		$my_file = "C:/Software/xampp/htdocs/glint/resources/answer.txt";
		$handle = fopen($my_file, 'r') or die('Cannot open file:  '.$my_file);
		echo "answer:";
		if(filesize($my_file)>0)
			echo fread($handle, filesize($my_file ));
		
		
		fclose($handle);
	}
	
	
	function runSimilarity(){
		//$file_path , $file_content
		echo "run sim:"
		echo shell_exec("py C:/Software/xampp/htdocs/glint/php/MC/similarity.py");

	}
	
	function runSimplifyAndQuesGen(){
	
		echo shell_exec("java -jar SentenceSimplification1/out/artifacts/SentenceSimplification1_jar/SentenceSimplification1.jar 2>&1");
	
	}
	
?>