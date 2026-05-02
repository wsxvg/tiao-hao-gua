# 🚀 快速部署指南 - 挑瓜助手

## ⚡ 3分钟极速部署

### 第1步：准备

打开项目目录：
```bash
cd pick-gua-master
```

### 第2步：选择部署方式

#### 方式A：GitHub自动部署（最简单）✨

1. 访问 [Netlify](https://app.netlify.com)
2. 点击 "Add new site" → "Import an existing project"
3. 选择 GitHub 仓库: `tiao-hao-gua`
4. 填写配置：
   ```
   Build command: npm run build:prod
   Publish directory: dist
   ```
5. 点击 "Deploy site"

✅ 完成！5分钟后获得访问链接

---

#### 方式B：命令行部署（最快）⚡

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录
ntl login

# 部署
ntl deploy --prod
```

✅ 完成！立即获得访问链接

---

#### 方式C：手动部署（最直接）📁

1. 构建项目：
   ```bash
   npm run build:prod
   ```

2. 打开 [Netlify Drop](https://app.netlify.com/drop)

3. 拖拽 `dist` 文件夹到页面

✅ 完成！立即可使用

---

## 🌐 访问你的应用

部署完成后，你将获得类似链接：
```
https://你的站点.netlify.app
```

现在可以在手机上访问了！🇨🇳

---

## ✨ 功能特点

- 🎯 **声音频率分析** - 133-160Hz 挑西瓜
- 📱 **移动端优化** - 触控友好
- 🚀 **快速加载** - CDN 加速
- 🔒 **安全** - HTTPS 自动
- 💰 **免费** - 无需付费

---

## 📚 详细文档

- [完整部署指南](DEPLOY_GUIDE.md)
- [技术配置说明](NETLIFY_DEPLOY.md)
- [部署总结](DEPLOYMENT_SUMMARY.md)

---

## 🆘 遇到问题？

查看 FAQ：
- 构建失败？→ 运行 `npm ci` 后重试
- 页面空白？→ 检查 base 路径配置
- 资源加载失败？→ 确保使用相对路径

---

## 🎉 开始使用

1. 打开部署好的网站
2. 允许麦克风权限
3. 按住录音按钮
4. 敲击西瓜
5. 查看成熟度结果！

享受你的智能挑瓜助手吧！ 🍉
