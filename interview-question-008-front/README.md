# interview-question-008 (Frontend)

ระบบจัดการข้อสอบสำหรับ example.com — Angular + Angular Material

## ความต้องการ

- Node.js 20+
- Angular CLI 21+
- Backend API รันที่ `http://localhost:5172`

## การรันโปรเจกต์

```bash
npm install
npm start
```

เปิดเบราว์เซอร์ที่ `http://localhost:4200`

## หน้าจอ

| Route | หน้าจอ | คำอธิบาย |
|-------|--------|----------|
| `/` | IT 08-1 | แสดงรายการข้อสอบ, ปุ่มเพิ่ม/ลบ |
| `/add` | IT 08-2 | ฟอร์มเพิ่มข้อสอบ, บันทึก/ยกเลิก |

## API

เชื่อมต่อกับ Backend ที่ `src/environments/environment.ts`:

```
http://localhost:5172/api/exams
```

## โครงสร้าง

```
src/app/
├── models/          # TypeScript interfaces
├── services/        # ExamService (HTTP)
└── pages/
    ├── exam-list/   # IT 08-1
    └── exam-form/   # IT 08-2
```
