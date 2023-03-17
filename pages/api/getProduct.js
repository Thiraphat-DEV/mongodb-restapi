import clientPromise from '../../lib/mongodb'
import {ObjectId} from 'mongodb'


export default async (req, res) => {
	try {
		const client = await clientPromise;
		const db = client.db('products')
		const {id} = req.query;

		const product = await db.collection('products').findOne({
			_id: ObjectId(id)
		})

		res.json(product)
	} catch (error) {
		console.error(error)
		throw new Error(error).message  
		
	}
}