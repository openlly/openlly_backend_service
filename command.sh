#!/bin/bash



echo "Select an option:"
echo "1. docker-compose up (without build)"
echo "2. docker-compose up --build -d (with build)"
echo "3. docker failures logs"
echo "4. db migration"

read -p "Enter an option: " option

case $option in
    1) docker-compose up;;
    2) docker-compose up --build -d;;
    3) docker-compose logs -f --tail=100;;
    4) 
        read -p "Enter DB name: " DB_NAME
        read -p "Enter migration name: " MIGRATION_NAME
        npx prisma migrate dev --name $MIGRATION_NAME $DB_NAME
        ;;
    *) echo "Invalid option";;
esac
