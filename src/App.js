import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import ClinicLayout from './layouts/ClinicLayout';
import PatientLayout from './layouts/PatientLayout';

// Public Pages
import HomePage from './pages/public/HomePage';
import AboutPage from './pages/public/AboutPage';
import ServicesPage from './pages/public/ServicesPage';
import MentalHealthGuide from './pages/public/MentalHealthGuide';
import ContactPage from './pages/public/ContactPage';
import FAQPage from './pages/public/FAQPage';
import PrivacyPage from './pages/public/PrivacyPage';
import TermsPage from './pages/public/TermsPage';
import EmergencySupport from './pages/public/EmergencySupport';

// Public Self-Help Tools
import SelfAssessmentHub from './pages/public/self-help/SelfAssessmentHub';
import DepressionScreening from './pages/public/self-help/DepressionScreening';
import AnxietyAssessment from './pages/public/self-help/AnxietyAssessment';
import StressCheck from './pages/public/self-help/StressCheck';
import SleepAssessment from './pages/public/self-help/SleepAssessment';
import ADHDScreening from './pages/public/self-help/ADHDScreening';
import SubstanceScreening from './pages/public/self-help/SubstanceScreening';
import MoodTracker from './pages/public/self-help/MoodTracker';
import CrisisSupport from './pages/public/self-help/CrisisSupport';
import MindfulnessHub from './pages/public/self-help/MindfulnessHub';
import CBTWorksheets from './pages/public/self-help/CBTWorksheets';
import StressManagement from './pages/public/self-help/StressManagement';
import ResourceLibrary from './pages/public/self-help/ResourceLibrary';

// Public Appointment Booking
import FindProvider from './pages/public/booking/FindProvider';
import ProviderProfile from './pages/public/booking/ProviderProfile';
import BookAppointment from './pages/public/booking/BookAppointment';
import QuickBooking from './pages/public/booking/QuickBooking';

// Auth Pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import VerifyEmailPage from './pages/auth/VerifyEmailPage';
import TwoFactorAuth from './pages/auth/TwoFactorAuth';

// Super Admin Portal
import SuperAdminDashboard from './pages/admin/Dashboard';
import ClinicManagement from './pages/admin/clinics/ClinicManagement';
import ClinicDetails from './pages/admin/clinics/ClinicDetails';
import SystemConfiguration from './pages/admin/system/SystemConfiguration';
import GlobalReports from './pages/admin/reports/GlobalReports';
import LicenseManagement from './pages/admin/billing/LicenseManagement';
import PlatformAnalytics from './pages/admin/analytics/PlatformAnalytics';
import APIConfiguration from './pages/admin/settings/APIConfiguration';
import ComplianceManagement from './pages/admin/compliance/ComplianceManagement';
import SystemAuditLogs from './pages/admin/settings/AuditLogs';

// Clinic Admin Portal
import ClinicDashboard from './pages/clinic/Dashboard';
import StaffManagement from './pages/clinic/staff/StaffManagement';
import StaffDetails from './pages/clinic/staff/StaffDetails';
import RolePermissions from './pages/clinic/staff/RolePermissions';
import DepartmentManagement from './pages/clinic/settings/DepartmentManagement';
import ServiceConfiguration from './pages/clinic/settings/ServiceConfiguration';
import WorkingHours from './pages/clinic/settings/WorkingHours';
import ResourceAllocation from './pages/clinic/resources/ResourceAllocation';
import ClinicReports from './pages/clinic/reports/ClinicReports';
import QualityMetrics from './pages/clinic/quality/QualityMetrics';

// Clinical Staff Portal (Psychiatrist, Psychologist, Social Worker)
import ClinicalDashboard from './pages/clinical/Dashboard';
import PatientQueue from './pages/clinical/queue/PatientQueue';
import TriageSystem from './pages/clinical/queue/TriageSystem';
import PatientRegistration from './pages/clinical/patients/PatientRegistration';
import PatientRecords from './pages/clinical/patients/PatientRecords';
import PatientDetails from './pages/clinical/patients/PatientDetails';
import ClinicalAssessment from './pages/clinical/assessment/ClinicalAssessment';
import MentalStatusExam from './pages/clinical/assessment/MentalStatusExam';
import PsychologicalAssessments from './pages/clinical/assessment/PsychologicalAssessments';
import RiskAssessment from './pages/clinical/assessment/RiskAssessment';
import TreatmentPlanning from './pages/clinical/treatment/TreatmentPlanning';
import Prescriptions from './pages/clinical/treatment/Prescriptions';
import LabOrders from './pages/clinical/treatment/LabOrders';
import TherapySessions from './pages/clinical/therapy/TherapySessions';
import GroupTherapy from './pages/clinical/therapy/GroupTherapy';
import SessionNotes from './pages/clinical/therapy/SessionNotes';
import ProviderCalendar from './pages/clinical/calendar/ProviderCalendar';
import AppointmentManagement from './pages/clinical/calendar/AppointmentManagement';
import ClinicalReports from './pages/clinical/reports/ClinicalReports';
import ProgressTracking from './pages/clinical/reports/ProgressTracking';

// Support Staff Portal (Receptionist, Nursing, Billing)
import SupportDashboard from './pages/support/Dashboard';
import AppointmentDesk from './pages/support/appointments/AppointmentDesk';
import TokenManagement from './pages/support/queue/TokenManagement';
import VitalsEntry from './pages/support/nursing/VitalsEntry';
import BillingDesk from './pages/support/billing/BillingDesk';
import InvoiceGeneration from './pages/support/billing/InvoiceGeneration';
import PaymentProcessing from './pages/support/billing/PaymentProcessing';
import InsuranceClaims from './pages/support/billing/InsuranceClaims';

// Patient Portal
import PatientDashboard from './pages/patient/Dashboard';
import MyAppointments from './pages/patient/appointments/MyAppointments';
import BookNewAppointment from './pages/patient/appointments/BookNewAppointment';
import VideoConsultation from './pages/patient/appointments/VideoConsultation';
import MyRecords from './pages/patient/records/MyRecords';
import TestResults from './pages/patient/records/TestResults';
import PatientPrescriptions from './pages/patient/records/Prescriptions';
import MoodDiary from './pages/patient/tracking/MoodDiary';
import SymptomTracker from './pages/patient/tracking/SymptomTracker';
import MedicationReminders from './pages/patient/tracking/MedicationReminders';
import HomeworkAssignments from './pages/patient/therapy/HomeworkAssignments';
import TherapyResources from './pages/patient/therapy/TherapyResources';
import ProgressReports from './pages/patient/reports/ProgressReports';
import BillingHistory from './pages/patient/billing/BillingHistory';
import PaymentPortal from './pages/patient/billing/PaymentPortal';
import PatientProfile from './pages/patient/profile/PatientProfile';
import EmergencyContacts from './pages/patient/profile/EmergencyContacts';
import PatientSettings from './pages/patient/settings/PatientSettings';

// Communication Hub
import SecureMessaging from './pages/communication/SecureMessaging';
import VideoCall from './pages/communication/VideoCall';
import Notifications from './pages/communication/Notifications';

// Analytics & Reports (Shared)
import AnalyticsDashboard from './pages/analytics/Dashboard';
import ClinicalAnalytics from './pages/analytics/ClinicalAnalytics';
import OperationalAnalytics from './pages/analytics/OperationalAnalytics';
import FinancialAnalytics from './pages/analytics/FinancialAnalytics';

// Error Pages
import NotFoundPage from './pages/errors/NotFoundPage';
import UnauthorizedPage from './pages/errors/UnauthorizedPage';
import ServerErrorPage from './pages/errors/ServerErrorPage';
import MaintenancePage from './pages/errors/MaintenancePage';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white mx-auto mb-4">
            <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <p className="text-gray-600">Loading Parivarthan...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="mental-health-guide" element={<MentalHealthGuide />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="emergency" element={<EmergencySupport />} />
        
        {/* Self-Help Tools */}
        <Route path="self-help">
          <Route index element={<SelfAssessmentHub />} />
          <Route path="depression-screening" element={<DepressionScreening />} />
          <Route path="anxiety-assessment" element={<AnxietyAssessment />} />
          <Route path="stress-check" element={<StressCheck />} />
          <Route path="sleep-assessment" element={<SleepAssessment />} />
          <Route path="adhd-screening" element={<ADHDScreening />} />
          <Route path="substance-screening" element={<SubstanceScreening />} />
          <Route path="mood-tracker" element={<MoodTracker />} />
          <Route path="crisis-support" element={<CrisisSupport />} />
          <Route path="mindfulness" element={<MindfulnessHub />} />
          <Route path="cbt-worksheets" element={<CBTWorksheets />} />
          <Route path="stress-management" element={<StressManagement />} />
          <Route path="resources" element={<ResourceLibrary />} />
        </Route>
        
        {/* Appointment Booking */}
        <Route path="booking">
          <Route path="find-provider" element={<FindProvider />} />
          <Route path="provider/:providerId" element={<ProviderProfile />} />
          <Route path="book-appointment" element={<BookAppointment />} />
          <Route path="quick-booking" element={<QuickBooking />} />
        </Route>
        
        {/* Legal */}
        <Route path="privacy" element={<PrivacyPage />} />
        <Route path="terms" element={<TermsPage />} />
      </Route>

      {/* Authentication Routes */}
      <Route path="/auth">
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="verify-email/:token" element={<VerifyEmailPage />} />
        <Route path="two-factor" element={<TwoFactorAuth />} />
      </Route>

      {/* Super Admin Portal Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute requiredRole="super_admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SuperAdminDashboard />} />
        <Route path="clinics">
          <Route index element={<ClinicManagement />} />
          <Route path=":clinicId" element={<ClinicDetails />} />
        </Route>
        <Route path="system" element={<SystemConfiguration />} />
        <Route path="reports" element={<GlobalReports />} />
        <Route path="licenses" element={<LicenseManagement />} />
        <Route path="analytics" element={<PlatformAnalytics />} />
        <Route path="api-config" element={<APIConfiguration />} />
        <Route path="compliance" element={<ComplianceManagement />} />
        <Route path="audit-logs" element={<SystemAuditLogs />} />
      </Route>

      {/* Clinic Admin Portal Routes */}
      <Route
        path="/clinic-admin/*"
        element={
          <ProtectedRoute requiredRole="clinic_admin">
            <ClinicLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ClinicDashboard />} />
        <Route path="staff">
          <Route index element={<StaffManagement />} />
          <Route path=":staffId" element={<StaffDetails />} />
          <Route path="roles" element={<RolePermissions />} />
        </Route>
        <Route path="departments" element={<DepartmentManagement />} />
        <Route path="services" element={<ServiceConfiguration />} />
        <Route path="working-hours" element={<WorkingHours />} />
        <Route path="resources" element={<ResourceAllocation />} />
        <Route path="reports" element={<ClinicReports />} />
        <Route path="quality" element={<QualityMetrics />} />
      </Route>

      {/* Clinical Staff Portal Routes */}
      <Route
        path="/clinical/*"
        element={
          <ProtectedRoute requiredRole={['psychiatrist', 'psychologist', 'social_worker']}>
            <ClinicLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<ClinicalDashboard />} />
        <Route path="queue">
          <Route index element={<PatientQueue />} />
          <Route path="triage" element={<TriageSystem />} />
        </Route>
        <Route path="patients">
          <Route index element={<PatientRecords />} />
          <Route path="register" element={<PatientRegistration />} />
          <Route path=":patientId" element={<PatientDetails />} />
        </Route>
        <Route path="assessment">
          <Route path="clinical" element={<ClinicalAssessment />} />
          <Route path="mse" element={<MentalStatusExam />} />
          <Route path="psychological" element={<PsychologicalAssessments />} />
          <Route path="risk" element={<RiskAssessment />} />
        </Route>
        <Route path="treatment">
          <Route path="planning" element={<TreatmentPlanning />} />
          <Route path="prescriptions" element={<Prescriptions />} />
          <Route path="lab-orders" element={<LabOrders />} />
        </Route>
        <Route path="therapy">
          <Route path="sessions" element={<TherapySessions />} />
          <Route path="group" element={<GroupTherapy />} />
          <Route path="notes" element={<SessionNotes />} />
        </Route>
        <Route path="calendar">
          <Route index element={<ProviderCalendar />} />
          <Route path="appointments" element={<AppointmentManagement />} />
        </Route>
        <Route path="reports">
          <Route index element={<ClinicalReports />} />
          <Route path="progress" element={<ProgressTracking />} />
        </Route>
      </Route>

      {/* Support Staff Portal Routes */}
      <Route
        path="/support/*"
        element={
          <ProtectedRoute requiredRole={['receptionist', 'nursing_staff', 'billing_staff']}>
            <ClinicLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<SupportDashboard />} />
        <Route path="appointments" element={<AppointmentDesk />} />
        <Route path="tokens" element={<TokenManagement />} />
        <Route path="vitals" element={<VitalsEntry />} />
        <Route path="billing">
          <Route index element={<BillingDesk />} />
          <Route path="invoices" element={<InvoiceGeneration />} />
          <Route path="payments" element={<PaymentProcessing />} />
          <Route path="insurance" element={<InsuranceClaims />} />
        </Route>
      </Route>

      {/* Patient Portal Routes */}
      <Route
        path="/patient/*"
        element={
          <ProtectedRoute requiredRole="patient">
            <PatientLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<PatientDashboard />} />
        <Route path="appointments">
          <Route index element={<MyAppointments />} />
          <Route path="book" element={<BookNewAppointment />} />
          <Route path="video/:appointmentId" element={<VideoConsultation />} />
        </Route>
        <Route path="records">
          <Route index element={<MyRecords />} />
          <Route path="test-results" element={<TestResults />} />
          <Route path="prescriptions" element={<PatientPrescriptions />} />
        </Route>
        <Route path="tracking">
          <Route path="mood" element={<MoodDiary />} />
          <Route path="symptoms" element={<SymptomTracker />} />
          <Route path="medications" element={<MedicationReminders />} />
        </Route>
        <Route path="therapy">
          <Route path="homework" element={<HomeworkAssignments />} />
          <Route path="resources" element={<TherapyResources />} />
        </Route>
        <Route path="reports" element={<ProgressReports />} />
        <Route path="billing">
          <Route path="history" element={<BillingHistory />} />
          <Route path="payment" element={<PaymentPortal />} />
        </Route>
        <Route path="profile">
          <Route index element={<PatientProfile />} />
          <Route path="emergency-contacts" element={<EmergencyContacts />} />
          <Route path="settings" element={<PatientSettings />} />
        </Route>
      </Route>

      {/* Communication Routes */}
      <Route
        path="/communication/*"
        element={
          <ProtectedRoute>
            <ClinicLayout />
          </ProtectedRoute>
        }
      >
        <Route path="messages" element={<SecureMessaging />} />
        <Route path="video-call/:sessionId" element={<VideoCall />} />
        <Route path="notifications" element={<Notifications />} />
      </Route>

      {/* Analytics Routes */}
      <Route
        path="/analytics/*"
        element={
          <ProtectedRoute requiredRole={['super_admin', 'clinic_admin', 'psychiatrist', 'psychologist']}>
            <ClinicLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AnalyticsDashboard />} />
        <Route path="clinical" element={<ClinicalAnalytics />} />
        <Route path="operational" element={<OperationalAnalytics />} />
        <Route path="financial" element={<FinancialAnalytics />} />
      </Route>

      {/* Error Pages */}
      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/error" element={<ServerErrorPage />} />
      <Route path="/maintenance" element={<MaintenancePage />} />
      <Route path="*" element={<NotFoundPage />} />

      {/* Role-based default redirects */}
      {user && (
        <Route
          path="/"
          element={
            <Navigate 
              to={
                user.role === 'super_admin' ? '/admin' :
                user.role === 'clinic_admin' ? '/clinic-admin' :
                ['psychiatrist', 'psychologist', 'social_worker'].includes(user.role) ? '/clinical' :
                ['receptionist', 'nursing_staff', 'billing_staff'].includes(user.role) ? '/support' :
                user.role === 'patient' ? '/patient' :
                '/'
              } 
              replace 
            />
          }
        />
      )}
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
