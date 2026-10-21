import React from "react";
import { View, Text, Pressable, ScrollView, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft, Sms, Call, MessageText } from "iconsax-react-nativejs";
import { useRouter } from "expo-router";

const SUPPORT_EMAIL = "support@greenglasses.app";
const SUPPORT_PHONE = "+84 901 234 567";

const ContactRow = ({
  icon: Icon,
  label,
  value,
  onPress,
}: {
  icon: typeof Sms;
  label: string;
  value: string;
  onPress?: () => void;
}) => (
  <Pressable
    onPress={onPress}
    disabled={!onPress}
    className="flex-row items-center bg-white rounded-[20px] p-4 mb-3 border border-grey-100"
  >
    <View className="h-11 w-11 items-center justify-center rounded-xl bg-primary-main/15 mr-4">
      <Icon size={22} color="#00A76F" variant="Bold" />
    </View>
    <View className="flex-1">
      <Text className="text-xs text-grey-500 mb-0.5">{label}</Text>
      <Text className="text-base font-semibold text-grey-900">{value}</Text>
    </View>
  </Pressable>
);

const FaqItem = ({ question, answer }: { question: string; answer: string }) => (
  <View className="mb-4">
    <Text className="text-sm font-bold text-grey-900 mb-1">{question}</Text>
    <Text className="text-sm text-grey-600 leading-6">{answer}</Text>
  </View>
);

export function ContactScreen() {
  const router = useRouter();

  const openEmail = () => {
    Linking.openURL(
      `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent("[GreenGlasses] Hỗ trợ người dùng")}`
    );
  };

  const openPhone = () => {
    Linking.openURL(`tel:${SUPPORT_PHONE.replace(/\s/g, "")}`);
  };

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
          <Text className="text-xl font-bold text-grey-900">Liên hệ hỗ trợ</Text>
        </View>
        <View className="w-12" />
      </View>

      <ScrollView className="flex-1 px-6 pb-20" showsVerticalScrollIndicator={false}>
        <View className="py-4">
          <View className="bg-primary-main/10 rounded-[28px] p-6 mb-6 border border-primary-main/20">
            <Text className="text-lg font-bold text-grey-900 mb-2">
              Đội ngũ GreenGlasses luôn sẵn sàng 🌱
            </Text>
            <Text className="text-sm text-grey-700 leading-6">
              Gặp vấn đề khi quét rác, đăng nhập hay tìm nội dung? Hãy liên hệ — chúng tôi phản hồi trong vòng 24–48 giờ làm việc.
            </Text>
          </View>

          <Text className="text-sm font-bold text-grey-900 mb-3 uppercase tracking-wide">
            Kênh liên hệ
          </Text>

          <ContactRow
            icon={Sms}
            label="Email hỗ trợ"
            value={SUPPORT_EMAIL}
            onPress={openEmail}
          />
          <ContactRow
            icon={Call}
            label="Hotline (8h–17h, T2–T6)"
            value={SUPPORT_PHONE}
            onPress={openPhone}
          />

          <View className="bg-grey-50 rounded-[28px] p-5 mt-4 mb-6 border border-grey-100">
            <View className="flex-row items-center mb-3">
              <MessageText size={20} color="#637381" variant="Linear" />
              <Text className="text-base font-bold text-grey-900 ml-2">
                Câu hỏi thường gặp
              </Text>
            </View>

            <FaqItem
              question="Kết quả quét AI không chính xác?"
              answer="Hãy chụp ảnh rõ nét, đủ ánh sáng và đặt vật ở giữa khung hình. Kết quả mang tính tham khảo — bạn nên đối chiếu thêm với thư viện hoặc quy định địa phương."
            />
            <FaqItem
              question="Làm sao lưu bài viết yêu thích?"
              answer="Nhấn biểu tượng trái tim trên thẻ bài viết hoặc sản phẩm — xem lại tại mục Yêu thích trên trang chủ."
            />
            <FaqItem
              question="Ứng dụng có miễn phí không?"
              answer="GreenGlasses miễn phí các tính năng cốt lõi. Chúng tôi sẽ thông báo trước nếu có gói nâng cao trong tương lai."
            />
          </View>

          <Text className="text-xs text-grey-400 text-center leading-5">
            Khi gửi yêu cầu, vui lòng mô tả thiết bị (iOS/Android) và phiên bản ứng dụng để được hỗ trợ nhanh hơn.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
