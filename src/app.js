import styles from './styles/main.styl'
/* need to specify relative path to get it from node-modules because this is css file */
import icons from 'octicons/octicons/octicons.css'
import Router from './router'
import app from 'ampersand-app'
import Me from './models/me'

app.extend({
	init () {
		/* create/init user model. This acquires any existing auth token */
		this.me = new Me()
		/* get user info */
		this.me.fetchAll()
		this.router = new Router()
		/* if have more than one, create all first */
		/* one start for all routers */
		this.router.history.start()
	}
})

app.init()

/* create global for ease of access */
window.app = app