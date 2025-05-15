import Light from "../src/basicSettings";

describe("Verifying the functionality of the Light class", () => {
  let light: Light;
  beforeEach(() => {
    light = new Light();
  });
  test("Activate the light by setting its attributes to ON.", () => {
    const imgElement = document.createElement("img");
    light.lightSwitchOn(imgElement);
    expect(imgElement.getAttribute("src")).toBe("./assets/svgs/light_bulb.svg");
    expect(imgElement.getAttribute("data-lightOn")).toBe(
      "./assets/svgs/light_bulb_off.svg"
    );
  });
  test("Deactivate the light by setting its attributes to OFF.", () => {
    const imgElement = document.createElement("img");
    light.lightSwitchOff(imgElement);
    expect(imgElement.getAttribute("src")).toBe(
      "./assets/svgs/light_bulb_off.svg"
    );
    expect(imgElement.getAttribute("data-lightOn")).toBe(
      "./assets/svgs/light_bulb.svg"
    );
  });
});
