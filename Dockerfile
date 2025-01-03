FROM node:20-alpine


# Update package index
RUN apk update

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY . .
COPY prisma ./prisma
COPY wait-for-it.sh /usr/app/wait-for-it.sh

RUN chmod +x /usr/app/wait-for-it.sh


RUN npm ci

RUN npm run build


CMD [ "npm", "start" ]
