import General from "./general";
import Light from "./basicSettings";
import { Component } from "./general";

declare const Chart: any;
class AdvanceSettings extends Light {
  constructor() {
    super();
  }

  #markup(component: Component) {
    const { name, numOfLights, autoOn, autoOff } = component;
    return `
        <div class="advanced_features">
            <h3>Advanced features</h3>
            <section class="component_summary">
                <div>
                    <p class="component_name">${this.capFirstLetter(name)}</p>
                    <p class="number_of_lights">${numOfLights}</p>
                </div>
                <div>

                    <p class="auto_on">
                        <span>Automatic turn on:</span>
                        <span>${autoOn}</span>
                    </p>
                    <p class="auto_off">
                        <span>Automatic turn off:</span>
                        <span>${autoOff}</span>
                    </p>
                </div>
            </section>
            <section class="customization">
                <div class="edit">
                    <p>Customize</p>
                    <button class="customization-btn">
                        <img src="./assets/svgs/edit.svg" alt="customize settings svg icon">
                    </button>
                </div>
                <section class="customization-details hidden">
                    <div>
                        <h4>Automatic on/off settings</h4>
                        <div class="defaultOn">
                            <label for="">Turn on</label>
                            <input type="time" name="autoOnTime" id="autoOnTime">
                            <div>
                                <button class="defaultOn-okay">Okay</button>
                                <button class="defaultOn-cancel">Cancel</button>
                            </div>
                        </div>
                        <div class="defaultOff">
                            <label for="">Go off</label>
                            <input type="time" name="autoOffTime" id="autoOffTime">
                            <div>
                                <button class="defaultOff-okay">Okay</button>
                                <button class="defaultOff-cancel">Cancel</button>
                            </div>
                        </div>

                    </div>
                </section>
                <section class="summary">
                    <h3>Summary</h3>
                    <div class="chart-container">
                        <canvas id="myChart"></canvas>
                    </div>
                </section>
                <button class="close-btn">
                    <img src="./assets/svgs/close.svg" alt="close button svg icon">
                </button>
            </section>
            <button class="close-btn">
                <img src="./assets/svgs/close.svg" alt="close button svg icon">
            </button>
        </div>
        `;
  }

  #analyticsUsage(data: number[]) {
    const ctx = this.selector("#myChart");
    new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"],
        datasets: [
          {
            label: "Hours of usage",
            data: data,
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  modalPopUp(element: HTMLElement) {
    const selectedRoom = this.getSelectedComponentName(element) as string;

    const componentData = this.getComponent(selectedRoom);
    const parentElement = this.selector(
      ".advanced_features_container"
    ) as HTMLElement;
    this.removeHidden(parentElement);

    // display modal view
    this.renderHTML(this.#markup(componentData), "afterbegin", parentElement);

    // graph display
    this.#analyticsUsage(componentData["usage"]);
  }

  displayCustomization(selectedElement: HTMLElement) {
    const element = this.closestSelector(
      selectedElement,
      ".customization",
      ".customization-details"
    );
    this.toggleHidden(element as HTMLElement);
  }

  closeModalPopUp() {
    const parentElement = this.selector(
      ".advanced_features_container"
    ) as HTMLElement;
    const childElement = this.selector(".advanced_features");

    // remove child element from the DOM
    if (childElement) {
      childElement.remove();
    }
    // hide parent element
    if (parentElement) {
      this.addHidden(parentElement);
    }
  }

  customizationCancelled(
    selectedElement: HTMLElement,
    parentSelectorIdentifier: string
  ) {
    const element = this.closestSelector(
      selectedElement,
      parentSelectorIdentifier,
      "input"
    );
    if (element) {
      element.value = "";
    }
    return;
  }

  customizeAutomaticOnPreset(selectedElement: HTMLElement) {
    const element = this.closestSelector(
      selectedElement,
      ".defaultOn",
      "input"
    );

    if (!element) return;

    const { value } = element as HTMLInputElement;

    // when value is falsy

    if (!value) return;

    const component = this.getComponentData(
      element,
      ".advanced_features",
      ".component_name"
    );

    if (!component) return;
    component.autoOn = value;
    element.value = "";

    // selecting display or markup view
    const spanElement = this.selector(
      ".auto_on > span:last-child"
    ) as HTMLElement;
    this.updateMarkupValue(spanElement, component.autoOn);

    // update room data with element
    this.setComponentElement(component);

    // handle light on automation
    this.automateLight(component["autoOn"], component);
  }

  customizeAutomaticOffPreset(selectedElement: HTMLElement) {
    const element = this.closestSelector(
      selectedElement,
      ".defaultOff",
      "input"
    );

    if (!element) return;

    const { value } = element;

    // when value is falsy
    if (!value) return;

    const component = this.getComponentData(
      element,
      ".advanced_features",
      ".component_name"
    );
    if (!component) return;

    component.autoOff = value;
    element.value = "";

    // selecting display or markup view
    const spanElement = this.selector(
      ".auto_off > span:last-child"
    ) as HTMLElement;
    this.updateMarkupValue(spanElement, component.autoOff);

    // update room data with element
    this.setComponentElement(component);

    // handle light on automation
    this.automateLight(component["autoOff"], component);
  }

  getSelectedComponent(componentName: string) {
    if (!componentName) return this.componentsData;
    const component = this.componentsData[componentName.toLowerCase()];
    return component;
  }

  getSelectedSettings(componentName: string) {
    const component = this.getSelectedComponent(componentName) as Component;
    return this.#markup(component);
  }

  setNewData<K extends keyof Component>(
    component: string,
    key: K,
    data: Component[K]
  ) {
    const selectedComponent = this.componentsData[component.toLowerCase()];
    return (selectedComponent[key] = data);
  }

  capFirstLetter(word: string) {
    const first = word[0]

    if (!first) return word;

    return word.replace(first, first.toUpperCase());
  }

  getObjectDetails() {
    return this;
  }

  formatTime(time: string) {
    const [hourStr, minStr] = time.split(":");
    const hour = parseInt(hourStr);
    const min = parseInt(minStr);

    const dailyAlarmTime = new Date();
    dailyAlarmTime.setHours(hour);
    dailyAlarmTime.setMinutes(min);
    dailyAlarmTime.setSeconds(0);

    return dailyAlarmTime;
  }

  timeDifference(selectedTime: string) {
    const now = new Date();
    const setTime = this.formatTime(selectedTime).getTime() - now.getTime();
    console.log(setTime, now);
    return setTime;
  }

  async timer(time: Date, message: boolean, component: Component) {
    return new Promise((resolve, reject) => {
      const checkAndTriggerAlarm = () => {
        const now = new Date();

        if (
          now.getHours() === time.getHours() &&
          now.getMinutes() === time.getMinutes() &&
          now.getSeconds() === time.getSeconds()
        ) {
          resolve(this.toggleLightSwitch(component["element"] as HTMLElement));

          // stop timer
          clearInterval(intervalId);
        }
      };

      // Check every second
      const intervalId = setInterval(checkAndTriggerAlarm, 1000);
    });
  }

  async automateLight(time: string, component: Component) {
    const formattedTime = this.formatTime(time);
    return await this.timer(formattedTime, true, component);
  }
}

export default AdvanceSettings;
