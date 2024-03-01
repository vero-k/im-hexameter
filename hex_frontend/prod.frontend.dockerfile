
FROM node:18-alpine AS build
ENV NODE_ENV production
ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=16384
ENV REACT_APP_BACKENDURL_PRIO=http://im-hexameter-drauf.site:8000/


# Create an application directory
RUN mkdir -p /frontend_app

# Set the working directory in the Docker container
WORKDIR /frontend_app

# Copy package.json and package-lock.json/yarn.lock files
COPY package.json .

RUN npm cache clean --force
# For npm users
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

RUN GENERATE_SOURCEMAP=false npm run build --omit=dev

RUN rm -rf /usr/share/nginx/html/*

FROM nginx:stable-alpine as production
COPY --from=build /frontend_app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

