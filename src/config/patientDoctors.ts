export interface PatientDoctor {
  id: string;
  backendDoctorId: string;
  name: string;
  specialty: string;
  hospital: string;
  location: string;
  experience: string;
  rating: number;
  reviews: number;
  patients: string;
  image: string;
  about: string;
  workingHours: string;
}

// Fill `backendDoctorId` with the Mongo `_id` from your backend so request-doctor works end-to-end.
export const PATIENT_DOCTORS: PatientDoctor[] = [
  {
    id: 'doctor-raj',
    backendDoctorId: '',
    name: 'Dr Raj',
    specialty: 'Cardiologist',
    hospital: 'Jan Seva Care',
    location: 'Delhi',
    experience: '5 Years Experience',
    rating: 4.8,
    reviews: 124,
    patients: '1,000+',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d',
    about:
      'Experienced cardiologist focused on preventive heart care and patient-friendly consultations.',
    workingHours: 'Monday-Saturday, 10:00 AM - 6:00 PM',
  },
  {
    id: 'doctor-neha',
    backendDoctorId: '',
    name: 'Dr Neha Verma',
    specialty: 'General Physician',
    hospital: 'Jan Seva Care',
    location: 'Delhi',
    experience: '8 Years Experience',
    rating: 4.7,
    reviews: 96,
    patients: '1,400+',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2',
    about:
      'General physician helping patients with day-to-day health concerns and follow-up care.',
    workingHours: 'Monday-Friday, 9:00 AM - 5:00 PM',
  },
  {
    id: 'doctor-amit',
    backendDoctorId: '',
    name: 'Dr Amit Sharma',
    specialty: 'Orthopedic',
    hospital: 'Jan Seva Care',
    location: 'Delhi',
    experience: '10 Years Experience',
    rating: 4.9,
    reviews: 143,
    patients: '1,900+',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7',
    about:
      'Orthopedic specialist with strong experience in joint pain, injuries, and mobility recovery.',
    workingHours: 'Monday-Saturday, 11:00 AM - 7:00 PM',
  },
];

export const DOCTOR_SPECIALTIES = [
  'All',
  ...Array.from(new Set(PATIENT_DOCTORS.map(doctor => doctor.specialty))),
];
