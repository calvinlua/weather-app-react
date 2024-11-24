# Use the official Node.js image
FROM node:20-alpine3.19 AS builder

# Define another build-time argument for a secret key or API key
ARG BUILD_ENV
ARG APP_KEY

# Use the build-time argument to set an environment variable
ENV VITE_HELLO=${BUILD_ENV}
ENV VITE_APP_KEY=${APP_KEY}

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the project
RUN npm run build

# Fetching the latest nginx image
FROM nginx

# Copying built assets from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copying our nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
