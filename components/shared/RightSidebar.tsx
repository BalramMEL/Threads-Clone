import { fetchCommunities } from "@/lib/actions/community.actions";
import { fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import UserCard from "../cards/UserCard";

async function RightSidebar() {
    const user = await currentUser();
    if (!user) return null;
    
    const similarMinds = await fetchUsers({
        userId: user.id,
        pageSize: 4,
    })

    const suggestedCommunities = await fetchCommunities({pageSize: 4});

    return (
        <section className="custom-scrollbar rightsidebar">
            <div className="flex flex-col flex-1 justify-start">            
                <h3 className="
                    text-heading4-medium
                    text-light-1
                ">
                    Suggested Communities
                </h3>

                <div className="flex flex-col gap-9 mt-7 w-[350px]">
                    {
                        suggestedCommunities.communities.length > 0 ? (
                            <>
                                {
                                    suggestedCommunities.communities.map((community) => (
                                        <UserCard
                                            key={community.id}
                                            id={community.id}
                                            name={community.name}
                                            username={community.username}
                                            imgUrl={community.image}
                                            personType="Community"
                                        />
                                    ))
                                }
                            </>
                        ) : (
                                <p className="!text-base-regular text-light-3">
                                    No Communities found
                                </p>                                     
                        )
                    }
                </div>

            </div>

            <div className="flex flex-col flex-1 justify-start">      
                <h3 className="text-heading4-medium text-light-1">                 
                    Suggested Users
                </h3>    
                
                <div className="flex flex-col mt-7 gap-9 w-[350px]">
                    {
                        similarMinds.users.length > 0 ? (
                            <>
                                {
                                    similarMinds.users.map((person) => (
                                        <UserCard
                                            key={person.id}
                                            id={person.id}
                                            name={person.name}
                                            username={person.username}
                                            imgUrl={person.image}
                                            personType="User"
                                        />
                                    ))
                                }
                            </>
                        ) : (
                                <p className="!text-base-regular text-light-3">
                                    No users yet
                                </p>
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default RightSidebar;