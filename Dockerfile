FROM node:11.15.0 as builder

COPY . /app/
WORKDIR /app/

# set permission and authorize bitbucket hosts
# Copy over private key, and set permissions
# Warning! Anyone who gets their hands on this image will be able
# to retrieve this private key file from the corresponding image layer
#RUN mkdir -p  ~/.ssh \
#    && cp id_rsa ~/.ssh/id_rsa \
#    && chmod 400 ~/.ssh/id_rsa \
#    && touch ~/.ssh/known_hosts \
#    && ssh-keyscan bitbucket.org >> ~/.ssh/known_hosts

RUN npm install
RUN npm run install-react-prod
RUN npm run build-react-prod

FROM nginx:latest
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
COPY --from=builder /app/src/react-app/build /var/www/dist