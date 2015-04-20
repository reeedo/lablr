import styles from './styles/main.styl'
import Router from './router'

window.app = {
	init () {
		this.router = new Router()
		/* if have more than one, create all first */
		/* one start for all routers */
		this.router.history.start()
	}
}

window.app.init()