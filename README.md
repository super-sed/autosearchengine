# autosearchengine

Batch-add custom address-bar search engines to **Microsoft Edge** by automating Edge's own **Add search engine** dialog.

通过自动操作 Microsoft Edge 自带的 **Add search engine / 添加搜索引擎** 对话框，批量添加地址栏搜索引擎和快捷键。

> Tested on Microsoft Edge 151 (September 2026). Edge's internal Settings UI can change, so future versions may require small updates.
>
> 已在 Microsoft Edge 151（2026 年 9 月）测试。Edge 内部设置页面可能随版本更新而变化，因此未来版本可能需要小幅调整。

## English

### Why this exists

Edge lets you add custom site-search engines, but adding many of them manually is tedious. This script keeps the editable data in one simple JavaScript array and automates the same dialog you would otherwise fill in by hand.

It **does not directly edit Edge's `Web Data` SQLite database** and does not install a browser extension.

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
- This project targets Microsoft Edge's current Fluent UI settings page. Chrome, Brave, Vivaldi, and other Chromium browsers use different settings UIs and are not guaranteed to work.
- Browser updates may change DOM structure or component names.

---

## 中文

### 这是做什么的？

Edge 支持自定义“网站搜索 / 地址栏搜索引擎”，但如果要添加很多条，逐个手工填写会很麻烦。

这个脚本把需要编辑的内容集中在一个简单的 JavaScript 数组里，然后自动完成你平时手动操作的：

**Add search engine → 填名称 → 填快捷键 → 填 URL → Add**

脚本**不会直接修改 Edge 的 `Web Data` SQLite 数据库**，也不需要安装浏览器扩展。

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
- 本项目针对 Microsoft Edge 当前使用 Fluent UI 的设置页面。Chrome、Brave、Vivaldi 等其他 Chromium 浏览器的设置页面不同，不保证兼容。
- Edge 更新后可能修改 DOM 结构或组件名称，届时脚本可能需要调整。

## License / 许可证

MIT
