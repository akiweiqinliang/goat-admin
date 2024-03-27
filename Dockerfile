# 使用 Node.js 官方提供的 Node 镜像作为基础镜像
FROM node:16.20.0 AS builder

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 拷贝到工作目录中
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 拷贝整个项目到工作目录中
COPY . .

# 构建生产环境的静态文件
RUN npm run build

FROM nginx

# 将 Nginx 配置文件复制到容器中的 /etc/nginx/conf.d 目录下
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 将构建好的项目文件复制到 Nginx 默认的静态文件目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露 Nginx 默认的 HTTP 端口
EXPOSE 80

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]
