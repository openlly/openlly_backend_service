#!/bin/bash

echo "Select an option:"
echo "1. docker-compose up (without build)"
echo "2. docker-compose up --build -d (with build using cache)"
echo "3. docker failures logs"
echo "4. db migration"

read -p "Enter an option: " option

case $option in
    1)
        # Run without building
        docker-compose up
        ;;
    2)
        # Run with build, using the cache
        docker-compose up --build --no-cache -d
        ;;
    3)
        # Show the last 100 logs
        docker-compose logs -f --tail=100
        ;;
    4)
        # Perform DB migration with user inputs
        read -p "Enter DB name: " DB_NAME
        read -p "Enter migration name: " MIGRATION_NAME
        npx prisma migrate dev --name $MIGRATION_NAME --schema=$DB_NAME
        ;;
    *)
        echo "Invalid option"
        ;;
esac
