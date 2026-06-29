# interview-question-008 (Backend API)

ระบบจัดการข้อสอบสำหรับ example.com — ASP.NET Core Web API (.NET 10)

## ความต้องการ

- [.NET 10 SDK](https://dotnet.microsoft.com/download)

## การรันโปรเจกต์

```bash
cd Example.Com.ExamManagement.Api
dotnet run
```

API จะทำงานที่ `http://localhost:5172` (หรือตาม `launchSettings.json`)

Swagger UI: `http://localhost:5172/swagger`

## โครงสร้างฐานข้อมูล

ใช้ **Microsoft SQL Server** ผ่าน Entity Framework Core

**Connection String** (ตั้งค่าใน `appsettings.json`):
```
Server=localhost;Database=Thaibev_interview_no8;User Id=sa;Password=***;TrustServerCertificate=True;
```

| คอลัมน์ | ประเภท | คำอธิบาย |
|--------|--------|----------|
| Id | int (PK) | รหัสอ้างอิงภายใน |
| Number | int (Unique) | ลำดับข้อสอบที่แสดง (Running Number) |
| Question | string | คำถาม |
| OptionA–D | string? | ตัวเลือก |
| CorrectAnswer | string? | เฉลย (A/B/C/D) |
| CreatedAt | datetime | วันที่สร้าง |

## API Endpoints

| Method | Endpoint | หน้าจอ | คำอธิบาย |
|--------|----------|--------|----------|
| GET | `/api/exams` | IT 08-1 | แสดงรายการข้อสอบทั้งหมด (เรียงตาม Number) |
| GET | `/api/exams/{id}` | — | ดึงข้อสอบรายการเดียว |
| POST | `/api/exams` | IT 08-2 | เพิ่มข้อสอบใหม่ (กำหนด Number อัตโนมัติ) |
| DELETE | `/api/exams/{id}` | IT 08-1 | ลบข้อสอบและจัด Running Number ใหม่ |

### ตัวอย่าง Request — เพิ่มข้อสอบ

```json
POST /api/exams
{
  "question": "1 + 1 เท่ากับเท่าไร?",
  "optionA": "1",
  "optionB": "2",
  "optionC": "3",
  "optionD": "4",
  "correctAnswer": "B"
}
```

### Running Number หลังลบ

หากมีข้อสอบข้อ 1, 2, 3 แล้วลบข้อ 2 — ข้อสอบเดิมข้อ 3 จะถูกเปลี่ยนเป็น ข้อ 2

## โครงสร้างโปรเจกต์

```
Example.Com.ExamManagement.Api/
├── Controllers/   # API endpoints
├── Data/          # DbContext
├── Dtos/          # Request/Response models
├── Entities/      # Database entities
└── Services/      # Business logic
```

## ทดสอบด้วย .http file

เปิดไฟล์ `Example.Com.ExamManagement.Api.http` ใน Visual Studio / Rider / VS Code (REST Client)
