import { React, useState, useEffect } from 'react'
import HeadTitle from '../components/HeadTitle'
import ProductList from '../components/ProductList'
import Pagination from '../components/Pagination'
import FavoriteFilter from '../components/FavoriteFilter'
import { fetchFavoriteApi } from '../api'

const FavoritePage = () => {
    const [productData, setProductData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(10);
    const [loading, setLoading] = useState(true); // Add loading state
    const fetchData = async () => {
        setLoading(true); // Set loading to true before fetching data
        setPostsPerPage(10);
        try {
            const products = await fetchFavoriteApi();
            const data = products.map(item => item.product);
            console.log(data)
            setProductData(data);
            setLoading(false); // Set loading to false after data is set
        } catch (error) {
            console.error('Error setting data:', error);
            setLoading(false); // Set loading to false in case of error
        }
    };
    useEffect(() => {


        fetchData();
    }, []); // Empty dependency array means this useEffect runs once on component mount


    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = productData.slice(firstPostIndex, lastPostIndex);
    return (
        <div className='top-0 left-0 w-full h-screen flex flex-col z-50 items-start justify-start'>
            <HeadTitle title={"Favorite"} backPath={"/"} />
            <div className='w-full flex flex-row items-start justify-start h-full'>
                <div className='w-full h-full bg-white p-2 flex flex-col items-center'>
                    <div className='w-full'>
                        {loading ? (
                            <div>Loading... // Show loading indicator while data is being fetched</div>
                        ) : (
                            <div className='flex flex-row items-center w-full'>
                                <ProductList productData={currentPosts} fetchData={fetchData} />
                            </div>
                        )}
                    </div>
                    <Pagination totalPost={productData ? productData.length : 0}
                        postPerPage={postsPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage} />
                </div>
            </div>
        </div>
    )
}

export default FavoritePage