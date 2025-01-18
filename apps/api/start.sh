#!/bin/sh

# 等待数据库准备就绪
while ! nc -z mysql 3306; do
  sleep 1
done

# 检查是否需要迁移
npx prisma migrate status

# 如果需要迁移，执行迁移
if [ $? -ne 0 ]; then
  npx prisma migrate deploy
else
  echo "数据库已是最新状态，无需迁移"
fi

# 启动应用
npm run start:prod
