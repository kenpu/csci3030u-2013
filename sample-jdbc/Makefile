CP = "./sqlite-jdbc-3.7.2.jar;."
Sample.class : Sample.java
	javac -cp $(CP) Sample.java

test: Sample.class
	java -cp $(CP) Sample

clean:
	rm -f Sample.class sample.sqlite

