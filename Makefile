all:
	webpack

testserver: all
	python -m SimpleHTTPServer 8081
