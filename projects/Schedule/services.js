const moment = require('moment')
const axios = require('axios')

const baseUrl = 'http://localhost:3001/tasks'

const getSchedule = async date => {
  const url = `${baseUrl}?_sort=dt_prevision,description&_order=asc`
  const res = await axios.get(url)
  const pending = item => item.dt_conclusion === null
    && moment(item.dt_prevision).isSameOrBefore(date)
  return res.data.filter(pending)
}

const getTask = async id => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const getPendingTasks = async () => {
  const res = await axios.get(`${baseUrl}?_sort=description&_order=asc`)
  return res.data.filter(item => item.dt_prevision === null && item.dt_conclusion)
}

const getCompletedTasks = async () => {
  const res = await axios.get(`${baseUrl}?_sort=dt.prevision,description&_order=asc`)
  return res.data.filter(item => item.dt_conclusion !== null)
}

const includeTask = async desc => {
  const res = await axios.post(`${baseUrl}`, { description: desc, dt_prevision: null, dt_conclusion: null, observation: null })
  return res.data
}

module.exports = {
  getSchedule,
  getTask,
  getPendingTasks,
  getCompletedTasks,
  includeTask
}