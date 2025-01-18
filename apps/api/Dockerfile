FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY turbo.json ./
COPY apps/api/package*.json ./apps/api/

# Install dependencies
RUN npm install

# Copy the source code and prisma schema
COPY apps/api ./apps/api/

# Generate Prisma client in the correct location
WORKDIR /app/apps/api
RUN npx prisma generate

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine AS runner

WORKDIR /app

# Copy prisma schema first
COPY --from=builder /app/apps/api/prisma ./prisma

# Copy built assets and package files
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package*.json ./

# Install production dependencies
RUN npm install --production

# Generate Prisma client in production
RUN npx prisma generate

RUN mkdir -p /app/uploads && chmod 777 /app/uploads

# Set environment variables
ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

COPY apps/api/start.sh ./apps/api/start.sh
RUN chmod +x ./apps/api/start.sh

CMD ["./apps/api/start.sh"]
