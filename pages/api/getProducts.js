import clientPromise from '../../lib/mongodb';

export default async(req, res) => {
	try {
		
		const client = await clientPromise;
		const db = client.db('products')
		const products = await db.collection('products').find({}).limit(40)
		res.json(products)
	} catch (error) {
		console.error(error)
		throw new Error(error).message
		
	}
}