# AutoSearchEngine

> ## ⚡ 配置搜索引擎 → 复制一行 → 粘贴执行
>
> 在线生成器 / Web Generator：**https://super-sed.github.io/autosearchengine/**
>
> 直接编辑预设或新增自己的搜索引擎，支持 JSON 导入 / 导出，并自动生成一行可粘贴的 Edge 导入脚本。

> ## 🤖 把这个 GitHub 链接发给 AI，就可以帮你适配浏览器内置的搜索引擎
>
> 不同 Chromium 浏览器、不同版本的设置页面 DOM 可能不一样。把本仓库链接发给 ChatGPT / Claude / Gemini 等 AI，并告诉它你的 **浏览器名称 + 版本号**，AI 就可以基于这套项目帮你调整选择器、按钮和输入框逻辑。
>
> **Send this repository to an AI assistant with your browser name + version, and ask it to adapt the script to your browser's built-in search-engine settings page.**

**AutoSearchEngine** 是一个轻量工具，通过自动操作浏览器自带的搜索引擎设置界面，批量添加地址栏搜索引擎和快捷键。

- ✅ 不需要安装扩展 / No extension
- ✅ 不直接修改 SQLite / No direct database editing
- ✅ 单文件网页生成器 / Single-file web generator
- ✅ JSON 导入、导出、备份 / Import & export JSON
- ✅ 自动生成一行脚本 / Generate a one-line importer
- ✅ 当前已在 **Microsoft Edge 151（2026-09）** 实测

---

## 中文

### 最简单的使用方式

打开在线生成器：

**https://super-sed.github.io/autosearchengine/**

然后只需要三步：

```text
1. 编辑 / 新增搜索引擎
2. 点击“复制一行脚本”
3. 打开 edge://settings/searchEngines → Console → 粘贴执行
```

网页中还提供：

- 新增、删除、临时禁用搜索引擎
- 恢复默认预设
- JSON 导入 / 导出
- 自动保存到 localStorage
- 重复快捷键检查
- `%s` 搜索关键词占位符检查
- 一键复制 Edge 设置地址
- 尝试直接打开 Edge 搜索引擎设置页面

> 浏览器出于安全原因，普通网页不一定允许直接跳转到 `edge://`。如果“打开 Edge 设置”按钮被拦截，把 `edge://settings/searchEngines` 复制到地址栏即可。

### 默认示例

| 快捷键 | 搜索引擎 |
|---|---|
| `g` | Google |
| `y` | YouTube |
| `x` | 小红书 |
| `b` | 百度 |
| `q` | Bilibili |
| `s` | Scoop.sh |

这些只是示例，网页里可以直接修改、删除或者新增自己的搜索引擎。

### Google 模板

Google 默认使用 Chromium 支持的完整模板，而不是简单的 `https://www.google.com/search?q=%s`：

```text
{google:baseURL}search?q=%s&{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:language}{google:prefetchSource}{google:searchClient}{google:sourceId}{google:searchSource}{google:contextualSearchVersion}ie={inputEncoding}
```

### 手工脚本方式

如果不想使用网页，也可以直接编辑仓库中的 `importer.js`：

```js
const searchEngines = [
  {
    name: 'Google',
    shortcut: 'g',
    url: 'https://www.google.com/search?q=%s',
  },
  {
    name: 'YouTube',
    shortcut: 'y',
    url: 'https://www.youtube.com/results?search_query=%s',
  },
];
```

打开：

```text
edge://settings/searchEngines
```

然后打开 DevTools Console：

```text
Windows / Linux: Ctrl + Shift + J
macOS: Cmd + Option + J
```

粘贴脚本即可。

### 让 AI 帮你适配其他浏览器

可以直接把这个仓库发给 AI，并发送：

```text
请帮我把这个项目适配到我浏览器内置的搜索引擎设置页面。
浏览器：<名称>
版本：<版本号>
仓库：https://github.com/super-sed/autosearchengine
```

因为核心逻辑只是 DOM 自动化，通常只需要确认当前浏览器设置页面里的组件、按钮和输入框结构即可。

---

## English

### Fastest workflow

Open the web generator:

**https://super-sed.github.io/autosearchengine/**

Then:

```text
1. Edit or add search engines
2. Copy the generated one-line script
3. Open edge://settings/searchEngines → DevTools Console → Paste and run
```

The web generator supports adding/removing entries, temporary enable/disable, localStorage persistence, JSON import/export, duplicate shortcut validation, and one-click generation of the Edge importer script.

### How it works

The generated script automates Microsoft Edge's own **Add search engine** dialog. It does **not** modify the `Web Data` SQLite database directly and does not install an extension.

### AI-assisted browser adaptation

If another Chromium browser or a future browser version uses a different Settings UI, send this repository to an AI assistant and provide your browser name and version:

```text
Please adapt this project to my browser's built-in search-engine settings page.
Browser: <name>
Version: <version>
Repository: https://github.com/super-sed/autosearchengine
```

The project is intentionally small and DOM-driven so selectors and component handling can be adapted without rewriting the whole tool.

### Notes

- Currently tested on **Microsoft Edge 151 (September 2026)**.
- Browser settings UIs may change over time.
- If **Add** remains disabled, the shortcut may already exist or the URL may be invalid.
- Web pages may be blocked from opening `edge://` URLs directly; in that case paste `edge://settings/searchEngines` into the address bar manually.

## License

MIT
