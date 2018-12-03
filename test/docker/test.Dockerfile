FROM node:10
ADD . /app
WORKDIR /app
CMD ["yarn", "test:e2e", "--host", "selenium", "--baseUrl", "http://web"]
