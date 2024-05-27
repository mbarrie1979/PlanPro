module.exports = {
  conferences: [
    {
      name: 'Web Dev Summit 2024',
      description: 'A summit for web development enthusiasts to learn and share knowledge.',
      startDate: new Date('2024-10-01'),
      endDate: new Date('2024-10-03'),
      location: '456 Web St, Dev City, DC 67890',
    },
    {
      name: 'JavaScript Con 2024',
      description: 'An annual conference focusing on JavaScript and its ecosystem.',
      startDate: new Date('2024-11-15'),
      endDate: new Date('2024-11-17'),
      location: '789 Script Ave, Code Town, CT 12345',
    },
    {
      name: 'Frontend Masters 2024',
      description: 'A conference dedicated to frontend development techniques and tools.',
      startDate: new Date('2024-12-05'),
      endDate: new Date('2024-12-07'),
      location: '101 Frontend Blvd, Design City, DC 67890',
    },
  ],
  sessions: [
    // Web Dev Summit 2024 sessions
    {
      name: 'Modern CSS Techniques',
      description: 'Learn about the latest CSS features and techniques.',
      presenters: ['Emily Smith', 'Robert Johnson'],
      date: new Date('2024-10-01'),
      // time: '09:00 AM',
      duration: 90,
      room: '101',
      users: []
    },
    {
      name: 'Advanced JavaScript Patterns',
      description: 'Explore advanced patterns in JavaScript programming.',
      presenters: ['Alice Brown', 'John Doe'],
      date: new Date('2024-10-01'),
      // time: '11:00 AM',
      duration: 60,
      room: '102',
      users: []
    },
    {
      name: 'Building Responsive Websites',
      description: 'Techniques for making websites responsive on all devices.',
      presenters: ['Michael Green', 'Sarah Lee'],
      date: new Date('2024-10-02'),
      // time: '10:00 AM',
      duration: 60,
      room: '201',
      users: []
    },
    {
      name: 'Web Security Essentials',
      description: 'Learn how to secure your web applications.',
      presenters: ['James White', 'Laura Black'],
      date: new Date('2024-10-02'),
      // time: '02:00 PM',
      duration: 90,
      room: '202',
      users: []
    },
    {
      name: 'Progressive Web Apps',
      description: 'Building performant and reliable Progressive Web Apps.',
      presenters: ['David Brown', 'Lisa Green'],
      date: new Date('2024-10-03'),
      // time: '09:00 AM',
      duration: 90,
      room: '301',
      users: []
    },
    {
      name: 'Deploying Web Applications',
      description: 'Best practices for deploying web applications.',
      presenters: ['Peter Grey', 'Nancy Red'],
      date: new Date('2024-10-03'),
      // time: '11:00 AM',
      duration: 60,
      room: '302',
      users: []
    },
    // JavaScript Con 2024 sessions
    {
      name: 'JavaScript ES2024 Features',
      description: 'A look at the new features in the latest JavaScript version.',
      presenters: ['Chris Blue', 'Katie Yellow'],
      date: new Date('2024-11-15'),
      // time: '09:00 AM',
      duration: 60,
      room: '401',
      users: []
    },
    {
      name: 'Node.js Performance Tuning',
      description: 'Improve the performance of your Node.js applications.',
      presenters: ['Eric Purple', 'Diana Violet'],
      date: new Date('2024-11-15'),
      // time: '11:00 AM',
      duration: 90,
      room: '402',
      users: []
    },
    {
      name: 'React State Management',
      description: 'State management strategies in React applications.',
      presenters: ['Sam Orange', 'Paul Magenta'],
      date: new Date('2024-11-16'),
      // time: '10:00 AM',
      duration: 60,
      room: '501',
      users: []
    },
    {
      name: 'Testing JavaScript Applications',
      description: 'Approaches and tools for testing JavaScript applications.',
      presenters: ['Tom Pink', 'Ella Maroon'],
      date: new Date('2024-11-16'),
      // time: '02:00 PM',
      duration: 90,
      room: '502',
      users: []
    },
    {
      name: 'Building RESTful APIs with Express',
      description: 'Learn how to build RESTful APIs using Express.',
      presenters: ['Nick Aqua', 'Olivia Cyan'],
      date: new Date('2024-11-17'),
      // time: '09:00 AM',
      duration: 60,
      room: '601',
      users: []
    },
    {
      name: 'Serverless Functions with AWS Lambda',
      description: 'Introduction to serverless functions using AWS Lambda.',
      presenters: ['Zoe Indigo', 'Aaron Navy'],
      date: new Date('2024-11-17'),
      // time: '11:00 AM',
      duration: 60,
      room: '602',
      users: []
    },
    // Frontend Masters 2024 sessions
    {
      name: 'Mastering Webpack',
      description: 'Advanced techniques for optimizing your build with Webpack.',
      presenters: ['Liam Brown', 'Sophia White'],
      date: new Date('2024-12-05'),
      // time: '09:00 AM',
      duration: 90,
      room: '701',
      users: []
    },
    {
      name: 'CSS Grid Layouts',
      description: 'Building complex layouts with CSS Grid.',
      presenters: ['Hannah Black', 'Jackson Green'],
      date: new Date('2024-12-05'),
      // time: '11:00 AM',
      duration: 60,
      room: '702',
      users: []
    },
    {
      name: 'Accessibility in Web Design',
      description: 'Ensuring your web designs are accessible to everyone.',
      presenters: ['Noah Grey', 'Emma Blue'],
      date: new Date('2024-12-06'),
      // time: '10:00 AM',
      duration: 60,
      room: '801',
      users: []
    },
    {
      name: 'JavaScript Frameworks Comparison',
      description: 'A comparison of popular JavaScript frameworks.',
      presenters: ['Olivia Red', 'Lucas Cyan'],
      date: new Date('2024-12-06'),
      // time: '02:00 PM',
      duration: 90,
      room: '802',
      users: []
    },
    {
      name: 'Animations with CSS and JavaScript',
      description: 'Creating animations using CSS and JavaScript.',
      presenters: ['Mia Yellow', 'Ethan Pink'],
      date: new Date('2024-12-07'),
      // time: '09:00 AM',
      duration: 90,
      room: '901',
      users: []
    },
    {
      name: 'Web Development with Vue.js',
      description: 'Building web applications with Vue.js.',
      presenters: ['Aiden Purple', 'Ava Orange'],
      date: new Date('2024-12-07'),
      // time: '11:00 AM',
      duration: 60,
      room: '902',
      users: []
    },
  ],
  users: [
    { username: 'Alice Johnson', email: 'alice@example.com', phone: '555-555-5555', password: 'securepassword123', savedSessions: [] },
    { username: 'Bob Smith', email: 'bob@example.com', phone: '555-555-5556', password: 'securepassword123', savedSessions: [] },
    { username: 'Carol Williams', email: 'carol@example.com', phone: '555-555-5557', password: 'securepassword123', savedSessions: [] },
    { username: 'David Brown', email: 'david@example.com', phone: '555-555-5558', password: 'securepassword123', savedSessions: [] },
    { username: 'Eve Davis', email: 'eve@example.com', phone: '555-555-5559', password: 'securepassword123', savedSessions: [] },
    { username: 'Frank Miller', email: 'frank@example.com', phone: '555-555-5560', password: 'securepassword123', savedSessions: [] },
    { username: 'Grace Wilson', email: 'grace@example.com', phone: '555-555-5561', password: 'securepassword123', savedSessions: [] },
    { username: 'Hank Moore', email: 'hank@example.com', phone: '555-555-5562', password: 'securepassword123', savedSessions: [] },
    { username: 'Ivy Taylor', email: 'ivy@example.com', phone: '555-555-5563', password: 'securepassword123', savedSessions: [] },
    { username: 'Jack Anderson', email: 'jack@example.com', phone: '555-555-5564', password: 'securepassword123', savedSessions: [] },
    { username: 'Kimberly Thomas', email: 'kimberly@example.com', phone: '555-555-5565', password: 'securepassword123', savedSessions: [] },
    { username: 'Liam Harris', email: 'liam@example.com', phone: '555-555-5566', password: 'securepassword123', savedSessions: [] },
    { username: 'Mia Clark', email: 'mia@example.com', phone: '555-555-5567', password: 'securepassword123', savedSessions: [] },
    { username: 'Noah Lewis', email: 'noah@example.com', phone: '555-555-5568', password: 'securepassword123', savedSessions: [] },
    { username: 'Olivia Lee', email: 'olivia@example.com', phone: '555-555-5569', password: 'securepassword123', savedSessions: [] },
    { username: 'Peter Walker', email: 'peter@example.com', phone: '555-555-5570', password: 'securepassword123', savedSessions: [] },
    { username: 'Quinn Hall', email: 'quinn@example.com', phone: '555-555-5571', password: 'securepassword123', savedSessions: [] },
    { username: 'Rachel Allen', email: 'rachel@example.com', phone: '555-555-5572', password: 'securepassword123', savedSessions: [] },
    { username: 'Steve Young', email: 'steve@example.com', phone: '555-555-5573', password: 'securepassword123', savedSessions: [] },
    { username: 'Tina King', email: 'tina@example.com', phone: '555-555-5574', password: 'securepassword123', savedSessions: [] },
  ],
};
