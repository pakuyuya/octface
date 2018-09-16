FROM node:8.11.1-alpine

RUN npm install -g express-generator@4.16.0

COPY $app_root/app-oct-bridge /usr/local/app-octface-bridge
WORKDIR /usr/local/app-octface-bridge 
RUN npm install

ENV NODE_ENV=production

EXPOSE 3000
CMD ["npm", "start"]
