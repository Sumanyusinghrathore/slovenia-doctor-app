export interface PatientServiceItem {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  icon: string;
}

export interface PatientServiceCategory {
  id: string;
  label: string;
  fullLabel: string;
  icon: string;
  gradient: [string, string];
  color: string;
  description: string;
  services: PatientServiceItem[];
}

export const PATIENT_SERVICE_CATEGORIES: PatientServiceCategory[] = [
  {
    id: 'general-checkup',
    label: 'Checkup',
    fullLabel: 'General Health Checkup',
    icon: 'medkit-outline',
    gradient: ['#FFE5E5', '#FFF3F3'],
    color: '#FF6B6B',
    description: 'Comprehensive health screening',
    services: [
      {
        id: 'basic-checkup',
        name: 'Basic Checkup',
        description: 'BP, temperature, weight, height',
        price: '₹200',
        duration: '15 mins',
        icon: 'medkit-outline',
      },
      {
        id: 'health-screening-package',
        name: 'Health Screening Package',
        description: 'Full body screening with reports',
        price: '₹2000',
        duration: '90 mins',
        icon: 'clipboard-outline',
      },
      {
        id: 'ecg-test',
        name: 'ECG Test',
        description: 'Heart electrical activity check',
        price: '₹800',
        duration: '20 mins',
        icon: 'heart-outline',
      },
      {
        id: 'ultrasound-scan',
        name: 'Ultrasound Scan',
        description: 'Abdominal or targeted ultrasound',
        price: '₹1200',
        duration: '30 mins',
        icon: 'scan-outline',
      },
    ],
  },
  {
    id: 'doctor-consultation',
    label: 'Doctors',
    fullLabel: 'Doctor Consultation',
    icon: 'person-circle-outline',
    gradient: ['#E5F5FF', '#F0F8FF'],
    color: '#4A90E2',
    description: 'Connect with specialists for expert guidance',
    services: [],
  },
  {
    id: 'diagnostic-tests',
    label: 'Diagnostics',
    fullLabel: 'Diagnostic Tests',
    icon: 'flask-outline',
    gradient: ['#E8F5E9', '#F2FBF3'],
    color: '#66BB6A',
    description: 'Professional diagnostic testing services',
    services: [
      {
        id: 'blood-test',
        name: 'Blood Test',
        description: 'Complete blood count, lipid profile, glucose',
        price: '₹500',
        duration: '30 mins',
        icon: 'water-outline',
      },
      {
        id: 'sugar-test',
        name: 'Sugar Test',
        description: 'Fasting and post-meal glucose testing',
        price: '₹300',
        duration: '15 mins',
        icon: 'flask-outline',
      },
      {
        id: 'covid-test',
        name: 'COVID-19 Test',
        description: 'RT-PCR and antigen rapid test',
        price: '₹400',
        duration: '20 mins',
        icon: 'shield-checkmark-outline',
      },
      {
        id: 'thyroid-profile',
        name: 'Thyroid Profile',
        description: 'TSH, T3, T4 level testing',
        price: '₹600',
        duration: '25 mins',
        icon: 'pulse-outline',
      },
      {
        id: 'liver-function-test',
        name: 'Liver Function Test',
        description: 'Complete liver health assessment',
        price: '₹550',
        duration: '25 mins',
        icon: 'fitness-outline',
      },
      {
        id: 'kidney-function-test',
        name: 'Kidney Function Test',
        description: 'Creatinine, BUN, and kidney parameters',
        price: '₹450',
        duration: '20 mins',
        icon: 'flask-outline',
      },
    ],
  },
  {
    id: 'blood-donation',
    label: 'Blood',
    fullLabel: 'Blood Donation Camp',
    icon: 'water-outline',
    gradient: ['#FCE4EC', '#FFF1F5'],
    color: '#EC407A',
    description: 'Save lives by donating blood',
    services: [
      {
        id: 'blood-donation',
        name: 'Blood Donation',
        description: 'Donate 450ml whole blood',
        price: 'Free',
        duration: '30 mins',
        icon: 'water-outline',
      },
      {
        id: 'platelet-donation',
        name: 'Platelet Donation',
        description: 'Donate platelets only',
        price: 'Free',
        duration: '60 mins',
        icon: 'water-outline',
      },
      {
        id: 'plasma-donation',
        name: 'Plasma Donation',
        description: 'Donate plasma for patients',
        price: 'Free',
        duration: '45 mins',
        icon: 'water-outline',
      },
    ],
  },
  {
    id: 'emergency',
    label: 'Emergency',
    fullLabel: 'Emergency Services',
    icon: 'alert-circle-outline',
    gradient: ['#FFF3E0', '#FFF7EC'],
    color: '#FB8C00',
    description: '24/7 emergency medical assistance',
    services: [
      {
        id: 'emergency-ambulance',
        name: 'Emergency Ambulance',
        description: 'Quick ambulance dispatch',
        price: '₹500',
        duration: 'Immediate',
        icon: 'car-outline',
      },
      {
        id: 'first-aid-support',
        name: 'First Aid Support',
        description: 'On-site first aid assistance',
        price: '₹300',
        duration: '15 mins',
        icon: 'medkit-outline',
      },
      {
        id: 'tele-emergency',
        name: 'Tele-Emergency',
        description: 'Talk to an emergency specialist',
        price: '₹1000',
        duration: '10 mins',
        icon: 'call-outline',
      },
    ],
  },
  {
    id: 'vaccination',
    label: 'Vaccine',
    fullLabel: 'Vaccination Services',
    icon: 'bandage-outline',
    gradient: ['#F3E5F5', '#FAF2FB'],
    color: '#AB47BC',
    description: 'Immunization and vaccination programs',
    services: [
      {
        id: 'covid-vaccine',
        name: 'COVID-19 Vaccine',
        description: 'Pfizer, Moderna, Covaxin doses',
        price: 'Free',
        duration: '30 mins',
        icon: 'bandage-outline',
      },
      {
        id: 'influenza-vaccine',
        name: 'Influenza Vaccine',
        description: 'Annual flu shot',
        price: '₹400',
        duration: '15 mins',
        icon: 'shield-outline',
      },
      {
        id: 'polio-vaccine',
        name: 'Polio Vaccine',
        description: 'Oral polio vaccine',
        price: '₹100',
        duration: '10 mins',
        icon: 'happy-outline',
      },
      {
        id: 'typhoid-vaccine',
        name: 'Typhoid Vaccine',
        description: 'Protection against typhoid',
        price: '₹800',
        duration: '20 mins',
        icon: 'thermometer-outline',
      },
    ],
  },
  {
    id: 'mental-health',
    label: 'Mental',
    fullLabel: 'Mental Health Care',
    icon: 'heart-outline',
    gradient: ['#FFF9C4', '#FFFCE0'],
    color: '#FDD835',
    description: 'Counseling and mental health support',
    services: [
      {
        id: 'counseling-session',
        name: 'Counseling Session',
        description: 'One-on-one counseling with an expert',
        price: '₹500',
        duration: '45 mins',
        icon: 'chatbubbles-outline',
      },
      {
        id: 'therapy-session',
        name: 'Therapy Session',
        description: 'Behavioral therapy and emotional support',
        price: '₹800',
        duration: '60 mins',
        icon: 'leaf-outline',
      },
      {
        id: 'stress-management',
        name: 'Stress Management',
        description: 'Meditation and stress relief program',
        price: '₹400',
        duration: '30 mins',
        icon: 'sunny-outline',
      },
    ],
  },
  {
    id: 'elder-care',
    label: 'Elder Care',
    fullLabel: 'Senior Citizen Care',
    icon: 'accessibility-outline',
    gradient: ['#E0F2F1', '#EFFBFA'],
    color: '#26A69A',
    description: 'Home and clinic support for senior citizens',
    services: [
      {
        id: 'vitals-monitoring',
        name: 'Vitals Monitoring',
        description: 'Regular BP, sugar, pulse, and temperature checks',
        price: '₹350',
        duration: '20 mins',
        icon: 'pulse-outline',
      },
      {
        id: 'home-visit-assistance',
        name: 'Home Visit Assistance',
        description: 'Doctor or compounder visit at home',
        price: '₹900',
        duration: '45 mins',
        icon: 'home-outline',
      },
      {
        id: 'medication-support',
        name: 'Medication Support',
        description: 'Medicine reminders and follow-up help',
        price: '₹250',
        duration: '15 mins',
        icon: 'medkit-outline',
      },
    ],
  },
];

export const findPatientServiceCategory = (categoryId?: string) =>
  PATIENT_SERVICE_CATEGORIES.find(category => category.id === categoryId);
