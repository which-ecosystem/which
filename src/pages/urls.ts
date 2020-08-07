export default {
  home: '/',
  login: '/login',
  registration: '/registration',
  profile: (username: string = '') => `/profile/${username.toLowerCase()}`,
  feed: '/feed',
  notifications: '/notifications'
};
