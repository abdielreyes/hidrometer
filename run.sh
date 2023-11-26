#! /bin/bash
cd frontend
pm2 start "bun run dev" --name "frontend"
cd ../backend
pm2 start "bun run start" --name "backend"
