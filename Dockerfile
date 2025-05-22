# Step 1: Use base Node image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Step 4: Copy all app files
COPY . .



# Step 5: Expose app port
EXPOSE 4910

# Step 6: Run the app
CMD ["node", "server.js"]
