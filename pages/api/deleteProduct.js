import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";


export default async(req, res) => {
	try {
		
		const client = await clientPromise;
		const db = client.db('products')
		const {id} = req.body

		const product = await db.collection('products').deleteOne({
			_id: ObjectId(id)
		})

		res.json({
			succes: "Delete Successfully",
			product: product
		})
	} catch (error) {
		console.error(error)
		throw new Error(error).message
		
	}
}