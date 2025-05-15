import General from "../src/general";

describe("General class", () => {
  let general: General;
  beforeEach(() => {
    general = new General();
  });
  test("should create a new General instance", () => {
    expect(general).toBeDefined();
    expect(general).toBeInstanceOf(General);
  });
  test("Retrieve a component based on its name.", () => {
    const component = general.getComponent("hall");
    expect(component).toBeDefined();
    expect(component.name).toBe("hall");
  });
  test("Dynamically add, remove, or toggle the 'hidden' CSS class.", () => {
    const targetElement = document.createElement("div");
    general.addHidden(targetElement);
    expect(targetElement.classList.contains("hidden")).toBe(true);
    general.removeHidden(targetElement);
    expect(targetElement.classList.contains("hidden")).toBe(false);
    general.toggleHidden(targetElement);
    expect(targetElement.classList.contains("hidden")).toBe(true);
  });
});
