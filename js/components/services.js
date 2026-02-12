/**
 * @param {string} selector - ID
 * @param {array} data - array with objects
 */
function services(selector, data) {
  let HTML = "";

  for (const service of data) {
    HTML += ` <div class="service">
                <div class="icon"><i class="${service.icon}"></i></div>
                <h3 class="service-title">${service.title}</h3>
                <p class="service-description">${service.descr}</p>
              </div>`;
  }

  const servicesDOM = document.getElementById(selector);
  servicesDOM.innerHTML = HTML;
}

export { services };
