import 'module-alias/register'
import { setupApp } from '@/main/config'

const app = setupApp()
app.listen(5050, () => { console.log('Server running at http://localhost:5050') })
