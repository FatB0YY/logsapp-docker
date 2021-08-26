run: 
	docker run -p 4000:4000 -d --rm--name logsapp -v logs:/app/data logsapp:volumes
stop:
	docker stop logsapp