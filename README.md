# 杨舒雯的在线简历

首页 `index.html` 固定展示原 PDF 的两张 A4 页面，避免不同设备上的文字重排。原 PDF 在 [`assets/resume.pdf`](./assets/resume.pdf)，两张页面图在 `assets/`。另有由 [`resume.md`](./resume.md) 生成的 [`resume-text.html`](./resume-text.html)，方便查找和复制文字，沿用 [LapisCV](https://github.com/BingyanStudio/LapisCV) 的字体和样式。

## 更新简历

编辑 `resume.md` 后运行以下命令更新文字版：

```bash
npm install
npm run build
```

首页的两张固定页面来自 PDF；若修改简历版式，请替换 `assets/resume.pdf`，再运行 `pdftoppm -f 1 -l 2 -r 160 -png assets/resume.pdf assets/resume-page` 重新生成页面图，并检查页数和图片效果。静态网站托管服务将仓库根目录作为发布目录即可。

网页使用 `lapis-cv/fonts/web/` 中的精简字体。若修改简历时加入新文字，请安装 `fonttools` 和 `brotli` 后重新生成字体：

```bash
py -3 -m pip install fonttools brotli
py -3 scripts/subset_fonts.py
```
