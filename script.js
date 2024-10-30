document.getElementById('loginRegisterButton').addEventListener('click', function() {
  showTab('login'); // Show the login tab by default
});

function showTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  
  if (tab === 'login') {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
  } else {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
  }
}

document.getElementById('submitLogin').addEventListener('click', function() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  
  // Implement your login logic here (e.g., check against a database)
  console.log('Login Attempt:', username, password);
});

document.getElementById('submitRegister').addEventListener('click', function() {
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;
  
  // Implement your registration logic here (e.g., save to a database)
  console.log('Registration Attempt:', username, password);
});
