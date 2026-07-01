# Travel Packing List

一个轻量的旅行打包清单 PWA。它用于创建旅行清单、按规则生成物品、记录已打包/本次不带、管理物品库/模块/箱包，并支持每日穿搭和本地备份。

## 主要功能

- 新建旅行清单：按旅行范围、季节、住宿晚数、可选模块和箱包生成清单
- 执行页打包：右滑标记已打包，左滑标记本次不带
- 类目/箱包视图：在执行页切换按类目或按箱包查看
- 每日穿搭：为当前旅行安排每天穿什么
- 我的库：管理模块、物品和箱包
- 规则与备份：调整默认数量规则，导入/导出/重置本地数据
- PWA：支持安装到手机桌面

## 本地预览

安装依赖后运行：

```bash
npm run dev
```

默认预览地址：

```text
http://127.0.0.1:5173/
```

如果双击 `start-preview.bat`，也可以直接启动本地预览。

## 打包发布

运行：

```bash
npm run build
```

构建结果会生成在：

```text
github-pages/public
```

发布到 GitHub Pages 时，把 `github-pages/public` 里面的所有内容上传到仓库根目录。

需要包含：

- `index.html`
- `manifest.webmanifest`
- `app.png`
- `favicon.png`
- `assets/` 文件夹
- `.nojekyll` 如果存在，也一起上传

以后每次更新，只需要重新运行 `npm run build`，再替换 GitHub 仓库根目录里的这些发布文件。

## 数据说明

所有旅行清单、物品库、模块、箱包和规则都保存在当前浏览器的本地数据里。

换手机、换浏览器、清理浏览器数据，都会导致本地数据不可见。建议定期在“规则与备份”里导出 JSON 备份。

## 项目结构

```text
src/                  应用源码
icons/                箱包图标和 App 图标
static/               PWA 静态文件
github-pages/public/  GitHub Pages 发布文件
package.json          项目脚本和依赖
vite.config.js        构建配置
```

## 常用命令

```bash
npm run dev      # 本地预览
npm run build    # 构建 GitHub Pages 发布文件
npm run test     # 运行打包规则测试
```

