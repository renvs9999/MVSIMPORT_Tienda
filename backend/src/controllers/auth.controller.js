exports.login = (req, res) => {
    const { username, password } = req.body;

    if (username === 'github9999' && password === 'git9999') {
        return res.json({
            success: true,
            redirect: '/tienda'
        });
    }

    return res.status(401).json({
        success: false,
        message: 'Usuario o contraseña incorrectos'
    });
};
