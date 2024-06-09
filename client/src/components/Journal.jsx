import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Label, TextInput, Button, Modal, Alert, Textarea } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';

export default function Journal() {

    const { currentUser } = useSelector((state) => state.user);
    const [reload, setReload] = useState(false);


    const [userJournals, setUserJournals] = useState([]);
    const [journalPages, setJournalPages] = useState(0);
    const [page, setPage] = useState(1);

    const nextPage = () => {
        page < journalPages ? setPage(page + 1) : ''; 
    }

    const previousPage = () => {
        page <= 1 ? '' : setPage(page - 1);
    }

    const [showModalAddJournal, setShowModalAddJournal] = useState(false);
    const [showModalUpdateJournal, setShowModalUpdateJournal] = useState(false);
    const [showModalDeleteJournal, setShowModalDeleteNJournal] = useState(false);
    
    const [formDataAddJournal, setFormDataAddJournal] = useState({});
    const [formDataUpdateJournal, setFormDataUpdateJournal] = useState({});

    const [idToDelete, setIdToDelete] = useState({});

    const [publishError, setPublishError] = useState(null);



    const handleCreateJournal = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/journal/createjournal', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataAddJournal),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }

            if (res.ok) {

                setPublishError(null);
                setShowModalAddJournal(false);
                setFormDataAddJournal({});
                reload ? setReload(false) : setReload(true);

            }



        } catch (error) {
            setPublishError('Something went wrong');
        }
    };

    useEffect(() => {

        const fetchJournals = async () => {
            try {
                const res = await fetch(`/api/journal/getjournals/${currentUser._id}`);
                const data = await res.json();
                if (res.ok) {
                    setUserJournals(data.journals);
                    setJournalPages(data.maxpages);

                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (currentUser) {

            fetchJournals();
        }
    }, [currentUser._id, reload]);  


  return (
    <div className='flex flex-col min-h-screen items-center bg-gradient-to-b from-white via-indigo-100 to-indigo-50 gap-5 pb-24'>

        {/* Journal Intro*/}
        <div className='px-5 pt-5 pb-14 sm:px-10 flex flex-col justify-center items-center'>
            <h1 className='font-BrushFont text-8xl sm:text-9xl'>Journal</h1>
            <p className='text-wrap break-words italic max-w-4xl'>Welcome to your Journal. You can use it as a personal dairy or well, a journal. 
                Each entry will be analyzed by Natural Language Understanding machine learning by IBM Watson to analyze your emotions in writing.
                It'll give you a new understanding of your emotional being during the written events. </p>
        </div>
        
        {/* Page Controls */}
        <div className='flex flex-row items-center gap-2 text-lg'>
            <FaAngleDoubleLeft className='text-2xl' onClick={() => previousPage()} />
            <h1>Page:</h1>
            <h1>{page}</h1>
            <FaAngleDoubleRight className='text-2xl' onClick={() => nextPage()} />
        </div>

        {/* Journal Page Container */}
          <div className=' min-h-[400px] w-[90%] max-w-5xl rounded-lg bg-gradient-to-b from-white to-white'>
              <div className='flex flex-col items-center mt-2 mb-10 mx-4 gap-4 p-4'>
                <div className='flex justify-center items-center text-center text-wrap break-words font-bold'>
                    {userJournals && userJournals.length ? (<h1>{userJournals[page-1].title}</h1>) : (<h1 className=''>Add a Journal Entry!</h1>)}    
                </div>

                <div className='text-wrap break-all whitespace-pre-wrap lg:px-10'>
                    {userJournals && userJournals.length? (<h1>{userJournals[page-1].content}</h1>) : ''}
                </div>
            </div>    

        </div>

        {/* Add Journal Entry Button */}
        <div className='flex'>
            <button className='text-md text-blue-500' type='button' onClick={() => {
              setFormDataAddJournal({ ...formDataAddJournal, userId: currentUser._id});
              setShowModalAddJournal(true);
            }}>Add New Entry</button>
        </div>

          {/* Add Journal Page Modal */}
          <Modal
              show={showModalAddJournal}
              onClose={() => setShowModalAddJournal(false)}
              popup
              size='md'
          >
              <Modal.Header />
              <Modal.Body>
                  <div className='text-center'>
                      <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                          New Journal Entry:
                      </h3>
                      <form onSubmit={handleCreateJournal}>
                          <Label>Title</Label>
                          <TextInput type='text' placeholder='Title' id='title' value={formDataAddJournal.title} onChange={(e) =>
                              setFormDataAddJournal({ ...formDataAddJournal, title: e.target.value })
                          } />
                          <Label>Content</Label>
                          <Textarea required rows={6} placeholder='Content' id='content' value={formDataAddJournal.content} onChange={(e) =>
                              setFormDataAddJournal({ ...formDataAddJournal, content: e.target.value })
                          } />


                          <div className='my-5 flex justify-center gap-4'>
                              <Button color='gray' type='submit'>
                                  Add
                              </Button>
                              <Button color='gray' onClick={() => setShowModalAddJournal(false)}>
                                  Cancel
                              </Button>
                          </div>

                      </form>

                      {publishError && (
                          <Alert className='mt-5' color='failure'>
                              {publishError}
                          </Alert>
                      )}

                  </div>
              </Modal.Body>
          </Modal>


    </div>      
  )
}