import { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function DashAiUsage() {
    const { currentUser } = useSelector(state => state.user);
    const [usage, setUsage] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    

    useEffect(() => {
        const fetchUsage = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/watson/getUsage?page=${page}&limit=9`);
                const data = await res.json();
                if (res.ok) {
                    setUsage(data.usage);
                    setTotalPages(data.totalPages);
                } else {
                    console.error(data.error || 'Failed to fetch usage data.');
                }
            } catch (error) {
                console.error('Error fetching AI usage:', error);
            } finally {
                setLoading(false);
            }
        };

        if (currentUser.isAdmin) {
            fetchUsage();
        }
    }, [page, currentUser]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [page]);

    return (
        <div className='table-auto overflow-x-auto p-3 md:mx-auto scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-100 dark:scrollbar-thumb-slate-600 dark:scrollbar-track-slate-800'>
            <h2 className='text-lg text-center font-semibold mb-4'>Watson Usage By Week</h2>

            {loading ? (
                <p>Loading usage data...</p>
            ) : usage.length > 0 ? (
                <>
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>User Image</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Usage Count</Table.HeadCell>
                            <Table.HeadCell>Week Start</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className='divide-y'>
                            {usage.map((entry) => (
                                <Table.Row key={entry._id} className='bg-white dark:bg-gray-800'>
                                    <Table.Cell>
                                        <img
                                            src={entry.user.profilePicture}
                                            alt={entry.user.username}
                                            className='w-10 h-10 object-cover bg-gray-500 rounded-full'
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{entry.user?.username || 'Unknown'}</Table.Cell>
                                    <Table.Cell>{entry.user?.email || '—'}</Table.Cell>
                                    <Table.Cell>{entry.count}</Table.Cell>
                                    <Table.Cell>{new Date(entry.weekStart).toLocaleDateString()}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    {totalPages > 1 && (
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
                                {/* Prev Button */}
                                <button
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                    className={`px-3 py-1 rounded border text-sm ${page === 1
                                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                            : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    Previous
                                </button>

                                {/* Desktop Page Numbers */}
                                <div className="hidden sm:flex gap-1">
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setPage(i + 1)}
                                            className={`px-3 py-1 rounded border text-sm ${page === i + 1
                                                    ? 'bg-teal-500 text-white'
                                                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>

                                {/* Mobile Dropdown */}
                                <select
                                    value={page}
                                    onChange={(e) => setPage(Number(e.target.value))}
                                    className="block sm:hidden px-2 py-1 rounded border bg-white dark:bg-gray-800 text-sm"
                                >
                                    {Array.from({ length: totalPages }, (_, i) => (
                                        <option key={i} value={i + 1}>
                                            Page {i + 1}
                                        </option>
                                    ))}
                                </select>

                                {/* Next Button */}
                                <button
                                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                    disabled={page === totalPages}
                                    className={`px-3 py-1 rounded border text-sm ${page === totalPages
                                            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                            : 'bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                </>
            ) : (
                <p>No usage data available.</p>
            )}
        </div>
    );
}