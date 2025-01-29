# Student Dashboard - Django  
A student dashboard application where teachers can enter grades and view reports for multiple students.  

## Features  
✅ User authentication (Login/Signup)  
✅ Admin panel to manage students and grades  
✅ Export grades to Excel, Word, and PDF  
✅ View detailed reports for each student  

## Screenshots  
### 🛍️ Dashboard Page  
![Home Page](screenshots/home.jpg)  

### 🔒 Login Page  
![Login Page](screenshots/login.jpg)  

### 🗃️ PDF Export Test  
![Export Test](screenshots/pdf.jpg) 

### 🔹 Installation  
1. Clone the repository
2. Install dependencies: pip install -r requirements.txt
3. Run migrations: python manage.py makemigrations & python manage.py migrate
4. Start the server: python manage.py runserver


## 📌 Tech Stack  
- Django    
- openpyxl (for Excel export)  
- reportlab (for PDF export)
- docx (for Word export)  
