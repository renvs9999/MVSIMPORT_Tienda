const express = require("express");
const cors = require("cors");
const mercadopago = require("mercadopago");

const app = express();

app.use(cors());
app.use(express.json());

mercadopago.configure({
  access_token: "TEST-ACCESS-TOKEN-AQUI"
});

app.post("/crear-preferencia", async (req, res) => {
  try {
    const preference = {
      items: [
        {
          title: "Producto MVSIMPORT",
          unit_price: 150.00,
          quantity: 1
        }
      ],
      back_urls: {
        success: "http://localhost:5500/index.html",
        failure: "http://localhost:5500/index.html",
        pending: "http://localhost:5500/index.html"
      },
      auto_return: "approved"
    };

    const response = await mercadopago.preferences.create(preference);

    res.json({ id: response.body.id });

  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log("🟢 Backend Mercado Pago activo en http://localhost:3000");
});
