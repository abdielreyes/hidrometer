#! /bin/bash

cd frontend
vite build
cd ../
sudo mkdir -p /var/www/hidrometer/html

sudo cp -r ./frontend/dist/* /var/www/hidrometer/html

sudo chown -R $USER:$USER /var/www/hidrometer/html
sudo chmod -R 755 /var/www/hidrometer
