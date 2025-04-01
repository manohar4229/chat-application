# Build stage for client
FROM node:18-alpine AS client-builder

WORKDIR /app/client

# Copy client package files
COPY client/package*.json ./

# Install client dependencies
RUN npm ci

# Copy client source code
COPY client/ .

# Copy production environment file
COPY client/.env.production .env

# Build the client application
ENV NODE_ENV=production
RUN npm run build

# Build stage for server
FROM node:18-alpine AS server-builder

WORKDIR /app/server

# Copy server package files
COPY server/package*.json ./

# Install server dependencies
RUN npm ci

# Copy server source code
COPY server/ .

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install nginx
RUN apk add --no-cache nginx

# Copy client build
COPY --from=client-builder /app/client/build /usr/share/nginx/html

# Copy nginx configuration
COPY client/nginx.conf /etc/nginx/conf.d/default.conf

# Copy server files
COPY --from=server-builder /app/server/server.js ./server/
COPY --from=server-builder /app/server/routes ./server/routes
COPY --from=server-builder /app/server/controllers ./server/controllers
COPY --from=server-builder /app/server/middleware ./server/middleware
COPY --from=server-builder /app/server/models ./server/models
COPY --from=server-builder /app/server/package*.json ./server/

# Copy production environment file
COPY server/.env.production ./server/.env

# Install server production dependencies
WORKDIR /app/server
RUN npm ci --only=production

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000
ENV MONGODB_URI=mongodb+srv://chatapp:chatapp@cluster0.obgakxi.mongodb.net/
ENV JWT_SECRET=manohar
ENV CLIENT_URL=https://chat-client-wine.vercel.app/

# Create startup script
RUN echo '#!/bin/sh\n\
nginx\n\
cd /app/server && node server.js\n\
' > /app/start.sh && chmod +x /app/start.sh

# Expose ports
EXPOSE 80 5000

# Start both nginx and server
CMD ["/app/start.sh"] 