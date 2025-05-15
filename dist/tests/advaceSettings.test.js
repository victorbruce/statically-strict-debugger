import AdvanceSettings from "../src/advanceSettings";
jest.mock("chart.js", () => ({
    Chart: jest.fn(),
}));
describe("Advance settings functionality", () => {
    let advance;
    beforeEach(() => {
        document.body.innerHTML = `
      <div class="advanced_features_container"></div>
      <div class="rooms hall"><p class="component_name">hall</p></div>
    `;
        advance = new AdvanceSettings();
        advance.componentsData = {
            hall: {
                name: "hall",
                numOfLights: 4,
                usage: [1, 2, 3, 4, 5, 6, 7],
                autoOn: "07:00",
                autoOff: "20:00",
                lightIntensity: 0,
                isLightOn: false,
            },
        };
    });
    test("should format time correctly", () => {
        const result = advance.formatTime("08:30");
        expect(result.getHours()).toBe(8);
        expect(result.getMinutes()).toBe(30);
    });
    test("should cancel auto-on customization", () => {
        document.body.innerHTML += `
      <div class="defaultOn">
        <input type="time" value="08:00" />
        <button class="defaultOn-cancel">Cancel</button>
      </div>
    `;
        const btn = document.querySelector(".defaultOn-cancel");
        advance.customizationCancelled(btn, ".defaultOn");
        const input = document.querySelector(".defaultOn input");
        expect(input.value).toBe("");
    });
    test("should cancel auto-off customization", () => {
        document.body.innerHTML += `
      <div class="defaultOff">
        <input type="time" value="08:00" />
        <button class="defaultOff-cancel">Cancel</button>
      </div>
    `;
        const btn = document.querySelector(".defaultOff-cancel");
        advance.customizationCancelled(btn, ".defaultOff");
        const input = document.querySelector(".defaultOff input");
    });
});
