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
    const [visibilityRes, setVisibilityRes] = useState(false);

    const [emotionResult, setEmotionResult] = useState([]);
    const [sentimentResult, setSentimentResult] = useState([]);
    const [classificationResult, setClassificationResult] = useState([]);


    const [showModalAddJournal, setShowModalAddJournal] = useState(false);
    const [showModalUpdateJournal, setShowModalUpdateJournal] = useState(false);
    const [showModalDeleteJournal, setShowModalDeleteJournal] = useState(false);
    
    const [formDataAddJournal, setFormDataAddJournal] = useState({});
    const [formDataUpdateJournal, setFormDataUpdateJournal] = useState({});
    const [formDataGoToPage, setFormDataGoToPage] = useState('');

    const [idToDelete, setIdToDelete] = useState({});

    const [publishError, setPublishError] = useState(null);
    const [pageError, setPageError] = useState(null);


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

    const handleGoToPage = (e) => {
        e.preventDefault();
        formDataGoToPage <= journalPages && formDataGoToPage > 0 ? (setPage(Number(formDataGoToPage)), setPageError(null), setVisibilityRes(false)) : setPageError('Page out of bounds') 
    }

    const nextPage = () => {
        page < journalPages ? (setPage(page + 1), setVisibilityRes(false)) : '';
    }

    const previousPage = () => {
        page <= 1 ? '' : (setPage(page - 1), setVisibilityRes(false));
    }

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


    const handleAnalyze = async () => {
        try {
            const res = await fetch(`/api/watson/analyze/${userJournals[page - 1].content}`);
            const data = await res.json();
            if (res.ok) {
                setEmotionResult(data.result.emotion.document.emotion);
                setSentimentResult(data.result.sentiment.document);
                setClassificationResult(data.result.classifications);
                setVisibilityRes(true);
            }
        } catch (error) {
            console.log(error.message);
        }
    };


  return (
    <div className='flex flex-col min-h-screen items-center bg-gradient-to-b from-white via-indigo-100 to-indigo-50 gap-2 pb-24'>

        {/* Journal Intro*/}
        <div className='px-5 pt-10 pb-14 sm:px-10 flex flex-col justify-center items-center'>
            <h1 className='font-BrushFont text-7xl sm:text-8xl'>Journal</h1>
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

        <div className='flex flex-row items-center gap-2 mt-2 text-lg'>
            <h1>Go To:</h1>
            <form className='flex flex-row gap-2' onSubmit={handleGoToPage}>
                <TextInput type="number" className='w-10' value={formDataGoToPage} onChange={(e) =>
                    setFormDataGoToPage(e.target.value)}>
                </TextInput>
                <Button color='gray' type='submit'>
                    Go
                </Button>
            </form>
        </div>
        <div>
            {pageError && (
                <Alert className='' color='failure'>
                      {pageError}
                  </Alert>
            )}
        </div>           
   

        {/* Journal Page Container */}
          <div className='w-full sm:w-[90%] max-w-5xl rounded-lg bg-gradient-to-b from-white to-white'>
              <div className=' min-h-[400px] flex flex-col mt-2 mb-10 sm:mx-4 gap-4 p-4'>
                <div className='flex flex-col justify-center items-center text-center text-wrap break-words font-semibold font-BilboSwash text-3xl'>
                    {userJournals && userJournals.length ? 
                    (<>
                    <h1>{userJournals[page-1].title}</h1>
                    <span className='text-lg'>{new Date(userJournals[page - 1].createdAt).toLocaleDateString()} </span>
                    </>
                        
                    ) : (<h1 className=''>Add a Journal Entry!</h1>)}    
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
        <div className='flex mt-2 mb-5'>
            <button className='text-md text-blue-500' type='button' onClick={() => {
              setFormDataAddJournal({ ...formDataAddJournal, userId: currentUser._id});
              setShowModalAddJournal(true);
            }}>Add New Entry</button>
        </div>


        <div className='flex flex-col py-5 rounded-xl max-w-5xl w-full text-center items-center gap-4 bg-gradient-to-b from-white to-transparent'>
            <h1>Click to analyze emotions using IBM Watson:Natural Language Understanding</h1>
            <h1>Limited to entries in English! </h1>
            <Button className='w-fit mb-5' gradientDuoTone='cyanToBlue' type='button' onClick={() => handleAnalyze()}>Analyze Emotions!</Button>

            { visibilityRes && (
            <div className='w-full min-h-10 pb-10 bg-white'>

                {sentimentResult ? (
                    <div className='p-4 gap-2'>
                        <h1 className='font-bold'>Sentiment:</h1>
                        <h1><b>Label: </b>{sentimentResult.label}, <b>Score: </b>{sentimentResult.score} </h1>
                    </div>) : <h1 className='py-5'>Analyze journal entry to see results</h1>}
                
                <div className='flex flex-row justify-around'>

                    {emotionResult ? (

                        <div className='p-4 flex flex-col justify-start text-left'>
                            <h1 className='font-bold'>Emotions:</h1>
                            <h1 className='font-bold'>(As percentage)</h1>
                            <span className='font-semibold'>Joy: <span className='font-normal'>{(emotionResult.joy * 100).toFixed(2)}</span></span> 
                            <span className='font-semibold'>Sadness: <span className='font-normal'>{(emotionResult.sadness * 100).toFixed(2)}</span></span> 
                            <span className='font-semibold'>Anger: <span className='font-normal'>{(emotionResult.anger * 100).toFixed(2)}</span></span> 
                            <span className='font-semibold'>Disgust: <span className='font-normal'>{(emotionResult.disgust * 100).toFixed(2)}</span></span> 
                            <span className='font-semibold'>Fear: <span className='font-normal'>{(emotionResult.fear * 100).toFixed(2)}</span></span> 
                        </div>
                    
                    ) : ''}

                    {classificationResult && classificationResult.length ? (
                        <div className='p-4 flex flex-col justify-start text-left'>
                            <h1 className='font-bold'>Classification:</h1>
                            <h1 className='font-bold'>(As confidence)</h1>
                            <span className='font-semibold'> {classificationResult[0].class_name}: <span className='font-normal'>{(classificationResult[0].confidence).toFixed(3)}</span></span>
                            <span className='font-semibold'> {classificationResult[1].class_name}: <span className='font-normal'>{(classificationResult[1].confidence).toFixed(3)}</span></span>
                            <span className='font-semibold'> {classificationResult[2].class_name}: <span className='font-normal'>{(classificationResult[2].confidence).toFixed(3)}</span></span>
                            <span className='font-semibold'> {classificationResult[3].class_name}: <span className='font-normal'>{(classificationResult[3].confidence).toFixed(3)}</span></span>
                            <span className='font-semibold'> {classificationResult[4].class_name}: <span className='font-normal'>{(classificationResult[4].confidence).toFixed(3)}</span></span>
                            <span className='font-semibold'> {classificationResult[5].class_name}: <span className='font-normal'>{(classificationResult[5].confidence).toFixed(3)}</span></span>
                            <span className='font-semibold'> {classificationResult[6].class_name}: <span className='font-normal'>{(classificationResult[6].confidence).toFixed(3)}</span></span>
                        </div>
                    ) : ''}

                </div>
            </div>
            )}


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