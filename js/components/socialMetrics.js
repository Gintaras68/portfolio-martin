function socialMetrics(selector, data) {
  if (typeof selector !== "string" || selector === "") {
    return false;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return false;
  }
  const DOM = document.getElementById(selector);
  let HTML = "";

  for (const item of data) {
    HTML += ` <li class="metric">
                <div class="number">${item.number + item.symbol}</div>
                <div class="label">${item.label}</div>
              </li>`;
  }

  DOM.innerHTML = HTML;
  DOM.classList.add("social-metrics");
}

export { socialMetrics };
