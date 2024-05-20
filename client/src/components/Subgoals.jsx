import { useEffect, useState, } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Label, TextInput, Button, Modal, Alert, Textarea, Select } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import Notes from './Notes';

export default function Subgoals({goalId, category, sendDataToParent}) {
  
    const { currentUser } = useSelector((state) => state.user);
    const [reload, setReload] = useState(false);
    const [refreshNote, setRefreshNote] = useState(false);



    const [userSubGoals, setUserSubGoals] = useState([]);
    const [totalSubgoals, setTotalSubgoals] = useState(0);
    const [finishedSubgoals, setFinishedSubgoals] = useState(0);

    const [showModalAddSubgoal, setShowModalAddSubgoal] = useState(false);
    const [showModalAddNote, setShowModalAddNote] = useState(false);

    const [showModalUpdateSubgoal, setShowModalUpdateSubgoal] = useState(false);

    const [showModalDeleteSubgoal, setShowModalDeleteSubgoal] = useState(false);


    const [showModalAccomplishSubgoal, setShowModalAccomplishSubgoal] = useState(false);


    const [formDataAddSubgoal, setFormDataAddSubgoal] = useState({});
    const [formDataAddNote, setFormDataAddNote] = useState({});

    const [formDataUpdateSubgoal, setFormDataUpdateSubgoal] = useState({});
    const [formDataAccomplishSubgoal, setFormDataAccomplishSubgoal] = useState({});


    const [idToDelete, setIdToDelete] = useState({});

    const [publishError, setPublishError] = useState(null);


    useEffect(() => {

        const fetchSubGoals = async () => {
            try {
                const resSub = await fetch(`/api/subgoal/getgoalsubgoals/${goalId}/${currentUser._id}?category=${category}`);
                const dataSub = await resSub.json();
                if (resSub.ok) {
                    setUserSubGoals(dataSub.subgoals);
                    setTotalSubgoals(dataSub.totalSubgoals);
                    setFinishedSubgoals(dataSub.finishedSubgoals);
                    sendDataToParent(dataSub.categoryScore);
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (currentUser) {

            fetchSubGoals();
        }
    }, [currentUser._id, category, reload]); 


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
                refreshNote ? setRefreshNote(false) : setRefreshNote(true);
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

    const handleAccomplishSubgoal = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/subgoal/accomplishsubgoal/${formDataAccomplishSubgoal._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataAccomplishSubgoal),
            });
            const data = await res.json();
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }

            if (res.ok) {
                setPublishError(null);
                setShowModalAccomplishSubgoal(false);
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
 
    const priorityStyling = {
        '4': 'border-red-500 bg-white',
        '3': 'border-amber-500 bg-white',
        '2': 'border-cyan-500 bg-white',
        '1': 'border-gray-400 bg-white',
        '0': 'border-green-500 line-through opacity-70 bg-green-100',
    };

    const [hideCompleted, setHideCompleted] = useState('false');

    const handleHide = () => {
        {hideCompleted == 'false' ? setHideCompleted('hidden') : setHideCompleted('false') }
    }  

  
    return (
    <div>


          {/* Subgoals */}
          <div className="text-center">
              <Label htmlFor="Tasks" value="Tasks" />
          </div>  
          <div className='p-2 gap-4 min-h-20 flex flex-col'>

            <div className='flex flex-row justify-center gap-5'>
                    <span className='text-green-500'>Finished Tasks: <span className='font-bold'>{finishedSubgoals}</span></span>
                    <span className='text-blue-500'>Total Tasks: <span className='font-bold'>{totalSubgoals}</span></span>
            </div>

            {totalSubgoals >= 10 ? (
                <div className='flex flex-row justify-center gap-16'>
                <button type='button' className='text-green-500 font-bold' onClick={handleHide} >Hide Done</button>
                    <button type='button' className='text-blue-500 font-bold' onClick={() => {
                        setFormDataAddSubgoal({ ...formDataAddSubgoal, goalId: goalId, userId: currentUser._id, category: category, priority: 2 });
                        setShowModalAddSubgoal(true);
                    }}>Add new</button>
            </div>
            ) : (<></>) }

              {/* User Subgoals */}
              {userSubGoals.map((subgoal) => (
                  <>
                            <div className={` ${priorityStyling[subgoal.priority]} ${subgoal.accomplished ? ` ${hideCompleted} ` : ' '} group/item min-h-28 items-center p-4 border-2 rounded-lg shadow-xl`} key={subgoal._id}>

                                  <div className='flex flex-col justify-between w-full'>

                                    <div className='font-semibold text-center border-b-2 '>
                                          {subgoal.title}
                                    </div>

                                    <div className='my-2 px-4 text-wrap break-words whitespace-pre-wrap'>
                                        {subgoal.content}
                                    </div>

                                      <div className='flex flex-row justify-between pt-6 px-2'>
                                        
                                        <div className='opacity-0 group-hover/item:opacity-100 transition-all duration-500'>
                                        {subgoal.accomplished ? 
                                            (<button type='button' onClick={() => {
                                                setFormDataAccomplishSubgoal({ ...formDataAccomplishSubgoal, _id: subgoal._id, accomplished: false, priority: 2 });
                                                setShowModalAccomplishSubgoal(true);}}>
                                                <span className=' text-red-400 font-semibold'>-Undo-</span>
                                            </button>) 
                                            : 
                                            (<button type='button'onClick={() => {
                                                setFormDataAccomplishSubgoal({ ...formDataAccomplishSubgoal, _id: subgoal._id, accomplished: true, priority: 0 });
                                                setShowModalAccomplishSubgoal(true);}}>
                                                <span className=' text-green-400 font-semibold'>-Mark Done-</span>
                                            </button>)
                                        }
                                        </div>

                                        <Dropdown dismissOnClick={false} renderTrigger={() => <button type="button" className='text-xl'><BsThreeDots /></button>}>
                                            <Dropdown.Item onClick={() => {
                                                setShowModalUpdateSubgoal(true);
                                                setFormDataUpdateSubgoal({ ...formDataUpdateSubgoal, _id: subgoal._id, title: subgoal.title, content: subgoal.content, priority: subgoal.priority });
                                            }}>Edit</Dropdown.Item>
                                            <Dropdown.Item onClick={() => {
                                                setShowModalDeleteSubgoal(true);
                                                setIdToDelete({ ...idToDelete, _id: subgoal._id });
                                            }}>Delete</Dropdown.Item>
                                        </Dropdown>
                                      </div>

                                  </div>


                            </div>

                  </>
              ))}
          </div>

          {/* Add subgoal Input */}
            <div className='my-10 py-5 flex flex-row gap-4 justify-around border-2 border-r-transparent border-l-transparent border-b-orange-500 border-t-cyan-500 rounded-lg' >

              <Button outline gradientDuoTone="cyanToBlue" onClick={() => {
                  setFormDataAddSubgoal({ ...formDataAddSubgoal, goalId: goalId, userId: currentUser._id, category: category, priority: 2 });
                  setShowModalAddSubgoal(true);
              }}>Add Task</Button>

              <Button outline gradientDuoTone="pinkToOrange" onClick={() => {
                  setFormDataAddNote({ ...formDataAddNote, category: category, userId: currentUser._id, goalId: goalId });
                  setShowModalAddNote(true);
              }}>Add Note</Button>

          </div>

          <div> < Notes goalId={goalId} category={category} refresh={refreshNote} /> </div>


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
                            Add a new task:
                        </h3>
                        <form onSubmit={handleCreateSubgoal}>
                            <Label>Task Title</Label>
                            <TextInput type='text' placeholder='Title' id='title' value={formDataAddSubgoal.title} onChange={(e) =>
                                setFormDataAddSubgoal({ ...formDataAddSubgoal, title: e.target.value })
                            } />
                            <Label>Task Description</Label>
                            <Textarea rows={6} placeholder='Description' id='content' value={formDataAddSubgoal.content} onChange={(e) =>
                                setFormDataAddSubgoal({ ...formDataAddSubgoal, content: e.target.value })
                            } />

                            <Label>Task Priority</Label>
                            <Select id="priority" required onChange={(e) =>
                                setFormDataAddSubgoal({ ...formDataAddSubgoal, priority: e.target.value })}>
                                <option value='2'>Default</option>
                                <option value='4'>Maximum</option>
                                <option value='3'>Higher</option>
                                <option value='1'>Unimportant</option>
                            </Select>


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
                            Edit Task:
                        </h3>
                        <form onSubmit={handleUpdateSubgoal}>
                            <Label>Task Title</Label>
                            <TextInput type='text' placeholder='Title' id='title' value={formDataUpdateSubgoal.title} onChange={(e) =>
                                setFormDataUpdateSubgoal({ ...formDataUpdateSubgoal, title: e.target.value })
                            } />
                            <Label>Task Description</Label>
                            <Textarea rows={6} placeholder='Description' id='content' value={formDataUpdateSubgoal.content} onChange={(e) =>
                                setFormDataUpdateSubgoal({ ...formDataUpdateSubgoal, content: e.target.value })
                            } />

                            <Label>Task Priority</Label>
                            <Select id="priority" value={formDataUpdateSubgoal.priority} onChange={(e) =>
                                setFormDataUpdateSubgoal({ ...formDataUpdateSubgoal, priority: e.target.value })}>
                                <option value='2'>Default</option>
                                <option value='4'>Maximum</option>
                                <option value='3'>High</option>
                                <option value='1'>Unimportant</option>
                            </Select>


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
                            Are you sure you want to delete this Task?
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

            {/* Accomplish Subgoal Modal */}
            <Modal
                show={showModalAccomplishSubgoal}
                onClose={() => setShowModalAccomplishSubgoal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            {formDataAccomplishSubgoal.accomplished ? (<>Mark Task as Done?</>) : (<>Mark Task As To Do?</>)}
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleAccomplishSubgoal}>
                                Yes, Im sure
                            </Button>
                            <Button color='gray' onClick={() => setShowModalAccomplishSubgoal(false)}>
                                No, cancel
                            </Button>
                        </div>
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

    </div>
  )
}