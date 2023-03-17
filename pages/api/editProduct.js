import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("products");
    const { id } = req.query;
    const { productname, price, thc, cbd } = req.body;
    const productUpdate = await db.collection("products").updateOne(
      {
        _id: ObjectId(id),
      },
      {
        $set: {
          productname: productname,
          price: price,
          thc: thc,
          cbd: cbd,
        },
      }
    );

    res.json(productUpdate)
  } catch (error) {
    console.error(error);
    throw new Error(error).message;
  }
};
