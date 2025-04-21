# Dockerfile for the frontend application
FROM node:18 AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Use nginx to serve the app
FROM nginx:alpine

# Copy the built frontend app from builder stage to nginx
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
