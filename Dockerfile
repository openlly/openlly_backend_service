# Base image
FROM node:20-alpine

# Update package index
RUN apk update

# Create app directory
WORKDIR /usr/app

# Copy package.json and package-lock.json first (optimize caching)
COPY package*.json ./

# Install app dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Copy Prisma directory
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Set environment variables
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# Build the app for production
RUN if [ "$NODE_ENV" = "production" ]; then npm run build; fi

#Expose the port
EXPOSE 3000

# Set the default command based on environment
CMD ["sh", "-c", "if [ \"$NODE_ENV\" = \"production\" ]; then npm run start; else npm run dev; fi"]
