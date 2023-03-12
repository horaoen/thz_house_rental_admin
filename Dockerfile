FROM node:16 as build
RUN npm config set registry https://registry.npmmirror.com
WORKDIR /app

COPY package.json ./
RUN npm install

COPY tsconfig.json ./
COPY public public/

COPY src src/
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/build/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
