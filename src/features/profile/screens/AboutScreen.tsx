import { useRouter } from "expo-router";
import { ArrowLeft } from "iconsax-react-nativejs";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HighlightCard = ({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) => (
  <View className="bg-grey-50 rounded-[24px] p-5 mb-4 border border-grey-100">
    <Text className="text-2xl mb-2">{emoji}</Text>
    <Text className="text-base font-bold text-grey-900 mb-1">{title}</Text>
    <Text className="text-sm text-grey-600 leading-6">{description}</Text>
  </View>
);

export function AboutScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <View className="flex-row items-center justify-between px-6 py-4 relative">
        <Pressable
          onPress={() => router.back()}
          className="h-12 w-12 items-center justify-center rounded-2xl bg-grey-100 z-10"
        >
          <ArrowLeft size={24} color="#161C24" variant="Linear" />
        </Pressable>
        <View className="absolute inset-x-0 bottom-0 top-0 items-center justify-center -z-0">
          <Text className="text-xl font-bold text-grey-900">Giới thiệu</Text>
        </View>
        <View className="w-12" />
      </View>

      <ScrollView className="flex-1 px-6 pb-20" showsVerticalScrollIndicator={false}>
        <View className="py-6">
          <View className="bg-primary-main/10 rounded-[28px] p-6 mb-6 border border-primary-main/20">
            <Text className="text-2xl font-bold text-grey-900 mb-2">GreenGlasses 🌿</Text>
            <Text className="text-sm text-grey-700 leading-6">
              Nhìn thế giới qua lăng kính xanh — ứng dụng trợ lý môi trường thông minh trong túi bạn.
            </Text>
          </View>

          <Text className="text-base text-grey-800 leading-7 mb-6">
            <Text className="font-bold">GreenGlasses</Text> giúp bạn{" "}
            <Text className="font-bold">
              nhận diện rác thải bằng AI chỉ với một bức ảnh
            </Text>
            , tra cứu thư viện sản phẩm xanh và đọc bài viết kiến thức môi trường — tất cả trong một trải nghiệm gọn nhẹ, dễ dùng.
          </Text>

          <Text className="text-lg font-bold text-grey-900 mb-4">Chúng tôi làm gì?</Text>

          <HighlightCard
            emoji="📷"
            title="Quét AI thông minh"
            description="Chụp hoặc tải ảnh rác — AI phân tích loại rác và gợi ý cách xử lý, tái chế phù hợp."
          />
          <HighlightCard
            emoji="📚"
            title="Thư viện sản phẩm xanh"
            description="Tra cứu hàng trăm loại vật phẩm, hiểu cách phân loại và sống bền vững hơn mỗi ngày."
          />
          <HighlightCard
            emoji="📰"
            title="Bài viết & mẹo sống xanh"
            description="Cập nhật kiến thức môi trường, mẹo vặt và câu chuyện truyền cảm hứng từ cộng đồng xanh."
          />
          <HighlightCard
            emoji="❤️"
            title="Lưu yêu thích"
            description="Đánh dấu nội dung hữu ích để xem lại bất cứ lúc nào — xây dựng thói quen xanh của riêng bạn."
          />

          <Text className="text-base text-grey-800 leading-7 mb-6">
            Sứ mệnh của chúng tôi là{" "}
            <Text className="font-bold">
              biến hành động nhỏ thành thay đổi lớn
            </Text>
            : mỗi lần phân loại đúng, mỗi lần tái chế đúng cách đều góp phần giảm rác thải và bảo vệ hành tinh.
          </Text>

          <View className="bg-grey-900 rounded-[24px] p-6">
            <Text className="text-white text-lg font-bold leading-7 text-center">
              GreenGlasses — Chụp một ảnh, chọn đúng cách, sống xanh hơn.
            </Text>
          </View>

          <Text className="text-xs text-grey-400 text-center mt-6">Phiên bản 1.0.0</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
