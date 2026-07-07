import { Initiative, Testimonial, WallNote } from './types';

export const INITIATIVES_DATA: Initiative[] = [
  {
    id: 'seva',
    title: 'Project SEVA',
    category: 'HEALTHCARE',
    tag: 'Healthcare',
    description: 'Providing critical medical assistance and emergency care to rural communities with limited access to facilities.',
    detailedDescription: 'Project SEVA brings high-quality medical services directly to underserved and remote villages through advanced mobile health clinics. By organizing specialized weekly camps, deploying full-time community nurse networks, and bridging transport gaps to district hospitals, we secure essential health rights for everyone. Our efforts focus on primary diagnosis, critical maternal care, childhood vaccinations, and emergency stabilization.',
    iconName: 'HeartPulse',
    objectives: [
      'Deploy 12 fully equipped mobile medical clinics across remote districts.',
      'Provide free healthcare access and diagnostic tests to over 15,000 villagers annually.',
      'Establish a 24/7 localized rural medical transport network for emergencies.',
      'Organize intensive maternal & neonatal wellness education workshops.'
    ],
    metrics: [
      { label: 'Camps Held', value: '340+' },
      { label: 'Doctors Engaged', value: '45+' },
      { label: 'Free Prescriptions', value: '18,500+' }
    ],
    targetGoal: 45000,
    raisedFunds: 38200,
    volunteersCount: 78,
    updates: [
      { date: '2026-06-15', title: 'New Mobile Clinic Deployed', content: 'We successfully launched our fourth mobile clinic unit in the Satpura valley region, serving 14 tribal hamlets.' },
      { date: '2026-05-20', title: 'Mega Health Camp Success', content: 'Our seasonal healthcare camp treated 1,200 individuals over 3 days, providing free vision checkups and cataract surgeries.' }
    ]
  },
  {
    id: 'bachpanshala',
    title: 'Project BACHPANSHALA',
    category: 'EDUCATION',
    tag: 'Education',
    description: 'Revolutionizing primary education through digital literacy and creative learning centers for underprivileged children.',
    detailedDescription: 'Project BACHPANSHALA converts traditional learning spaces into vibrant, tech-enabled digital play-schools. We empower children from low-income communities with tablets, smart boards, and customized visual curricula to foster critical thinking, coding skills, and language literacy. Beyond academics, our curriculum integrates arts, environmental science, and emotional resilience training.',
    iconName: 'GraduationCap',
    objectives: [
      'Establish 20 digital smart classrooms in low-resource primary schools.',
      'Distribute individual learning tablets to over 2,500 primary students.',
      'Train regional educators in visual, game-based learning methodologies.',
      'Achieve a 98% primary-school retention rate in our target blocks.'
    ],
    metrics: [
      { label: 'Centers Built', value: '18' },
      { label: 'Classroom Tablets', value: '480+' },
      { label: 'Trained Teachers', value: '64' }
    ],
    targetGoal: 60000,
    raisedFunds: 54100,
    volunteersCount: 112,
    updates: [
      { date: '2026-06-28', title: 'Tech Lab Inauguration', content: 'Opened our newest smart-lab in Mumbai Outer region, enabling digital skills for 300 students.' },
      { date: '2026-05-10', title: 'Summer Reading Camp', content: 'Over 400 children completed our intensive 4-week literacy camp with double-digit reading fluency improvements.' }
    ]
  },
  {
    id: 'prakriti',
    title: 'Project PRAKRITI',
    category: 'ENVIRONMENT',
    tag: 'Environment',
    description: 'Large-scale afforestation and sustainable waste management initiatives to protect our local ecosystems.',
    detailedDescription: 'Project PRAKRITI defends local biodiversity through strategic urban afforestation, seed-bombing, and grassroots community-led waste recycling. We build localized community compost units, mobilize regular city-wide cleanups, and run clean-energy programs to reverse climate degradation. Our core goal is to rebuild native green canopies while designing sustainable pathways for zero-waste neighborhoods.',
    iconName: 'Leaf',
    objectives: [
      'Plant and preserve 50,000 native saplings in urban and degraded forest blocks.',
      'Establish community-run solid waste segregation units in 15 residential wards.',
      'Train 5,000 households in native tree care and home composting methods.',
      'Recover and clean 25 regional waterbodies and lakes from plastic debris.'
    ],
    metrics: [
      { label: 'Trees Planted', value: '42,000+' },
      { label: 'Plastic Recycled', value: '25 Tons' },
      { label: 'Waterbodies Cleaned', value: '18 Lakes' }
    ],
    targetGoal: 35000,
    raisedFunds: 29500,
    volunteersCount: 220,
    updates: [
      { date: '2026-06-05', title: 'World Environment Day Drive', content: 'Our volunteers successfully planted 4,500 native saplings across three lake perimeters in a single morning.' },
      { date: '2026-04-18', title: 'Composting Units Live', content: 'Partnered with local authorities to setup 5 localized community composting plants, keeping 2 tons of wet waste out of landfills.' }
    ]
  },
  {
    id: 'vikas',
    title: 'Project VIKAS',
    category: 'DEVELOPMENT',
    tag: 'Development',
    description: 'Fueling community growth through skill training programs and micro-entrepreneurship support for youth.',
    detailedDescription: 'Project VIKAS unlocks economic potential by providing state-of-the-art technical, vocational, and digital skill training. We mentor youth in advanced fields like modern electrical engineering, cloud computing basics, digital marketing, and tailoring. In addition, we grant micro-seed capital, credit facilities, and business coaching to help local startups scale, promoting regional job creation.',
    iconName: 'Sparkles',
    objectives: [
      'Graduate 1,500 young adults from our certified vocational training paths.',
      'Incentivize and fund 100+ micro-businesses with low-interest microloans.',
      'Establish 3 permanent innovation incubation centers for regional creators.',
      'Provide career counseling and industry placement matching for all graduates.'
    ],
    metrics: [
      { label: 'Graduates Placed', value: '88%' },
      { label: 'Startups Funded', value: '112' },
      { label: 'Training Hours', value: '15k+' }
    ],
    targetGoal: 50000,
    raisedFunds: 41200,
    volunteersCount: 65,
    updates: [
      { date: '2026-06-10', title: 'Incubator Launch in Pune', content: 'We successfully inaugurated our third vocational skill laboratory with specialized computer labs and tailoring bays.' },
      { date: '2026-05-15', title: 'Micro-grants Distributed', content: 'Awarded seed-stage micro-grants to 22 women-led microenterprises specializing in eco-friendly textiles.' }
    ]
  },
  {
    id: 'jeev',
    title: 'Project JEEV',
    category: 'ANIMALS',
    tag: 'Animals',
    description: 'A dedicated animal welfare program focused on rescue, rehabilitation, and street animal vaccination drives.',
    detailedDescription: 'Project JEEV addresses the severe lack of veterinary support and safety for stray and domestic animals. We run 24/7 rescue ambulances, administer emergency trauma care, perform street sterilization drives, and host vaccination clinics. Through our active neighborhood education camps and safe adoption portals, we replace fear with shared compassion, creating harmony between communities and street animals.',
    iconName: 'Heart',
    objectives: [
      'Rescue, treat, and rehabilitate over 3,000 injured street animals annually.',
      'Conduct regular anti-rabies vaccination drives covering 10,000 animals.',
      'Achieve 100% sterilization targets in our core municipal zones.',
      'Facilitate 500+ happy domestic adoptions through interactive visual campaigns.'
    ],
    metrics: [
      { label: 'Animals Rescued', value: '4,800+' },
      { label: 'Vaccinated', value: '12,500+' },
      { label: 'Successful Adoptions', value: '380+' }
    ],
    targetGoal: 30000,
    raisedFunds: 21400,
    volunteersCount: 95,
    updates: [
      { date: '2026-07-02', title: 'Monsoon Care Campaign', content: 'Established temporary dry shelters and distributed reflective high-visibility collars for 800 street dogs.' },
      { date: '2026-05-25', title: 'Mobile Vet Clinic Online', content: 'A custom veterinary ambulance is now fully active, dealing with on-site minor injuries and medical emergencies.' }
    ]
  },
  {
    id: 'udaan',
    title: 'Project UDAAN',
    category: 'EMPOWERMENT',
    tag: 'Empowerment',
    description: 'Empowering women through vocational training, health education, and financial literacy workshops.',
    detailedDescription: 'Project UDAAN creates safe, supportive spaces where women can gain complete personal, economic, and social independence. We deliver practical training in advanced design, organic farming, artisan manufacturing, and tech-focused jobs. We also offer financial literacy training, self-defense courses, legal workshops, and maternal wellness coaching, allowing women to become leaders within their communities.',
    iconName: 'Star',
    objectives: [
      'Train 2,000 women in digital banking, tax management, and business planning.',
      'Fund 150 community-run self-help groups (SHGs) to enable shared savings.',
      'Conduct 100+ public health, menstrual hygiene, and nutrition seminars.',
      'Incubate women-led cooperative networks to sell direct-to-consumer goods.'
    ],
    metrics: [
      { label: 'Women Skilled', value: '3,200+' },
      { label: 'Self Help Groups', value: '140+' },
      { label: 'Hygiene Kits Shared', value: '15,000' }
    ],
    targetGoal: 55000,
    raisedFunds: 49800,
    volunteersCount: 140,
    updates: [
      { date: '2026-06-20', title: 'Organic Farming Cooperative', content: 'Thirty-two women in Project Udaan co-founded a vegetable agricultural collective, supplying local organic stores directly.' },
      { date: '2026-05-08', title: 'Financial Literacy Graduation', content: 'Over 250 self-help group leaders graduated from our advanced financial planning course, enabling local digital banking.' }
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Rahul Sharma',
    role: 'Lead Volunteer, Delhi',
    feedback: '"Volunteering with InAmigos changed my perspective on impact. Their projects are remarkably organized and genuinely help the communities they target."',
    stars: 5,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnxhXieMRzUc1tAUJFOqyqYSe0L1xH88VnXDbqX-56-bEbKn6hWmcr0mFwfWEwV2pOjVIo3r8EjdomT8k9KlnCvwNCSTXFRpry_OsmBqoJl_Ka_v4i8GddYiqF-bDHE4zORB-vVSq1KNSjKfyGRaieWW42t9KoUnVHMzT6yABI0u1Nv1ow3DAwmUQv5Uk5lWMeQDi29G-Wa7kHpk8Nf96XcJWIfPUZYxg3vjP8T9POIG_sZ5sKAdCxLQ'
  },
  {
    id: 't2',
    name: 'Ananya Patel',
    role: 'CSR Head, Partner Corp',
    feedback: '"Project UDAAN has been a blessing. Seeing the women in our neighborhood gain financial independence is the most rewarding experience I\'ve ever had."',
    stars: 5,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiOoVKaZc1cGj30MSNl5oXrlbdDc2b_dobXCsPEtafbDApUS4XRPsr7ClaKFwMzIXdH1UufrHH2JwP4g_7dC25hdXixiDo9_GCQI4k6ho6NtTd_70X3WgtSHmrPkwN0v4WHB0wnR9PtiASert3q8qwJbCY-3staa-J0XVwVlCmP2jazKwVI4q4Xy_2DMtVaWQtJroK76nQzHH4rB_aTVlcJSsVTEhQ_MOiCq6NxvCxvHVzY6OaPeiaDQ'
  },
  {
    id: 't3',
    name: 'Dr. Vikram Singh',
    role: 'Recurring Donor',
    feedback: '"The transparency they offer is unmatched. I know exactly where my donation goes, and I receive regular updates on the children I\'m supporting."',
    stars: 5,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArA_OCSxQbcgDjof0zzWu9WjlBTUzjHr3DbCWuM4IiG0apXH6p-XLiFONwaNwUfsLVmbQN5aQEgsGqGmo1h9uiPH6wEBLj5BGUJYPvlrFsu2mtyVtVgHfzKxwo6s8mBnyfszA9BdJLanG3qomQPx-IYKtvgnDTjJo76KWOmBrJK52K_kfJpZMhUvncyvhwLuK7VM3zgVuacaSKABBXqujZ8wcMTNSj_8hl3Dz17Ovll8MNW-jgpceCUg'
  }
];

export const GALLERY_IMAGES = [
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC1ZprkNFh82p5CW-uZjeto1JjqimCMQrqsZXZfHneoJVR6rRPtGpyFbFaazpI_lCr7pdJ6fir9nAthiCeMRtu7SUoCqACWeeFN8akrkVuEexLgurPICxSdrI_HlV-vRyCF_n4X_v8qoTHdc0y5fcPDVuy2DmM8zQ8jtQwSVj81gfTnRI7iYt-v0eU2eSUtGjW3uvMDHHUIksPHl85rWMnkVaZIiUwQ7PT92vaVTc5Jq4YuQvosqcChCg',
    caption: 'Student in a rural classroom receiving a digital tablet for Project BACHPANSHALA.',
    category: 'EDUCATION'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx4ASnbyRh6NuE20Ymb9gARa1RVOJfGyW2lYL5KmjHDlDrls56Sg2gbtkeVfOaZ-vcPrNBSVsdfM0TlsuNlldZ_FrPwIvzC1qLUksQFb-wLybRdnZYbknXn5k9fsksczRXP5WMYdU634kaAzQsWte5qiJ0o22CugbSNnBa7oUyV5IjI_d5MzIPZYMFYOnfCFXnHG0-l9V1nEFBCicg3GHtJnekxPriCfQNHCD29ZAFhAb7i6gFggOjZA',
    caption: 'Volunteers in high-visibility vests planting native saplings for Project PRAKRITI.',
    category: 'ENVIRONMENT'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB14A5mOnwwRK5wRszH768ykUJHOyWzvL8J7YXxq4dejFqMJwftExVXVgxNlW9P-i1x4T4lwhV8Amo0LmVyOFupgqS0GFzVmdTdw3Gbv40V_PEM5TezzLs4Z8HBKXz9BhsMF0x2lm8t6CgNm8UgHSRSma3FrVL92K1vVjJMrAAsnUzOQwYTmO5uSfdyCKTuiFVoktS2OPExeB9WLSnPBsc3TMCkFIedMQlGtZkSj0lFRnOxODaxPc1U0Q',
    caption: 'Healthcare worker checking vitals at a mobile diagnosis camp for Project SEVA.',
    category: 'HEALTHCARE'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBSsBHxVrJODUga0i8us2OPl66uo2n5l3kqQZ_d6ypOCsUM8m0HlHbQQPoO-krxiLyOXG6y7eqbhnXetY1urufmD0-HgX12FSSBzexP8GdsS79zzpXEbSF6BYHShIufHtu4CaFdUT5PURGKuICY4L3Eehal1mz80eOdq46jsNu3hBf3hEtermIVqsaa3-YFlB4FyF2TwOLlwJ9HWPrfH2yYmVAWGU6R7uC7EfTBE0guTtlunm8BgHOsTA',
    caption: 'Vocational graduates holding certificates at our empowerment center for Project UDAAN.',
    category: 'EMPOWERMENT'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC38Jy6PqQKI_wl9iMyhBRPL4tT5fcCULEEGwPRvh16Ip-5VJyiY4pbRfwQDkbHJQQdgUEMQ95JiiEhC-Mf9JToO9TsHlT1d9WwQGN2vqQ3QjbGd6qYoivxC9hz47Isn6FX_LlhWIqkqCpNr2mJ2Swc5pEdKkIFeTWUdUyJ4bqh0Evd_0bIHy8xfFIb5GV8uk8mU4GE7mGpYF6gjFw3PvK11pDX1aZ3XN7pHxoLNk0SAxXDyZ-Uk37oMQ',
    caption: 'A rescue animal receiving comfort and healthcare from shelter volunteers for Project JEEV.',
    category: 'ANIMALS'
  },
  {
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFTQTImqDMA1ipXm4DLFjR-4Hv2vG-REIFMkrHWOXa9SouoqweM3eeyudTaYuUoToSYDwQlg-ZKKQqo_pcl9QUwhYIyray7lbIwPdf2zWzQ_ix8bVpM9Kyud-O2xvzzi0WbzO32bkLKt4RMtIAUvHxyzyfiXWyJ5GSX1y-ZLqzgarXgkqupJsIvjwpm0wYsY6qhwNksoq1-APaPTqEUHOQZT5LyajwJXStvBDijwZx45IsYKe42vaDPA',
    caption: 'Overhead view of a cooperative community clean-up drive managed by Project PRAKRITI.',
    category: 'ENVIRONMENT'
  }
];

export const WALL_NOTES_DEFAULT: WallNote[] = [
  { id: 'wn1', name: 'Kabir & Saira', message: 'Absolutely incredible work, Project Seva! Seeing healthcare reach the furthest villages fills our hearts with pride.', colorIndex: 0, date: '2026-07-01' },
  { id: 'wn2', name: 'Meera Rao', message: 'Project Bachpanshala transformed the village school completely. The kids love the learning tablets!', colorIndex: 1, date: '2026-06-25' },
  { id: 'wn3', name: 'Amit Verma', message: 'Planted 15 saplings last Sunday with Prakriti. Seamlessly organized and very satisfying!', colorIndex: 2, date: '2026-07-04' },
  { id: 'wn4', name: 'Prof. J. Mathew', message: 'Transparent reporting makes InAmigos my absolute number one choice for philanthropic contributions. Deep respect.', colorIndex: 3, date: '2026-06-30' }
];
