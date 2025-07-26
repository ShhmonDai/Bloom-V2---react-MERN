import {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {
    HiAnnotation,
    HiArrowNarrowUp,
    HiDocumentText,
    HiOutlineUserGroup,
} from 'react-icons/hi';
import { Button, Table } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashboardComp() {

    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [lastMonthUsers, setLastMonthUsers] = useState(0)
    const { currentUser } = useSelector((state) => state.user);

    const [totalAiMessages, setTotalAiMessages] = useState(0);
    const [recentAiUsage, setRecentAiUsage] = useState([]);
    const [lastWeekAi, setLastWeekAi] = useState(0)

    const [totalWatsonMessages, setTotalWatsonMessages] = useState(0);
    const [recentWatsonUsage, setRecentWatsonUsage] = useState([]);
    const [lastWeekWatson, setLastWeekWatson] = useState(0)


    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [userRes, aiRes, watsonRes] = await Promise.all([
                    fetch('/api/user/getusers?limit=5'),
                    fetch('/api/ai/getUsage?limit=5'),
                    fetch('/api/watson/getUsage?limit=5')
                ]);
                const userData = await userRes.json();
                const aiData = await aiRes.json();
                const watsonData = await watsonRes.json();

                if (userRes.ok) {
                    setUsers(userData.users);
                    setTotalUsers(userData.totalUsers);
                    setLastMonthUsers(userData.lastMonthUsers);
                }
                if (aiRes.ok) {

                    setTotalAiMessages(aiData.totalMessagesCount);
                    setRecentAiUsage(aiData.usage);
                    setLastWeekAi(aiData.lastWeekMessages);
                }
                if (watsonRes.ok) {
                    setTotalWatsonMessages(watsonData.totalMessagesCount);
                    setRecentWatsonUsage(watsonData.usage);
                    setLastWeekWatson(watsonData.lastWeekMessages);
                }
            } catch (err) {
                console.error(err.message);
            }
        };

        if (currentUser.isAdmin) {
            fetchDashboardData();
        }
    }, [currentUser]);

  return (
    <div className='p-3 md:mx-auto'>

        {/* Stat Card Holder */}
        <div className='flex-wrap flex mb-5 gap-4 justify-center'>

            {/* Total Users */}

              <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                  <div className='flex justify-between'>
                      <div className=''>
                          <h3 className='text-gray-500 text-md uppercase'>Total Users</h3>
                          <p className='text-2xl'>{totalUsers}</p>
                      </div>
                      <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                  </div>
                  <div className='flex gap-2 text-sm'>
                      <span className='text-green-500 flex items-center'>
                          <HiArrowNarrowUp />
                          {lastMonthUsers}
                      </span>
                      <div className='text-gray-500'>Last month</div>
                  </div>
              </div>

              {/* Messages this week */}

              <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                  <div className='flex justify-between'>
                      <div>
                          <h3 className='text-gray-500 text-md uppercase'>Total AI Messages</h3>
                          <p className='text-2xl'>{totalAiMessages}</p>
                      </div>
                      <HiAnnotation className='bg-blue-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                  </div>
                  <div className='flex gap-2 text-sm'>
                      <span className='text-green-500 flex items-center'>
                          <HiArrowNarrowUp />
                          {lastWeekAi}
                      </span>
                      <div className='text-gray-500'>This week</div>
                  </div>
              </div>

              {/* Watson this week */}

              <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
                  <div className='flex justify-between'>
                      <div>
                          <h3 className='text-gray-500 text-md uppercase'>Total Watson Usage</h3>
                          <p className='text-2xl'>{totalWatsonMessages}</p>
                      </div>
                      <HiDocumentText className='bg-amber-600 text-white rounded-full text-5xl p-3 shadow-lg' />
                  </div>
                  <div className='flex gap-2 text-sm'>
                      <span className='text-green-500 flex items-center'>
                          <HiArrowNarrowUp />
                          {lastWeekWatson}
                      </span>
                      <div className='text-gray-500'>This week</div>
                  </div>
              </div>              

  
        </div>     

        <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>

            {/* Latest Users */}
            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                <div className='flex justify-between p-3 text-sm font-semibold'>
                    <h1 className='text-center p-2'>Recent users</h1>
                    <Button outline gradientDuoTone='purpleToPink'>
                        <Link to={"/dashboard?tab=users"}>See all</Link>
                    </Button>
                </div>
                <Table hoverable>
                    <Table.Head>
                        <Table.HeadCell>User image</Table.HeadCell>
                        <Table.HeadCell>Username</Table.HeadCell>
                    </Table.Head>
                    {users && users.map((user) => (
                        <Table.Body key ={user._id} className='divide-y'>
                            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                <Table.Cell>
                                    <img src={user.profilePicture}
                                    alt='user'
                                    className='w-10 h-10 rounded-full bg-gray-500' 
                                    />
                                </Table.Cell>
                                <Table.Cell>{user.username}</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    ))}
                </Table>
            </div>

            {/* Messages this week */}
            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                  <div className='flex justify-between p-3 text-sm font-semibold'>
                      <h1 className='text-center p-2'>Latest AI Usage</h1>
                      <Button outline gradientDuoTone='cyanToBlue'>
                          <Link to={"/dashboard?tab=ai-usage"}>View full</Link>
                      </Button>
                  </div>
                  <Table hoverable>
                      <Table.Head>
                          <Table.HeadCell>User</Table.HeadCell>
                          <Table.HeadCell>Count</Table.HeadCell>
                          <Table.HeadCell>Date</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className='divide-y'>
                          {recentAiUsage.map((entry) => (
                              <Table.Row key={entry._id} className='bg-white dark:bg-gray-800'>
                                  <Table.Cell>{entry.user?.username || '—'}</Table.Cell>
                                  <Table.Cell>{entry.count}</Table.Cell>
                                  <Table.Cell>{new Date(entry.weekStart).toLocaleDateString()}</Table.Cell>
                              </Table.Row>
                          ))}
                      </Table.Body>
                  </Table>
            </div>            

            {/* Watson this week */}
            <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
                  <div className='flex justify-between p-3 text-sm font-semibold'>
                      <h1 className='text-center p-2'>Latest Watson Usage</h1>
                      <Button outline gradientDuoTone='pinkToOrange'>
                          <Link to={"/dashboard?tab=watson-usage"}>View full</Link>
                      </Button>
                  </div>
                  <Table hoverable>
                      <Table.Head>
                          <Table.HeadCell>User</Table.HeadCell>
                          <Table.HeadCell>Count</Table.HeadCell>
                          <Table.HeadCell>Date</Table.HeadCell>
                      </Table.Head>
                      <Table.Body className='divide-y'>
                          {recentWatsonUsage.map((entry) => (
                              <Table.Row key={entry._id} className='bg-white dark:bg-gray-800'>
                                  <Table.Cell>{entry.user?.username || '—'}</Table.Cell>
                                  <Table.Cell>{entry.count}</Table.Cell>
                                  <Table.Cell>{new Date(entry.weekStart).toLocaleDateString()}</Table.Cell>
                              </Table.Row>
                          ))}
                      </Table.Body>
                  </Table>
            </div> 
  
        </div>
    </div>
  );
}