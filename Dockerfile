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
ENV GAMEKATE=0

# DisBot ghcr.io/jesperrichert/eaitbot:latest
CMD [ "node", "index.js" ]



