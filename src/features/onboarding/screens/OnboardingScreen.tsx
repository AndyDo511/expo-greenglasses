import { useState, useRef } from "react";
import {
  FlatList,
  Text,
  View,
  Dimensions,
  ImageBackground,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { AppButton } from "@/shared/components/ui/AppButton";
import { router } from "expo-router";
import { useAppStore } from "@/shared/store/app.store";
import images from "@/shared/constants/images";

const { width } = Dimensions.get("window");

const SLIDES = [
  {
    id: "1",
    title: "Quét & Tìm kiếm\nsản phẩm",
    backgroundImage: images.ob1,
  },
  {
    id: "2",
    title: "Tìm hiểu & So sánh\ntác động",
    backgroundImage: images.ob2,
  },
  {
    id: "3",
    title: "Chứng nhận &\nTiêu dùng xanh",
    backgroundImage: images.ob3,
  },
];

export function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const completeOnboarding = useAppStore((state) => state.completeOnboarding);

  const handleNext = () => {
    if (currentIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      completeOnboarding();
      router.replace("/(public)/sign-in");
    }
  };

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / width);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        keyExtractor={(item) => item.id}
        className="flex-1"
        renderItem={({ item }) => (
          <ImageBackground
            source={item.backgroundImage}
            className="flex-1"
            style={{ width, height: "100%" }}
            resizeMode="cover"
          >
            <View className="flex-1" />
            <Text className="text-4xl font-semibold text-center text-white leading-[44px]">
              {item.title}
            </Text>
            <View className="mt-8 flex-row justify-center gap-2">
              {SLIDES.map((_, index) => (
                <View
                  key={index}
                  className={`h-2 rounded-full ${
                    index === currentIndex ? "w-4 bg-white" : "w-4 bg-white opacity-[30%]"
                  }`}
                />
              ))}
            </View>
           <View className="mb-10 px-6 mt-6">
             <AppButton
               label={currentIndex === SLIDES.length - 1 ? "Bắt đầu ngay!" : "Tiếp theo"}
               onPress={handleNext}
             />
           </View>
          </ImageBackground>
        )}
      />
    </View>
  );
}
