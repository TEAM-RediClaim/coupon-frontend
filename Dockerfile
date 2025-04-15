# ----- build 단계 -----
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# /app/build 생성
RUN npm run build
    
# ----- runtime 단계 -----
FROM nginx:1.27-alpine
RUN apk add --no-cache bash gettext
# 빌드 산출물 + 템플릿 복사
COPY --from=build /app/build /usr/share/nginx/html
COPY public/env.template.js /usr/share/nginx/html/env.template.js
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY docker-entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh
EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]