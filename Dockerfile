# Use Node.js 20 Alpine image for smaller image size
FROM node:20-alpine

# Update package index
RUN apk update

# Set working directory
WORKDIR /usr/app

# Copy application files to the container
COPY . .
COPY prisma ./prisma

# Install dependencies and build the app
RUN npm ci
RUN npm run build

# Define the default command to start the app
CMD ["npm", "start"]
