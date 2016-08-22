FROM mhart/alpine-node:6.3.0

RUN npm install -g json-server 

COPY db2.json . 
COPY index.html .
COPY main.js .
COPY mustache.min.js .
COPY style.css .

CMD ["json-server","db2.json","--port","8080"]

