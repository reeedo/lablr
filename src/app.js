import styles from './styles/main.styl'
import Router from './router'
import app from 'ampersand-app'

app.extend({
	init () {
		this.router = new Router()
		/* if have more than one, create all first */
		/* one start for all routers */
		this.router.history.start()
	}
})

app.init()

/* create global for ease of access */
window.app = app