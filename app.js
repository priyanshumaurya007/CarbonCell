const express = require('express');
const app = express();
const authRoutes = require('./Routes/authRoutes');
const apiRoutes = require('./Routes/apiRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerConfig');

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/api/v1', apiRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
