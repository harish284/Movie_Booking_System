FROM node:18

WORKDIR /app_backend

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install
RUN npm install -g nodemon

# Copy the application code
COPY . .

#port
EXPOSE 5000

CMD ["npx", "nodemon", "index.js"]
