FROM node:alpine

ARG NPM_TOKEN

WORKDIR /app
COPY package.json .
COPY .npmrc .
RUN echo "//npm.pkg.github.com/:_authToken=${NPM_TOKEN}" >> .npmrc
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]
