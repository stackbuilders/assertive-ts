import { useCallback, useState } from "react";
import { Button, Text, View } from "react-native";

export function SimpleToggleText(): JSX.Element {
  const [visible, setVisible] = useState(true);

  const toggle = useCallback(() => {
    setVisible(prev => !prev);
  }, []);

  return (
    <View>
      <Text style={{ display: visible ? "flex" : "none" }}>{"Toggle me!"}</Text>
      <Button onPress={toggle} title="Toggle Text" />
    </View>
  );
}
