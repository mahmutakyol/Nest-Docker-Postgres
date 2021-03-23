import store from '@/store'

store.subscribe((mutation) => {
  if (mutation.type === 'auth/SET_TOKEN') {
    if(mutation.payload) {
      localStorage.setItem('token', mutation.payload)
    } else {
      localStorage.removeItem('token')
    }
  }

  if (mutation.type === 'auth/SET_USER') {
    console.log(mutation.payload)
    if(mutation.payload) {
      if (localStorage.getItem('user') === null) {
        localStorage.setItem('user', JSON.stringify(mutation.payload))
      }
    } else {
      localStorage.removeItem('user')
    }
  }
})