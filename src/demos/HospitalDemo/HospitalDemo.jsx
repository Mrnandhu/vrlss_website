import { useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  CreditCard,
  FileText,
  HeartPulse,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Plus,
  Search,
  Settings,
  Stethoscope,
  Users,
  X,
} from 'lucide-react'

import './HospitalDemo.css'

const patients = [
  {
    id: 'PT-001',
    name: 'Aarav Mehta',
    age: 34,
    gender: 'Male',
    department: 'Cardiology',
    doctor: 'Dr. Ananya Rao',
    status: 'Active',
    condition: 'Routine follow-up',
    blood: 'O+',
    phone: 'Demo contact',
    lastVisit: 'Today',
    nextVisit: '24 Sep',
  },
  {
    id: 'PT-002',
    name: 'Meera Sharma',
    age: 47,
    gender: 'Female',
    department: 'General Medicine',
    doctor: 'Dr. Rohan Kumar',
    status: 'Waiting',
    condition: 'General consultation',
    blood: 'B+',
    phone: 'Demo contact',
    lastVisit: 'Today',
    nextVisit: '—',
  },
  {
    id: 'PT-003',
    name: 'Kabir Nair',
    age: 28,
    gender: 'Male',
    department: 'Orthopedics',
    doctor: 'Dr. Vikram Singh',
    status: 'Active',
    condition: 'Knee assessment',
    blood: 'A+',
    phone: 'Demo contact',
    lastVisit: '18 Sep',
    nextVisit: '28 Sep',
  },
  {
    id: 'PT-004',
    name: 'Ishita Rao',
    age: 61,
    gender: 'Female',
    department: 'Neurology',
    doctor: 'Dr. Priya Menon',
    status: 'Discharged',
    condition: 'Follow-up review',
    blood: 'AB+',
    phone: 'Demo contact',
    lastVisit: '17 Sep',
    nextVisit: '02 Oct',
  },
  {
    id: 'PT-005',
    name: 'Arjun Verma',
    age: 39,
    gender: 'Male',
    department: 'Dermatology',
    doctor: 'Dr. Neha Kapoor',
    status: 'Active',
    condition: 'Skin consultation',
    blood: 'O-',
    phone: 'Demo contact',
    lastVisit: '16 Sep',
    nextVisit: '30 Sep',
  },
  {
    id: 'PT-006',
    name: 'Diya Patel',
    age: 25,
    gender: 'Female',
    department: 'Pediatrics',
    doctor: 'Dr. Ananya Rao',
    status: 'Waiting',
    condition: 'Routine consultation',
    blood: 'A-',
    phone: 'Demo contact',
    lastVisit: 'Today',
    nextVisit: '—',
  },
]

const appointments = [
  {
    id: 'APT-101',
    time: '09:30',
    period: 'AM',
    patient: 'Aarav Mehta',
    doctor: 'Dr. Ananya Rao',
    department: 'Cardiology',
    status: 'Confirmed',
  },
  {
    id: 'APT-102',
    time: '10:15',
    period: 'AM',
    patient: 'Meera Sharma',
    doctor: 'Dr. Rohan Kumar',
    department: 'General Medicine',
    status: 'Waiting',
  },
  {
    id: 'APT-103',
    time: '11:00',
    period: 'AM',
    patient: 'Kabir Nair',
    doctor: 'Dr. Vikram Singh',
    department: 'Orthopedics',
    status: 'Confirmed',
  },
  {
    id: 'APT-104',
    time: '12:30',
    period: 'PM',
    patient: 'Ishita Rao',
    doctor: 'Dr. Priya Menon',
    department: 'Neurology',
    status: 'Completed',
  },
  {
    id: 'APT-105',
    time: '02:00',
    period: 'PM',
    patient: 'Arjun Verma',
    doctor: 'Dr. Neha Kapoor',
    department: 'Dermatology',
    status: 'Confirmed',
  },
]

const doctors = [
  {
    name: 'Dr. Ananya Rao',
    department: 'Cardiology',
    availability: 'Available',
    appointments: 8,
    initials: 'AR',
  },
  {
    name: 'Dr. Rohan Kumar',
    department: 'General Medicine',
    availability: 'In consultation',
    appointments: 11,
    initials: 'RK',
  },
  {
    name: 'Dr. Vikram Singh',
    department: 'Orthopedics',
    availability: 'Available',
    appointments: 7,
    initials: 'VS',
  },
  {
    name: 'Dr. Priya Menon',
    department: 'Neurology',
    availability: 'Available',
    appointments: 6,
    initials: 'PM',
  },
  {
    name: 'Dr. Neha Kapoor',
    department: 'Dermatology',
    availability: 'Away',
    appointments: 5,
    initials: 'NK',
  },
]

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'patients', label: 'Patients', icon: Users },
  { id: 'appointments', label: 'Appointments', icon: CalendarDays },
  { id: 'doctors', label: 'Doctors', icon: Stethoscope },
  { id: 'billing', label: 'Billing', icon: CreditCard },
]

const formatMoney = (value) =>
  `₹${Math.round(value).toLocaleString('en-IN')}`

function HospitalDemo() {
  const [page, setPage] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [patientStatus, setPatientStatus] = useState('All')
  const [selectedPatient, setSelectedPatient] = useState(null)
  const [showAppointmentForm, setShowAppointmentForm] =
    useState(false)
  const [appointmentCreated, setAppointmentCreated] =
    useState(false)
  const [showNotifications, setShowNotifications] =
    useState(false)

  const filteredPatients = useMemo(() => {
    return patients.filter((patient) => {
      const matchesStatus =
        patientStatus === 'All' ||
        patient.status === patientStatus

      const matchesQuery =
        !query.trim() ||
        `${patient.name} ${patient.id} ${patient.department}`
          .toLowerCase()
          .includes(query.toLowerCase())

      return matchesStatus && matchesQuery
    })
  }, [patientStatus, query])

  const navigate = (nextPage) => {
    setPage(nextPage)
    setSidebarOpen(false)
    setSelectedPatient(null)
    setShowAppointmentForm(false)
    setShowNotifications(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="hospital-demo">
      <a href="/" className="hospital-back-home">
        <ArrowLeft size={14} />
        Back to Home
      </a>

      <aside
        className={`hospital-sidebar ${
          sidebarOpen ? 'hospital-sidebar-open' : ''
        }`}
      >
        <div className="hospital-brand">
          <div className="hospital-brand-mark">
            <HeartPulse size={20} />
          </div>
          <div>
            <strong>MEDORA</strong>
            <small>CARE MANAGEMENT</small>
          </div>
        </div>

        <div className="hospital-demo-label">
          VRLS DEMO / CONCEPT
        </div>

        <nav>
          <span className="hospital-nav-label">
            WORKSPACE
          </span>

          {navItems.map((item) => {
            const Icon = item.icon

            return (
              <button
                type="button"
                key={item.id}
                className={
                  page === item.id
                    ? 'hospital-nav-active'
                    : ''
                }
                onClick={() => navigate(item.id)}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </button>
            )
          })}

          <span className="hospital-nav-label hospital-nav-label-space">
            SYSTEM
          </span>

          <button
            type="button"
            className={
              page === 'records'
                ? 'hospital-nav-active'
                : ''
            }
            onClick={() => navigate('records')}
          >
            <FileText size={17} />
            <span>Medical Records</span>
          </button>

          <button
            type="button"
            className={
              page === 'settings'
                ? 'hospital-nav-active'
                : ''
            }
            onClick={() => navigate('settings')}
          >
            <Settings size={17} />
            <span>Settings</span>
          </button>
        </nav>

        <div className="hospital-sidebar-footer">
          <div className="hospital-profile">
            <span>DR</span>
            <div>
              <strong>Demo Admin</strong>
              <small>Administrator</small>
            </div>
          </div>
        </div>
      </aside>

      {sidebarOpen && (
        <button
          type="button"
          className="hospital-sidebar-overlay"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="hospital-app">
        <header className="hospital-header">
          <button
            type="button"
            className="hospital-mobile-menu"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>

          <div className="hospital-header-title">
            <span>MEDORA / MANAGEMENT</span>
            <h1>
              {page === 'dashboard'
                ? 'Overview'
                : page === 'patients'
                  ? 'Patients'
                  : page === 'appointments'
                    ? 'Appointments'
                    : page === 'doctors'
                      ? 'Doctors'
                      : page === 'billing'
                        ? 'Billing'
                        : page === 'records'
                          ? 'Medical Records'
                          : 'Settings'}
            </h1>
          </div>

          <div className="hospital-header-actions">
            <label className="hospital-header-search">
              <Search size={15} />
              <input
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
                placeholder="Search..."
              />
            </label>

            <button
              type="button"
              className="hospital-notification"
              onClick={() =>
                setShowNotifications((value) => !value)
              }
              aria-label="Notifications"
            >
              <Bell size={17} />
              <span />
            </button>

            <div className="hospital-avatar">DR</div>
          </div>

          {showNotifications && (
            <div className="hospital-notification-panel">
              <div>
                <strong>Notifications</strong>
                <button
                  type="button"
                  onClick={() =>
                    setShowNotifications(false)
                  }
                >
                  <X size={14} />
                </button>
              </div>

              <p>
                New appointment request is ready for review.
              </p>
              <p>
                Demo patient record updated successfully.
              </p>
              <p>
                Daily billing summary is ready.
              </p>
            </div>
          )}
        </header>

        <main className="hospital-main">
          <div className="hospital-top-demo-note">
            <span>DEMONSTRATION SYSTEM</span>
            <p>
              All names, records, appointments and financial
              figures shown here are fictional interface data.
            </p>
          </div>

          {page === 'dashboard' && (
            <Dashboard
              patients={patients}
              appointments={appointments}
              doctors={doctors}
              onNavigate={navigate}
              onPatient={setSelectedPatient}
            />
          )}

          {page === 'patients' && (
            <PatientsPage
              patients={filteredPatients}
              status={patientStatus}
              setStatus={setPatientStatus}
              onPatient={setSelectedPatient}
              onAdd={() => setSelectedPatient('new')}
            />
          )}

          {page === 'appointments' && (
            <AppointmentsPage
              appointments={appointments}
              onAdd={() => setShowAppointmentForm(true)}
            />
          )}

          {page === 'doctors' && (
            <DoctorsPage doctors={doctors} />
          )}

          {page === 'billing' && <BillingPage />}

          {page === 'records' && (
            <RecordsPage
              patients={patients}
              onPatient={setSelectedPatient}
            />
          )}

          {page === 'settings' && <SettingsPage />}
        </main>
      </div>

      {selectedPatient && (
        <PatientModal
          patient={
            selectedPatient === 'new'
              ? null
              : selectedPatient
          }
          onClose={() => setSelectedPatient(null)}
        />
      )}

      {showAppointmentForm && (
        <AppointmentModal
          onClose={() => setShowAppointmentForm(false)}
          onCreate={() => {
            setShowAppointmentForm(false)
            setAppointmentCreated(true)
          }}
        />
      )}

      {appointmentCreated && (
        <div className="hospital-toast">
          <Check size={16} />
          Demo appointment created successfully.
          <button
            type="button"
            onClick={() => setAppointmentCreated(false)}
          >
            <X size={13} />
          </button>
        </div>
      )}
    </div>
  )
}

function Dashboard({
  patients,
  appointments,
  doctors,
  onNavigate,
  onPatient,
}) {
  const activePatients = patients.filter(
    (patient) => patient.status === 'Active',
  ).length

  return (
    <>
      <section className="hospital-welcome">
        <div>
          <span>MONDAY · 21 SEPTEMBER 2026</span>
          <h2>Good morning, Demo Admin.</h2>
          <p>
            Here's a quick view of today's care operations.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('appointments')}
        >
          Schedule appointment
          <Plus size={15} />
        </button>
      </section>

      <section className="hospital-stat-grid">
        <StatCard
          icon={Users}
          label="Active patients"
          value={activePatients}
          detail="Currently under care"
        />
        <StatCard
          icon={CalendarDays}
          label="Today's appointments"
          value={appointments.length}
          detail="Across all departments"
        />
        <StatCard
          icon={Clock3}
          label="Waiting"
          value="02"
          detail="Patients awaiting consultation"
        />
        <StatCard
          icon={CreditCard}
          label="Pending billing"
          value={formatMoney(12800)}
          detail="Demo outstanding balance"
        />
      </section>

      <section className="hospital-dashboard-grid">
        <div className="hospital-panel">
          <div className="hospital-panel-heading">
            <div>
              <span>CARE OPERATIONS</span>
              <h3>Today's appointments</h3>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('appointments')}
            >
              View all
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="hospital-appointment-list">
            {appointments.slice(0, 4).map((appointment) => (
              <div
                className="hospital-appointment-row"
                key={appointment.id}
              >
                <div className="hospital-time">
                  <strong>{appointment.time}</strong>
                  <small>{appointment.period}</small>
                </div>

                <div className="hospital-person">
                  <span>
                    {appointment.patient
                      .split(' ')
                      .map((name) => name[0])
                      .join('')}
                  </span>
                  <div>
                    <strong>{appointment.patient}</strong>
                    <small>{appointment.doctor}</small>
                  </div>
                </div>

                <div className="hospital-department">
                  {appointment.department}
                </div>

                <StatusBadge status={appointment.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="hospital-panel">
          <div className="hospital-panel-heading">
            <div>
              <span>PATIENTS</span>
              <h3>Recent patients</h3>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('patients')}
            >
              View all
              <ArrowRight size={14} />
            </button>
          </div>

          <div className="hospital-mini-patients">
            {patients.slice(0, 4).map((patient) => (
              <button
                type="button"
                key={patient.id}
                onClick={() => onPatient(patient)}
              >
                <span className="hospital-patient-avatar">
                  {patient.name
                    .split(' ')
                    .map((name) => name[0])
                    .join('')}
                </span>

                <span>
                  <strong>{patient.name}</strong>
                  <small>{patient.condition}</small>
                </span>

                <ArrowRight size={14} />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="hospital-panel hospital-doctor-panel">
        <div className="hospital-panel-heading">
          <div>
            <span>CLINICAL TEAM</span>
            <h3>Doctor availability</h3>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('doctors')}
          >
            View doctors
            <ArrowRight size={14} />
          </button>
        </div>

        <div className="hospital-doctor-strip">
          {doctors.slice(0, 4).map((doctor) => (
            <div
              className="hospital-doctor-mini"
              key={doctor.name}
            >
              <span>{doctor.initials}</span>
              <div>
                <strong>{doctor.name}</strong>
                <small>{doctor.department}</small>
              </div>
              <i
                className={
                  doctor.availability === 'Available'
                    ? 'hospital-online'
                    : ''
                }
              />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

function PatientsPage({
  patients,
  status,
  setStatus,
  onPatient,
  onAdd,
}) {
  return (
    <section className="hospital-page">
      <div className="hospital-page-toolbar">
        <div>
          <span>PATIENT DIRECTORY</span>
          <h2>Patient records.</h2>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="hospital-primary-button"
        >
          <Plus size={15} />
          Register patient
        </button>
      </div>

      <div className="hospital-filter-bar">
        {['All', 'Active', 'Waiting', 'Discharged'].map(
          (item) => (
            <button
              type="button"
              key={item}
              className={
                status === item
                  ? 'hospital-filter-active'
                  : ''
              }
              onClick={() => setStatus(item)}
            >
              {item}
            </button>
          ),
        )}
      </div>

      <div className="hospital-table-wrap">
        <table className="hospital-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Department</th>
              <th>Doctor</th>
              <th>Last visit</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>
                  <button
                    type="button"
                    className="hospital-table-person"
                    onClick={() => onPatient(patient)}
                  >
                    <span>
                      {patient.name
                        .split(' ')
                        .map((name) => name[0])
                        .join('')}
                    </span>
                    <div>
                      <strong>{patient.name}</strong>
                      <small>
                        {patient.id} · {patient.age} years
                      </small>
                    </div>
                  </button>
                </td>
                <td>{patient.department}</td>
                <td>{patient.doctor}</td>
                <td>{patient.lastVisit}</td>
                <td>
                  <StatusBadge status={patient.status} />
                </td>
                <td>
                  <button
                    type="button"
                    className="hospital-more"
                    onClick={() => onPatient(patient)}
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function AppointmentsPage({ appointments, onAdd }) {
  return (
    <section className="hospital-page">
      <div className="hospital-page-toolbar">
        <div>
          <span>CARE CALENDAR</span>
          <h2>Appointments.</h2>
        </div>

        <button
          type="button"
          onClick={onAdd}
          className="hospital-primary-button"
        >
          <Plus size={15} />
          New appointment
        </button>
      </div>

      <div className="hospital-calendar-head">
        <button type="button">
          <ChevronDown size={15} />
          Monday, 21 September
        </button>

        <span>5 appointments</span>
      </div>

      <div className="hospital-schedule">
        {appointments.map((appointment) => (
          <div
            className="hospital-schedule-row"
            key={appointment.id}
          >
            <div className="hospital-schedule-time">
              <strong>{appointment.time}</strong>
              <small>{appointment.period}</small>
            </div>

            <div className="hospital-schedule-card">
              <div>
                <span>
                  {appointment.department}
                </span>
                <h3>{appointment.patient}</h3>
                <p>{appointment.doctor}</p>
              </div>

              <StatusBadge status={appointment.status} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function DoctorsPage({ doctors }) {
  return (
    <section className="hospital-page">
      <div className="hospital-page-toolbar">
        <div>
          <span>CLINICAL TEAM</span>
          <h2>Doctors.</h2>
        </div>
      </div>

      <div className="hospital-doctors-grid">
        {doctors.map((doctor) => (
          <article
            className="hospital-doctor-card"
            key={doctor.name}
          >
            <div className="hospital-doctor-card-top">
              <span>{doctor.initials}</span>
              <StatusBadge status={doctor.availability} />
            </div>

            <h3>{doctor.name}</h3>
            <p>{doctor.department}</p>

            <div>
              <span>Today's appointments</span>
              <strong>{doctor.appointments}</strong>
            </div>

            <button type="button">
              View profile
              <ArrowUpRightIcon />
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

function BillingPage() {
  const invoices = [
    ['INV-1001', 'Aarav Mehta', 'Consultation', 2400, 'Paid'],
    ['INV-1002', 'Meera Sharma', 'Diagnostics', 1800, 'Pending'],
    ['INV-1003', 'Kabir Nair', 'Orthopedics', 4200, 'Paid'],
    ['INV-1004', 'Ishita Rao', 'Neurology', 3100, 'Pending'],
  ]

  return (
    <section className="hospital-page">
      <div className="hospital-page-toolbar">
        <div>
          <span>FINANCE</span>
          <h2>Billing.</h2>
        </div>

        <button
          type="button"
          className="hospital-primary-button"
        >
          <Plus size={15} />
          Create invoice
        </button>
      </div>

      <div className="hospital-billing-stats">
        <StatCard
          icon={CreditCard}
          label="Today's billing"
          value={formatMoney(11500)}
          detail="Demonstration figure"
        />
        <StatCard
          icon={Clock3}
          label="Pending"
          value={formatMoney(4900)}
          detail="Awaiting payment"
        />
        <StatCard
          icon={Check}
          label="Collected"
          value={formatMoney(6600)}
          detail="Demonstration figure"
        />
      </div>

      <div className="hospital-table-wrap">
        <table className="hospital-table">
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Patient</th>
              <th>Service</th>
              <th>Amount</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice[0]}>
                <td>
                  <strong>{invoice[0]}</strong>
                </td>
                <td>{invoice[1]}</td>
                <td>{invoice[2]}</td>
                <td>{formatMoney(invoice[3])}</td>
                <td>
                  <StatusBadge status={invoice[4]} />
                </td>
                <td>
                  <button
                    type="button"
                    className="hospital-more"
                  >
                    <MoreHorizontal size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function RecordsPage({ patients, onPatient }) {
  return (
    <section className="hospital-page">
      <div className="hospital-page-toolbar">
        <div>
          <span>CLINICAL DOCUMENTS</span>
          <h2>Medical records.</h2>
        </div>
      </div>

      <div className="hospital-record-grid">
        {patients.map((patient) => (
          <button
            type="button"
            className="hospital-record-card"
            key={patient.id}
            onClick={() => onPatient(patient)}
          >
            <div>
              <FileText size={18} />
              <span>{patient.id}</span>
            </div>

            <h3>{patient.name}</h3>
            <p>{patient.condition}</p>

            <footer>
              <span>{patient.department}</span>
              <ArrowRight size={14} />
            </footer>
          </button>
        ))}
      </div>
    </section>
  )
}

function SettingsPage() {
  const [notifications, setNotifications] = useState(true)
  const [compact, setCompact] = useState(false)

  return (
    <section className="hospital-page">
      <div className="hospital-page-toolbar">
        <div>
          <span>SYSTEM</span>
          <h2>Settings.</h2>
        </div>
      </div>

      <div className="hospital-settings">
        <SettingRow
          title="Appointment notifications"
          description="Receive alerts for new and changed appointments."
          enabled={notifications}
          onChange={() =>
            setNotifications((value) => !value)
          }
        />

        <SettingRow
          title="Compact tables"
          description="Use tighter spacing in patient and billing lists."
          enabled={compact}
          onChange={() => setCompact((value) => !value)}
        />

        <div className="hospital-settings-row">
          <div>
            <strong>Demo environment</strong>
            <p>
              This interface contains demonstration data
              only.
            </p>
          </div>
          <span className="hospital-setting-badge">
            CONCEPT
          </span>
        </div>
      </div>
    </section>
  )
}

function SettingRow({
  title,
  description,
  enabled,
  onChange,
}) {
  return (
    <div className="hospital-settings-row">
      <div>
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

      <button
        type="button"
        className={`hospital-switch ${
          enabled ? 'hospital-switch-on' : ''
        }`}
        onClick={onChange}
        aria-label={title}
      >
        <span />
      </button>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
  detail,
}) {
  return (
    <article className="hospital-stat-card">
      <div className="hospital-stat-icon">
        <Icon size={17} />
      </div>

      <span>{label}</span>
      <strong>{value}</strong>
      <small>{detail}</small>
    </article>
  )
}

function StatusBadge({ status }) {
  const normalized = status
    .toLowerCase()
    .replace(/\s+/g, '-')

  return (
    <span
      className={`hospital-status hospital-status-${normalized}`}
    >
      <i />
      {status}
    </span>
  )
}

function PatientModal({ patient, onClose }) {
  const isNew = !patient

  return (
    <div
      className="hospital-modal-backdrop"
      onMouseDown={onClose}
    >
      <div
        className="hospital-patient-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <button
          type="button"
          className="hospital-modal-close"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        {isNew ? (
          <>
            <span>NEW PATIENT</span>
            <h2>Register patient.</h2>

            <div className="hospital-form-grid">
              <FormField label="First name" />
              <FormField label="Last name" />
              <FormField label="Age" />
              <FormField label="Gender" />
              <FormField label="Department" />
              <FormField label="Blood group" />
            </div>

            <FormField
              label="Reason for visit"
              full
            />

            <button
              type="button"
              className="hospital-primary-button hospital-form-button"
              onClick={onClose}
            >
              Save demo patient
              <Check size={15} />
            </button>
          </>
        ) : (
          <>
            <span>PATIENT PROFILE · {patient.id}</span>

            <div className="hospital-modal-profile">
              <div className="hospital-modal-avatar">
                {patient.name
                  .split(' ')
                  .map((name) => name[0])
                  .join('')}
              </div>

              <div>
                <h2>{patient.name}</h2>
                <p>
                  {patient.age} years · {patient.gender} ·{' '}
                  {patient.blood}
                </p>
              </div>

              <StatusBadge status={patient.status} />
            </div>

            <div className="hospital-patient-info-grid">
              <InfoItem
                label="Department"
                value={patient.department}
              />
              <InfoItem
                label="Doctor"
                value={patient.doctor}
              />
              <InfoItem
                label="Last visit"
                value={patient.lastVisit}
              />
              <InfoItem
                label="Next visit"
                value={patient.nextVisit}
              />
            </div>

            <div className="hospital-modal-section">
              <span>CURRENT REASON</span>
              <strong>{patient.condition}</strong>
              <p>
                Demonstration clinical record. No real
                medical information is represented.
              </p>
            </div>

            <div className="hospital-modal-actions">
              <button type="button" onClick={onClose}>
                Close
              </button>
              <button type="button">
                Open records
                <ArrowRight size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function AppointmentModal({ onClose, onCreate }) {
  return (
    <div
      className="hospital-modal-backdrop"
      onMouseDown={onClose}
    >
      <div
        className="hospital-appointment-modal"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <button
          type="button"
          className="hospital-modal-close"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        <span>APPOINTMENT</span>
        <h2>Schedule a visit.</h2>

        <div className="hospital-form-grid">
          <FormField label="Patient name" />
          <FormField label="Department" />
          <FormField label="Doctor" />
          <FormField label="Date" />
          <FormField label="Time" />
          <FormField label="Visit type" />
        </div>

        <button
          type="button"
          className="hospital-primary-button hospital-form-button"
          onClick={onCreate}
        >
          Create demo appointment
          <CalendarDays size={15} />
        </button>
      </div>
    </div>
  )
}

function FormField({ label, full = false }) {
  return (
    <label
      className={`hospital-form-field ${
        full ? 'hospital-form-field-full' : ''
      }`}
    >
      <span>{label}</span>
      <input placeholder={`Enter ${label.toLowerCase()}`} />
    </label>
  )
}

function InfoItem({ label, value }) {
  return (
    <div>
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function ArrowUpRightIcon() {
  return <ArrowUpRight size={14} />
}

export default HospitalDemo
