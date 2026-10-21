import React from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeft } from "iconsax-react-nativejs";
import { useRouter } from "expo-router";

const BulletPoint = ({ text }: { text: string }) => (
  <View className="flex-row mb-1 ml-4">
    <Text className="text-grey-400 mr-2">•</Text>
    <Text className="text-sm text-grey-600 flex-1 leading-6">{text}</Text>
  </View>
);

export function TermsScreen() {
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
          <Text className="text-xl font-bold text-grey-900">
            Điều khoản & Điều kiện
          </Text>
        </View>
        <View className="w-12" />
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="py-4">
          <Text className="text-xs text-grey-400 mb-4">Cập nhật lần cuối: 24/04/2026</Text>

          <Text className="text-sm text-grey-700 leading-6 mb-6">
            Chào mừng bạn đến với{" "}
            <Text className="font-bold">GreenGlasses</Text>. Khi tải, cài đặt hoặc sử dụng ứng dụng, bạn xác nhận đã đọc, hiểu và đồng ý với các điều khoản dưới đây. Nếu không đồng ý, vui lòng ngừng sử dụng ứng dụng.
          </Text>

          <View className="mb-6">
            <Text className="text-lg font-bold text-grey-900 mb-2">1. Giới thiệu dịch vụ</Text>
            <Text className="text-sm text-grey-600 leading-6">
              GreenGlasses là ứng dụng hỗ trợ{" "}
              <Text className="font-bold">
                nhận diện rác thải bằng trí tuệ nhân tạo (AI)
              </Text>
              , cung cấp thư viện sản phẩm xanh, bài viết kiến thức môi trường và tính năng lưu yêu thích. Mọi thông tin trong ứng dụng mang tính{" "}
              <Text className="font-bold">tham khảo và giáo dục</Text>, không thay thế quy định pháp luật hay hướng dẫn chính thức của cơ quan có thẩm quyền.
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-bold text-grey-900 mb-2">2. Điều kiện sử dụng</Text>
            <Text className="text-sm text-grey-600 mb-2">
              Khi sử dụng GreenGlasses, bạn cam kết:
            </Text>
            <BulletPoint text="Cung cấp thông tin đăng ký trung thực (nếu có tài khoản)" />
            <BulletPoint text="Không lạm dụng tính năng quét ảnh cho mục đích trái pháp luật" />
            <BulletPoint text="Không can thiệp, phá hoại hoặc khai thác trái phép hệ thống ứng dụng" />
            <BulletPoint text="Không sao chép, phân phối nội dung ứng dụng khi chưa được phép" />
            <Text className="text-sm text-grey-600 mt-2 leading-6">
              Bạn chịu trách nhiệm về mọi hoạt động thực hiện qua tài khoản của mình.
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-bold text-grey-900 mb-2">
              3. Tính năng quét AI & camera
            </Text>
            <Text className="text-sm text-grey-600 mb-2">
              Ứng dụng cần quyền truy cập camera/thư viện ảnh để phân tích rác thải. Bạn hiểu rằng:
            </Text>
            <BulletPoint text="Ảnh có thể được xử lý trên máy chủ để trả kết quả nhận diện" />
            <BulletPoint text="Kết quả AI có thể sai lệch tùy góc chụp, ánh sáng hoặc loại vật thể" />
            <BulletPoint text="Bạn không nên chỉ dựa vào kết quả quét để xử lý chất thải nguy hại" />
            <Text className="text-sm text-grey-600 mt-2 leading-6">
              GreenGlasses không chịu trách nhiệm về thiệt hại phát sinh từ quyết định xử lý rác dựa hoàn toàn vào kết quả AI.
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-bold text-grey-900 mb-2">4. Nội dung ứng dụng</Text>
            <Text className="text-sm text-grey-600 mb-2">
              GreenGlasses cung cấp, trong phạm vi có thể thay đổi:
            </Text>
            <BulletPoint text="Thư viện sản phẩm và hướng dẫn phân loại" />
            <BulletPoint text="Bài viết, tin tức môi trường" />
            <BulletPoint text="Lịch sử quét và mục yêu thích" />
            <Text className="text-sm text-grey-600 mt-2 leading-6">
              Chúng tôi có quyền cập nhật, tạm ngưng hoặc gỡ bỏ nội dung bất kỳ lúc nào để cải thiện chất lượng dịch vụ.
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-bold text-grey-900 mb-2">5. Tài khoản & bảo mật</Text>
            <Text className="text-sm text-grey-600 mb-2">
              Nếu đăng nhập qua Google hoặc email, bạn có trách nhiệm:
            </Text>
            <BulletPoint text="Bảo mật thông tin đăng nhập" />
            <BulletPoint text="Thông báo ngay khi phát hiện truy cập trái phép" />
            <Text className="text-sm text-grey-600 mt-2 leading-6">
              Chúng tôi áp dụng các biện pháp kỹ thuật hợp lý để bảo vệ dữ liệu, nhưng không thể đảm bảo an toàn tuyệt đối trên internet.
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-bold text-grey-900 mb-2">6. Quyền riêng tư</Text>
            <Text className="text-sm text-grey-600 mb-2">
              GreenGlasses có thể thu thập dữ liệu cần thiết để vận hành, gồm:
            </Text>
            <BulletPoint text="Ảnh rác được quét (để phân tích AI)" />
            <BulletPoint text="Thông tin tài khoản và hoạt động trong ứng dụng" />
            <BulletPoint text="Dữ liệu kỹ thuật thiết bị (phiên bản OS, log lỗi)" />
            <Text className="text-sm text-grey-600 mt-2 leading-6">
              Dữ liệu được xử lý theo mục đích cung cấp dịch vụ và không bán cho bên thứ ba vì mục đích quảng cáo.
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-bold text-grey-900 mb-2">7. Quyền sở hữu trí tuệ</Text>
            <Text className="text-sm text-grey-600 leading-6">
              Toàn bộ giao diện, nội dung, thương hiệu GreenGlasses và công nghệ liên quan thuộc quyền sở hữu của chúng tôi hoặc đối tác cấp phép. Nghiêm cấm sao chép, chỉnh sửa hoặc khai thác thương mại khi chưa có văn bản chấp thuận.
            </Text>
          </View>

          <View className="mb-6">
            <Text className="text-lg font-bold text-grey-900 mb-2">8. Giới hạn trách nhiệm</Text>
            <Text className="text-sm text-grey-600 mb-2">
              GreenGlasses không chịu trách nhiệm đối với:
            </Text>
            <BulletPoint text="Gián đoạn dịch vụ do bảo trì, sự cố mạng hoặc bất khả kháng" />
            <BulletPoint text="Thiệt hại gián tiếp từ việc sử dụng hoặc không thể sử dụng ứng dụng" />
            <BulletPoint text="Nội dung từ liên kết hoặc nguồn bên thứ ba" />
            <Text className="text-sm text-grey-600 mt-2 leading-6">
              Ứng dụng được cung cấp trên cơ sở &quot;nguyên trạng&quot; (as-is).
            </Text>
          </View>

          <View className="mb-10">
            <Text className="text-lg font-bold text-grey-900 mb-2">9. Thay đổi điều khoản</Text>
            <Text className="text-sm text-grey-600 leading-6">
              Chúng tôi có thể sửa đổi Điều khoản & Điều kiện theo thời gian. Thay đổi quan trọng sẽ được thông báo trong ứng dụng. Việc tiếp tục sử dụng GreenGlasses sau khi cập nhật đồng nghĩa với việc bạn chấp nhận điều khoản mới.{"\n\n"}
              Mọi thắc mắc pháp lý, vui lòng liên hệ qua mục Liên hệ hỗ trợ trong ứng dụng.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
