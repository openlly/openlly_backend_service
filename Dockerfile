FROM node:20-alpine


# Update package index
RUN apk update

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY . .
COPY prisma ./prisma


RUN npm ci

RUN npm run build


CMD [ "npm", "start" ]
