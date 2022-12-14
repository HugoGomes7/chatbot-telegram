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
  return res.data.filter(item => item.dt_prevision === null && item.dt_conclusion === null)
}

const getCompletedTasks = async () => {
  const res = await axios.get(`${baseUrl}?_sort=dt.prevision,description&_order=asc`)
  return res.data.filter(item => item.dt_conclusion !== null)
}

const includeTask = async desc => {
  const res = await axios.post(`${baseUrl}`, { description: desc, dt_prevision: null, dt_conclusion: null, observation: null })
  return res.data
}

const concludeTask = async id => {
  const task = await getTask(id)
  const res = await axios.put(`${baseUrl}/${id}`, { ...task, dt_conclusion: moment().format('YYYY-MM-DD') })
  return res.data
}

const deleteTask = async id => {
  await axios.delete(`${baseUrl}/${id}`)
}

const updateDateTask = async (idTask, date) => {
  const task = await getTask(idTask)
  const res = await axios.put(`${baseUrl}/${idTask}`,
    { ...task, dt_prevision: date.format('YYYY-MM-DD') })
  return res.data
}

const updateObsTask = async (idTask, obs) => {
  const task = await getTask(idTask)
  const res = await axios.put(`${baseUrl}/${idTask}`,
    { ...task, observation: obs })
  return res.data
}

module.exports = {
  getSchedule,
  getTask,
  getPendingTasks,
  getCompletedTasks,
  includeTask,
  concludeTask,
  deleteTask,
  updateDateTask,
  updateObsTask
}