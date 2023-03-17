import Layout from '../components/Layout'
import { useState } from 'react'

type Props = {
  products: [Products]
}

type Products = {
  _id: String;
  productName: String;
  price: String;
  thc: String;
  cbd: String;
}
export async function getServerSideProps() {
  try {
    let response = await fetch('http://localhost:3000/api/getProducts')
    let product = await response.json()

    return {
      props: { products: JSON.parse(JSON.stringify(product)) }
    }


  } catch (e) {
    console.error(e);
  }
}

export default function Home(props: Props) {

  const [products, setProducts] = useState<[Products]>(props.products)

  const deleteProduct = async (productId: string) => {
    try {
      let response = await fetch('http://localhost:3000/api/deleteProduct?id=' + productId, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        }
      })
      response = await response.json()
      window.location.reload();

    } catch (error) {
      console.log("Cannot Delete Product")

    }

  }
  return (
    <div className="container">
      <Layout>
        <div className="product-body">
          <h1 className='product-heading'>Top 20 Products</h1>
          {products?.length > 0 ? (
            <ul className='product-list'>
              {products.map((product, idx) => (
                <li key={idx} className='product-item'>
                  <div className="product-item-detail">
                    <h2>{product.productName}</h2>
                    <h2>{product.price}</h2>
                    <h2>{product.thc}</h2>
                    <h2>{product.cbd}</h2>
                  </div>

                  <div className="product-item-action">
                    <a href={`/products/${product._id}`}>Edit</a>
                    <button onClick={() => deleteProduct(product._id as string)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <h1>No Product on your database</h1>
          )}
        </div>


      </Layout>
      <style jsx>{`

       
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .subtitle {
          font-size: 2rem;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
