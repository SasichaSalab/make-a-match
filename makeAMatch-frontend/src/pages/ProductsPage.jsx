import { React, useState, useEffect } from 'react'
import HeadTitle from '../components/HeadTitle'
import ProductFilter from '../components/ProductFilter'
import ProductList from '../components/ProductList'
import Pagination from '../components/Pagination'
import { fetchProducts ,fetchProductsByTag} from '../api';

const ProductsPage = () => {
    const [productData, setProductData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [loading, setLoading] = useState(true); // Add loading state
    const [value, setValue] = useState(0);
    const fetchData = async () => {
        setLoading(true); // Set loading to true before fetching data
        try {
            const products = await fetchProducts();
            setProductData(products);
            if(value===1){
                const h = await fetchProductsByTag("HAT");
                setProductData(h);
            }
            else if(value===2){
                const s = await fetchProductsByTag("SHIRT");
                setProductData(s);
            }
            else if(value===3){
                const p = await fetchProductsByTag("PANTS");
                setProductData(p);
            }
            else if(value===4){
                const sh = await fetchProductsByTag("SHOES");
                setProductData(sh);
            }
          
          setPostsPerPage(10);
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setLoading(false); // Set loading to false after data is fetched or in case of error
        }
      };
    useEffect(() => {
        fetchData();
    }, [value]);


    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = productData.slice(firstPostIndex, lastPostIndex);
    return (
        <div className='top-0 left-0 w-full h-screen flex flex-col z-50 items-start justify-start'>
            <HeadTitle title={"ALL PRODUCTS"} backPath={"/"} />
            <div className='w-full flex flex-row items-start justify-start h-full'>
                <div className='w-1/6 bg-slate-200 flex flex-col items-start justify-center gap-2 rounded-lg'>
                    <ProductFilter valueFilter={setValue}/>
                </div>
                <div className='w-5/6 h-full bg-white p-2 flex flex-col items-center'>
                    <div className='w-full'>
                        {loading ? (
                            <div>Loading... // Show loading indicator while data is being fetched</div>
                        ) : (
                            <div className='flex flex-row items-center w-full'>
                                <ProductList productData={currentPosts} fetchData={fetchData} />
                            </div>
                        )}
                    </div>
                    <Pagination totalPost={productData.length}
                        postPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
                </div>
            </div>
        </div>
    )
}

export default ProductsPage