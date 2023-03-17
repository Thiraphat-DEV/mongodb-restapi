import React from 'react'
import styles from './styles/Nav.module.css';
function Nav() {
	return (
		<nav className={styles.navbar}>
			<div className={styles.navItems}>
				<ul>
					<li>
						<a href='/'>My Products</a>
					</li>
					<li>
						<a href='/products'>Add Product</a>
					</li>
				</ul>
			</div>
		</nav>
	)
}

export default Nav