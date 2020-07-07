# To add path prefix:
# -e REACT_APP_PATH_PREFIX=/citywide-dashboard/editor
docker run -dit -p 3024:3000 --restart always -v $(pwd):/app -v /app/node_modules -e CHOKIDAR_USEPOLLING=true -e REACT_APP_API_URL=localhost:3006 --name cwd-editor cwd-editor
