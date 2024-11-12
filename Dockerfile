# Use the official Node.js image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

ARG BUILD_ENV

ENV VITE_HELLO=${BUILD_ENV}


# Define another build-time argument for a secret key or API key
ARG APP_KEY

# Use the build-time argument to set an environment variable
ENV VITE_APP_KEY=${APP_KEY}


# Copy package.json and install dependencies
COPY package*.json .
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the project
RUN npm run build

# Install 'serve' to serve the static files
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Command to serve the static files
CMD ["serve", "-s", "dist", "-l", "3000"]
