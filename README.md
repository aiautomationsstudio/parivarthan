# Parivarthan - Mental Health SaaS Platform

A comprehensive mental health care platform built with React.js, providing tools for patients, healthcare providers, and administrators.

## 🚀 Features

- **Multi-Role System**: Support for 9 different user roles with specific dashboards
- **Public Portal**: Self-help tools, provider search, appointment booking
- **Patient Portal**: Medical records, appointment management, progress tracking
- **Clinical Portal**: Patient management, assessments, treatment planning
- **Admin Portal**: Platform management, analytics, compliance
- **Telehealth**: Video consultations and secure messaging
- **Self-Help Tools**: Mental health assessments, mood tracking, resources

## 📋 Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)
- Modern web browser

## 🛠️ Installation

1. **Clone or Download the Repository**
   ```bash
   cd parivarthan-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm start
   ```

4. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 👥 Demo Accounts

### Administration Roles

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| **Super Admin** | admin@parivarthan.com | admin123 | Full platform access, manage all clinics |
| **Clinic Admin** | clinic@parivarthan.com | clinic123 | Manage clinic operations, staff, services |

### Clinical Staff Roles

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| **Psychiatrist** | psychiatrist@parivarthan.com | psych123 | Medical evaluation, prescriptions, treatment |
| **Psychologist** | psychologist@parivarthan.com | psycho123 | Therapy, assessments, counseling |
| **Social Worker** | socialworker@parivarthan.com | social123 | Case management, resources, support |

### Support Staff Roles

| Role | Email | Password | Description |
|------|-------|----------|-------------|
| **Receptionist** | receptionist@parivarthan.com | recep123 | Appointments, registration, queue |
| **Nursing Staff** | nurse@parivarthan.com | nurse123 | Vitals, patient prep, support |
| **Billing Staff** | billing@parivarthan.com | billing123 | Invoices, payments, insurance |

### Patient Accounts

| Name | Email | Password | Description |
|------|-------|----------|-------------|
| **Arjun Reddy** | patient1@gmail.com | patient123 | Sample patient account |
| **Sneha Iyer** | patient2@gmail.com | patient123 | Sample patient account |

## 🗺️ Application Structure

### Public Pages (No Login Required)
- **Homepage** - `/`
- **About Us** - `/about`
- **Services** - `/services`
- **Self-Help Tools** - `/self-help`
- **Find Provider** - `/booking/find-provider`
- **Mental Health Guide** - `/mental-health-guide`
- **Contact** - `/contact`
- **FAQ** - `/faq`
- **Emergency Support** - `/emergency`

### Portal Navigation

#### Super Admin Portal (`/admin`)
- Dashboard
- Clinic Management
- System Configuration
- Global Reports
- License Management
- Platform Analytics
- API Configuration
- Compliance Management
- Audit Logs

#### Clinic Admin Portal (`/clinic-admin`)
- Dashboard
- Staff Management
- Department Management
- Service Configuration
- Working Hours
- Resource Allocation
- Reports
- Quality Metrics

#### Clinical Staff Portal (`/clinical`)
- Dashboard
- Patient Queue & Triage
- Patient Management
- Clinical Assessments
- Treatment Planning
- Prescriptions
- Therapy Sessions
- Calendar
- Reports

#### Support Staff Portal (`/support`)
- Dashboard
- Appointment Desk
- Token Management
- Vitals Entry (Nursing)
- Billing Desk (Billing Staff)
- Invoice Generation
- Payment Processing
- Insurance Claims

#### Patient Portal (`/patient`)
- Dashboard
- My Appointments
- Medical Records
- Test Results
- Prescriptions
- Mood Diary
- Symptom Tracker
- Medication Reminders
- Therapy Resources
- Progress Reports
- Billing History

## 🏗️ Project Structure

```
parivarthan-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── auth/
│   │   ├── common/
│   │   └── navigation/
│   ├── contexts/
│   │   └── AuthContext.js
│   ├── layouts/
│   │   ├── PublicLayout.js
│   │   ├── AdminLayout.js
│   │   ├── ClinicLayout.js
│   │   └── PatientLayout.js
│   ├── pages/
│   │   ├── public/
│   │   ├── auth/
│   │   ├── admin/
│   │   ├── clinic/
│   │   ├── clinical/
│   │   ├── support/
│   │   ├── patient/
│   │   ├── communication/
│   │   ├── analytics/
│   │   └── errors/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── tailwind.config.js
├── package.json
└── README.md
```

## 🎨 Design System

### Color Palette

- **Primary**: Serene Blue (#0ea5e9)
- **Secondary**: Growth Green (#22c55e)
- **Accent**: Calm Purple (#a855f7)
- **Neutral**: Mindful Gray shades

### Typography

- **Sans-serif**: Inter (UI elements, body text)
- **Serif**: Merriweather (headings, emphasis)

## 🔐 Security Features

- Role-based access control (RBAC)
- Protected routes
- Secure authentication
- Session management
- Data encryption (in production)

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (below 768px)

## 🧪 Testing the Application

1. **Public Pages**: Browse without login
2. **Patient Registration**: Register new account via "Register" button
3. **Role-Based Login**: Use demo credentials to test different portals
4. **Navigation**: Each role has specific sidebar navigation
5. **Logout**: Available from user dropdown menu

## 🔧 Configuration

### Environment Variables (Create `.env` file in root)

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_WEBSOCKET_URL=ws://localhost:3001
REACT_APP_UPLOAD_URL=http://localhost:3001/uploads
```

## 📚 Key Features by Role

### For Patients
- Online appointment booking
- Video consultations
- Medical record access
- Mood and symptom tracking
- Medication reminders
- Progress reports
- Self-help resources

### For Clinicians
- Patient queue management
- Clinical assessments (PHQ-9, GAD-7, etc.)
- Treatment planning
- E-prescriptions
- Session notes
- Progress tracking
- Integrated calendar

### For Administrators
- Multi-clinic management
- Staff and role management
- Service configuration
- Analytics and reports
- Compliance management
- System configuration

## 🛠️ Development

### Available Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Adding New Features

1. Create component in appropriate directory
2. Add route in `App.js`
3. Update navigation in sidebar components
4. Add to AuthContext if role-specific

## 🐛 Troubleshooting

### Common Issues

1. **Port 3000 already in use**
   ```bash
   PORT=3001 npm start
   ```

2. **Node modules issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Tailwind CSS not working**
   - Ensure `tailwind.config.js` is properly configured
   - Check `index.css` imports Tailwind directives

## 📄 License

This project is created for demonstration purposes.

## 🤝 Support

For issues or questions:
- Check the FAQ section
- Contact support@parivarthan.com
- Emergency: 1800-599-0019 (Crisis Helpline)

## 🚀 Deployment

### Production Build

```bash
npm run build
```

This creates an optimized production build in the `build/` directory.

### Deployment Options

- **Netlify**: Drag and drop `build` folder
- **Vercel**: Connect GitHub repo
- **AWS S3**: Static website hosting
- **Docker**: Use provided Dockerfile

## 📝 Notes

- This is a demo application with mock authentication
- Real implementation would require backend API
- Database integration needed for production
- Additional security measures required for healthcare compliance

---

**Made with ❤️ for Mental Health Awareness**

*Parivarthan - Transforming Mental Healthcare*
