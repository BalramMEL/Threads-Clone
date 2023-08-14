import UserCard from '@/components/cards/UserCard';
import ProfileHeader from '@/components/shared/ProfileHeader';
import SearchBar from '@/components/shared/SearchBar';
import { fetchUser, fetchUsers } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';


async function Page() {      
    const user = await currentUser();
    if (!user) return null;
    
    const userInfo = await fetchUser(user.id)
    if (!userInfo?.onboarded) redirect('/onboarding');  
    
    // Fetch Users
    const result = await fetchUsers({
        userId: user.id,
        searchString: '',
        pageNumber: 1,
        pageSize: 25  
    })

  return (
    <section>
        <h1 className="head-text mb-10">Search</h1>

      {/* Search Bar */}
      <SearchBar routeType='search' />

          <div className='mt-14 flex-col gap-9'>
              {
                result.users.length === 0 ? 
                    (
                        <p className='no-result'>No users found</p>
                         
                      ) : (
                          <>
                              {
                                  result.users.map((person) => (
                                      <UserCard
                                          key={person.id}
                                          id={person.id}
                                          name={person.name}
                                          username={person.username}
                                          imgUrl={person.image}
                                          personType='User'
                                      />
                                  ))
                            }
                          </>
                    )
              }
          </div>
    </section>
  )
}

export default Page