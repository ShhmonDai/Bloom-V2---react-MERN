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
    const [showModalDeleteJournal, setShowModalDeleteJournal] = useState(false);
    
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

    const handleUpdateJournal = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/journal/editjournal/${formDataUpdateJournal._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataUpdateJournal),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }

            if (res.ok) {
                setPublishError(null);
                setShowModalUpdateJournal(false);
                reload ? setReload(false) : setReload(true);
            }
        } catch (error) {
            setPublishError('Something went wrong');
        }
    };

    const handleDeleteJournal = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/journal/deletejournal/${idToDelete._id}/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }

            if (res.ok) {
                setPublishError(null);
                setShowModalDeleteJournal(false);
                setPage(1);
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
              <p className='text-wrap break-words italic max-w-4xl'>Welcome to the Journal, where your thoughts find sanctuary and your emotions are understood. 
                Here, you have the space to pen down your reflections, dreams, and everyday moments, 
                knowing that each entry will be more than just words on a page. 
                With the power of IBM Watson's machine learning, your journal becomes a canvas where sentiments and emotions are analyzed, 
                offering insights into the depth of your experiences. Explore the profound connection between your words and feelings 
                as you embark on a journey of self-discovery and understanding. </p>
        </div>
        
        {/* Page Controls */}
        <div className='flex flex-row items-center gap-2 text-lg'>
            <FaAngleDoubleLeft className='text-2xl' onClick={() => previousPage()} />
            <h1>Page:</h1>
            <h1>{page}</h1>
            <FaAngleDoubleRight className='text-2xl' onClick={() => nextPage()} />
        </div>

        {/* Journal Page Container */}
          <div className='w-[90%] max-w-5xl rounded-lg bg-gradient-to-b from-white to-white'>
              <div className=' min-h-[400px] flex flex-col mt-2 mb-10 mx-4 gap-4 p-4'>
                <div className='flex justify-center items-center text-center text-wrap break-words font-bold'>
                    {userJournals && userJournals.length ? (<h1>{userJournals[page-1].title}</h1>) : (<h1 className=''>Add a Journal Entry!</h1>)}    
                </div>

                <div className='text-wrap break-words whitespace-pre-wrap lg:px-10'>
                    {userJournals && userJournals.length? (<h1>{userJournals[page-1].content}</h1>) : ''}
                </div>
            </div>    

                <div className='flex flex-row justify-between items-end p-4'>
                    {userJournals && userJournals.length ? 
                    ( <>
                        <span className='text-sm font-light'>Last Updated: {new Date(userJournals[page-1].updatedAt).toLocaleDateString()} </span>

                        <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
                            <Dropdown.Item onClick={() => {
                                setShowModalUpdateJournal(true);
                                setFormDataUpdateJournal({ ...formDataUpdateJournal, _id: userJournals[page - 1]._id, title: userJournals[page - 1].title, content: userJournals[page - 1].content });
                                }}>Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                                setShowModalDeleteJournal(true);
                                setIdToDelete({ ...idToDelete, _id: userJournals[page - 1]._id });
                                }}>Delete</Dropdown.Item>
                        </Dropdown>
                    </>) : ''}

                </div>

        </div>

        {/* Add Journal Entry Button */}
        <div className='flex'>
            <button className='text-md text-blue-500' type='button' onClick={() => {
              setFormDataAddJournal({ ...formDataAddJournal, userId: currentUser._id});
              setShowModalAddJournal(true);
            }}>Add New Entry</button>
        </div>


        <div className='flex p-5 text-center'>
            Work In Progress. Here is a placeholder for the IBM Watson analysis of journals emotions.
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
                      <h3 className='mb-5 text-lg'>
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

          {/* Update Journal Modal */}
          <Modal
              show={showModalUpdateJournal}
              onClose={() => setShowModalUpdateJournal(false)}
              popup
              size='md'
          >
              <Modal.Header />
              <Modal.Body>
                  <div className='text-center'>
                      <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                          Edit Journal Entry:
                      </h3>
                      <form onSubmit={handleUpdateJournal}>
                          <Label>Title</Label>
                          <TextInput type='text' placeholder='Title' id='title' value={formDataUpdateJournal.title} onChange={(e) =>
                              setFormDataUpdateJournal({ ...formDataUpdateJournal, title: e.target.value })
                          } />
                          <Label>Content</Label>
                          <Textarea rows={6} placeholder='Content' id='content' value={formDataUpdateJournal.content} onChange={(e) =>
                              setFormDataUpdateJournal({ ...formDataUpdateJournal, content: e.target.value })
                          } />


                          <div className='my-5 flex justify-center gap-4'>
                              <Button color='gray' type='submit'>
                                  Update
                              </Button>
                              <Button color='gray' onClick={() => setShowModalUpdateJournal(false)}>
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

          {/* Delete Note Modal */}
          <Modal
              show={showModalDeleteJournal}
              onClose={() => setShowModalDeleteJournal(false)}
              popup
              size='md'
          >
              <Modal.Header />
              <Modal.Body>
                  <div className='text-center'>
                      <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                      <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                          Are you sure you want to delete this journal?
                      </h3>
                      <div className='flex justify-center gap-4'>
                          <Button color='failure' onClick={handleDeleteJournal}>
                              Yes, Im sure
                          </Button>
                          <Button color='gray' onClick={() => setShowModalDeleteJournal(false)}>
                              No, cancel
                          </Button>
                      </div>
                  </div>
              </Modal.Body>
          </Modal> 


    </div>      
  )
}