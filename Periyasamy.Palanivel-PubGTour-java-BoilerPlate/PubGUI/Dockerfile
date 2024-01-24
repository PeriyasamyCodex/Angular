FROM node:12.7-alpine AS build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json .
RUN npm install
COPY . .
RUN npm run build


FROM nginx:1.17.1-alpine As prod-stage
COPY default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/PubGUI /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]
