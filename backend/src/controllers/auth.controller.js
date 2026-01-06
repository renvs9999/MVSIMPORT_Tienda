exports.login = (req, res) => {
    const { username, password } = req.body;

    if (username === 'github9999' && password === 'git9999') {
        return res.json({
            success: true
        });
    }

    return res.status(401).json({
        success: false,
        message: 'Usuario o contraseña incorrectos'
    });
};
