import React, { useState, useEffect, forwardRef } from 'react'
import HeadTitle from '../components/HeadTitle'
import DataList from '../components/DataList'
import { Button, Dialog, Slide } from '@mui/material'
import matchs from '../match'
import Pagination from '../components/Pagination'
import CreateMatch from '../components/CreateMatch'
import {getMatchApi} from '../api'

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const MatchPage = () => {
  const [matchData, setmatchData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [loading, setLoading] = useState(true); // Add loading state
  const handleOpen = () => {
    setOpen(true)
  }
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }

  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching data
    setPostsPerPage(10);
    try {
        const products = await getMatchApi();
        setmatchData(products);
        setLoading(false); // Set loading to false after data is set
    } catch (error) {
        console.error('Error setting data:', error);
        setLoading(false); // Set loading to false in case of error
    }
};
useEffect(() => {


    fetchData();
}, []);


  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = matchData.slice(firstPostIndex, lastPostIndex);
  return (
    <div className='top-0 left-0 w-full min-h-screen flex flex-col z-50 items-start justify-start bg-slate-100'>
      <HeadTitle title={"All Match"} backPath={"/"} />
      <div className='w-full flex flex-col items-start justify-start h-full'>
        <Button variant='contained' sx={{ alignSelf: 'end' }} onClick={handleOpen}>Create New Match</Button>
        <div className='w-full flex flex-col items-center justify-start h-full'>
          <div className='w-full'>
            {loading ? (
              <div>Loading... // Show loading indicator while data is being fetched</div>
            ) : (
              <div className='flex flex-row items-center p-2 w-full'>
                <DataList matchData={currentPosts} fetchData={fetchData}/>
              </div>
            )}
          </div>
          <Pagination totalPost={matchData.length}
            postPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
        </div>
      </div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <CreateMatch onClose={handleClose} fetchMatchData={fetchData}/>
      </Dialog>

    </div>
  )
}

export default MatchPage