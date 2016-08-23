FROM mhart/alpine-node:6.3.0

RUN npm install -g http-server

COPY index.html .

CMD ["http-server","--port","8080"]