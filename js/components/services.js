import { etLinesIconData } from "../../data/etLineIconsData.js";

/* eslint-disable prettier/prettier */

function isNonEmptyString(data) {
  return typeof data === "string" && data.trim() !== "";
} 

function containsAllowedSymbols(str, extra) {
  const abc = "abcdefghijklmnopqrstuvwyzABCDEFGHIJKLMNOPQRSTUVWZ0123456789 &;" + extra;
  for (const symbol of str) {
    if (!abc.includes(symbol)) {
      return false;
    }
  }
  return true;
}

function services(selector, data) {
  if (typeof selector !== "string" || selector === "") {
    return false;
  }

  if (!Array.isArray(data) || data.length === 0) {
    return false;
  }

  const servicesDOM = document.getElementById(selector);
  if (servicesDOM === null) {
    return false;
  }

  let HTML = "";
  for (const service of data) {
    if ( typeof service !== "object" || Array.isArray(service) || service === null ) {
      continue;
    }

    const keys = Object.keys(service);    
    if (
      keys.length !== 3 || 
      !isNonEmptyString(service.icon) || 
      !isNonEmptyString(service.title) ||
      !isNonEmptyString(service.descr) ||
      !containsAllowedSymbols(service.title) ||
      !containsAllowedSymbols(service.descr, "',.?") ||
      !etLinesIconData.includes(service.icon)
    ) {
      continue;
    }

    HTML += ` <div class="service">
                <div class="icon"><i class="icon-${service.icon}"></i></div>
                <h3 class="service-title">${service.title}</h3>
                <p class="service-description">${service.descr}</p>
              </div>`;
  }

  servicesDOM.innerHTML = HTML;

  return true;
}

export { services };
