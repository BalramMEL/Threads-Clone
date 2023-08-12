export const sidebarLinks = [
    {
        imageURL: '/assets/home.svg',
        route: '/',
        label: 'Home',
    },
    {
        imageURL: '/assets/search.svg',
        route: '/search',
        label: 'Search',
    },
    {
        imageURL: '/assets/heart.svg',
        route: '/activity',
        label: 'Activity',
    },
    {
        imageURL: '/assets/create.svg',
        route: '/create-thread',
        label: 'Create Thread',
    },
    {
        imageURL: '/assets/community.svg',
        route: '/communities',
        label: 'Communities',
    },
    {
        imageURL: '/assets/user.svg',
        route: '/profile',
        label: 'Profile',
    },
];

export const profileTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "replies", label: "Replies", icon: "/assets/members.svg" },
  { value: "tagged", label: "Tagged", icon: "/assets/tag.svg" },
];

export const communityTabs = [
  { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
  { value: "members", label: "Members", icon: "/assets/members.svg" },
  { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];
