const API_URL = 'http://localhost:5000/api';

// Configurer Axios pour envoyer le token automatiquement
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Vérifier la session au chargement
function checkSession() {
  const token = localStorage.getItem('token');
  if (token) {
    axios.get(`${API_URL}/auth/profile`)
      .then(() => {
        if (window.location.pathname.includes('login') || window.location.pathname.includes('register')) {
          window.location.href = '/pages/dashboard.html';
        }
      })
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      });
  }
}

// Inscription
async function register(fullname, email, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      fullname, email, password
    });
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    window.location.href = '/pages/dashboard.html';
  } catch (error) {
    alert(error.response?.data?.message || 'Erreur lors de l\'inscription');
  }
}

// Connexion
async function login(email, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email, password
    });
    
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    window.location.href = '/pages/dashboard.html';
  } catch (error) {
    alert(error.response?.data?.message || 'Erreur lors de la connexion');
  }
}

// Déconnexion
function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/index.html';
}

// Vérifier au chargement de chaque page
document.addEventListener('DOMContentLoaded', checkSession);