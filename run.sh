docker run -dit -p 3024:3000 --restart always -v $(pwd):/app -v /app/node_modules -e CHOKIDAR_USEPOLLING=true --name cwd-editor cwd-editor
