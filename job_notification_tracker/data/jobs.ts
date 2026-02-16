import { Job } from '@/types/job';

const COMPANIES = [
    'Infosys', 'TCS', 'Wipro', 'Accenture', 'Capgemini', 'Cognizant', 'IBM', 'Oracle', 'SAP', 'Dell',
    'Amazon', 'Flipkart', 'Swiggy', 'Razorpay', 'PhonePe', 'Paytm', 'Zoho', 'Freshworks', 'Juspay', 'CRED',
    'Zomato', 'Ola', 'Urban Company', 'Meesho', 'Groww', 'Zerodha'
];

const ROLES = [
    'SDE Intern', 'Graduate Engineer Trainee', 'Junior Backend Developer', 'Frontend Intern',
    'QA Intern', 'Data Analyst Intern', 'Java Developer', 'Python Developer', 'React Developer',
    'Full Stack Intern', 'Software Engineer I', 'Cloud Engineer'
];

const LOCATIONS = ['Bangalore', 'Hyderabad', 'Pune', 'Gurgaon', 'Chennai', 'Mumbai', 'Noida', 'Remote'];

const generateJobs = (): Job[] => {
    const jobs: Job[] = [];

    for (let i = 1; i <= 60; i++) {
        const company = COMPANIES[Math.floor(Math.random() * COMPANIES.length)];
        const role = ROLES[Math.floor(Math.random() * ROLES.length)];
        const location = LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];

        // Determine realistic experience based on role
        let experience: Job['experience'] = 'Fresher';
        if (role.toLowerCase().includes('intern')) experience = 'Internship';
        else if (role.includes('Trainee')) experience = 'Fresher';
        else if (role.includes('Junior') || role.includes('I')) experience = '0-1 Years';
        else experience = ['1-3 Years', '3-5 Years'][Math.floor(Math.random() * 2)] as Job['experience'];

        // Determine salary based on experience and company type (Service vs Product simplified logic)
        let salaryRange = '3-5 LPA';
        const isProduct = ['Amazon', 'Flipkart', 'Swiggy', 'Razorpay', 'PhonePe', 'Paytm', 'Zoho', 'Freshworks', 'Juspay', 'CRED', 'Zomato', 'Ola', 'Zerodha', 'Groww'].includes(company);

        if (experience === 'Internship') {
            salaryRange = isProduct ? '₹30k-₹60k/month' : '₹15k-₹25k/month';
        } else if (experience === 'Fresher' || experience === '0-1 Years') {
            salaryRange = isProduct ? '12-18 LPA' : '3.6-5 LPA';
        } else {
            salaryRange = isProduct ? '18-25 LPA' : '6-10 LPA';
        }

        // Determine Mode
        const mode = Math.random() > 0.7 ? 'Remote' : (Math.random() > 0.5 ? 'Hybrid' : 'Onsite');

        // Skills
        const skillSet = ['Java', 'Python', 'React', 'Node.js', 'SQL', 'AWS', 'JavaScript', 'TypeScript', 'C++', 'Spring Boot', 'Django'];
        const skills = Array.from({ length: 3 + Math.floor(Math.random() * 3) }, () => skillSet[Math.floor(Math.random() * skillSet.length)]);

        // Unique skills
        const uniqueSkills = [...new Set(skills)];

        jobs.push({
            id: `job-${i}`,
            title: role,
            company: company,
            location: location,
            mode: mode as Job['mode'],
            experience: experience,
            skills: uniqueSkills,
            source: ['LinkedIn', 'Naukri', 'Indeed', 'Company Site'][Math.floor(Math.random() * 4)] as Job['source'],
            postedDaysAgo: Math.floor(Math.random() * 11), // 0-10
            salaryRange: salaryRange,
            applyUrl: 'https://www.linkedin.com/jobs', // Placeholder valid looking URL
            description: `We are looking for a passionate ${role} to join our engineering team at ${company}. You will be working on cutting-edge technologies and solving complex problems.\n\nKey Responsibilities:\n- Develop and maintain scalable applications.\n- Collaborate with cross-functional teams.\n- Write clean, maintainable code.\n\nRequirements:\n- Strong knowledge of ${uniqueSkills[0]} and ${uniqueSkills[1]}.\n- Problem-solving mindset.\n- Good communication skills.`
        });
    }

    // Sort by postedDaysAgo (latest first)
    return jobs.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
};

export const JOBS_DATA = generateJobs();
