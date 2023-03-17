import clientPromise from "../../lib/mongodb";


export default async(req, res) => {
	try {
		const client = await clientPromise;
		const db = client.db("products")
		const {productname, price, thc, cbd} = req.body

		const product = await db.collection('products').insertOne({
			productname,
			price,
			thc, 
			cbd
		})

		res.json(product)
	} catch (error) {
		console.error(error)
		throw new Error(error).message
		
	}
}