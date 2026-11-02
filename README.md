# 杨舒雯的在线简历

简历内容在 [`resume.md`](./resume.md)。`index.html` 是由 Markdown 生成的静态网页，使用 [LapisCV](https://github.com/BingyanStudio/LapisCV) 的字体和样式。

## 更新简历

编辑 `resume.md` 后运行：

```bash
npm install
npm run build
```

将更新后的 `resume.md` 和 `index.html` 一起提交。静态网站托管服务将仓库根目录作为发布目录即可。网页提供打印或保存 PDF 的按钮。

网页使用 `lapis-cv/fonts/web/` 中的精简字体。若修改简历时加入新文字，请安装 `fonttools` 和 `brotli` 后重新生成字体：

```bash
py -3 -m pip install fonttools brotli
py -3 scripts/subset_fonts.py
```
