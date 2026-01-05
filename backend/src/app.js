const express = require('express');
const path = require('path');

const authRoutes = require('./routes/auth.routes');

const app = express();
const PORT = 3000;

// ================= MIDDLEWARE =================
app.use(express.json());

//================= LOGIN (PUBLIC) =================
app.use(express.static(path.join(__dirname, '..', 'public')));

//================= TIENDA (FRONTEND) =================
app.use('/tienda', express.static(
    path.join(__dirname, '..', '..', 'frontend')
));

//================= API =================
app.use('/api/auth', authRoutes);

//================= RUTAS =================

//LOGIN COMO RAIZ
app.get('/', (req, res) => {
    res.sendFile(
        path.join(__dirname, '..', 'public', 'login.html')
    );
});

//================= SERVER =================
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
