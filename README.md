# autosearchengine

> ## 🤖 把这个 GitHub 链接发给 AI，就可以让它帮你适配浏览器内置的搜索引擎
>
> 不同 Chromium 浏览器、不同版本的设置页面 DOM 可能不一样。把本仓库链接发给 ChatGPT / Claude / Gemini 等 AI，并告诉它你的**浏览器名称 + 版本号**，它就可以基于这套脚本帮你调整选择器、按钮和输入框逻辑，适配浏览器自带的搜索引擎管理页面。
>
> **Send this GitHub repo to an AI assistant and tell it your browser + version. It can use this project as a starting point to adapt the script to your browser's built-in search-engine settings UI.**

**autosearchengine** is a tiny script for batch-adding custom address-bar search engines and shortcuts by automating the browser's own search-engine settings UI.

**autosearchengine** 是一个轻量脚本：通过自动操作浏览器自带的搜索引擎设置界面，批量添加地址栏搜索引擎和快捷键。

No extension. No direct SQLite editing. Just configure an array and run the script in DevTools.

无需扩展，也不直接修改 SQLite。只需要改一个数组，然后在 DevTools 中运行。

> ✅ Currently tested on **Microsoft Edge 151 (September 2026)**.
>
> ✅ 当前已在 **Microsoft Edge 151（2026 年 9 月）** 实测通过。
>
> Browser settings UIs change over time, so other browsers or future versions may need small selector adjustments — which is exactly why this repo is designed to be easy for both humans and AI to adapt.
>
> 浏览器设置页面会随版本变化，因此其他浏览器或未来版本可能需要小幅调整选择器；本项目刻意保持结构简单，方便人或 AI 快速适配。

## English

### Why this exists

Edge lets you add custom site-search engines, but adding many of them manually is tedious. This script keeps all editable search-engine definitions in one simple JavaScript array and automates the same dialog you would otherwise fill in by hand.

The workflow is intentionally simple:

```text
Edit array → Open browser search-engine settings → Paste script → Done
```

It **does not directly edit Edge's `Web Data` SQLite database** and does not install a browser extension.

### AI-assisted browser adaptation

If your browser or browser version uses a different settings UI, send this repository link to an AI assistant and say something like:

```text
Please adapt this project to my browser's built-in search-engine settings page.
Browser: <name>
Version: <version>
```

The script is deliberately small and DOM-driven, so an AI can usually help inspect the browser's current Settings UI and update component names, selectors, labels, or input detection without rewriting the whole project.

### Usage

1. Open:

   ```text
   edge://settings/searchEngines
   ```

2. Open DevTools and switch to **Console**.
   - Windows/Linux: `Ctrl + Shift + J`
   - macOS: `Cmd + Option + J`

3. Open `importer.js` and edit the `searchEngines` array near the top.

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

4. Copy the entire contents of `importer.js`, paste it into the Console, and run it.

5. The Console will report each success or failure.

> Edge/Chromium may show a DevTools self-XSS warning before allowing pasted code. Only run code you have reviewed and understand.

### URL placeholder

Use `%s` where the search query should go.

For Google on Chromium-based browsers, the example configuration in `importer.js` uses Chromium's richer Google template:

```text
{google:baseURL}search?q=%s&{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:language}{google:prefetchSource}{google:searchClient}{google:sourceId}{google:searchSource}{google:contextualSearchVersion}ie={inputEncoding}
```

This keeps Chromium-supported Google template parameters instead of reducing the entry to a plain `https://www.google.com/search?q=%s` URL.

### Included example shortcuts

| Shortcut | Engine |
|---|---|
| `g` | Google |
| `y` | YouTube |
| `x` | Xiaohongshu |
| `b` | Baidu |
| `q` | Bilibili |
| `s` | Scoop.sh |

These are examples only. Change or remove them freely.

### Notes

- If **Add** stays disabled, the shortcut may already exist or the URL may be invalid.
- The script currently recognizes English, Simplified Chinese, and Traditional Chinese labels for the relevant Edge buttons.
- This project currently targets Microsoft Edge's Fluent UI settings page. Chrome, Brave, Vivaldi, and other Chromium browsers may use different settings UIs and can require adaptation.
- Browser updates may change DOM structure or component names.

---

## 中文

### 这是做什么的？

Edge 支持自定义“网站搜索 / 地址栏搜索引擎”，但如果要添加很多条，逐个手工填写会很麻烦。

这个脚本把所有需要编辑的搜索引擎集中在一个简单的 JavaScript 数组里，然后自动完成你平时手动操作的：

**Add search engine → 填名称 → 填快捷键 → 填 URL → Add**

整个流程可以概括为：

```text
改数组 → 打开浏览器搜索引擎设置 → 粘贴脚本 → 完成
```

脚本**不会直接修改 Edge 的 `Web Data` SQLite 数据库**，也不需要安装浏览器扩展。

### 让 AI 帮你适配其他浏览器 / 版本

如果你的浏览器或者浏览器版本和本项目当前测试环境不一样，最简单的方法就是：

**把这个 GitHub 仓库链接直接发给 AI。**

然后告诉它：

```text
请帮我把这个项目适配到我浏览器内置的搜索引擎设置页面。
浏览器：<名称>
版本：<版本号>
```

因为这个项目本身很小，而且主要依赖 DOM 自动化，所以 AI 通常只需要帮你确认当前设置页面里的组件名称、按钮、输入框和选择器，就可以在现有代码上快速适配，而不需要从头重写。

### 使用方法

1. 打开：

   ```text
   edge://settings/searchEngines
   ```

2. 打开开发者工具并进入 **Console / 控制台**。
   - Windows/Linux：`Ctrl + Shift + J`
   - macOS：`Cmd + Option + J`

3. 打开 `importer.js`，修改最上面的 `searchEngines` 数组：

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

4. 复制 `importer.js` 的全部内容，粘贴到 Console 中执行。

5. Console 会显示每一项的成功或失败结果。

> Edge/Chromium 可能会在 DevTools 中显示防止 Self-XSS 的粘贴警告。只运行你已经阅读并理解的代码。

### 搜索关键词占位符

URL 中使用 `%s` 表示搜索关键词的位置。

对于 Chromium 系浏览器里的 Google，`importer.js` 默认示例使用了更完整的 Chromium Google 模板：

```text
{google:baseURL}search?q=%s&{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:language}{google:prefetchSource}{google:searchClient}{google:sourceId}{google:searchSource}{google:contextualSearchVersion}ie={inputEncoding}
```

相比简单的 `https://www.google.com/search?q=%s`，它可以保留 Chromium 本身支持的 Google 模板参数。

### 默认示例快捷键

| 快捷键 | 搜索引擎 |
|---|---|
| `g` | Google |
| `y` | YouTube |
| `x` | 小红书 |
| `b` | 百度 |
| `q` | Bilibili |
| `s` | Scoop.sh |

这些只是示例，你可以自由修改或删除。

### 注意事项

- 如果 **Add / 添加** 按钮一直不可用，通常是快捷键已经存在，或者 URL 不符合 Edge 的要求。
- 当前脚本识别英文、简体中文、繁体中文的相关 Edge 按钮文字。
- 本项目当前针对 Microsoft Edge 的 Fluent UI 设置页面。Chrome、Brave、Vivaldi 等其他 Chromium 浏览器可能使用不同设置 UI，需要适配。
- Edge 或其他浏览器更新后可能修改 DOM 结构或组件名称。

## License / 许可证

MIT
