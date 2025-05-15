import General from "./general";

class Light extends General {
  constructor() {
    super();
  }

  notification(message: string) {
    return `
            <div class="notification">
                <div>
                    <img src="./assets/svgs/checked.svg" alt="checked svg icon on notifications" >
                </div>
                <p>${message}</p>
            </div>
        `;
  }

  displayNotification(message: string, position: any, container: any) {
    const html = this.notification(message);
    this.renderHTML(html, position, container);
  }

  removeNotification(element: HTMLElement) {
    setTimeout(() => {
      element.remove();
    }, 5000);
  }

  lightSwitchOn(lightButtonElement: HTMLImageElement) {
    lightButtonElement.setAttribute("src", "./assets/svgs/light_bulb.svg");
    lightButtonElement.setAttribute(
      "data-lightOn",
      "./assets/svgs/light_bulb_off.svg"
    );
  }

  lightSwitchOff(lightButtonElement: HTMLImageElement) {
    lightButtonElement.setAttribute("src", "./assets/svgs/light_bulb_off.svg");
    lightButtonElement.setAttribute(
      "data-lightOn",
      "./assets/svgs/light_bulb.svg"
    );
  }

  lightComponentSelectors(lightButtonElement: HTMLElement) {
    const room = this.getSelectedComponentName(lightButtonElement);

    if (!room) {
      throw new Error("Could not determine room from lightButtonElement");
    }

    const componentData = this.getComponent(room);
    const childElement =
      lightButtonElement.firstElementChild as HTMLImageElement;
    const background = this.closestSelector(
      lightButtonElement,
      ".rooms",
      "img"
    );
    return { room, componentData, childElement, background };
  }

  toggleLightSwitch(lightButtonElement: HTMLElement) {
    const {
      componentData: component,
      childElement,
      background,
    } = this.lightComponentSelectors(lightButtonElement);
    const slider = this.closestSelector(
      lightButtonElement,
      ".rooms",
      "#light_intensity"
    ) as HTMLInputElement;

    if (!component) return;

    component.isLightOn = !component.isLightOn;

    if (component.isLightOn) {
      this.lightSwitchOn(childElement);
      component.lightIntensity = 5;
      const lightIntensity = component.lightIntensity / 10;
      this.handleLightIntensity(background as HTMLElement, lightIntensity);
      slider.value = `${component.lightIntensity}`;
    } else {
      this.lightSwitchOff(childElement);
      this.handleLightIntensity(background as HTMLElement, 0);
      slider.value = `${0}`;
    }
  }

  handleLightIntensitySlider(element: HTMLElement, intensity: number) {
    const { componentData } = this.lightComponentSelectors(element);

    if (typeof intensity !== "number" || isNaN(intensity)) return;

    componentData.lightIntensity = intensity;

    const lightSwitch = this.closestSelector(
      element,
      ".rooms",
      ".light-switch"
    );

    if (intensity === 0) {
      componentData.isLightOn = false;
      this.sliderLight(componentData.isLightOn, lightSwitch as HTMLElement);
      return;
    }

    componentData.isLightOn = true;
    this.sliderLight(componentData.isLightOn, lightSwitch as HTMLElement);
  }

  sliderLight(isLightOn: boolean, lightButtonElement: HTMLElement) {
    const {
      componentData: component,
      childElement,
      background,
    } = this.lightComponentSelectors(lightButtonElement);

    if (!component) return;

    if (isLightOn) {
      this.lightSwitchOn(childElement);
      const lightIntensity = component.lightIntensity / 10;
      this.handleLightIntensity(background as HTMLElement, lightIntensity);
    } else {
      this.lightSwitchOff(childElement);
      this.handleLightIntensity(background as HTMLElement, 0);
    }
  }
}

export default Light;
