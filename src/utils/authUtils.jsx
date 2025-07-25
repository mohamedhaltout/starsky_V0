import usersData from '../data/users.json';

export const registerUser = (username, password) => {
  const userExists = usersData.some(user => user.username === username);
  if (userExists) {
    return { success: false, message: 'Username already exists.' };
  }

  const newUser = { username, password };
  usersData.push(newUser);
  // In a real application, you would save this to a backend/database.
  // For this example, we're just modifying the in-memory array.
  // To persist, you'd need a server-side solution to write to users.json.
  console.log('Registered users:', usersData);

  const users = JSON.parse(localStorage.getItem('users')) || {};
  users[username] = { savedWebsites: [] };
  localStorage.setItem('users', JSON.stringify(users));

  return { success: true, message: 'Registration successful!' };
};

export const logoutUser = () => {
  localStorage.removeItem('currentUser');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return user ? JSON.parse(user) : null;
};

export const loginUser = (username, password) => {
  const user = usersData.find(user => user.username === username && user.password === password);
  if (user) {
    localStorage.setItem('currentUser', JSON.stringify({ username: user.username }));
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (!users[username]) {
      users[username] = { savedWebsites: [] };
      localStorage.setItem('users', JSON.stringify(users));
    }
    return { success: true, message: 'Login successful!' };
  } else {
    return { success: false, message: 'Invalid username or password.' };
  }
};

export const saveUserWebsite = (username, websiteData) => {
  let users = JSON.parse(localStorage.getItem('users')) || {};
  if (Array.isArray(users)) {
    console.warn("localStorage 'users' key contains an array. Resetting to empty object for saving.");
    users = {}; // Reset to empty object if it's an array
  }
  if (!users[username]) {
    users[username] = { savedWebsites: [] };
  }
  console.log("Before saving to localStorage, users object:", users);
  users[username].savedWebsites.push(websiteData);
  localStorage.setItem('users', JSON.stringify(users));
  console.log("After saving to localStorage, users object:", JSON.parse(localStorage.getItem('users')));
};

export const getUserWebsites = (username) => {
  let users = JSON.parse(localStorage.getItem('users')) || {};
  if (Array.isArray(users)) {
    console.warn("localStorage 'users' key contains an array. Resetting to empty object for retrieval.");
    users = {}; // Reset to empty object if it's an array
  }
  console.log("Retrieving websites for user:", username, "from users object:", users);
  const userWebsites = users[username] ? users[username].savedWebsites : [];
  console.log("Retrieved websites:", userWebsites);
  return userWebsites;
};

export const updateUserWebsite = (username, websiteId, updatedWebsiteData) => {
  let users = JSON.parse(localStorage.getItem('users')) || {};
  if (Array.isArray(users)) {
    console.warn("localStorage 'users' key contains an array. Resetting to empty object for update.");
    users = {}; // Reset to empty object if it's an array
  }
  if (users[username]) {
    const index = users[username].savedWebsites.findIndex(website => website.id === websiteId);
    if (index !== -1) {
      users[username].savedWebsites[index] = updatedWebsiteData;
      localStorage.setItem('users', JSON.stringify(users));
      return true;
    }
  }
  return false;
};

export const deleteUserWebsite = (username, websiteId) => {
  let users = JSON.parse(localStorage.getItem('users')) || {};
  if (Array.isArray(users)) {
    console.warn("localStorage 'users' key contains an array. Resetting to empty object for deletion.");
    users = {}; // Reset to empty object if it's an array
  }
  if (users[username]) {
    users[username].savedWebsites = users[username].savedWebsites.filter(website => website.id !== websiteId);
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }
  return false;
};