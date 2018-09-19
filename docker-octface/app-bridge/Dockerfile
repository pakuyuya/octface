FROM node:8.11.1-alpine

RUN npm install -g express-generator@4.16.0

COPY $app_root/app-bridge /usr/local/app-bridge
WORKDIR /usr/local/app-bridge 
RUN npm install

ENV NODE_ENV=production

EXPOSE 3000
CMD ["npm", "start"]
