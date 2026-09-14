/*
 * autosearchengine
 * Batch-add custom address-bar search engines to Microsoft Edge.
 * 批量添加 Microsoft Edge 地址栏自定义搜索引擎。
 *
 * Tested with Microsoft Edge 151 (2026-09).
 * This script automates Edge's own "Add search engine" dialog.
 * It does NOT modify the Web Data SQLite database directly.
 */

(async () => {
  // ============================================================
  // 1) EDIT ONLY THIS ARRAY / 通常只需要修改这里
  // ============================================================
  const searchEngines = [
    {
      name: 'Google',
      shortcut: 'g',
      url: '{google:baseURL}search?q=%s&{google:RLZ}{google:originalQueryForSuggestion}{google:assistedQueryStats}{google:searchFieldtrialParameter}{google:language}{google:prefetchSource}{google:searchClient}{google:sourceId}{google:searchSource}{google:contextualSearchVersion}ie={inputEncoding}',
    },
    {
      name: 'YouTube',
      shortcut: 'y',
      url: 'https://www.youtube.com/results?search_query=%s',
    },
    {
      name: '小红书',
      shortcut: 'x',
      url: 'https://www.xiaohongshu.com/search_result?keyword=%s',
    },
    {
      name: '百度',
      shortcut: 'b',
      url: 'https://www.baidu.com/s?wd=%s',
    },
    {
      name: 'Bilibili',
      shortcut: 'q',
      url: 'https://search.bilibili.com/all?keyword=%s',
    },
    {
      name: 'Scoop.sh',
      shortcut: 's',
      url: 'https://scoop.sh/#/apps?q=%s',
    },
  ];

  // ============================================================
  // 2) OPTIONAL SETTINGS / 可选设置
  // ============================================================
  const config = {
    openDelay: 350,
    validationDelay: 400,
    submitDelay: 650,
    stopOnError: false,

    // Known UI labels for English / 简体中文 / 繁體中文 Edge.
    // If your Edge uses another language, add the labels here.
    openDialogLabels: ['Add search engine', '添加搜索引擎', '新增搜尋引擎'],
    addLabels: ['Add', '添加', '新增'],
    cancelLabels: ['Cancel', '取消'],
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function deepAll(root = document) {
    const result = [];
    const start = root instanceof Document ? root.documentElement : root;

    function walk(node) {
      if (!node) return;

      if (node instanceof Element) {
        result.push(node);
        if (node.shadowRoot) walk(node.shadowRoot);
      }

      for (const child of node.children || []) {
        walk(child);
      }
    }

    walk(start);
    return result;
  }

  function normalize(value) {
    return String(value || '').trim().toLowerCase();
  }

  function matchesAny(value, labels) {
    const normalized = normalize(value);
    return labels.some((label) => normalized === normalize(label));
  }

  function isVisible(element) {
    return element?.getClientRects?.().length > 0;
  }

  function findButton(labels, { enabledOnly = false } = {}) {
    return deepAll().find((el) => {
      if (el.tagName !== 'FLUENT-BUTTON') return false;
      if (enabledOnly && el.disabled) return false;

      const text = el.innerText?.trim();
      const aria = el.getAttribute?.('aria-label')?.trim();

      return matchesAny(text, labels) || matchesAny(aria, labels);
    });
  }

  function findOpenSearchEngineButton() {
    return deepAll().find((el) => {
      if (el.tagName !== 'FLUENT-BUTTON') return false;

      const text = el.innerText?.trim();
      const aria = el.getAttribute?.('aria-label')?.trim() || '';

      return (
        matchesAny(text, config.openDialogLabels) ||
        config.openDialogLabels.some((label) =>
          normalize(aria).startsWith(normalize(label))
        )
      );
    });
  }

  function getDialogInputs() {
    return deepAll().filter((el) =>
      el.tagName === 'INPUT' &&
      el.type === 'text' &&
      el.placeholder === '' &&
      isVisible(el)
    );
  }

  function setInput(input, value) {
    const descriptor = Object.getOwnPropertyDescriptor(
      HTMLInputElement.prototype,
      'value'
    );

    if (!descriptor?.set) {
      throw new Error('Could not access HTMLInputElement.value setter.');
    }

    descriptor.set.call(input, value);

    for (const eventName of ['input', 'change']) {
      input.dispatchEvent(
        new Event(eventName, {
          bubbles: true,
          composed: true,
        })
      );
    }
  }

  async function addSearchEngine({ name, shortcut, url }) {
    if (!name || !shortcut || !url) {
      throw new Error('Each entry must contain name, shortcut and url.');
    }

    const openButton = findOpenSearchEngineButton();
    if (!openButton) {
      throw new Error(
        'Could not find the "Add search engine" button. ' +
        'Make sure you are on edge://settings/searchEngines.'
      );
    }

    openButton.click();
    await sleep(config.openDelay);

    const inputs = getDialogInputs();
    if (inputs.length < 3) {
      throw new Error(
        `Expected 3 visible dialog inputs, but found ${inputs.length}.`
      );
    }

    // Edge currently presents the fields in this order:
    // Search engine -> Shortcut -> URL
    setInput(inputs[0], name);
    setInput(inputs[1], shortcut);
    setInput(inputs[2], url);

    await sleep(config.validationDelay);

    const submitButton = findButton(config.addLabels, { enabledOnly: true });

    if (!submitButton) {
      const cancelButton = findButton(config.cancelLabels);
      cancelButton?.click();
      await sleep(config.openDelay);

      throw new Error(
        `Could not add "${name}" (${shortcut}). ` +
        'The shortcut may already exist, the URL may be invalid, ' +
        'or Edge may have changed its settings UI.'
      );
    }

    submitButton.click();
    await sleep(config.submitDelay);
  }

  // ============================================================
  // 3) RUN / 执行
  // ============================================================
  let success = 0;
  let failed = 0;

  console.log(`Importing ${searchEngines.length} search engines...`);
  console.log(`开始导入 ${searchEngines.length} 个搜索引擎...`);

  for (const engine of searchEngines) {
    try {
      await addSearchEngine(engine);
      success += 1;
      console.log(`✅ ${engine.shortcut} → ${engine.name}`);
    } catch (error) {
      failed += 1;
      console.error(`❌ ${engine.shortcut} → ${engine.name}`, error);

      if (config.stopOnError) break;
    }
  }

  console.log(`Done: ✅ ${success} added, ⚠️ ${failed} failed/skipped`);
  console.log(`完成：✅ ${success} 个成功，⚠️ ${failed} 个失败/跳过`);
})();
