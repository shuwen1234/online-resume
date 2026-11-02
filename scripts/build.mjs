import { readFile, writeFile } from 'node:fs/promises';
import { marked } from 'marked';

const markdown = await readFile(new URL('../resume.md', import.meta.url), 'utf8');
const content = marked.parse(markdown, { gfm: true });

const html = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f0f4f9">
  <meta name="description" content="杨舒雯的在线简历：AI 应用开发工程师，专注 Agent、RAG 与 Text2SQL。">
  <title>杨舒雯 · AI 应用开发工程师</title>
  <link rel="stylesheet" href="./lapis-cv/styles/main.css">
  <link rel="stylesheet" href="./lapis-cv/styles/lapis-cv-serif.css">
  <link rel="stylesheet" href="./styles/site.css">
</head>
<body>
  <div class="site-shell">
    <header class="site-header">
      <a class="site-brand" href="#top" aria-label="返回简历顶部">杨舒雯 <span>· AI 应用开发</span></a>
      <div class="site-actions">
        <a class="source-link" href="./resume.md" download>下载 Markdown</a>
        <button class="print-button" type="button" onclick="window.print()">打印 / 保存 PDF</button>
      </div>
    </header>
    <main id="top" class="resume" aria-label="杨舒雯的简历">
${content}
    </main>
    <footer class="site-footer">基于 <a href="https://github.com/BingyanStudio/LapisCV">LapisCV</a> 样式制作 · <a href="#top">返回顶部</a></footer>
  </div>
</body>
</html>
`;

await writeFile(new URL('../index.html', import.meta.url), html, 'utf8');
console.log('Built index.html from resume.md');
