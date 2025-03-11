FROM node:lts AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
# ARG VITE_API_URL
ENV VITE_API_URL="__RUNTIME_API_URL__"
ENV VITE_STATIC_URL="__RUNTIME_STATIC_URL__"
COPY . /app
WORKDIR /app

# Install dependencies with cache mount
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Build the app
RUN pnpm run build

# Production stage - minimal Nginx
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist .
COPY .nginx/nginx.conf /etc/nginx/conf.d/default.conf

# replacing api url at runtime
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
