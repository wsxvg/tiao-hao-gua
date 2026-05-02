# 挑瓜助手 - Netlify 部署指南

## 🚀 快速开始

本项目已配置 Netlify 部署，支持三种部署方式。**国内访问友好**，无需代理即可访问。

## 📋 部署方式

### 方式一：GitHub 自动部署（推荐 ⭐）

**适合**：新手、想要自动化部署的开发者

#### 步骤

1. **登录 Netlify**
   - 访问 [Netlify](https://app.netlify.com)
   - 点击 "Add new site" → "Import an existing project"

2. **连接 GitHub 仓库**
   - 授权 Netlify 访问你的 GitHub
   - 选择仓库: `tiao-hao-gua` (wsxvg/tiao-hao-gua)

3. **配置构建设置**
   ```
   Build command: npm run build:prod
   Publish directory: dist
   Node.js version: 20
   ```

4. **部署**
   - 点击 "Deploy site"
   - 等待 1-2 分钟
   - 获取访问 URL（如 `your-site.netlify.app`）

5. **完成！** 🎉
   - 项目自动部署
   - 每次 push 到 main 分支自动更新

### 方式二：Netlify CLI 部署

**适合**：本地测试、快速部署

```bash
# 1. 全局安装 Netlify CLI
npm install -g netlify-cli

# 2. 登录（会自动打开浏览器）
nl login

# 3. 进入项目目录
cd pick-gua-master

# 4. 连接站点（首次需要）
nl init

# 5. 部署到生产环境
ntl deploy --prod

# 或部署到预览环境
ntl deploy --build --prod
```

### 方式三：手动部署

**适合**：快速测试、不想配置环境

1. 构建项目：
   ```bash
   cd pick-gua-master
   npm run build:prod
   ```

2. 访问 [Netlify Drop](https://app.netlify.com/drop)

3. 拖拽 `dist` 文件夹到页面

4. 获取访问 URL

## 🔧 项目配置说明

### 构建配置

- **构建命令**：`npm run build:prod`
- **输出目录**：`dist/`
- **Node 版本**：20+
- **框架**：Vue 3 + TypeScript + Vite

### 文件结构

```
pick-gua-master/
├── src/                  # 源代码
│   ├── components/       # Vue 组件
│   ├── assets/           # 静态资源
│   └── main.ts           # 应用入口
├── dist/                 # 构建输出（自动生成）
├── public/               # 公共文件
├── index.html            # HTML 模板
├── vite.config.ts        # Vite 配置（开发）
├── vite.config.netlify.ts # Vite 配置（Netlify）
└── netlify.toml          # Netlify 配置
```

### 环境变量

如果需要环境变量，在 Netlify 站点设置中添加：

```
VITE_API_URL=https://your-api.com
```

代码中使用：
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## 🌐 域名配置

### 使用 Netlify 默认域名

部署后会获得 `xxx.netlify.app` 免费域名，可直接使用。

### 配置自定义域名

1. 在 Netlify → Site settings → Domain management
2. 点击 "Add custom domain"
3. 输入你的域名（如 `tiaohaogua.com`）
4. 按照提示在 DNS 解析商处配置 CNAME 记录
5. 启用 HTTPS（自动）

### 域名重定向

在 `netlify.toml` 中配置：

```toml
[[redirects]]
  from = "/old-path/*"
  to = "/new-path/:splat"
  status = 301
```

## 🔄 持续集成

### GitHub Actions 自动部署

项目已配置 `.github/workflows/deploy-netlify.yml`：

1. Push 到 main 分支 → 自动构建部署
2. 创建 PR → 自动预览部署
3. 合并 PR → 自动更新生产环境

**需要配置 Secrets**：
- `NETLIFY_AUTH_TOKEN` - Netlify 访问令牌
- `NETLIFY_SITE_ID` - Netlify 站点 ID

### 获取 Token 和 Site ID

1. 访问 [Netlify User Settings → Applications](https://app.netlify.com/user/applications)
2. 生成 "Personal access token"
3. 在仓库 Settings → Secrets 添加 `NETLIFY_AUTH_TOKEN`
4. Site ID 在 Netlify 站点设置中找到

## 📊 监控与分析

### Netlify 内置分析

- 访问统计
- 带宽使用
- 构建日志
- 错误监控

### 集成第三方服务

- **Google Analytics**：添加 GA 测量代码
- **Plausible**：隐私友好的分析
- **Sentry**：错误跟踪

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 预览生产构建
npm run preview

# 代码检查
npm run lint
```

## 🚨 常见问题

### Q1: 构建失败怎么办？

**解决**：
```bash
# 清除并重新安装
npm ci
npm run build:prod
```

检查构建日志中的具体错误。

### Q2: 页面显示空白？

**原因**：base 路径配置错误

**解决**：检查 `vite.config.ts` 中的 `base` 配置

### Q3: 资源加载 404？

**原因**：路径问题

**解决**：
- 使用相对路径
- 检查 `public/` 目录中的文件

### Q4: 国内访问慢？

**优化**：
- 启用 Netlify 中国 CDN
- 压缩图片和代码
- 使用预加载

## 💰 成本与限制

### 免费套餐

- ✅ 100GB/月 带宽
- ✅ 300 分钟/月 构建时间
- ✅ 无限站点
- ✅ 自动 HTTPS
- ✅ 分支预览
- ✅ 密码保护

### 付费套餐

- 更多构建时间
- 团队协作
- 高级功能

## 📖 学习资源

- [Netlify 官方文档](https://docs.netlify.com/)
- [Vite 部署指南](https://vitejs.dev/guide/static-deploy.html)
- [Vue.js 部署](https://vuejs.org/guide/scaling-up/deployment.html)

## 🆘 寻求帮助

- 查看构建日志
- 检查 Netlify 文档
- 在 issues 中提问

## 🎉 完成！

你的挑瓜助手已成功部署！

访问地址：`https://你的站点.netlify.app`

开始分享给你的朋友吧！ 🍉
