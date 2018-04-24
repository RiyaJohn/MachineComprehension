<?php
$JAVA_HOME = "C:/Program Files/Java/jdk1.8.0_25";
$PATH = "$JAVA_HOME/bin:".getenv('PATH');
putenv("JAVA_HOME=$JAVA_HOME");
putenv("PATH=$PATH");
echo "<strong>Compile:</strong>";
echo "<strong>Run:</strong>";
echo shell_exec("java -jar SentenceSimplification1/out/artifacts/SentenceSimplification1_jar/SentenceSimplification1.jar 2>&1");
		
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
	
	if(strcmp($file_path, 'question.txt') == 0)
	{
		writeToQuestionFile($file_path , $file_content);
		//RUN JAVA CODE:
		$status = runApplication();
		if($status == 0)
			readFromAnswerFile();;
	}
	else
	{
		echo "";
	}
	
	function writeToQuestionFile($file_path , $file_content){
		if($file_path && $file_content){
			$my_file = $file_path;
			$handle = fopen($my_file, 'w') or die('Cannot open file:  '.$my_file);
			fwrite($handle, $file_content);
		}
		
	}
	
	function readFromAnswerFile(){
		$my_file = "answer.txt";
		$handle = fopen($my_file, 'r') or die('Cannot open file:  '.$my_file);
		echo fread($handle, filesize($my_file ));
		echo "answer";
		fclose($handle);
	}
	
	
	function runApplication(){
		//$file_path , $file_content
		shell_exec("javac SentenceSimplification1/src/main/java/SentenceSimplification/Wrapper.java 2>&1");
		$output = shell_exec("java SentenceSimplification1/src/main/java/SentenceSimplification/Wrapper 2>&1");
		return $output;
	}
	
?>