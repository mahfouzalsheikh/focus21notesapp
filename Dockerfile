FROM netczuk/node-yarn

RUN mkdir -p /usr/local/app
WORKDIR /usr/local/app
COPY . . 
RUN yarn install
ARG mongo_domain=127.0.0.1
RUN sed -i 's#127.0.0.1#'"$mongo_domain"'#g' api/db.js
RUN sed -i 's#3001#'3000'#g' api/server.js
EXPOSE 3000
CMD ["yarn", "start-api"]
