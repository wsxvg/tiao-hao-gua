#!/bin/bash
# Netlify 部署脚本
# Usage: ./deploy-netlify.sh

set -e

echo "🚀 开始 Netlify 部署流程..."

# 检查是否在项目根目录
if [ ! -f "package.json" ]; then
  echo "❌ 错误: 请在项目根目录运行此脚本"
  exit 1
fi

# 安装依赖（如果需要）
echo "📦 安装依赖..."
npm ci || npm install

# 构建生产版本
echo "🏗️  构建生产版本..."
npm run build:prod

# 检查构建结果
if [ -d "dist" ]; then
  echo "✅ 构建成功!"
  echo "📁 dist 目录大小:"
  du -sh dist

  # 检查文件数量
  FILE_COUNT=$(find dist -type f | wc -l)
  echo "📄 文件数量: $FILE_COUNT"

  echo ""
  echo "🎉 构建完成! 现在可以:"
  echo "   1. 使用 Netlify CLI 部署: npx netlify deploy --dir=dist --prod"
  echo "   2. 手动拖拽 dist 文件夹到 https://app.netlify.com/drop"
  echo "   3. 通过 GitHub 自动部署"
else
  echo "❌ 构建失败! dist 目录不存在"
  exit 1
fi

echo ""
echo "完成! ✨"
