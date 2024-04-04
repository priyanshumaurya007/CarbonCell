const express = require('express');
const app = express();
const authRoutes = require('./Routes/auth.routes');
const taskRoutes = require('./Routes/task.routes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./swaggerConfig');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

app.use(express.json());

app.use('/auth', authRoutes);

app.use('/api/v1', taskRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
