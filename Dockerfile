# Step 1: Build Stage
FROM node:20 AS build

WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to install dependencies
COPY package*.json ./

# Install dependencies (including dev dependencies for the build step)
RUN npm install

# Copy all the app files
COPY . .

# Build the TypeScript code
RUN npm run build  # This uses tsc to output into the dist folder

# Clean up the node_modules folder to ensure only production dependencies are included
RUN rm -rf node_modules

# Step 2: Production Stage
FROM node:20-slim

WORKDIR /app

# Install only production dependencies (skip dev dependencies)
COPY --from=build /app/package*.json ./
RUN npm install --production --omit=dev

# Copy the built app files from the build stage
COPY --from=build /app/dist /app/dist  # Copy the dist folder

# Expose the port that your app will run on
EXPOSE 3001

# Command to start the app in production mode from the dist folder
CMD ["node", "dist/app.js"]
