# **GreenGlasses - Smart Environmental App** 🌱📱

**GreenGlasses** – Nhìn thế giới qua lăng kính xanh. Ứng dụng trợ lý môi trường thông minh giúp bạn nhận diện rác thải, khám phá sản phẩm xanh và đọc kiến thức bền vững mỗi ngày! ♻️🌍

Quét AI, tra cứu thư viện, đọc bài viết và lưu yêu thích — tất cả trong một trải nghiệm gọn nhẹ trên điện thoại! 🔍✨

![alt text](https://res.cloudinary.com/dks2uuwb6/image/upload/v1779561190/thumbnail_kdnbmf.webp)

## [DEMO-VIDEO - DRIVE LINK](https://drive.google.com/file/d/1lQByNCM6mJidhB3HGcY6Rs_8k5VE1cSv/view?usp=sharing)

## 🚀 Tính năng chính

### **📷 Quét nhận diện rác thải AI**
- Chụp hoặc tải ảnh để nhận diện loại rác thải
- Phân loại tự động bằng công nghệ AI
- Gợi ý cách xử lý và tái chế phù hợp
- Lưu lịch sử quét để theo dõi

![alt text](https://res.cloudinary.com/dks2uuwb6/image/upload/v1779561188/12_duvbao.webp)

### **📚 Thư viện sản phẩm xanh**
- Tra cứu thông tin các loại vật phẩm, rác thải
- Lọc theo danh mục trên trang chủ và thư viện
- Hướng dẫn phân loại và xử lý chi tiết
- Cập nhật kiến thức môi trường liên tục

![alt text](https://res.cloudinary.com/dks2uuwb6/image/upload/v1779561188/13_ngu5wg.webp)

### **📰 Bài viết môi trường**
- Đọc tin tức, mẹo sống xanh hàng ngày
- Lọc theo danh mục, sắp xếp A–Z / mới nhất / cũ nhất
- Hiển thị danh mục ngay trên thẻ bài viết
- Truy cập nhanh từ trang chủ

![alt text](https://res.cloudinary.com/dks2uuwb6/image/upload/v1779561189/14_v9rrw4.webp)

### **❤️ Yêu thích**
- Lưu **sản phẩm** và **bài viết** riêng biệt
- Bật/tắt yêu thích trực tiếp trên thẻ hoặc màn chi tiết
- Đồng bộ trạng thái trên toàn ứng dụng
- Truy cập nhanh danh sách đã lưu

![alt text](https://res.cloudinary.com/dks2uuwb6/image/upload/v1779561188/15_rkjwtg.webp)

### **👤 Tài khoản & hồ sơ**
- Đăng nhập với Google
- Chỉnh sửa hồ sơ, avatar
- Lịch sử quét, tìm kiếm
- Giới thiệu, điều khoản, liên hệ hỗ trợ

![alt text](https://res.cloudinary.com/dks2uuwb6/image/upload/v1779561189/16_hyebui.webp)

## 🛠️ Công nghệ sử dụng

- **Framework:** React Native với Expo
- **Navigation:** Expo Router
- **State Management:** Zustand
- **Data Fetching:** TanStack Query (React Query)
- **Styling:** NativeWind (Tailwind CSS)
- **AI Vision:** Expo Camera + Vision API
- **Authentication:** Google Sign-In
- **Forms:** React Hook Form + Zod validation
- **Storage:** AsyncStorage + Expo SecureStore
- **Icons:** Iconsax React Native
- **Image Processing:** Expo Image Picker

## 📱 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js >= 18.0.0
- npm hoặc yarn
- Expo CLI
- Android Studio (cho Android)
- Xcode (cho iOS)

### Cài đặt
```bash
# Clone repository
git clone <repository-url>
cd expo-green-lens

# Cài đặt dependencies
npm install

# Khởi động development server
npm start

# Chạy trên Android
npm run android

# Chạy trên iOS
npm run ios

# Chạy trên Web
npm run web
```

### Scripts có sẵn
```bash
npm start              # Khởi động Expo development server
npm run android        # Chạy trên Android
npm run ios            # Chạy trên iOS
npm run web            # Chạy trên Web
npm run lint           # Kiểm tra code style
npm run prebuild       # Tạo native code
npm run build:android  # Build APK cho Android
npm run reset-project  # Reset dự án về trạng thái ban đầu
```

## 📁 Cấu trúc dự án

```
src/
├── app/                    # Expo Router pages
│   ├── (auth)/            # Authentication screens
│   ├── (protected)/       # Protected app screens
│   └── (tabs)/            # Tab navigation screens
├── features/              # Feature modules
│   ├── auth/              # Xác thực người dùng
│   ├── scan/              # Quét nhận diện rác thải
│   ├── articles/          # Bài viết môi trường
│   ├── waste-library/     # Thư viện sản phẩm xanh
│   ├── home/              # Trang chủ
│   ├── profile/           # Hồ sơ người dùng
│   └── onboarding/        # Giới thiệu ứng dụng
├── shared/                # Shared utilities
│   ├── api/               # API configuration
│   ├── components/        # Common UI components
│   ├── constants/         # App constants
│   ├── hooks/             # Custom hooks
│   ├── types/             # TypeScript types
│   └── utils/             # Utility functions
└── styles/                # Global styles
```

## 🌱 Tính năng nổi bật

- **AI Vision:** Nhận diện rác thải qua ảnh chụp thời gian thực
- **Thư viện & bài viết:** Nội dung môi trường phong phú, dễ tra cứu
- **Yêu thích thông minh:** Lưu sản phẩm và bài viết, đồng bộ một API
- **Giao diện hiện đại:** Thiết kế sạch, thân thiện với người dùng Việt Nam
- **Đăng nhập Google:** Trải nghiệm cá nhân hóa nhanh chóng

**GreenGlasses** — Chụp một ảnh, chọn đúng cách, sống xanh hơn! 🌍✨
