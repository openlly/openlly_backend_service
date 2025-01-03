# Step 1: Build Stage
FROM node:20 AS build

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all the app files
COPY . .

# Build the TypeScript code
RUN npm run build

# Step 2: Production Stage
FROM node:20-slim

WORKDIR /app

# Install only production dependencies (skip dev dependencies)
COPY --from=build /app/package*.json ./
RUN npm install --production

# Copy the built app files from the build stage
COPY --from=build /app/build /app/build

# Expose the port that your app will run on
EXPOSE 3001

# Command to start the app in production mode
CMD ["node", "build/app.js"]
