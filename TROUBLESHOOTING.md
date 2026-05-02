# 🚨 故障排除指南

## 问题：网页不能正常访问

### 症状
- 访问 `https://tiaohaogua.netlify.app` 显示空白页或错误
- 浏览器控制台显示 404 错误
- 资源（JS/CSS）加载失败

### 🔍 根本原因

**已修复！** 

之前的问题：`vite.config.ts` 中的 `base` 路径设置为 `/tiao-hao-gua/`，这意味着应用期望在 `https://域名/tiao-hao-gua/` 路径下运行。但由于 Netlify 站点使用的是根域名，没有这个子路径，导致所有资源加载失败。

### ✅ 修复方案

**已应用**：将 `base` 路径从 `/tiao-hao-gua/` 修改为 `/`

```typescript
// 修改前
base: mode === 'development' ? '' : '/tiao-hao-gua/',

// 修改后（当前）
base: mode === 'development' ? '' : '/',
```

### 🔄 重新部署步骤

Netlify 应该已经自动检测到 GitHub 的更新并重新部署。如果没有，请手动触发：

#### 方法一：等待自动重新部署
- Netlify 检测到 GitHub push 后会自动重新构建
- 通常需要 1-2 分钟

#### 方法二：手动重新部署
1. 访问 [Netlify Dashboard](https://app.netlify.com)
2. 选择 `tiaohaogua` 站点
3. 点击 "Trigger deploy" 按钮
4. 选择 "Deploy site"

#### 方法三：使用 Netlify CLI
```bash
# 在项目目录中
ntl deploy --prod --dir=dist
```

### ✅ 验证修复

1. **等待构建完成**
   - 查看 Netlify 的构建日志
   - 确保显示 "Build successful"

2. **清除浏览器缓存**
   ```
   Ctrl + Shift + R  (强制刷新)
   或
   Ctrl + F5
   ```

3. **检查浏览器控制台**
   - 按 F12 打开开发者工具
   - 查看 Console 标签页
   - 确认没有 404 错误

4. **验证网络请求**
   - 在 Network 标签页中
   - 确认所有资源都返回 200 状态码
   - 确认 index.html 已正确加载

### 📊 预期结果

修复后，浏览器网络面板应该显示：
```
index.html          → 200 OK
index-xxxxx.js      → 200 OK  
index-xxxxx.css     → 200 OK
assets/*.webp       → 200 OK
```

### 🔧 如果仍然无法访问

#### 1. 检查构建日志
- 访问 Netlify 站点的 "Deploys" 页面
- 查看最新的构建日志
- 确认没有构建错误

#### 2. 手动测试本地构建
```bash
cd pick-gua-master
npm run build:prod
npx serve dist
```
访问 `http://localhost:3000` 确认本地构建正常

#### 3. 检查 netlify.toml
确保重定向规则正确：
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 4. 验证 dist 目录内容
```bash
ls -la dist/
```
应该包含：
- `index.html`
- `assets/` 目录（包含 JS、CSS、图片）

#### 5. 联系 Netlify 支持
如果以上步骤都无法解决：
- 访问 [Netlify Support](https://www.netlify.com/support/)
- 提供站点 URL 和构建日志

### 📈 监控部署状态

#### 查看构建状态
```bash
# 在 Netlify Dashboard 中
# 访问：https://app.netlify.com/sites/tiaohaogua/deploys
```

#### 设置部署通知
在 Netlify 站点设置中：
1. Site settings → Build & deploy → Deploy notifications
2. 启用邮件或 Slack 通知

### 🎯 预防措施

#### 避免类似问题
1. **测试本地生产构建**
   ```bash
   npm run build:prod
   npx serve dist  # 在本地测试
   ```

2. **使用预览部署**
   - 利用 Netlify 的 PR 预览功能
   - 在合并前验证部署效果

3. **配置正确的 base 路径**
   - 根域名部署：`base: '/'`
   - 子路径部署：`base: '/子路径/'`
   - GitHub Pages：`base: '/仓库名/'`

### 📞 快速检查清单

- [ ] 构建日志显示 "Build successful"
- [ ] 浏览器没有 404 错误
- [ ] 所有资源返回 200 状态码
- [ ] index.html 正确加载
- [ ] 应用功能正常工作

### 💡 小贴士

**本地模拟生产环境**
```bash
# 构建
npm run build:prod

# 使用 serve 测试
npx serve -s dist -p 3000

# 访问
# http://localhost:3000
```

**强制刷新清除缓存**
- Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`

**查看实时日志**
```bash
# 使用 Netlify CLI
ntl watch
```

---

## 🎉 修复完成！

**状态**: ✅ 已修复  
**修改时间**: 2026-05-02  
**版本**: v0.0.1-hotfix  

您的挑瓜助手现在应该可以正常访问！🍉

如果还有问题，请查看构建日志或联系支持。
