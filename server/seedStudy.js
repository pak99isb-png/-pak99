import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

import StudyProgram from './models/StudyProgram.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pak99';

const studyData = [
  {
    slug: 'study-uk',
    pageType: 'destination',
    badgeText: '🇬🇧 Study in United Kingdom',
    title: 'Study at Russell Group & Top UK Universities',
    description: 'Secure your UK university offer letter with 2-Year Post-Study Work (PSW) Visa rights. Pak99 assists with admissions, CAS letters, bank statement guidance, and Student Visa filing.',
    ctaTitle: 'Ready to Apply for Upcoming UK Intake?',
    ctaDescription: 'Contact our UK Student Visa counselors today for free document assessment and university selection.',
    ctaButtonText: 'Book UK Free Assessment',
    items: [
      { title: '2-Year PSW Graduate Route', description: 'Work in the UK for 2 years post-graduation without job sponsor restrictions.', icon: 'GraduationCap' },
      { title: 'No IELTS Options Available', description: 'Apply with 70%+ in Intermediate English or MOI (Medium of Instruction) certificates.', icon: 'Award' },
      { title: 'Fast-Track CAS & Visa', description: 'Get your Confirmation of Acceptance for Studies (CAS) issued in record time with 99% visa success rate.', icon: 'FileText' }
    ]
  },
  {
    slug: 'study-australia',
    pageType: 'destination',
    badgeText: '🇦🇺 Study in Australia',
    title: 'Study at Top Australian Universities & PR Pathways',
    description: 'Explore Subclass 500 Student Visa options with 3-5 years Post-Study Work Rights and high PR prospects in Sydney, Melbourne, Brisbane & Perth.',
    ctaTitle: 'Book Free Australian Study Counseling',
    ctaDescription: '',
    ctaButtonText: 'Start Australian Application',
    items: [
      { title: '4-5 Year PSW Rights', description: 'Extended work rights for regional campus graduates and high-demand tech & healthcare fields.', icon: 'GraduationCap' },
      { title: 'Permanent Residency (PR)', description: 'Gain extra points for Australian qualifications under Subclass 189/190/491 visas.', icon: 'Award' },
      { title: 'GTE & Visa Assistance', description: 'Expert assistance for Genuine Temporary Entrant (GTE) statement drafting and COE issuance.', icon: 'FileText' }
    ]
  },
  {
    slug: 'study-germany',
    pageType: 'destination',
    badgeText: '🇩🇪 Study in Germany',
    title: 'Free Tuition in Germany & 18-Month Job Search Visa',
    description: 'Study English-taught Bachelors & Masters programs at top German public universities with Zero Tuition Fees. We guide you through APS Certification and Blocked Account setup.',
    ctaTitle: 'Ready for German Universities?',
    ctaDescription: '',
    ctaButtonText: 'Book Germany Assessment',
    items: [
      { title: 'Zero Tuition Fees', description: 'Study at world-class public universities in Germany without paying any tuition fees.', icon: 'GraduationCap' },
      { title: '18-Month Job Search Visa', description: 'Stay in Germany for 18 months after graduation to find a job related to your field.', icon: 'Award' },
      { title: 'APS & Blocked Account', description: 'Complete guidance on APS certification, Blocked Account opening, and Visa interview prep.', icon: 'FileText' }
    ]
  },
  {
    slug: 'study-canada',
    pageType: 'destination',
    badgeText: '🇨🇦 Study in Canada',
    title: 'Study in Canada with PGWP & SDS Fast-Track',
    description: 'Apply to top Canadian Colleges & Universities with up to 3 years Post-Graduation Work Permit (PGWP). We specialize in SDS (Student Direct Stream) applications for fast processing.',
    ctaTitle: 'Start Your Canadian Journey',
    ctaDescription: '',
    ctaButtonText: 'Book Canada Assessment',
    items: [
      { title: 'Up to 3-Year PGWP', description: 'Gain valuable Canadian work experience with a Post-Graduation Work Permit after completing your studies.', icon: 'GraduationCap' },
      { title: 'SDS Visa Fast-Track', description: 'Faster visa processing times for eligible students applying through the Student Direct Stream (SDS).', icon: 'Award' },
      { title: 'PR Point Advantage', description: 'Canadian education provides significant points towards Express Entry and Provincial Nominee Programs (PNP).', icon: 'FileText' }
    ]
  },
  {
    slug: 'scholarships',
    pageType: 'scholarship',
    badgeText: '🎓 Fully Funded Scholarships',
    title: 'Secure Fully Funded International Scholarships',
    description: 'Let Pak99 guide you in applying for the world\'s most prestigious fully funded scholarships. We help with motivation letters, recommendation letters, and application strategy.',
    ctaTitle: 'Need Help with Your Scholarship Application?',
    ctaDescription: 'Our experts will review your profile and help you craft a winning motivation letter and application package.',
    ctaButtonText: 'Book Scholarship Consultation',
    items: [
      { title: 'Chevening Scholarship', funding: 'Fully Funded', target: 'UK Masters', description: 'The UK government\'s global scholarship programme, offering future leaders the unique opportunity to study in the UK.', buttonText: 'Apply for Chevening' },
      { title: 'Erasmus Mundus Joint Masters', funding: 'Fully Funded', target: 'Europe Masters', description: 'Prestigious, integrated, international study programmes, jointly delivered by an international consortium of higher education institutions.', buttonText: 'Apply for Erasmus' },
      { title: 'Fulbright Program', funding: 'Fully Funded', target: 'USA Masters & PhD', description: 'The flagship international educational exchange program sponsored by the U.S. government.', buttonText: 'Apply for Fulbright' },
      { title: 'Australia Awards', funding: 'Fully Funded', target: 'Australia Bachelors/Masters', description: 'Provide opportunities to people from developing countries to undertake full time undergraduate or postgraduate study at participating Australian universities.', buttonText: 'Apply for Australia Awards' },
      { title: 'MEXT Scholarship', funding: 'Fully Funded', target: 'Japan Undergraduate/Research', description: 'Scholarships offered by the Japanese Ministry of Education, Culture, Sports, Science and Technology (MEXT).', buttonText: 'Apply for MEXT' },
      { title: 'DAAD Scholarships', funding: 'Fully/Partially Funded', target: 'Germany Masters/PhD', description: 'The German Academic Exchange Service (DAAD) offers scholarships for international students to study in Germany.', buttonText: 'Apply for DAAD' }
    ]
  },
  {
    slug: 'attestation',
    pageType: 'attestation',
    badgeText: '📝 Document Attestation Services',
    title: 'Fast & Reliable Document Attestation from HEC, MOFA & Embassies',
    description: 'Skip the long queues and complex procedures. Pak99 offers a hassle-free, door-to-door document attestation service for your educational degrees, marriage certificates, and police character certificates.',
    ctaTitle: 'Ready to Get Your Documents Attested?',
    ctaDescription: 'Send us your documents via courier or drop them at our office. We will handle the rest.',
    ctaButtonText: 'Start Attestation Process',
    items: [
      { title: 'HEC Attestation', description: 'Attestation of Matric, Inter (IBCC), Bachelors, and Masters degrees from the Higher Education Commission.' },
      { title: 'MOFA Attestation', description: 'Ministry of Foreign Affairs (MOFA) attestation for degrees, marriage certificates (MRC), family registration (FRC), and police certificates.' },
      { title: 'Embassy Attestation', description: 'Attestation from UAE, Saudi Arabia, Qatar, and other embassies based in Islamabad.' },
      { title: 'Translation Services', description: 'Certified translation of documents into Arabic, German, Spanish, and other languages.' },
      { title: 'Door-to-Door Service', description: 'Secure pickup and delivery of your original documents via trusted courier partners (TCS, Leopard).' },
      { title: 'Real-Time Tracking', description: 'Track the status of your documents at every step of the attestation process.' }
    ]
  }
];

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB. Seeding study programs...');
    await StudyProgram.deleteMany({});
    await StudyProgram.insertMany(studyData);
    console.log('Successfully seeded study programs!');
    mongoose.connection.close();
  })
  .catch(err => {
    console.error('Seeding error:', err);
    mongoose.connection.close();
  });
