#!/bin/sh

# replace the placeholder with the runtime value
find /usr/share/nginx/html -type f -exec sed -i "s|__RUNTIME_API_URL__|$RUNTIME_API_URL|g" {} +
exec "$@"
