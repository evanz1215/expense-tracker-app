import CustomText from "@/components/custom-text";
import Flexbox from "@/components/flexbox";
import { primaryColor } from "@/constants";
import { Link, RelativePathString } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const HomeTab = () => {
  return (
    <Flexbox>
      <Flexbox
        gap={20}
        padding={20}
        justifyContent="space-between"
        flexDirection="row"
        alignItems="center"
      >
        <CustomText
          value="Recent transactions"
          fontSize={20}
          fontWeight="700"
          color={primaryColor}
        />
        <Link href={"/user/transactions" as RelativePathString}>
          <CustomText value="See all" color="blue" fontWeight="700" />
        </Link>
      </Flexbox>
    </Flexbox>
  );
};

export default HomeTab;
