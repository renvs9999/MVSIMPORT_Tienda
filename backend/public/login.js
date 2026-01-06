document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            // ✅ RUTA ABSOLUTA (LA CLAVE)
            window.location.href = '/frontend/index.html';
        } else {
            document.getElementById('error').innerText = 'Credenciales incorrectas';
        }

    } catch (error) {
        document.getElementById('error').innerText = 'Error al conectar con el servidor';
    }
});
