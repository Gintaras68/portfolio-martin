/**
 * @jest-environment jsdom
 */

import { services } from "./services.js";

describe("Wrong parameters", () => {
  test("No selector", () => {expect(services()).toBe(false)})
  test("Selector as number", () => {expect(services(5)).toBe(false)})
  test("Selector as bulean", () => {expect(services(false)).toBe(false)})
  test("Selector as array", () => {expect(services([])).toBe(false)})
  test("Selector as object", () => {expect(services({})).toBe(false)})
  test("Selector as function", () => {expect(services(services)).toBe(false)})
  test("Selector as empty string", () => {expect(services('')).toBe(false)})

  test("No data", () => {expect(services("a")).toBe(false)})
  test("Data as number", () => {expect(services("a",5)).toBe(false)})
  test("Data as bulean", () => {expect(services("a",false)).toBe(false)})
  test("Data as function", () => {expect(services("a",services)).toBe(false)})
  test("Data as empty string", () => {expect(services("a",'')).toBe(false)})
  test("Data as no-empty string", () => {expect(services("a",'ka')).toBe(false)})
  test("Data as object", () => {expect(services("a",{})).toBe(false)})
  test("Data as null", () => {expect(services("a",null)).toBe(false)})
  test("Data as empty array", () => {expect(services("a",[])).toBe(false)})
})

describe("Partialy invalid param: selector", () => {
  test("No DOM by ID", () => {
    const data = [{
      icon: 'icon-desktop',
      title: 'Search Optimization',
      descr:'The9 is a graphically polished, interactive, easily customizable, highly modern, fast loading.',
    }];
    document.body.innerHTML = `<div id="test"></div>`;
    expect(services("a",data)).toBe(false)
  })
})

describe("Partialy invalid param: data", () => {
  test("It is not true object", () => {
    const data = [4, "sdg", true, [], null, services, undefined];
    document.body.innerHTML = `<div id="a"></div>`;
    expect(services("a",data)).toBe(true)
    expect(document.querySelectorAll('.service').length).toBe(0)
  })
  test("It's empty object", () => {
    const data = [{}];
    document.body.innerHTML = `<div id="a"></div>`;
    expect(services("a",data)).toBe(true)
    expect(document.querySelectorAll('.service').length).toBe(0)
  })
  test("Object: not enought keys (1)", () => {
    const data = [{icon: "desktop"}];
    document.body.innerHTML = `<div id="a"></div>`;
    expect(services("a",data)).toBe(true)
    expect(document.querySelectorAll('.service').length).toBe(0)
  })
  test("Object: not enought keys (2)", () => {
    const data = [{icon: "desktop", title: "My service"}];
    document.body.innerHTML = `<div id="a"></div>`;
    expect(services("a",data)).toBe(true)
    expect(document.querySelectorAll('.service').length).toBe(0)
  })
  test("Object: too many keys (4)", () => {
    const data = [{icon: "desktop", title: "My service", descr: "tata" , add: 4 }];
    document.body.innerHTML = `<div id="a"></div>`;
    expect(services("a",data)).toBe(true)
    expect(document.querySelectorAll('.service').length).toBe(0)
  })
  test("Object: bad key's names", () => {
    const data = [
      { a: "Desktop", b: "My services", c: "Let's do it" },
      { title: "Desktop", b: "My services", c: "Let's do it" },
      { icon: "Desktop", title: "My services", c: "Let's do it" },
      { title: "Desktop", b: "My services", descr: "Let's do it" },
    ];
    document.body.innerHTML = `<div id="a"></div>`;
    expect(services("a",data)).toBe(true)
    expect(document.querySelectorAll('.service').length).toBe(0)
  })
  test("Object: values are not string or empty string", () => {
    const data = [
      { icon: "Desktop", title: "My services", descr: 5 },
      { icon: "Desktop", title: "My services", descr: true },
      { icon: "Desktop", title: "My services", descr: null },
      { icon: "Desktop", title: "My services", descr: undefined },
      { icon: "Desktop", title: "My services", descr: [] },
      { icon: "Desktop", title: "My services", descr: "" },
      { icon: "Desktop", title: "", descr: "empty" },
      { icon: "Desktop", title: " ", descr: "empty" },
      { icon: "       ", title: "empty", descr: "empty" },
    ];
    document.body.innerHTML = `<div id="a"></div>`;
    expect(services("a",data)).toBe(true)
    expect(document.querySelectorAll('.service').length).toBe(0)
  })
  test("Object: 'icon' value lenght is incorrect", () => {
    const data = [
      { icon: "as", title: "empty", descr: "empty" },
      { icon: "magnifying-glassX", title: "empty", descr: "empty" },
    ];
    document.body.innerHTML = `<div id="a"></div>`;
    expect(services("a",data)).toBe(true)
    expect(document.querySelectorAll('.service').length).toBe(0)
  })
  test("Object: Text have unavailable symbols", () => {
    const data = [
      {
        icon: "desktop",
        title: "?",
        descr: "graphically polished, interactive, easily customizable" 
      },
    ];
    document.body.innerHTML = `<div id="a"></div>`;
    expect(services("a",data)).toBe(true)
    expect(document.querySelectorAll('.service').length).toBe(0)
  })  
})

describe("Valid params", () => {
  test("Found DOM by ID", () => {
    const data = [{
      icon: 'icon-desktop',
      title: 'Search Optimization',
      descr:'The9 is a graphically polished, interactive, easily customizable, highly modern, fast loading.',
    }];
    document.body.innerHTML = `<div id="a"></div>`;
    expect(services("a",data)).toBe(true)
  })
})
