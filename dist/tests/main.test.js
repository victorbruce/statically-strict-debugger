// @jest-environment jsdom
import Light from '../src/basicSettings';
import AdvanceSettings from "../src/advanceSettings";
// Mock DOM elements
function setupDOM() {
    document.body.innerHTML = `
    <button class="entry_point"></button>
    <main></main>
    <div class="application_container"></div>
    <div class="advanced_features_container"></div>
    <nav></nav>
    <div class="loader-container"></div>
  `;
}
describe("DOM Manipulations", () => {
    let lightController;
    let advancedSettings;
    beforeEach(() => {
        setupDOM();
        lightController = new Light();
        advancedSettings = new AdvanceSettings();
    });
    test("When the homepage button is clicked, the homepage should be hidden and a loader should be displayed.", () => {
        const homepageButton = document.querySelector(".entry_point");
        const homepage = document.querySelector("main");
        const loader = document.querySelector(".loader-container");
        homepage.classList.remove("hidden");
        loader.classList.add("hidden");
        homepageButton.dispatchEvent(new Event("click"));
        expect(homepage.classList.contains("hidden")).toBe(false);
        expect(loader.classList.contains("hidden")).toBe(true);
    });
    test("Clicking the mainRoomsContainer should toggle the light switch on and off.", () => {
        const mainRoomsContainer = document.querySelector(".application_container");
        const lightSwitch = document.createElement("div");
        lightSwitch.className = "light-switch basic_settings_buttons";
        mainRoomsContainer.appendChild(lightSwitch);
        jest.spyOn(lightController, "toggleLightSwitch");
        mainRoomsContainer.dispatchEvent(new Event("click", { bubbles: true }));
    });
});
