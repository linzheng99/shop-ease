FROM node:20-alpine AS builder

WORKDIR /app

# Copy all necessary files for build
COPY package*.json ./
COPY turbo.json ./
COPY packages ./packages/
COPY apps/web/package*.json ./apps/web/
COPY apps/api/prisma ./apps/api/prisma

# Install all dependencies (including dev dependencies)
RUN npm install

# Generate Prisma client for types
WORKDIR /app/apps/api
RUN npx prisma generate

# Return to app directory and copy web source
WORKDIR /app
COPY apps/web ./apps/web/

# Build the application
RUN npm run build --workspace=web

# Stage 2: Run the application
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files and local packages
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/packages ./packages/
COPY --from=builder /app/apps/web/package*.json ./

# Copy built assets
COPY --from=builder /app/apps/web/.next ./.next
COPY --from=builder /app/apps/web/public ./public

# Install production dependencies (including local packages)
RUN npm install --omit=dev --legacy-peer-deps

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3006
ENV NEXT_PUBLIC_API_URL=http://api:4000

EXPOSE 3006

CMD ["npm", "start"]
