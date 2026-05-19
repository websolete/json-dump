/* global renderDump */

let sortKeys = false;
let rootData;
let rootContainer;

function renderDump(container, value) {
  rootContainer = container;
  rootData = value;
  container.appendChild(buildNode(value));
}

function rerender() {
  if (!rootContainer) {
    return;
  }

  rootContainer.innerHTML = '';
  rootContainer.appendChild(buildNode(rootData));
}

window.addEventListener('message', (event) => {
  const msg = event.data;
  if (msg && msg.command === 'setSort') {
    sortKeys = Boolean(msg.alpha);
    rerender();
  }
});

/**
 * Recursively build a DOM node for any JSON value.
 * @param {unknown} value
 * @returns {HTMLElement | Text}
 */
function buildNode(value) {
  if (value === null) {
    return scalar('null', 'val-null');
  }

  if (typeof value === 'boolean') {
    return scalar(value ? 'YES' : 'NO', value ? 'val-boolean-true' : 'val-boolean-false');
  }

  if (typeof value === 'number') {
    return scalar(String(value), 'val-number');
  }

  if (typeof value === 'string') {
    if (value === '') {
      return scalar('(empty string)', 'val-string val-string-empty');
    }

    return scalar(value, 'val-string');
  }

  if (Array.isArray(value)) {
    return buildArray(value);
  }

  if (typeof value === 'object') {
    return buildObject(/** @type {Record<string,unknown>} */ (value));
  }

  return scalar(String(value), 'val-null');
}

/**
 * Render an object as a two-column key/value table.
 * @param {Record<string,unknown>} obj
 */
function buildObject(obj) {
  const keys = sortKeys ? Object.keys(obj).sort() : Object.keys(obj);
  const table = makeTable('type-object');
  const thead = makeHeaderRow(table, `struct  —  ${keys.length} key${keys.length !== 1 ? 's' : ''}`);

  if (keys.length === 0) {
    makeEmptyRow(table, 2);
    return table;
  }

  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  for (const key of keys) {
    const tr = document.createElement('tr');
    const tdKey = document.createElement('td');
    tdKey.textContent = key;
    const tdVal = document.createElement('td');
    const childNode = buildNode(obj[key]);
    tdVal.appendChild(childNode);
    if (childNode instanceof HTMLTableElement) {
      wireKeyToggle(tdKey, childNode);
    }
    tr.appendChild(tdKey);
    tr.appendChild(tdVal);
    tbody.appendChild(tr);
  }

  wireToggle(thead, tbody);
  return table;
}

/**
 * Render an array as an indexed table.
 * @param {unknown[]} arr
 */
function buildArray(arr) {
  const table = makeTable('type-array');
  const thead = makeHeaderRow(table, `array  —  ${arr.length} item${arr.length !== 1 ? 's' : ''}`);

  if (arr.length === 0) {
    makeEmptyRow(table, 2);
    return table;
  }

  const tbody = document.createElement('tbody');
  table.appendChild(tbody);

  for (let i = 0; i < arr.length; i++) {
    const tr = document.createElement('tr');
    const tdIdx = document.createElement('td');
    tdIdx.textContent = String(i);
    const tdVal = document.createElement('td');
    const childNode = buildNode(arr[i]);
    tdVal.appendChild(childNode);
    if (childNode instanceof HTMLTableElement) {
      wireKeyToggle(tdIdx, childNode);
    }
    tr.appendChild(tdIdx);
    tr.appendChild(tdVal);
    tbody.appendChild(tr);
  }

  wireToggle(thead, tbody);
  return table;
}

// ── Helpers ────────────────────────────────────────────────

function makeTable(typeClass) {
  const table = document.createElement('table');
  table.className = 'dump-table ' + typeClass;
  return table;
}

function makeHeaderRow(table, label) {
  const thead = document.createElement('thead');
  const tr = document.createElement('tr');
  const th = document.createElement('th');
  th.className = 'dump-header';
  th.colSpan = 2;
  th.textContent = label;
  tr.appendChild(th);
  thead.appendChild(tr);
  table.appendChild(thead);
  return th;
}

function makeEmptyRow(table, cols) {
  const tbody = document.createElement('tbody');
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  td.colSpan = cols;
  td.className = 'dump-empty';
  td.textContent = '(empty)';
  tr.appendChild(td);
  tbody.appendChild(tr);
  table.appendChild(tbody);
}

function wireToggle(headerTh, tbody) {
  headerTh.addEventListener('click', () => {
    const collapsed = headerTh.classList.toggle('collapsed');
    tbody.style.display = collapsed ? 'none' : '';
  });
}

function wireKeyToggle(keyTd, childTable) {
  keyTd.style.cursor = 'pointer';
  keyTd.addEventListener('click', () => {
    const childHeader = childTable.querySelector('thead .dump-header');
    const childTbody = childTable.querySelector('tbody');
    if (childHeader && childTbody) {
      const collapsed = childHeader.classList.toggle('collapsed');
      childTbody.style.display = collapsed ? 'none' : '';
    }
  });
}

function scalar(text, cssClass) {
  const span = document.createElement('span');
  span.className = cssClass;
  span.textContent = text;
  return span;
}
