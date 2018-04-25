print("test py")
filename = "C:/Software/xampp/htdocs/glint/php/SentenceSimplification1/out/artifacts/SentenceSimplification1_jar/simplifiedSentences.txt"
file = open(filename, "r")
for line in file:
   print(line)
file.close();

fh = open("myout.txt", "w")
lines_of_text = ["Riya sda line"]
fh.writelines(lines_of_text)
fh.flush()
fh.close()