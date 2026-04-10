import { ReactElement } from "react";
import {
  View,
  Text,
} from "react-native";

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
