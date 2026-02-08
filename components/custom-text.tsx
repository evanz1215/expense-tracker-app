import React from "react";
import { Text } from "react-native";

interface CustomTextProps {
  value: string;
  color?: string;
  fontSize?: number;
  fontWeight?: "400" | "500" | "600" | "700";
  marginTop?: number;
  marginBottom?: number;
  marginHorizontal?: number;
  textAlign?: "left" | "center" | "right";
}

const CustomText = ({
  value,
  color = "black",
  fontSize = 14,
  fontWeight = "600",
  marginTop = 0,
  marginBottom = 0,
  marginHorizontal = 0,
  textAlign = "left",
}: CustomTextProps) => {
  return (
    <Text
      style={{
        color,
        fontSize,
        fontWeight,
        marginTop,
        marginBottom,
        marginHorizontal,
        textAlign,
      }}
    >
      {value}
    </Text>
  );
};

export default CustomText;
