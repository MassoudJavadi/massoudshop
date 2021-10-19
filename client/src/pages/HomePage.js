import React , {/*useState*/ useEffect} from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {useDispatch, useSelector} from 'react-redux'
// whole state is a big cloud, and to show a state from the "Whole state" we use a useSelector.before that, we have productList(piece of state) fetched, but couldn't show them in homepage.
import {Row, Col} from 'react-bootstrap'
import {Helmet} from 'react-helmet'


//import products  from '../products'
//At first, we fetch data from client folder, but after set backand, we want to request it from api. 
import Product from '../components/Product'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

//At fist, I fetched data from api, with axios here. but then, using redux productAction to do this.
import {listProducts} from '../actions/productActions'

//import axios from 'axios'

//We have global level and component level states in react. products is a global level and we work with that in redux, but here temporarily we see it as a component level state. 
//Forms and menues are component level state, but things like products, users , cart are global state redux. 
//Later, we make request with action creator in redux, but now, we do it directly.

export const HomePage = ({match}) => {

    const keyword = match.params.keyword
    const pageNumber= match.params.pageNumber || 1

    const dispatch = useDispatch()
    //***const [products, setPorducts] = useState([])
    //with class based components, we define state in constructor, but in functions we don't have constructor so we use usestate hook. 
    //!!! dispatch: fireing off and sending through reducer down to the state, useSelector: grab it(that piece of state from reducer) from state.
    const productList = useSelector( state => state.productList)
    const {loading,error,products , pages , page } = productList 

    //what we put in useEffect, runs as soon as the component(Here Homepage) loads. we want products to load as soon as homepage loads. 
    useEffect(()=>{
        dispatch(listProducts(keyword,pageNumber))
        //**1st fetched data here, Now redux productAction, do that. */
        // const fetchProducts = async ()=>{
        //     const {data} = await axios.get('/api/products')
        //     //we access to {data} from res.
        //     //For getting response, we set a proxy in package.json
        //     setPorducts(data) 
        // }
        
        // fetchProducts()

    },[dispatch,keyword,pageNumber])



    return (
        <>
        <Meta />
            {!keyword ? (
              <ProductCarousel />
            ) : (
              <Link to='/' className='btn btn-light'>
                Go Back
              </Link>
            )}
            <h1>Latest Products</h1>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <>
                <Row>
                  {products.map((product) => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product} />
                    </Col>
                  ))}
                </Row>
                <Paginate
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ''}
                />
              </>
            )}
            
        </>
    )
}
