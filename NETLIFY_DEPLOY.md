# Netlify 部署指南

## 快速部署步骤

### 方法一：通过 GitHub 自动部署（推荐）

1. **登录 Netlify**
   - 访问 https://app.netlify.com
   - 使用你的 GitHub 账号登录

2. **创建新站点**
   - 点击 "Add new site" → "Import an existing project"
   - 选择 GitHub 仓库: `tiao-hao-gua` (wsxvg/tiao-hao-gua)

3. **配置构建设置**
   - **Build command**: `npm run build:prod`
   - **Publish directory**: `dist`
   - **Node.js version**: `20`

4. **部署环境变量**（如果需要）
   - 在 Netlify 站点设置 → Environment variables 中添加

5. **点击 "Deploy site"**
   - 等待构建完成
   - 获取访问 URL

### 方法二：通过 Netlify CLI 部署

```bash
# 1. 安装 Netlify CLI
npm install -g netlify-cli

# 2. 登录 Netlify
ntl login

# 3. 在项目目录中初始化并部署
cd pick-gua-master
ntl init  # 初始化配置
ntl deploy --prod  # 生产部署
```

### 方法三：手动部署

```bash
# 1. 构建项目
cd pick-gua-master
npm run build:prod

# 2. 拖拽 dist 文件夹到 Netlify Drop
# 访问 https://app.netlify.com/drop
```

## 项目配置说明

### 构建命令
项目使用 `vite-plugin-mkcert` 开发工具，生产构建使用：
```bash
npm run build:prod
```
这会生成静态文件到 `dist/` 目录

### 基础路径
vite.config.ts 中已配置：
```typescript
base: mode === 'development' ? '' : '/tiao-hao-gua/'
```

**Netlify 部署说明**：
- 如果你使用自定义域名或根域名，可以直接部署
- 如果部署在 Netlify 子域名，需要在 Netlify 中设置正确的 base URL
- 或者修改 vite.config.ts 中的 base 为 `'/'` 用于直接部署

## 自定义域名设置

1. 在 Netlify 站点设置 → Domain management
2. 添加自定义域名
3. 在域名提供商处配置 DNS 指向 Netlify
4. 启用 HTTPS（自动）

## 预览部署

Netlify 会自动为每个 PR 创建预览部署：
- 连接 GitHub 仓库后自动启用
- 每个分支推送都会触发部署
- 查看部署预览确认无误后再合并

## 国内访问优化

### CDN 加速
Netlify 默认提供全球 CDN，国内访问速度良好

### 静态资源优化
- 图片已优化为 WebP 格式
- CSS/JS 文件已压缩
- 启用 Gzip/Brotli 压缩

### 预连接设置
在 `index.html` 中添加：
```html
<link rel="preconnect" href="https://你的站点.netlify.app">
```

## 监控和分析

### 访问统计
- Netlify 内置访问分析
- 可集成 Google Analytics / Plausible

### 错误监控
- 查看构建日志
- 浏览器控制台错误报告

## 常见问题

### Q: 构建失败怎么办？
A: 检查构建日志，确保所有依赖已安装：
```bash
npm ci  # 清除安装
npm run build:prod
```

### Q: 页面空白？
A: 检查 base 路径配置是否正确

### Q: 资源加载失败？
A: 确保所有资源路径正确，使用相对路径

## 成本

- **免费套餐**：
  - 每月 100GB 带宽
  - 每月 300 分钟构建时间
  - 足够支持个人项目

- **专业功能**：
  - 密码保护
  - 分支预览
  - A/B 测试
  - 高级表单处理

## 性能优化

### Lighthouse 分数优化
1. 压缩图片（WebP + AVIF）
2. 懒加载非关键资源
3. 预加载关键字体
4. 内联关键 CSS

### Core Web Vitals 目标
- LCP < 2.5s
- INP < 200ms  
- CLS < 0.1

## 参考链接

- [Netlify 文档](https://docs.netlify.com/)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [Vue.js 部署](https://vuejs.org/guide/scaling-up/deployment.html)
