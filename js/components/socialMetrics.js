function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

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

  // Stebime SCROLL
  const metricsDOM = DOM.querySelectorAll(".metric");
  const animatedMetrics = new Array(metricsDOM.length).fill(false);

  window.addEventListener("scroll", () => {
    const totalLoadingTimeMs = 3000;
    for (let i = 0; i < metricsDOM.length; i++) {
      const metricDOM = metricsDOM[i];

      if (!animatedMetrics[i] && isElementInViewport(metricDOM)) {
        animatedMetrics[i] = true;
        let count = 0;
        const timer = setInterval(() => {
          metricDOM.querySelector(".number").textContent = ++count + data[i].symbol;
          if (count >= data[i].number) {
            clearInterval(timer);
          }
        }, totalLoadingTimeMs / data[i].number);
      }
    }
  });
}

export { socialMetrics };
