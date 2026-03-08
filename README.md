# TỪ ĐIỂN THUẬT NGỮ CHUYÊN NGÀNH DỰ ÁN AMA (AI MEDICAL ASSISTANT)
**Mục đích sử dụng:** Chuẩn hóa ngôn ngữ thuyết trình, tài liệu kỹ thuật và báo cáo vòng bán kết P-Innovation 2026.

## 1. NHÓM THUẬT NGỮ CÔNG NGHỆ & TRÍ TUỆ NHÂN TẠO (TECH & AI)

| Thuật ngữ Tiếng Anh | Nghĩa Tiếng Việt | Từ đồng nghĩa/Liên quan | Ngữ cảnh ứng dụng trong dự án AMA |
| :--- | :--- | :--- | :--- |
| **Optical Character Recognition (OCR)** | Nhận dạng ký tự quang học | Text Extraction, Image-to-Text | Trích xuất văn bản từ hình ảnh chụp vỉ thuốc, hóa đơn nhà thuốc. |
| **Large Language Model (LLM)** | Mô hình ngôn ngữ lớn | Generative AI, Foundation Model | Công cụ AI lõi (Gemini) dùng để hiểu và cấu trúc hóa dữ liệu OCR. |
| **Prompt Engineering** | Kỹ thuật thiết kế câu lệnh | AI Instruction Design | Tối ưu hóa câu lệnh hệ thống (System Prompt) ép AI trả về chuẩn JSON. |
| **Hallucination** | Hiện tượng ảo giác AI | AI Fabrication, False Output | Lỗi AI tự bịa ra tên thuốc hoặc liều dùng. Cần xử lý bằng khế ước dữ liệu. |
| **Stateful Architecture** | Kiến trúc có lưu trữ trạng thái | Persistent System | Hệ thống lưu trữ vĩnh viễn dữ liệu kho thuốc người dùng trên Supabase. |
| **Stateless Architecture** | Kiến trúc phi trạng thái | Reactive System | Đặc tính của các chatbot thông thường (như ChatGPT), không tự lưu trữ vòng đời thuốc. |
| **Serverless Architecture** | Điện toán máy chủ vô hình | Cloud Computing, FaaS | Triển khai Next.js trên Vercel, tự động mở rộng theo lưu lượng, không duy trì máy chủ vật lý. |
| **Transaction Pooling** | Nhóm kết nối giao dịch cơ sở dữ liệu | Connection Pooling | Xử lý đa luồng (Concurrency) khi nhiều người dùng truy vấn Supabase cùng lúc. |
| **Cron Job** | Tác vụ chạy ngầm định kỳ | Background Task | Tiến trình tự động quét cơ sở dữ liệu mỗi 24 giờ để kiểm tra ngày hết hạn thuốc. |
| **Application Programming Interface (API)** | Giao diện lập trình ứng dụng | Web Service, Endpoint | Cổng giao tiếp giữa Frontend, Backend và dịch vụ Google Gemini. |
| **Data Sanitization** | Làm sạch dữ liệu | Data Cleansing | Tiền xử lý văn bản bị lỗi định dạng từ AI trước khi đưa vào Database. |
| **Edge AI** | Trí tuệ nhân tạo tại biên | Local Inference | *(Gợi ý)* Đưa mô hình AI nhỏ xuống xử lý trực tiếp trên điện thoại để hoạt động ngoại tuyến. |
| **Neural Processing Unit (NPU)** | Khối vi xử lý thần kinh | AI Accelerator | *(Gợi ý)* Tận dụng phần cứng NPU trên thiết bị người dùng để tăng tốc xử lý Edge AI. |
| **Federated Learning** | Học liên kết / Huấn luyện phi tập trung | Decentralized Learning | *(Gợi ý)* Huấn luyện mô hình AI trên thiết bị cục bộ, chỉ gửi trọng số cập nhật lên máy chủ để bảo vệ quyền riêng tư. |
| **Internet of Medical Things (IoMT)** | Mạng lưới vạn vật kết nối y tế | Healthcare IoT | *(Gợi ý)* Kiến trúc kết nối ứng dụng với Tủ thuốc thông minh (Smart Cabinet) vật lý. |
| **Message Queuing Telemetry Transport (MQTT)** | Giao thức truyền tin đo lường hàng đợi | Pub/Sub Messaging | *(Gợi ý)* Giao thức mạng hạng nhẹ dùng để truyền dữ liệu cảm biến nhiệt độ/độ ẩm từ Tủ thuốc phần cứng lên Server. |
| **Retrieval-Augmented Generation (RAG)** | Truy xuất tăng cường sinh văn bản | Knowledge-grounded AI | *(Gợi ý)* Tích hợp tài liệu y khoa chuẩn (FDA, Dược thư) vào hệ thống để AI tra cứu trước khi đưa ra cảnh báo, giảm tỷ lệ ảo giác. |

## 2. NHÓM THUẬT NGỮ Y TẾ & SỨC KHỎE (MEDICAL & HEALTHCARE)

| Thuật ngữ Tiếng Anh | Nghĩa Tiếng Việt | Từ đồng nghĩa/Liên quan | Ngữ cảnh ứng dụng trong dự án AMA |
| :--- | :--- | :--- | :--- |
| **Medication Adherence** | Sự tuân thủ điều trị | Patient Compliance | Mục tiêu cốt lõi: Đảm bảo người dùng uống đúng thuốc, đúng giờ, đúng liều. |
| **Medication Non-adherence** | Sự không tuân thủ dùng thuốc | Medical Non-compliance | Vấn đề thị trường cần giải quyết (quên liều, tự ý ngưng thuốc). |
| **Adverse Drug Reaction (ADR)** | Phản ứng có hại của thuốc | Drug Interaction | Nguy cơ khi kết hợp sai các loại thuốc trong tủ, hệ thống cần cảnh báo (Interlock). |
| **Polypharmacy** | Sử dụng nhiều loại thuốc cùng lúc | Co-medication | Tình trạng phổ biến ở người cao tuổi, làm tăng nguy cơ ADR. |
| **Active Ingredient** | Hoạt chất chính | Active Pharmaceutical Ingredient | Trường dữ liệu `activeIngredient` dùng để quét tương tác đối kháng sinh hóa. |
| **Contraindication** | Chống chỉ định | Medical Precaution | Cảnh báo đối với các nhóm bệnh lý nền, được AI trích xuất từ bao bì. |
| **Cyberchondria** | Hội chứng lo âu do tự tra cứu bệnh trực tuyến | Internet-induced Hypochondria | Nỗi đau của người dùng khi tự chẩn đoán bệnh sai lệch qua Google Search. |
| **Triage** | Phân loại ưu tiên cấp cứu y tế | Medical Sorting | Thuật toán nhận diện tình trạng khẩn cấp để tự động đề xuất gọi 115. |
| **Dosage** | Liều lượng | Dose | Lượng thuốc tiêu chuẩn cần trừ lùi khỏi kho lưu trữ (Auto-Deduction). |
| **Expiration Date / Shelf Life** | Hạn sử dụng / Thời hạn bảo quản | Expiry | Dữ liệu gốc để thiết lập Cron Job gửi cảnh báo loại bỏ thuốc hỏng. |
| **Over-the-counter (OTC)** | Thuốc không kê đơn | Non-prescription Drug | Nhóm thuốc mục tiêu chính của dự án trong giai đoạn MVP. |
| **Prescription Drug (Rx)** | Thuốc kê đơn | Prescribed Medication | Thuốc yêu cầu chỉ định từ bác sĩ, hệ thống cảnh báo thận trọng. |
| **First In, First Out (FIFO)** | Nhập trước, xuất trước | Inventory Management | *(Gợi ý)* Thuật toán ưu tiên gợi ý người dùng uống các vỉ thuốc có hạn sử dụng ngắn nhất trước. |
| **Electronic Health Record (EHR)** | Bệnh án điện tử | EMR | *(Gợi ý)* Định hướng xuất dữ liệu tủ thuốc cá nhân thành tệp PDF chuẩn để đồng bộ với hồ sơ bệnh án tại bệnh viện. |

## 3. NHÓM THUẬT NGỮ KHỞI NGHIỆP & KINH DOANH (STARTUP & BUSINESS)

| Thuật ngữ Tiếng Anh | Nghĩa Tiếng Việt | Từ đồng nghĩa/Liên quan | Ngữ cảnh ứng dụng trong dự án AMA |
| :--- | :--- | :--- | :--- |
| **Minimum Viable Product (MVP)** | Sản phẩm khả thi tối thiểu | Early Prototype | Trạng thái hiện tại của nền tảng, tập trung vào tính năng OCR và quản lý tủ thuốc. |
| **Product-Market Fit (PMF)** | Sự phù hợp sản phẩm - thị trường | Market Demand Alignment | Chứng minh sản phẩm giải quyết đúng "nỗi đau" của khách hàng thông qua số liệu Beta. |
| **Traction** | Sức kéo thị trường / Số liệu thực tế | Market Adoption | Các chỉ số thực tế thu được từ đợt thử nghiệm Closed Beta (tỷ lệ OCR đúng, số lượng người dùng). |
| **Freemium Model** | Mô hình cơ bản miễn phí, thu phí cao cấp | Tiered Pricing | Luồng doanh thu B2C: Cung cấp bản miễn phí giới hạn OCR, thu phí đối với bản nâng cao. |
| **Value Proposition** | Đề xuất giá trị cốt lõi | Unique Selling Point (USP) | Khẳng định hệ thống là "người quản lý chủ động", không phải "bách khoa toàn thư bị động". |
| **Scalability** | Khả năng mở rộng quy mô | Growth Potential | Năng lực của kiến trúc Cloud cho phép phục vụ 100,000 người dùng mà không sập hệ thống. |
| **Role-Based Access Control (RBAC)** | Kiểm soát truy cập theo vai trò phân quyền | Authorization | Tính năng Premium: Chia quyền Admin và Dependent để quản lý tủ thuốc toàn gia đình. |
| **Gamification** | Trò chơi hóa hệ thống | Reward System | Thiết kế cơ chế AMA Points (Điểm thưởng) để khuyến khích tuân thủ uống thuốc. |
| **Due Diligence** | Thẩm định chuyên sâu (bởi hội đồng) | Technical Audit | Sự kiểm chứng khắt khe của giám khảo về tính xác thực của dữ liệu kỹ thuật. |
| **Closed Beta** | Thử nghiệm diện hẹp | Private Testing | Giai đoạn kiểm thử hệ thống với tập mẫu 10-20 người dùng trước khi thuyết trình. |
| **Telemetry Data** | Dữ liệu viễn vọng | Usage Analytics | Số liệu đo lường tần suất sử dụng, tỷ lệ uống thuốc đúng giờ được tự động ghi nhận trên server. |
| **Anonymized Data** | Dữ liệu đã ẩn danh hóa | Privacy-preserved Data | Dữ liệu y tế đã bị xóa định danh cá nhân trước khi phân tích thương mại. |
| **Total Addressable Market (TAM)** | Tổng quy mô thị trường khả dụng | Total Available Market | Chỉ số ước tính quy mô toàn bộ thị trường chăm sóc sức khỏe số (Digital Health). |
| **Customer Acquisition Cost (CAC)** | Chi phí thu hút một khách hàng | Marketing Cost | Tối ưu hóa chi phí bằng cách phân phối ứng dụng qua đối tác B2B. |
| **Software as a Service (SaaS)** | Phần mềm dạng dịch vụ | Cloud Application | *(Gợi ý)* Mô hình triển khai hệ thống quản trị dữ liệu y tế đóng gói bán cho các phòng khám nhỏ. |
| **Pitch Deck** | Bản trình bày dự án khởi nghiệp | Startup Presentation | Cấu trúc slide 12 trang dùng cho vòng Bán kết. |
