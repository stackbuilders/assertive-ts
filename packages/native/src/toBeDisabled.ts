import type { ReactTestInstance } from 'react-test-renderer';
import { matcherHint } from 'jest-matcher-utils';
import { checkReactElement, getType } from './utils';

// Elements that support 'disabled'
const DISABLE_TYPES = [
  'Button',
  'Slider',
  'Switch',
  'Text',
  'TouchableHighlight',
  'TouchableOpacity',
  'TouchableWithoutFeedback',
  'TouchableNativeFeedback',
  'View',
  'TextInput',
  'Pressable',
];

function isElementDisabled(element: ReactTestInstance) {
  if (getType(element) === 'TextInput' && element?.props?.editable === false) {
    return true;
  }

  if (!DISABLE_TYPES.includes(getType(element))) {
    return false;
  }

  return (
    !!element?.props?.disabled ||
    !!element?.props?.accessibilityState?.disabled ||
    !!element?.props?.accessibilityStates?.includes('disabled')
  );
}

function isAncestorDisabled(element: ReactTestInstance): boolean {
  const parent = element.parent;
  return parent != null && (isElementDisabled(element) || isAncestorDisabled(parent));
}

export function toBeDisabled(this: jest.MatcherContext, element: ReactTestInstance) {
  checkReactElement(element);

  const isDisabled = isElementDisabled(element) || isAncestorDisabled(element);

  return {
    pass: isDisabled,
    message: () => {
      const is = isDisabled ? 'is' : 'is not';
      return [
        matcherHint(`${this.isNot ? '.not' : ''}.toBeDisabled`, 'element', ''),
        '',
        `Received element ${is} disabled:`,
        element,
      ].join('\n');
    },
  };
}
