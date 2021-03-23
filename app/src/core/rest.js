import axios from 'axios'
import Vue from 'vue'

export default {

  requestCount: 0,

  new () {

    var instance = axios.create({
      headers: {
        'Content-type': 'application/json'
      }
    })

    instance.interceptors.response.use(function (response) {
      return response
    }, function (error) {
      return Promise.reject(error)
    })

    return instance
  },

  onError (error) {
    if (!error.response) {
      console.error(error)
    }
  },

  get (url, data, callback, onError) {
    var self = this
    this.startProgress()
    this.new().get(url, { params: data }).then(function (response) {
      self.stopProgress()
      // TODO: arife somehow had an empty response?
      // https://sentry.io/organizations/bauexperts/issues/1837017446/?project=1435895&query=is%3Aunresolved
      callback(response.data)
    }).catch(function (error) {
      if (typeof onError === 'function') {
        onError(error)
      } else {
        self.onError(error)
      }
      self.stopProgress()
    })
  },

  post (url, data, callback, onError) {
    var self = this
    this.startProgress()
    this.new().post(url, data).then(function (response) {
      self.stopProgress()
      callback(response.data)
    }).catch(function (error) {
      if (typeof onError === 'function') {
        onError(error)
      } else {
        self.onError(error)
      }
      self.stopProgress()
    })
  },

  postProgress (url, data, callback, onError, progressChanged) {
    var self = this
    this.startProgress()
    this.new().post(url, data, {
      onUploadProgress: evt => (progressChanged(Math.floor(evt.loaded * 100 / evt.total))),
      onDownloadProgress: evt => (progressChanged(Math.floor(evt.loaded * 100 / evt.total)))
    }).then(function (response) {
      self.stopProgress()
      callback(response.data)
    }).catch(function (error) {
      if (typeof onError === 'function') {
        onError(error)
      } else {
        self.onError(error)
      }
      self.stopProgress()
    })
  },

  put (url, data, callback, onError) {
    var self = this
    this.startProgress()
    this.new().put(url, data).then(function (response) {
      self.stopProgress()
      callback(response.data)
    }).catch(function (error) {
      if (typeof onError === 'function') {
        onError(error)
      } else {
        self.onError(error)
      }
      self.stopProgress()
    })
  },

  delete (url, data, callback, onError) {
    var self = this
    this.startProgress()
    this.new().delete(url, data).then(function (response) {
      self.stopProgress()
      callback(response.data)
    }).catch(function (error) {
      if (typeof onError === 'function') {
        onError(error)
      } else {
        self.onError(error)
      }
      self.stopProgress()
    })
  },

  getSync (url, data, onError) {
    return new Promise(resolve => this.get(url, data, resolve, onError))
  },

  postSync (url, data, onError) {
    return new Promise(resolve => this.post(url, data, resolve, onError))
  },

  putSync (url, data, onError) {
    return new Promise(resolve => this.put(url, data, resolve, onError))
  },

  deleteSync (url, data, onError) {
    return new Promise(resolve => this.delete(url, data, resolve, onError))
  },

  startProgress () {
    this.requestCount++
    if (Vue.prototype.$sharedData) {
      Vue.prototype.$sharedData.isSubmitting = true
    }

    if (window.nprogress) {
      window.nprogress.start()
    }
  },

  stopProgress () {
    this.requestCount--
    if (this.requestCount === 0) {
      if (Vue.prototype.$sharedData) {
        Vue.prototype.$sharedData.isSubmitting = false
      }

      if (window.nprogress) {
        window.nprogress.done()
      }
    }
  }

}
