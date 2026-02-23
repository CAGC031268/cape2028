FROM nginx:alpine

# Copy the static website files to the nginx html directory
COPY . /usr/share/nginx/html

# Expose port 80 (Cloud Run will route traffic to this port by default or the port specified in PORT env var, but nginx listens on 80 by default)
# We need to change the Nginx config to listen on the $PORT environment variable that Cloud Run provides.
CMD sed -i -e 's/80/8080/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
