import React, { useState } from 'react'

import Layout from '../../components/Layout'
function index() {
	const [productname, setProductname] = useState("")
	const [price, setPrice] = useState("")
	const [thc, setThc] = useState("")
	const [cbd, setCbd] = useState("")
	const [error, setError] = useState("")
	const [message, setMessage] = useState("")


	const submitField = async(e: any) => {
		e.preventDefault()

		if(productname &&price && thc && cbd) {
			try {
			let response = await fetch('http://localhost:3000/api/addProduct', {
				method: 'POST',
				body: JSON.stringify({
					productname,
					price,
					thc, 
					cbd
				}),
				headers: {
					Accept: "application/json, text/plain, */*",
					"Content-Type": "application/json"
				}
			})	
			
			response = await response.json()
			
			setProductname("")
			setPrice("")
			setThc("")
			setCbd("")
			setError("")
			setMessage("Product added")

			} catch (errorMessage: any) {
				setError(errorMessage)
				
			}
		}else {
			return setError("Required data Every fields");
		}

	}
	return (
		<Layout>
			<form className="form" onSubmit={submitField}>
				{error ?? <div className="alert-error">{error}</div>}
				{message ?? <div className="alert-message">{message}</div>}
				<div className="form-group">
					<label htmlFor="productname">ProductName</label>
					<input type="text" placeholder='Enter ProductName' value={productname} onChange={(e) => setProductname(e.target.value)}/>
				</div>
				<div className="form-group">
					<label htmlFor="price">Price</label>
					<input type="text" placeholder='Enter Price' value={price} onChange={(e) => setPrice(e.target.value)}/>

				</div>
				<div className="form-group">
					<label htmlFor="thc">THC</label>
					<input type="text" placeholder='Enter THC' value={thc} onChange={(e) => setThc(e.target.value)}/>

				</div>
				<div className="form-group">
					<label htmlFor="cbd">CBD</label>
					<input type="text" placeholder='Enter CBD' value={cbd} onChange={(e) => setCbd(e.target.value)}/>
				</div>
				<button type='submit'>Add Product</button>
			</form>

			<style jsx>
				{
					`
				.form {
					width: 500;
					margin: 10px auto;
				}

				.form-group {
					width: 100%;
					margin-bottom: 10px;
					display: block;
				}

				.form-group label {
					display: block;
					margin-bottom: 10px;
				}

				.form-group input[type="text"] {
					padding: 20px;
					width: 100%;
				}

				.alert-error {
					width: 100%;
					color: red;
					margin-bottom: 10px;
				}
	
				.alert-message{
					width: 100%;
					color: green;
					margin-bottom: 10px;
				}
		
			
				`

				}
			</style>
		</Layout>
	)
}

export default index
