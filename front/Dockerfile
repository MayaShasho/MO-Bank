# Use Node.js image to build the frontend
FROM node:16 as build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) to the working directory.
# This allows Docker to install the exact versions of dependencies defined in the lock file.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Build the frontend
RUN npm run build

# Use an Nginx image to serve the built files
FROM docker.io/nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
