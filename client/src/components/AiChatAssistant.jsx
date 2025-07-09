import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import { TbBrandOpenai } from "react-icons/tb";
import { BiSolidSend } from "react-icons/bi";
import { BsStars } from "react-icons/bs";

export default function AiChatAssistant() {

    const { wallpaper } = useSelector(state => state.wallpaper);

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatRef = useRef(null);

    const { currentUser } = useSelector(state => state.user);

    
    const [ragData, setRagData] = useState({ goals: [], subgoals: [], habits: [], journals: [] });
    const [loading, setLoading] = useState(true);
    const [readyMsg, setReadyMsg] = useState(false);
    const [error, setError] = useState(null);

    const [ragInclude, setRagInclude] = useState({
        goals: true,
        subgoals: true,
        habits: true,
        journals: false
      });

    const [firstMessageSent, setFirstMessageSent] = useState(false);

    const toggleAssistant = () => {

        setIsOpen(prev => {
            const next = !prev;
            
            if (next) {
                if (!currentUser) {
                    if (messages.length === 0) {
                        setMessages([
                            {
                                sender: 'bot',
                                text: "🔒 You need to be logged in to use the assistant. Please log in or create an account to get started."
                            }
                        ]);
                    }
                } else {
                    const firstMsg = messages[0]?.text;
                    if (!messages.length || firstMsg.includes("You need to be logged in")) {
                        setMessages([
                            {
                                sender: 'bot',
                                text: "👋 Welcome! I'm your assistant here to help you with your goals, tasks, habits, and journals. Just type your question below to get started."
                            }
                        ]);
                    }
                }
            }


            if (!next) {
                setError(null);
            }
            return next;
        });
      };

    const sendMessage = async () => {
        if (!input.trim() || !currentUser) return;

        const userMessage = { sender: 'user', text: input, };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setFirstMessageSent(true); 

        const filteredRag = Object.fromEntries(
            Object.entries(ragData).filter(([key]) => ragInclude[key])
        );
        

        try {
            const openAIMessages = [
                { role: 'system', content: 'You are an assistant helping users with their goals, subgoals (tasks), habits, and journals.' },
                { role: 'system', content: `Here is their data: ${JSON.stringify(filteredRag)}` },
                ...updatedMessages.slice(-25).map(msg => ({
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.text
                }))
            ];

            const response = await fetch('/api/chat/sendPrompt', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: openAIMessages })
              });

            const data = await response.json();

            if (!response.ok || data.error) {
                console.error('API Error:', data);
                const errorMessage =
                    typeof data.error === 'string'
                        ? data.error
                        : data?.error?.error?.message || 'An unexpected error occurred. Please try again.';

                setMessages(prev => [...prev, { sender: 'bot', text: `❗ ${errorMessage}` }]);
                return;
              }

            const botMessage = { sender: 'bot', text: data.content };
            setMessages(prev => [...prev, botMessage]);
        } catch (err) {
            console.error('Network/Fetch Error:', err);
            setMessages(prev => [...prev, { sender: 'bot', text: '❗ Unable to connect. Please try again later.' }]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') sendMessage();
    };

    useEffect(() => {
        chatRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    // Reset everything when logged out.
    useEffect(() => {
        if (!currentUser) {
            setMessages([
                {
                    sender: 'bot',
                    text: "🔒 You need to be logged in to use the assistant. Please log in or create an account to get started."
                }
            ]);
            setInput('');
            setReadyMsg(false);
            setError(null);
            setFirstMessageSent(false);
        }
        if (currentUser) {
            setMessages([
                {
                    sender: 'bot',
                    text: "👋 Welcome! I'm your assistant here to help you with your goals, tasks, habits, and journals. Just type your question below to get started."
                }
            ]);
            setInput('');
            setReadyMsg(false);
            setError(null);
            setFirstMessageSent(false);
        }

    }, [currentUser]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);

                const [goalsRes, subgoalsRes, habitsRes, journalsRes] = await Promise.all([
                    fetch(`/api/goal/getgoals/${currentUser._id}`),
                    fetch(`/api/subgoal/getsubgoals/${currentUser._id}`),
                    fetch(`/api/habit/gethabitstogether/${currentUser._id}`),
                    fetch(`/api/journal/getjournals/${currentUser._id}`)
                ]);

                const [goalsData, subgoalsData, habitsData, journalsData] = await Promise.all([
                    goalsRes.json(),
                    subgoalsRes.json(),
                    habitsRes.json(),
                    journalsRes.json()
                ]);

                const goals = goalsData.goals.filter(item => !item.accomplished).map(item => ({
                    goal_id: item._id,
                    title: item.title,
                    content: item.content,
                    category: item.category,
                    createdOn: item.createdOn
                }));

                const subgoals = subgoalsData.subgoals.filter(item => !item.accomplished).map(item => ({
                    parent_goal_id: item.goalId,
                    title: item.title,
                    content: item.content,
                    category: item.category,
                    priority: item.priority,
                    createdOn: item.createdOn
                }));

                const habits = habitsData.habits.map(item => ({
                    title: item.title,
                    content: `Deadline at ${item.timeofday}.`,
                    category: item.category
                }));

                const journals = journalsData.journals.map(item => ({
                    title: item.title,
                    content: item.content,
                    createdOn: item.createdAt,
                    emotions: item.emotions
                }));

                setRagData({ goals, subgoals, habits, journals });
                setReadyMsg(true);

            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err);
            } finally {
                setLoading(false);
 
            }
        };
        

        if (currentUser && isOpen && !readyMsg) {
            fetchUserData();
        }
    }, [currentUser, isOpen, readyMsg]);


    return (
        <>
            {/* Floating Button */}
            <button
                onClick={toggleAssistant}
                className={`fixed bottom-4 right-4 group ${wallpaper} group-[.wallpaper]:bottom-12 z-50 bg-[#46b9e7] text-white text-xl 2xl:text-2xl border-4 border-white  p-3 rounded-full drop-shadow-[1px_5px_15px_rgba(59,159,199,1.0)] hover:bg-white hover:text-[#46b9e7] transition`}
            >
                <BsStars/>
            </button>

            {/* Chat Overlay */}
            <AnimatePresence>
            {isOpen && (
                <motion.div className="fixed bottom-0 right-0 px-5 py-10 h-full sm:p-0 bg-gray-600 backdrop-filter backdrop-blur-sm bg-opacity-50 sm:bg-opacity-0 sm:backdrop-filter-none sm:backdrop-blur-none sm:bottom-20 sm:right-4 sm:h-2/3 sm:max-w-sm xl:max-w-md z-50 flex flex-col drop-shadow-[0_30px_30px_rgba(0,0,0,0.55)]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                >
                    
                    {/* Header */}
                        <div className="py-2 px-4 rounded-t-2xl bg-[#46b9e7] text-white flex justify-between items-center">
                        
                        <h2 className="text-lg font-semibold flex flex-row items-center gap-2"> <TbBrandOpenai className='text-2xl mt-0.5' /> Your Virtual Assistant</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-white hover:text-gray-300 text-2xl -mt-2"
                        >
                            &times;
                        </button>
                    </div>


                    {/* Loading Message */}
                    <div className='bg-gray-50 text-xs'>
                        {loading && (<div className="text-center p-4 text-gray-500">Loading user data...</div>)}
                        {error && (<div className="text-center p-4 text-red-500">Error loading data.</div>)}
                        {readyMsg && (<div className="text-center p-4 text-gray-500">Everything is ready to go.</div>)}
                    </div>
               


                    {/* Chat Messages */}
                    <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`max-w-xs py-2 px-3 rounded-2xl text-sm sm:text-md 2xl:text-md w-fit whitespace-pre-wrap ${msg.sender === 'user'
                                        ? 'ml-auto bg-teal-500 text-white'
                                        : 'mr-auto bg-gray-200 text-gray-800'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>

                    {/* Checkmarks */}
                    {!firstMessageSent && (
                            <div className="bg-white border-b px-4 py-3 text-sm text-gray-700 flex flex-col gap-2">
                                <h3 className="font-semibold text-center">Choose what to include in the assistant's context:</h3>
                                <div className="flex flex-wrap justify-center gap-4">
                                    {['goals', 'subgoals', 'habits', 'journals'].map((key) => (
                                        <label key={key} className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={ragInclude[key]}
                                                onChange={() =>
                                                    setRagInclude(prev => ({ ...prev, [key]: !prev[key] }))
                                                }
                                                className="accent-[#46b9e7]"
                                            />
                                            <span className="capitalize">{key}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                    )}     

                    {/* Input */}
                    <div className="p-2 bg-white flex gap-2 border-t">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={ currentUser ? ("Write your message...") : ("Log in to continue.")}
                            aria-label="AI Chat Input"
                            className="flex-1 p-2 border-none border-transparent focus:border-transparent focus:ring-0"
                        />
                        <button
                            onClick={sendMessage}
                            className="p-3 bg-[#46b9e7] text-white text-lg rounded-full hover:bg-[#3b9fc7]"
                            disabled={!input.trim() || loading}
                        >
                            <BiSolidSend/>
                        </button>
                    </div>
                    {/* Footer */}
                    <div className="min-h-10 bg-gray-200 rounded-b-lg text-gray-500 flex">
                        <h3 className="p-3 text-xs font-semibold">This AI assistant uses OpenAI API. By pressing Send you agree to send your goal, task, habit and journal content alongside the prompt so the AI can assist you with your goals.</h3>
                    </div>

                </motion.div>
            )}
            </AnimatePresence>
        </>
    );
}