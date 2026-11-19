# Cobalt Self-Hosted API Dockerfile
# Compatible with Hugging Face Docker Spaces (Port 7860) and Koyeb / VPS (Port 9000)
FROM ghcr.io/imputnet/cobalt:latest

# Hugging Face Spaces routes traffic to port 7860 by default.
# On Koyeb, you can either expose 7860 or override API_PORT=9000 in Environment Variables.
ENV API_PORT=7860
ENV CORS_WILDCARD=0
ENV CORS_URL=https://apisit-man.github.io
ENV DURATION_LIMIT=10800
ENV RATELIMIT_MAX=20
ENV RATELIMIT_WINDOW=60

EXPOSE 7860
