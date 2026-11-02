import { readFile, writeFile } from 'node:fs/promises';
import { marked } from 'marked';

const markdown = await readFile(new URL('../resume.md', import.meta.url), 'utf8');
const content = marked.parse(markdown, { gfm: true }).replace(
  /<blockquote>\s*<p>([\s\S]*?)<\/p>\s*<\/blockquote>/,
  (_match, details) => {
    const items = [...details.matchAll(/<span class="icon">[\s\S]*?<\/span>\s*<code>[\s\S]*?<\/code>/g)]
      .map((match) => `<span class="contact-item">${match[0]}</span>`)
      .join('');
    return `<blockquote class="contact-details"><p>${items}</p></blockquote>`;
  },
);

const textHtml = `<!doctype html>
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
        <a href="./index.html">两页版</a>
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

const viewerHtml = `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#edf1f6">
  <meta name="description" content="杨舒雯的两页在线简历，保持原 PDF 的 A4 版式。">
  <title>杨舒雯 · 两页简历</title>
  <link rel="stylesheet" href="./styles/viewer.css">
</head>
<body>
  <header class="toolbar">
    <div class="toolbar-inner">
      <div class="brand">杨舒雯 <span>· 两页简历</span></div>
      <nav aria-label="简历操作">
        <a href="./resume-text.html">文字版</a>
        <a class="primary" href="./assets/resume.pdf" download="杨舒雯-简历.pdf">下载 PDF</a>
      </nav>
    </div>
  </header>
  <main class="pages" aria-label="杨舒雯的两页 A4 简历">
    <figure class="page">
      <a href="./assets/resume-page-1.png" target="_blank" rel="noopener" aria-label="放大查看简历第 1 页"><img src="./assets/resume-page-1.png" width="1323" height="1871" alt="简历第 1 页：个人信息、优势、技能及工作经历" fetchpriority="high"></a>
      <figcaption>第 1 页 / 共 2 页 · 点击页面放大</figcaption>
    </figure>
    <figure class="page">
      <a href="./assets/resume-page-2.png" target="_blank" rel="noopener" aria-label="放大查看简历第 2 页"><img src="./assets/resume-page-2.png" width="1323" height="1871" alt="简历第 2 页：核心项目经历及教育经历" loading="lazy"></a>
      <figcaption>第 2 页 / 共 2 页 · 点击页面放大</figcaption>
    </figure>
  </main>
  <footer>需要复制文字？<a href="./resume-text.html">查看文字版简历</a></footer>
</body>
</html>
`;

await Promise.all([
  writeFile(new URL('../resume-text.html', import.meta.url), textHtml, 'utf8'),
  writeFile(new URL('../index.html', import.meta.url), viewerHtml, 'utf8'),
]);
console.log('Built index.html and resume-text.html');
