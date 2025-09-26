import app from './app.js';
import { PORT } from './config/env.js';
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port : http://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map