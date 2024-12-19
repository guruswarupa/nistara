import { NextResponse } from 'next/server';

interface RescueData {
  name: string;
  lat: number;
  lng: number;
  zone: "red" | "orange" | "yellow";
}

const indianNames = [
    "Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Ishaan", "Reyansh", "Ayaan", "Krishna", "Saanvi", "Shruti", "Riya", "Priya", "Diya",
    "Ananya", "Isha", "Madhavi", "Kavya", "Aditi", "Meera", "Simran", "Nisha", "Neha", "Sanya", "Jasmine", "Shreya", "Pooja", "Tanya", "Ritika", "Sonali",
    "Gauri", "Navya", "Aishwarya", "Manju", "Shalini", "Khushbu", "Anjali", "Radhika", "Rupal", "Parul", "Sonia", "Payal", "Kiran", "Neelam", "Aparna",
    "Shraddha", "Aastha", "Sakshi", "Divya", "Laxmi", "Geeta", "Sumati", "Pinki", "Tanu", "Ruchi", "Bhoomika", "Rupal", "Bina", "Kajal", "Manisha", "Rajni",
    "Alok", "Vikas", "Ravi", "Sandeep", "Ashok", "Amit", "Rahul", "Vijay", "Manoj", "Anil", "Sanjay", "Kumar", "Deepak", "Prem", "Ajay", "Suresh", "Yogesh",
    "Subodh", "Sunil", "Rakesh", "Rajesh", "Gaurav", "Kunal", "Pradeep", "Mohan", "Bharat", "Chetan", "Mukesh", "Sanjiv", "Ranjit", "Tushar", "Rohit", "Kapil",
    "Sanjay", "Siddharth", "Nitin", "Sharad", "Kishore", "Bhavin", "Jai", "Pravin", "Nishant", "Raghav", "Vineet", "Pankaj", "Hemant", "Aakash", "Abhinav",
    "Bharat", "Rohit", "Nikhil", "Karan", "Manish", "Vijender", "Puneet", "Shivendra", "Harsh", "Amitabh", "Shankar", "Ashwin", "Yash", "Himanshu", "Kartik",
    "Siddhant", "Prashant", "Rajeev", "Sandeep", "Suraj", "Dinesh", "Pratik", "Chirag", "Abhishek", "Pawan", "Dinesh", "Varun", "Rahul", "Arvind", "Vinod",
    "Ramesh", "Ankur", "Sushil", "Narayan", "Bhavesh", "Girish", "Jayesh", "Suresh", "Harish", "Mahesh", "Raghavendra", "Madhur", "Rupesh", "Jatin", "Saurabh",
    "Nilesh", "Vishal", "Puneet", "Alok", "Shivendra", "Lalit", "Vijendra", "Tanmay", "Bikash", "Sanjay", "Amit", "Surendra", "Amit", "Siddhi", "Devanshi",
    "Shivangi", "Ananya", "Pari", "Diksha", "Shubhika", "Khushboo", "Pranjal", "Samaira", "Palak", "Ritika", "Shristi", "Aishwarya", "Veda", "Kavita", "Rupali",
    "Sonali", "Kajal", "Saanvi", "Neha", "Kiran", "Tanya", "Ami", "Tara", "Bhumika", "Surbhi", "Nidhi", "Shubhi", "Jiya", "Nirali", "Madhavi", "Tanvi"
  ];

const getRandomIndianName = (): string => {
  const randomIndex = Math.floor(Math.random() * indianNames.length);
  return indianNames[randomIndex];
};

const getRandomIndianCoordinates = (): { lat: number; lng: number } => {
  const lat = 8.0 + Math.random() * 30;  
  const lng = 68.0 + Math.random() * 30; 
  return { lat, lng };
};

let rescueData: RescueData[] = [];

export async function GET() {
  const newRescue: RescueData = {
    name: getRandomIndianName(),
    ...getRandomIndianCoordinates(),
    zone: ["red", "orange", "yellow"][Math.floor(Math.random() * 3)] as "red" | "orange" | "yellow",
  };

  rescueData.push(newRescue);
  
  return NextResponse.json(rescueData);
}

