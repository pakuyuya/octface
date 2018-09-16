from nginx:1.15.3

ARG app_root
ARG docker_root

# build vue application


RUN apt-get update

RUN apt-get install -y curl
RUN apt-get install -y gnupg gnupg1 gnupg2

RUN curl -sL https://deb.nodesource.com/setup_10.x | bash
RUN apt-get install -y nodejs npm

COPY $app_root/app-oct-face-front /usr/local/app-octface-front
RUN npm install -g @vue/cli@3.0.0-beta.6

WORKDIR /usr/local/app-octface-front
RUN npm install

ENV NODE_ENV=production

RUN npm run build

# put contents

RUN mkdir -p /usr/local/nginx/html
RUN cp -prf /usr/local/app-octface-front/dist/static /usr/local/nginx/html

# nginx settings
ADD $docker_root/app-front/conf/default.conf /etc/nginx/conf.d/
EXPOSE 80
