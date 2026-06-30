# GitHub Pages 发布说明

这个 `public` 文件夹本身就是完整静态站点。

如果你把整个仓库上传到 GitHub，并且 GitHub Pages 的发布源选择仓库根目录，请访问：

```text
https://你的用户名.github.io/仓库名/public/
```

不要访问：

```text
https://你的用户名.github.io/仓库名/
```

因为 GitHub Pages 不支持把 `public` 文件夹直接设为发布根目录，只支持仓库根目录或 `docs` 文件夹。

本地更新方式：

```text
npm run build
```

构建后，把这个 `public` 文件夹提交到 GitHub 即可。
