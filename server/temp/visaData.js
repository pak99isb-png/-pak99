const STANDARD_TERMS = [
  "If You Select Our Done Base Package Then 100% Charges Are Refundable In Case Of Visa Rejection.",
  "If You Select Our Normal Base Package 100% Charges Are Non Refundable In Case of Visa Rejection",
  "All Rates Can Be Change Any Time Without Prior Notice.",
  "All Payment Will Be Required in Advance At The Time of Booking Case Otherwise Process Will Not Start.",
  "All Documents For Processing E-Visa Must In Good Scanning Form, In Case of Any Tempered or Fake Document Then Applicant is Responsible.",
  "We Process Every Case Immediatelly After Receiving Documents and Payment But Somtimes Embassy Take Longer Time Than Usual, In That Case We Will Not Responsible.",
  "We Are Responsible To Process Only Visa Not AnyThing Else If Our Visa Is Fake or Wrong Only Then We Are Responsible.",
  "We Process Only Visa And Will Not Be Resposible For Customer\u2019s Travelling Matters Like Boarding Pass, Ok To Board, Airport or Immigration Clearance, Transit Visas Enroot To Their Destinations or Any Other Immigration Requirement.",
  "We Are Not Responsible For Any Loss Occures Due To Delay in Visa Like, Prepaid Tickets, Hotel Booking or Any Other Thing."
];
const VISA_COUNTRIES_DATA = [
  {
    name: "Azerbaijan",
    code: "az",
    normalDocs: ["Passport Scann"],
    doneBaseDocs: []
  },
  {
    name: "Antigua and Barbuda",
    code: "ag",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Travel Plan", "Bank Statment With 15Lakh Balance", "Birh Certificate/FRC/MRC", "Police Certificate", "Source of Income / Salary Slips/ Business Registration"],
    doneBaseDocs: []
  },
  {
    name: "Ivory Coast",
    // Abidjan
    code: "ci",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"],
    doneBaseDocs: []
  },
  {
    name: "Botswana",
    code: "bw",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Travel Plan", "Bank Statment(Optional)"],
    doneBaseDocs: []
  },
  {
    name: "Burkina Faso",
    code: "bf",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Covid Vaccine Certificate"],
    doneBaseDocs: []
  },
  {
    name: "Bahamas",
    code: "bs",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Bank Statment With Closing Balance 30 Lakhs", "Acc Maintaince Letter", "NTN", "Tax Returns", "Last 3 Salary Slips (For Job Holder)", "Business Documents (For Businessman)", "FRC & MRC", "Medical Report", "Police Certificate"],
    doneBaseDocs: []
  },
  {
    name: "Bahrain",
    code: "bh",
    normalDocs: ["Passport Scann", "White Background Pic", "CNIC Scann", "Bank Statment Last 6 Months With 4Lakh Balance"],
    doneBaseDocs: ["Passport Scann", "White Background Pic Scann", "CNIC Scann"]
  },
  {
    name: "Benin",
    code: "bj",
    normalDocs: [],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "Yellow Fever Certificate", "CNIC Scann"]
  },
  {
    name: "Cambodia",
    code: "kh",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Bank Statment Last 6 Months"],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"]
  },
  {
    name: "Djibouti",
    code: "dj",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"]
  },
  {
    name: "East Africa",
    code: "eac",
    customUrl: "https://upload.wikimedia.org/wikipedia/commons/2/22/Flag_of_the_East_African_Community.svg",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Yellow Fever Certificate", "Bank Statment(Optional)"],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Yellow Fever Certificate"]
  },
  {
    name: "Ethiopia",
    code: "et",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scanning"],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scanning"],
    note: "Special discount is available only for those students who have Sweden Embassy Appointment in Ethiopia."
  },
  {
    name: "Gabon",
    code: "ga",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"]
  },
  {
    name: "Hong Kong",
    code: "hk",
    normalDocs: [],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "Covid Vaccine Certificate", "CNIC Scann", "FRC & MRC"]
  },
  {
    name: "Indonesia",
    code: "id",
    normalDocs: ["Passport", "White Backgroung Pic (4)", "CNIC", "Bank Statment With 5 Lakh Balance", "Acc Maintaince Letter", "NTN", "Letter Head", "Salary Slips (For Job Holder)", "Chamber Certificate (For Business Person)", "Visiting Card"],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"]
  },
  {
    name: "Jordan",
    code: "jo",
    normalDocs: [],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"]
  },
  {
    name: "Kenya",
    code: "ke",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"]
  },
  {
    name: "Malawi",
    code: "mw",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Invitation Letter", "Yellow Fever Certificate", "Bank Statment(Optional)"],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Yellow Fever Certificate"]
  },
  {
    name: "Madagascar",
    code: "mg",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Yellow Fever Certificate"],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Yellow Fever Certificate"]
  },
  {
    name: "Malaysia",
    code: "my",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC", "Letter Head", "NTN", "Visiting Card", "Salary Slips (For Job Holder)", "Invitation Letter (Arrange By Us)", "Bank Statment With 5 Lakh Balance", "Acc Maintaince Letter"],
    doneBaseDocs: ["Passport", "White Backgroung Pic", "CNIC"]
  },
  {
    name: "Myanmar",
    code: "mm",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"],
    doneBaseDocs: ["Passport Original", "White Backgroung Pic (4)", "CNIC Copy"]
  },
  {
    name: "Nepal",
    code: "np",
    normalDocs: ["Passport Original", "White Backgroung Pic (4)", "CNIC Copy", "Bank Statment With 5 Lakh Balance", "Acc Maintaince Letter"],
    doneBaseDocs: ["Passport Original", "White Background Pic (4)", "CNIC Copy"]
  },
  {
    name: "Namibia",
    code: "na",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Invitation Letter/Tourist Voucher (Arrange By Usa)", "Yellow Fever Certificate", "Travel Insurance (Arrange By Us)", "Motivation Letter (Arrange By Us)", "Bank Statment Last Six Months"],
    doneBaseDocs: []
  },
  {
    name: "New Zealand",
    // Fixed spelling from New Zeeland
    code: "nz",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Bank Statment With Closing Balance 50 Lakhs", "Acc Maintaince Letter", "NTN", "Tax Returns", "Last 3 Salary Slips (For Job Holder)", "Business Documents (For Businessman)", "FRC & MRC", "Police Certificate"],
    doneBaseDocs: []
  },
  {
    name: "Oman",
    code: "om",
    normalDocs: [],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"]
  },
  {
    name: "Philippines",
    code: "ph",
    normalDocs: ["All Original Passport", "White Backgroung Pic", "CNIC Copy", "Application Form", "Invitation Letter", "Hotel Booking", "Bank Statment With Closing Balance 10 Lakhs", "Acc Maintaince Letter", "NTN", "Tax Returns", "Last 3 Salary Slips (For Job Holder)", "Business Documents (For Businessman)", "FRC & MRC", "Covid Vaccine Certificate", "Police Certificate"],
    doneBaseDocs: ["All Original Passport", "White Backgroung Pic", "CNIC Copy", "Police Certificate"]
  },
  {
    name: "Papua New Guinea",
    code: "pg",
    normalDocs: ["Passport Scann", "CNIC Scann", "Hotel Booking", "Flight Reservation Confirmed", "Travel Plan"],
    doneBaseDocs: ["Passport Scann", "CNIC Scann", "Hotel Booking", "Flight Reservation Confirmed", "Travel Plan"]
  },
  {
    name: "Rwanda",
    code: "rw",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Yellow Fever Certificate"],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Yellow Fever Certificate"]
  },
  {
    name: "Republic of Guinea",
    code: "gn",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Invitation Letter (Optional)", "Yellow Fever Certificate", "Bank Statment(Optional)"],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"]
  },
  {
    name: "Sri Lanka",
    // Fixed spelling from Srilanka
    code: "lk",
    normalDocs: [],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"]
  },
  {
    name: "Singapore",
    code: "sg",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC", "Letter Head", "NTN", "Visiting Card", "Salary Slips (For Job Holder)", "Invitation Letter (Arrange By Us)", "Bank Statment With 5 Lakh Balance", "Acc Maintaince Letter"],
    doneBaseDocs: ["Passport Scann", "White Backgroung Pic", "CNIC Scann"]
  },
  {
    name: "Sierra Leone",
    // Fixed spelling from Seirra Leone
    code: "sl",
    normalDocs: ["Passport Scann"],
    doneBaseDocs: []
  },
  {
    name: "Seychelles",
    code: "sc",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Bank Statment"],
    doneBaseDocs: []
  },
  {
    name: "South Africa",
    code: "za",
    normalDocs: ["Passport Original", "White Backgroung Pic", "CNIC Copy", "Application Form", "Visa Request Letter", "Invitation Letter", "Hotel Booking", "Bank Statment With Closing Balance 10 Lakhs", "Acc Maintaince Letter", "NTN", "Tax Returns", "Last 3 Salary Slips (For Job Holder)", "Business Documents (For Businessman)", "FRC & MRC", "Medical Report", "TB Report", "Covid Vaccine Certificate", "Yellow Fever Certificate", "Polio Certificate", "Police Certificate"],
    doneBaseDocs: []
  },
  {
    name: "Tajikistan",
    code: "tj",
    normalDocs: [],
    doneBaseDocs: ["Passport Original", "White Backgroung Pic (4)", "CNIC Copy"]
  },
  {
    name: "Thailand",
    code: "th",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Letter Head", "NTN", "Visiting Card", "Salary Slips (For Job Holder)", "Bank Statment With 5 Lakh Balance"],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"]
  },
  {
    name: "Uganda",
    code: "ug",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Yellow Fever Certificate", "Bank Statment(Optional)"],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Yellow Fever Certificate"]
  },
  {
    name: "Vietnam",
    code: "vn",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"],
    doneBaseDocs: []
  },
  {
    name: "Zambia",
    code: "zm",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"],
    doneBaseDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann"],
    note: "Applicant Age Must be 32 Years Plus For Done Base Visa Processing."
  },
  {
    name: "Zimbabwe",
    code: "zw",
    normalDocs: ["Passport Scanning", "White Backgroung Pic", "CNIC Scann", "Invitation Letter (Optional)"],
    doneBaseDocs: ["Passport Scanning", "White Background Pic", "CNIC Scann"],
    note: "Invitation Letter is Available on Demand With Extra Cost 50$."
  }
];
export {
  STANDARD_TERMS,
  VISA_COUNTRIES_DATA
};
