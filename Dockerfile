FROM node:21

WORKDIR /app

# Install app dependencies
COPY . /app
RUN cd /app && npm install -g npm@latest
RUN cd /app && npm install

ENV TOKEN=0
ENV APPLICATIONID=0
ENV MONGODBURL=0
ENV REACTIONSROLESCHANNEL=0
ENV WELCOMECHANNEL=0
ENV ADMINGUILDID=0


RUN useradd -m -d /home/container container
USER container
ENV USER=container HOME=/app
ENV DEBIAN_FRONTEND noninteractive

# DisBot ghcr.io/jesperrichert/eaitbot:latest
CMD [ "node", "index.js" ]



