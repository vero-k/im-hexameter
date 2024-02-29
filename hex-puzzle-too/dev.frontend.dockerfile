
FROM node:18-alpine AS development 
ENV NODE_ENV development
ENV REACT_APP_BACKENDURL_PRIO=http://localhost:5000/

WORKDIR /frontend_app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

