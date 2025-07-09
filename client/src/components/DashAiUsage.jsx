import { useEffect, useState } from 'react';
import { Table } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function DashAiUsage() {
    const { currentUser } = useSelector(state => state.user);
    const [usage, setUsage] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsage = async () => {
            try {
                const res = await fetch('/api/ai/getUsage'); 
                const data = await res.json();
                if (res.ok) {
                    setUsage(data);
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
    }, [currentUser]);

    return (
        <div className='table-auto overflow-x-auto p-3 md:mx-auto scrollbar scrollbar-thumb-slate-400 scrollbar-track-slate-100 dark:scrollbar-thumb-slate-600 dark:scrollbar-track-slate-800'>
            <h2 className='text-lg text-center font-semibold mb-4'>AI Chat Assistant Usage This Week</h2>

            {loading ? (
                <p>Loading usage data...</p>
            ) : usage.length > 0 ? (
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
            ) : (
                <p>No usage data available.</p>
            )}
        </div>
    );
}