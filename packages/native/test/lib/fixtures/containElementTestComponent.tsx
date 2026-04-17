import {
  Text,
  View,
} from "react-native";

import type { ReactElement } from "react";

export function ContainElementTestComponent(): ReactElement {
  return (
    <View testID="grandParent">
      <View testID="parent">
        <View>
          <Text>{"child"}</Text>
        </View>
      </View>
      <Text>{"text"}</Text>
    </View>
  );
}
