# ----------------------
# 1. Builder Stage
# ----------------------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --frozen-lockfile

COPY . .

RUN npm run build

# ----------------------
# 2. Runner Stage
# ----------------------
FROM node:18-alpine

WORKDIR /app

# Copy only the built app + node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

EXPOSE 3001

CMD ["npm", "start"]
