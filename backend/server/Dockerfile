# Base image
FROM node:18.16.0
# Create app directory
RUN mkdir -p /usr/server/src
WORKDIR /usr/server/src
# Install app dependencies
COPY package.json /usr/server/src
RUN npm install 
# Bundle app source
COPY . /usr/server/src
CMD [ "npm", "start" ]