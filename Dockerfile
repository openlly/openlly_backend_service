# Use Node.js 20 Alpine image for smaller image size
FROM node:20-alpine

# Update package index
RUN apk update

# Set working directory
WORKDIR /usr/app

# Copy application files to the container
COPY . .
COPY prisma ./prisma
COPY wait-for-it.sh /usr/app/wait-for-it.sh

# Ensure wait-for-it.sh is executable
RUN chmod +x /usr/app/wait-for-it.sh

# Install dependencies and build the app
RUN npm ci
RUN npm run build

# Define the default command to start the app
CMD ["npm", "start"]
