import React from 'react'
import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Table, Checkbox, Label, TextInput, Button, Modal, Alert, Textarea } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { IoIosAddCircleOutline } from "react-icons/io";
import { HiOutlineExclamationCircle } from 'react-icons/hi';


export default function Goals( {category} ) {

  const { currentUser } = useSelector((state) => state.user);
  const [reload, setReload] = useState(false);

  const [userGoals, setUserGoals] = useState([]);
  const [userSubGoals, setUserSubGoals] = useState([]);
  const [userNotes, setUserNotes] = useState([]);

  const [showModalAddSubgoal, setShowModalAddSubgoal] = useState(false);
  const [showModalAddGoal, setShowModalAddGoal] = useState(false);
  const [showModalAddNote, setShowModalAddNote] = useState(false);

  const [showModalUpdateSubgoal, setShowModalUpdateSubgoal] = useState(false);
  const [showModalUpdateGoal, setShowModalUpdateGoal] = useState(false);
  const [showModalUpdateNote, setShowModalUpdateNote] = useState(false);

  
  const [showModalDeleteSubgoal, setShowModalDeleteSubgoal] = useState(false);
  const [showModalDeleteGoal, setShowModalDeleteGoal] = useState(false);
  const [showModalDeleteNote, setShowModalDeleteNote] = useState(false);
  
  const [formDataAddSubgoal, setFormDataAddSubgoal] = useState({});
  const [formDataAddGoal, setFormDataAddGoal] = useState({});
  const [formDataAddNote, setFormDataAddNote] = useState({});

  const [formDataUpdateSubgoal, setFormDataUpdateSubgoal] = useState({});
  const [formDataUpdateGoal, setFormDataUpdateGoal] = useState({});
  const [formDataUpdateNote, setFormDataUpdateNote] = useState({});

  const [idToDelete, setIdToDelete] = useState({});
 


  const [publishError, setPublishError] = useState(null);


  const handleCreateSubgoal = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/subgoal/createsubgoal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataAddSubgoal),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setShowModalAddSubgoal(false);
        setFormDataAddSubgoal({});
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/goal/creategoal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataAddGoal),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setShowModalAddGoal(false);
        setFormDataAddGoal({});
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/note/createnote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataAddNote),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setShowModalAddNote(false);
        setFormDataAddNote({});
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleUpdateGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/goal/editgoal/${formDataUpdateGoal._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataUpdateGoal),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setShowModalUpdateGoal(false);
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleUpdateSubgoal = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/subgoal/editsubgoal/${formDataUpdateSubgoal._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataUpdateSubgoal),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setShowModalUpdateSubgoal(false);
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/note/editnote/${formDataUpdateNote._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataUpdateNote),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setShowModalUpdateNote(false);
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleDeleteGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/goal/deletegoal/${idToDelete._id}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setShowModalDeleteGoal(false);
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleDeleteSubgoal = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/subgoal/deletesubgoal/${idToDelete._id}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setShowModalDeleteSubgoal(false);
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  const handleDeleteNote = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/note/deletenote/${idToDelete._id}/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        setShowModalDeleteNote(false);
        reload ? setReload(false) : setReload(true);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };




  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch(`/api/goal/getcategorygoals/${currentUser._id}?category=${category}`);
        const data = await res.json();
        if (res.ok) {
          setUserGoals(data.goals);
 
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchSubGoals = async () => {
      try {
        const resSub = await fetch(`/api/subgoal/getsubgoals/${currentUser._id}`);
        const dataSub = await resSub.json();
        if (resSub.ok) {
          setUserSubGoals(dataSub.subgoals);

        }
      } catch (error) {
        console.log(error.message);
      }
    };

    const fetchNotes = async () => {
      try {
        const resNote = await fetch(`/api/note/getcategorynotes/${currentUser._id}?category=${category}`);
        const dataNote = await resNote.json();
        if (resNote.ok) {
          setUserNotes(dataNote.notes);

        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser) {
      fetchGoals();
      fetchSubGoals();
      fetchNotes();
    }
  }, [currentUser._id, category, reload]);

  return (
    <div className='w-full min-h-screen'>
      
      {/* Main Container */}
      <div className='mx-auto p-2 pt-20 mb-10 flex flex-col justify-center gap-5 max-w-4xl'> 
      
      {/* If user logged-in, map userGoals */}
      {currentUser ? (
        
        <>
        {/* User Goals */}
        {userGoals.map((goal) => (
          
          
          <div key={goal._id} className='group' >

            {/* Title Div */}
            <div className='bg-gradient-to-b from-amber-500 to-pink-500 border-b-2 rounded-lg shadow-lg'> 
              <div className='mx-2 bg-white flex flex-row justify-between p-5 text-xl font-semibold shadow-lg'>

              <p>{goal.title}</p>
              <div className='hidden group-hover:inline'>
                <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button"><BsThreeDots /></button>}>
                  <Dropdown.Item onClick={() => {
                    setShowModalUpdateGoal(true);
                    setFormDataUpdateGoal({ ...formDataUpdateGoal, _id: goal._id, title: goal.title, content: goal.content});
                  }}>Edit</Dropdown.Item>
                  <Dropdown.Item onClick={() => {
                    setShowModalDeleteGoal(true);
                    setIdToDelete({ ...idToDelete, _id: goal._id });
                  }}>Delete</Dropdown.Item>
                </Dropdown> 
              </div>
            </div>
            </div>

            {/* Inner Div of Goals */}
            <div className='h-0 border-x-2 bg-gradient-to-b from-gray-50 to-white border-gray-300 group-hover:h-auto group-hover:py-10 flex scale-y-0 group-hover:scale-y-100 overflow-hidden flex-col mx-4 sm:mx-10 lg:mx-14 px-2 origin-top transition-all duration-700'>


              {/* Goal Description */}
              <div className="text-center">
                <Label htmlFor="description" value="About" />
              </div>
              <div className='mb-5 p-2 min-h-20 text-center' >{goal.content}</div>



              {/* Subgoals */}
              <div className="text-center">
                <Label htmlFor="subgoals" value="Subgoals" />
              </div>
              <div className='p-2 gap-4 min-h-20 flex flex-col border-b-2 border-cyan-500 rounded-lg'>

                    {/* User Subgoals */}
                    {userSubGoals.map((subgoal) => (
                      <>
                        
                      {/* Show Subgoals for current Goal */}
                      {(subgoal.goalId == goal._id) ? 
                        
                       (
                        
                        <div className='bg-white grid grid-flow-col min-h-28 items-center p-2 border-2 border-cyan-500 rounded-lg shadow-xl' key={subgoal._id}>

                          <div className=' justify-self-start'>
                            {subgoal.accomplished ? (<Checkbox id="accomplish" defaultChecked></Checkbox>) : (<Checkbox id="accomplish"></Checkbox>)}
                          </div>
   

                          <div className='flex flex-col justify-self-center w-full'>

                            <div className='font-semibold text-center border-b-2 '>
                              {subgoal.title}
                            </div>

                            <div className='my-2 px-4'>
                              {subgoal.content}
                            </div>

                          </div>
                          <div className='flex flex-col h-full pr-2 pb-2 justify-end justify-self-end'>
                            <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
                                  <Dropdown.Item onClick={() => {
                                    setShowModalUpdateSubgoal(true);
                                    setFormDataUpdateSubgoal({ ...formDataUpdateSubgoal, _id: subgoal._id, title: subgoal.title, content: subgoal.content });
                                  }}>Edit</Dropdown.Item>
                                  <Dropdown.Item onClick={() => {
                                    setShowModalDeleteSubgoal(true);
                                    setIdToDelete({ ...idToDelete, _id: subgoal._id });
                                  }}>Delete</Dropdown.Item>
                            </Dropdown> 
                          </div>

                        </div> 
                        
                      
                      )
                      : 
                      (
                        <></>
                      )}


                    </>    
                    ))}
              </div>

              {/* Add subgoal Input */}
              <div className='my-10 flex flex-row gap-4 justify-around' >

                <Button outline gradientDuoTone="cyanToBlue" onClick={() => {
                  setFormDataAddSubgoal({ ...formDataAddSubgoal, goalId: goal._id, userId: currentUser._id });
                  setShowModalAddSubgoal(true);
                }}>Add Subgoal</Button>

                <Button outline gradientDuoTone="pinkToOrange" onClick={() => {
                  setFormDataAddNote({ ...formDataAddNote, category: category, userId: currentUser._id, goalId: goal._id });
                  setShowModalAddNote(true);
                }}>Add Note</Button>

              </div>

          
              {/* Notes */}
              <div className="text-center">
                <Label htmlFor="Notes" value="Notes" />
              </div>
              <div className='p-2 gap-4 flex flex-col border-t-2 border-orange-500 rounded-lg'>

                {/* User Notes */}
                {userNotes.map((note) => (
                  <>

                    {/* Show Notes for current Goal */}
                    {(note.goalId == goal._id) ? (

                      <div className='bg-white  min-h-60 flex flex-col justify-between py-2 border-2 border-orange-500 rounded-lg shadow-xl' key={note._id}>

                          <div className='flex flex-col justify-between items-center px-4'>
                            <div className='font-semibold border-b-2'>
                              {note.title}
                            </div>
                            <div className='my-2'>
                              {note.content}
                            </div>
                          </div>

                          <div className='flex flex-row justify-between p-2 px-4'>
                            <span className='text-sm font-light'>Last Updated: {new Date(note.updatedAt).toLocaleDateString()} </span>

                            <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
                            <Dropdown.Item onClick={() => {
                              setShowModalUpdateNote(true);
                              setFormDataUpdateNote({ ...formDataUpdateNote, _id: note._id, title: note.title, content: note.content });
                            }}>Edit</Dropdown.Item>
                            <Dropdown.Item onClick={() => {
                              setShowModalDeleteNote(true);
                              setIdToDelete({ ...idToDelete, _id: note._id});
                            }}>Delete</Dropdown.Item>
                            </Dropdown>
                          </div>

                        </div>


                      )
                      :
                      (
                        <></>
                      )}


                  </>
                ))}
              </div>
       

            </div>

            {/* Outer Div of Goals */}
            <div className='bg-gradient-to-b from-amber-500 to-pink-500 border-t-2 rounded-lg min-h-[70px] shadow-lg'>
              <div className='mx-2 flex bg-white min-h-[70px] flex-row justify-around items-center'>
                <span className='hidden group-hover:flex'>Started on: {new Date(goal.createdOn).toLocaleDateString()} </span>
                <Button className='hidden group-hover:flex' outline gradientDuoTone="greenToBlue"> Accomplish Goal </Button>
              </div>
            </div>

          </div>

        ))}


            {/* Add Goal Input */}
            <div className='my-5 flex flex-row justify-center' >

              <Button className='w-full shadow-md' gradientDuoTone="pinkToOrange" onClick={() => {
                setFormDataAddGoal({ ...formDataAddGoal, category: category, userId: currentUser._id });
                setShowModalAddGoal(true);
              }}>Add Goal</Button>
            </div>    
      </>
      ) : (<p>Log in</p>) }
      
      
      </div>

      {/* Add Subgoal Modal */}
      <Modal
        show={showModalAddSubgoal}
        onClose={() => setShowModalAddSubgoal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Add a new subgoal:
            </h3>
            <form onSubmit={handleCreateSubgoal}>
              <Label>Subgoal Title</Label>
              <TextInput type='text' placeholder='Title' id='title' value={formDataAddSubgoal.title} onChange={(e) =>
                setFormDataAddSubgoal({ ...formDataAddSubgoal, title: e.target.value })
              } />
              <Label>Subgoal Description</Label>
              <TextInput type='text' placeholder='Description' id='content' value={formDataAddSubgoal.content} onChange={(e) =>
                setFormDataAddSubgoal({ ...formDataAddSubgoal, content: e.target.value })
              } />
 

              <div className='my-5 flex justify-center gap-4'>
                <Button color='gray' type='submit'>
                  Add
                </Button>
                <Button color='gray' onClick={() => setShowModalAddSubgoal(false)}>
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
      
      {/* Add Goal Modal */}
      <Modal
        show={showModalAddGoal}
        onClose={() => setShowModalAddGoal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Add a new goal:
            </h3>
            <form onSubmit={handleCreateGoal}>
              <Label>Goal Title</Label>
              <TextInput type='text' placeholder='Title' id='title' value={formDataAddGoal.title} onChange={(e) =>
                setFormDataAddGoal({ ...formDataAddGoal, title: e.target.value })
              } />
              <Label>Goal Description</Label>
              <TextInput type='text' placeholder='Description' id='content' value={formDataAddGoal.content} onChange={(e) =>
                setFormDataAddGoal({ ...formDataAddGoal, content: e.target.value })
              } />


              <div className='my-5 flex justify-center gap-4'>
                <Button color='gray' type='submit'>
                  Add
                </Button>
                <Button color='gray' onClick={() => setShowModalAddGoal(false)}>
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

      {/* Add Note Modal */}
      <Modal
        show={showModalAddNote}
        onClose={() => setShowModalAddNote(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Add a new note:
            </h3>
            <form onSubmit={handleCreateNote}>
              <Label>Note Title</Label>
              <TextInput type='text' placeholder='Title' id='title' value={formDataAddNote.title} onChange={(e) =>
                setFormDataAddNote({ ...formDataAddNote, title: e.target.value })
              } />
              <Label>Note Content</Label>
              <Textarea required rows={6} placeholder='Content' id='content' value={formDataAddNote.content} onChange={(e) =>
                setFormDataAddNote({ ...formDataAddNote, content: e.target.value })
              } />


              <div className='my-5 flex justify-center gap-4'>
                <Button color='gray' type='submit'>
                  Add
                </Button>
                <Button color='gray' onClick={() => setShowModalAddNote(false)}>
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

      {/* Update Goal Modal */}
      <Modal
        show={showModalUpdateGoal}
        onClose={() => setShowModalUpdateGoal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Edit Goal:
            </h3>
            <form onSubmit={handleUpdateGoal}>
              <Label>Goal Title</Label>
              <TextInput type='text' placeholder='Title' id='title' value={formDataUpdateGoal.title} onChange={(e) =>
                setFormDataUpdateGoal({ ...formDataUpdateGoal, title: e.target.value })
              } />
              <Label>Goal Description</Label>
              <TextInput type='text' placeholder='Description' id='content' value={formDataUpdateGoal.content} onChange={(e) =>
                setFormDataUpdateGoal({ ...formDataUpdateGoal, content: e.target.value })
              } />


              <div className='my-5 flex justify-center gap-4'>
                <Button color='gray' type='submit'>
                  Update
                </Button>
                <Button color='gray' onClick={() => setShowModalUpdateGoal(false)}>
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

      {/* Update Subgoal Modal */}
      <Modal
        show={showModalUpdateSubgoal}
        onClose={() => setShowModalUpdateSubgoal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Edit Subgoal:
            </h3>
            <form onSubmit={handleUpdateSubgoal}>
              <Label>Subgoal Title</Label>
              <TextInput type='text' placeholder='Title' id='title' value={formDataUpdateSubgoal.title} onChange={(e) =>
                setFormDataUpdateSubgoal({ ...formDataUpdateSubgoal, title: e.target.value })
              } />
              <Label>Subgoal Description</Label>
              <TextInput type='text' placeholder='Description' id='content' value={formDataUpdateSubgoal.content} onChange={(e) =>
                setFormDataUpdateSubgoal({ ...formDataUpdateSubgoal, content: e.target.value })
              } />


              <div className='my-5 flex justify-center gap-4'>
                <Button color='gray' type='submit'>
                  Update
                </Button>
                <Button color='gray' onClick={() => setShowModalUpdateSubgoal(false)}>
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

      {/* Update Note Modal */}
      <Modal
        show={showModalUpdateNote}
        onClose={() => setShowModalUpdateNote(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Edit Note:
            </h3>
            <form onSubmit={handleUpdateNote}>
              <Label>Note Title</Label>
              <TextInput type='text' placeholder='Title' id='title' value={formDataUpdateNote.title} onChange={(e) =>
                setFormDataUpdateNote({ ...formDataUpdateNote, title: e.target.value })
              } />
              <Label>Note Content</Label>
              <Textarea rows={6} placeholder='Content' id='content' value={formDataUpdateNote.content} onChange={(e) =>
                setFormDataUpdateNote({ ...formDataUpdateNote, content: e.target.value })
              } />


              <div className='my-5 flex justify-center gap-4'>
                <Button color='gray' type='submit'>
                  Update
                </Button>
                <Button color='gray' onClick={() => setShowModalUpdateNote(false)}>
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

      {/* Delete Goal Modal*/}    
      <Modal
        show={showModalDeleteGoal}
        onClose={() => setShowModalDeleteGoal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this goal?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteGoal}>
                Yes, Im sure
              </Button>
              <Button color='gray' onClick={() => setShowModalDeleteGoal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Delete Subgoal Modal */}
      <Modal
        show={showModalDeleteSubgoal}
        onClose={() => setShowModalDeleteSubgoal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this subgoal?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteSubgoal}>
                Yes, Im sure
              </Button>
              <Button color='gray' onClick={() => setShowModalDeleteSubgoal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Delete Note Modal */}
      <Modal
        show={showModalDeleteNote}
        onClose={() => setShowModalDeleteNote(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this note?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteNote}>
                Yes, Im sure
              </Button>
              <Button color='gray' onClick={() => setShowModalDeleteNote(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}
