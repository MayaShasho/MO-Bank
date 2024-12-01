# Node.js image: this is Node.js version
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or npm-shrinkwrap.json) to the working directory.
# This allows Docker to install the exact versions of dependencies defined in the lock file.
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 8080

# Command to run the app
CMD ["npm", "start"]
