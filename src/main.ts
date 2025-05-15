// elements declarations
const homepageButton = document.querySelector(
  ".entry_point"
) as HTMLButtonElement;
const homepage = document.querySelector("main") as HTMLElement;
const mainRoomsContainer = document.querySelector(
  ".application_container"
) as HTMLElement;
const advanceFeaturesContainer = document.querySelector(
  ".advanced_features_container"
) as HTMLElement;
const nav = document.querySelector("nav") as HTMLElement;
const loader = document.querySelector(".loader-container") as HTMLElement;

// imports
import Light from "./basicSettings.js";
import AdvanceSettings from "./advanceSettings.js";

// object creation
const lightController = new Light();
const advancedSettings = new AdvanceSettings();

// global variables
let selectedComponent: string | undefined;
let isWifiActive = true;

// Event handlers
// hide homepage after button is clicked
homepageButton.addEventListener("click", function (e) {
  lightController.addHidden(homepage);
  lightController.removeHidden(loader);

  setTimeout(() => {
    lightController.removeHidden(mainRoomsContainer);
    lightController.removeHidden(nav);
  }, 1000);
});

mainRoomsContainer.addEventListener("click", (e) => {
  const selectedElement = e.target as HTMLElement;

  // when click occurs on light switch
  if (selectedElement.closest(".light-switch")) {
    const container = selectedElement.closest(
      ".basic_settings_buttons"
    ) as HTMLElement;
    const lightSwitch = container.firstElementChild as HTMLElement;
    lightController.toggleLightSwitch(lightSwitch);
    return;
  }

  // when click occurs on advance modal
  if (selectedElement.closest(".advance-settings_modal")) {
    const advancedSettingsBtn = selectedElement.closest(
      ".advance-settings_modal"
    ) as HTMLElement;
    advancedSettings.modalPopUp(advancedSettingsBtn);
  }
});

mainRoomsContainer.addEventListener("change", (e) => {
  const slider = e.target as HTMLInputElement;
  const value = +slider.value;

  lightController.handleLightIntensitySlider(slider, value);
});

// advance settings modal
advanceFeaturesContainer.addEventListener("click", (e) => {
  const selectedElement = e.target as HTMLElement;

  if (selectedElement.closest(".close-btn")) {
    advancedSettings.closeModalPopUp();
  }

  // display customization markup
  if (selectedElement.closest(".customization-btn")) {
    advancedSettings.displayCustomization(selectedElement);
  }

  // set light on time customization
  if (selectedElement.matches(".defaultOn-okay")) {
    advancedSettings.customizeAutomaticOnPreset(selectedElement);
  }

  // set light off time customization
  if (selectedElement.matches(".defaultOff-okay")) {
    advancedSettings.customizeAutomaticOffPreset(selectedElement);
  }

  // cancel light time customization
  if (selectedElement.textContent?.includes("Cancel")) {
    if (selectedElement.matches(".defaultOn-cancel")) {
      advancedSettings.customizationCancelled(selectedElement, ".defaultOn");
    } else if (selectedElement.matches(".defaultOff-cancel")) {
      advancedSettings.customizationCancelled(selectedElement, ".defaultOff");
    }
  }
});
