
import app from './index.js'
const PORT = process.env.BACKEND_PORT || 3000;
console.log(PORT)
app.listen(PORT, () => {
    console.log('Server running on http://localhost:' + PORT);
    console.log('Press Ctrl+C to terminate...');
});