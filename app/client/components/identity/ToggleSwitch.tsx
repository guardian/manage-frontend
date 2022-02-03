import React from "react";
import type { SerializedStyles } from "@emotion/core";
//  TODO v 4 -> v2 import type { EmotionJSX } from "@emotion/react/types/jsx-namespace";

import {
  androidStyles,
  buttonStyles,
  iosStyles,
  labelStyles,
  toggleSwitchStyles,
  webStyles,
  labelPositionLeftStyle,
  labelPositionRightStyle,
} from "./ToggleStyles";

/**
 *  TODO: this toggle switch and accompanying styles are copied from Source (Design System)
 *  They should be updated to the Source version once MMA migration to Emotion 11 and Source v3+ is complete
 */

// TODO v 4 -> v2 interface Props replaces "import type { Props } from "@guardian/source-react-components";""
interface Props {
  className?: string;
  /**
   * Override component styles by passing in the result of [emotion's `css` function/prop](https://emotion.sh/docs/introduction).
   */
  cssOverrides?: SerializedStyles | SerializedStyles[];
}

type Platform = "android" | "ios" | "web";
type LabelPosition = "left" | "right";
interface ToggleSwitchProps extends Props {
  /**
   * Whether the ToggleSwitch is checked. This is necessary when using the
   * [controlled approach](https://reactjs.org/docs/forms.html#controlled-components)
   * (recommended) to form state management.
   *
   * Note: if you pass the `checked` prop, you MUST also pass an `onClick`
   * handler, or the field will be rendered as read-only.
   */
  checked?: boolean;
  /**
   * When using the [uncontrolled approach](https://reactjs.org/docs/uncontrolled-components.html),
   * use defaultChecked to indicate the whether the ToggleSwitch is checked intially.
   */
  defaultChecked?: boolean;
  /**
   * Appears to the right of the switch.
   */
  label?: string;
  /**
   * Appears to the right by default.
   */
  labelPosition?: LabelPosition;
  /**
   * Optional labelId. Defaults to "notify"
   */
  labelId?: string;
  /**
   * Sets the toggle styling appropriate for each platform.
   * The default platform is 'web'.
   */
  platform?: Platform;
  /**
   * A callback function called when the component is checked or unchecked.
   * Receives the click event as an argument.
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * [Storybook](https://guardian.github.io/source/?path=/docs/kitchen-source-react-components-development-kitchen-toggle-switch--playground) •
 * [Design System](https://theguardian.design) •
 * [GitHub](https://github.com/guardian/source/tree/main/packages/@guardian/source-react-components-development-kitchen/components/toggle-switch) •
 * [NPM](https://www.npmjs.com/package/@guardian/source-react-components-development-kitchen)
 *
 * Displays an on/off toggle switch. This toggle has default styling and can be used on andriod, ios or web.
 * These styles are driven by the 'platform' prop.
 * To give it more custome styling cssOverride may be used.
 *
 */
const getPlatformStyles = (platform: Platform): SerializedStyles => {
  switch (platform) {
    case "android":
      return androidStyles;
    case "ios":
      return iosStyles;
    case "web":
      return webStyles;
  }
};

const getLabelPositionStyles = (
  labelPosition: LabelPosition
): SerializedStyles =>
  labelPosition === "left" ? labelPositionLeftStyle : labelPositionRightStyle;

export const ToggleSwitch = ({
  checked,
  label,
  labelPosition = "right",
  labelId,
  defaultChecked,
  cssOverrides,
  platform = "web",
  onClick = () => undefined,
  ...props
}: ToggleSwitchProps): JSX.Element => {
  const isChecked = (): boolean => {
    if (checked != undefined) {
      return checked;
    }

    return !!defaultChecked;
  };

  const Label = () => (
    <label css={[labelStyles]} id={labelId || "notify"}>
      {label}
    </label>
  );

  return (
    <div
      css={[
        toggleSwitchStyles,
        getLabelPositionStyles(labelPosition),
        cssOverrides,
      ]}
      {...props}
    >
      {labelPosition === "left" && <Label />}
      <button
        css={[buttonStyles, getPlatformStyles(platform)]}
        role="switch"
        aria-checked={isChecked()}
        aria-labelledby={labelId || "notify"}
        onClick={onClick}
      ></button>
      {labelPosition === "right" && <Label />}
    </div>
  );
};
