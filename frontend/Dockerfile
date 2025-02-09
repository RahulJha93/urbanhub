# Step 1: Build the frontend application
FROM node:16 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the frontend files (from the current folder)
COPY . ./ 

# Build the Vite application
RUN npm run build

# Step 2: Serve the application with a web server
FROM nginx:alpine

# Copy the built files to the nginx server
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
