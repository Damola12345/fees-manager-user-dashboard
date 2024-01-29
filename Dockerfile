FROM node:18-alpine AS build

WORKDIR /app

COPY . /app

RUN npm install --legacy-peer-deps

# Building app for production
RUN npm run build

# Stage 2: Create the production image
FROM node:18-alpine

# Install `serve` to run the application.
RUN npm install -g serve  

WORKDIR /app

# Copy the build artifacts from the previous stage
COPY --from=build /app/build /app/build

EXPOSE 3000

CMD ["serve", "-s", "build"]