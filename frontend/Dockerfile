FROM node:18-alpine

WORKDIR /app

# copy package.json
COPY package*.json ./

# install all our packeges
RUN npm install

# RUN npm install rollup --save-dev

# copy all our remaining files
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
