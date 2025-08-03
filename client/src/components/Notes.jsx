import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, Label, TextInput, Button, Modal, Alert, Textarea } from "flowbite-react";
import { BsThreeDots } from "react-icons/bs";
import { HiOutlineExclamationCircle } from 'react-icons/hi';


export default function Notes( {goalId, category, refresh, loadNotes} ) {
    
    const { currentUser } = useSelector((state) => state.user);
    const [reload, setReload] = useState(false);
    const [userNotes, setUserNotes] = useState([]);


    const [showModalUpdateNote, setShowModalUpdateNote] = useState(false);
    const [showModalDeleteNote, setShowModalDeleteNote] = useState(false);

    const [formDataUpdateNote, setFormDataUpdateNote] = useState({});

    const [idToDelete, setIdToDelete] = useState({});

    const [publishError, setPublishError] = useState(null);

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
        if (loadNotes) {
            const fetchNotes = async () => {
                try {
                    const resNote = await fetch(`/api/note/getgoalnotes/${goalId}?category=${category}`);
                    const dataNote = await resNote.json();
                    if (resNote.ok) {
                        setUserNotes(dataNote.notes);
                    }
                } catch (error) {
                    console.log(error.message);
                }
            };
            if (currentUser) {
                fetchNotes();
            }
        }
    }, [loadNotes, goalId, reload, refresh]);   
  
    return (
    <div>
            {/* Notes */}
            <div className="text-center">
                <Label htmlFor="Notes" value="Notes" />
            </div>
            <div className='p-2 gap-4 flex flex-col'>

                {/* User Notes */}
                {userNotes.map((note) => (
                    <>

                            <div className='bg-white  min-h-60 flex flex-col justify-between py-2 border-2 border-orange-500 rounded-lg shadow-xl' key={note._id}>

                                <div className='flex flex-col px-4'>
                                    <div className='font-semibold border-b-2'>
                                        {note.title}
                                    </div>
                                <div className='my-2 text-wrap break-words whitespace-pre-wrap'>
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
                                            setIdToDelete({ ...idToDelete, _id: note._id });
                                        }}>Delete</Dropdown.Item>
                                    </Dropdown>
                                </div>

                            </div>

                    </>
                ))}
            </div>

           

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