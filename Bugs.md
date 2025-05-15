# Bugs

Below are a list of bugs resolved in the initial code base

## Type Check Issues

### 1. **general.ts File**:

- `isLightOn` and `lightIntensity` were not declared as properties of the `General` class.
  **Solution**

```ts
isLightOn: boolean;
lightIntensity: number;
```

- create a `Component` type to describe the shape of each room

**Solution**

```ts
type Component = {
  name: string;
  lightIntensity: number;
  numOfLights: number;
  isLightOn: boolean;
  autoOn: string;
  autoOff: string;
  usage: number[];
  element?: HTMLElement | undefined;
};
```

- also create a `ComponentData` type to describe the shape of the General class component data

**Solution**

```ts
type ComponentData = {
  [key: string]: Component;
};
```

- fixed this key for "walkway & corridor" from this `[['walkway & corridor']]` to this `['walkway & corridor']`

- Finally, gave each class method parameter their right data type

### 2. **basicSettings.ts**

- `typeof intensity === isNaN` always returns false because isNaN is a function which is being compared with a string(intensity)

**Solution**

```ts
if (typeof intensity !== "number" || isNaN(intensity)) return;
```

- Incorrect typing of DOM elements like `any` and the use of **typed generic objects** like `{ setAttribute: ... }`. This removes type safety. To resolve this, use proper DOM types like HTMLElement, HTMLImageElement, or Element depending on the context.

**Solution**

```ts
// before
lightSwitchOn(lightButtonElement: {
  setAttribute: (arg0: string, arg1: string) => void;
})

//after
lightSwitchOn(lightButtonElement: HTMLImageElement)
```

- used Non-null assertion in areas where variables are always defined

**Solution**

```ts
this.handleLightIntensity(background as HTMLElement, 0);

this.sliderLight(componentData.isLightOn, lightSwitch as HTMLElement);
```

### 3. **advanceSettings.ts**

- can't find module Chart.

**Solution**

```ts
declare const Chart: any;
```

- add the right data types to the Advance class methods

**Solution**

```ts
#analyticsUsage(data: number[])

modalPopUp(element: HTMLElement)

formatTime(time: string)

timeDifference(selectedTime: string)

async timer(time: Date, message: boolean, component: Component)
```

- redefine return types for getSelectedSettings

**Solution**

```ts
// before
  getSelectedSettings (componentName) {
        return this.markup(this.getSelectedComponent(componentName));

    }

// after
  getSelectedSettings(componentName: string) {
    const component = this.getSelectedComponent(componentName) as Component;
    return this.#markup(component);
  }
```

- use Generics to constrain `key` to Component's key

**Solution**

```ts
setNewData<K extends keyof Component>(
  component: string,
  key: K,
  data: Component[K]
) {
  const selectedComponent = this.componentsData[component.toLowerCase()];
  return (selectedComponent[key] = data);
}
```

### 4. main.ts

- let typescript know the actual types of DOM elements by casting the DOM elements to their right types

**Solution**

```ts
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
```

- guard DOM traversals with `as HTMLElement` or `?.` as needed

**Solution**

```ts
if (selectedElement.closest(".advance-settings_modal")) {
  const advancedSettingsBtn = selectedElement.closest(
    ".advance-settings_modal"
  ) as HTMLElement;
  advancedSettings.modalPopUp(advancedSettingsBtn);
}

const selectedElement = e.target as HTMLElement;

// etc.
```
