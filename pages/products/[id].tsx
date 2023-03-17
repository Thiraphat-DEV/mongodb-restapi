import React, { useState } from 'react'
import Layout from '../../components/Layout'
import type { GetStaticPropsContext, GetStaticPropsResult } from 'next'

type PageParams = {
  id: String;
}

type ContentPageProps = {
  product: Products;
}
type Products = {
  _id: String;
  productName: String;
  price: String;
  thc: String;
  cbd: String;
}


type ResponseFromServer = {
  _id: String;
  productName: String;
  price: String;
  thc: String;
  cbd: String;
}

export async function getStaticProps({ params }: GetStaticPropsContext<PageParams>): Promise<GetStaticPropsResult<ContentPageProps>> {
  try {
    let response = await fetch('http://localhost:3000/api/getProduct?id=' + params?.id)
    let ResponseFromServer: ResponseFromServer = await response.json()

    return {
      props: {
        product: {
          _id: ResponseFromServer._id,
          productName: ResponseFromServer.productName,
          price: ResponseFromServer.price,
          thc: ResponseFromServer.thc,
          cbd: ResponseFromServer.cbd,
        }
      }
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        product: {
          _id: "",
          productName: "",
          price: "",
          thc: "",
          cbd: "",
        }
      }
    }

  }

}
export async function getStaticPaths() {
  let products = await fetch('http://localhost:3000/api/getProducts')
  let pathServer: [Products] = await products.json()

  return {
    paths: pathServer.map((product) => {
      return {
        params: {
          id: product._id
        }
      }
    }),
    fallback: false
  }
}
function EditProduct({
  product: {
    _id, productName, price, thc, cbd
  }
}: ContentPageProps) {
  const [productname, setProductname] = useState(productName)
  const [postPrice, setPostPrice] = useState(price)
  const [postThc, setPostThc] = useState(thc)
  const [postCbd, setPostCbd] = useState(cbd)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  const submitField = async (e: any) => {
    e.preventDefault();
    if (productname && price && thc && cbd) {
      try {
        let response = await fetch('http://localhost:3000/api/editProduct?id=' + _id, {
          method: 'POST',
          body: JSON.stringify({
            productname,
            postPrice,
            postThc,
            postCbd
          }),
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
          }
        })
        response = await response.json()

        setProductname("")
        setPostPrice("")
        setPostThc("")
        setPostCbd("")
        setError("")
        setMessage("Product Updated")

      } catch (errorMessage: any) {
        setError(errorMessage)

      }
    }

  }
  return (
    <Layout>
      <form className="form" onSubmit={submitField}>
        {error ?? <div className="alert-error">{error}</div>}
        {message ?? <div className="alert-message">{message}</div>}
        <div className="form-group">
          <label htmlFor="productname">ProductName</label>
          <input type="text" placeholder='Enter ProductName' value={productname ?? productname} onChange={(e) => setProductname(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input type="text" placeholder='Enter Price' value={postPrice ?? postPrice } onChange={(e) => setPostPrice(e.target.value)} />

        </div>
        <div className="form-group">
          <label htmlFor="thc">THC</label>
          <input type="text" placeholder='Enter THC' value={postThc ?? thc} onChange={(e) => setPostThc(e.target.value)} />

        </div>
        <div className="form-group">
          <label htmlFor="cbd">CBD</label>
          <input type="text" placeholder='Enter CBD' value={postCbd ?? cbd } onChange={(e) => setPostCbd(e.target.value)} />
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

export default EditProduct