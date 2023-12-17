#! /bin/bash

cd ./backend
pm2 start "bun run start" --name "backend"
