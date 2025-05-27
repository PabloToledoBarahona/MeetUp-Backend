import Activity, { IActivity } from '../models/activity.model'

export const createActivity = async (data: Partial<IActivity>) => {
  const { startTime, endTime, event } = data

  if (!startTime || !endTime) throw new Error('Faltan las fechas de inicio y fin')

  if (new Date(startTime) >= new Date(endTime)) {
    throw new Error('La hora de inicio debe ser anterior a la de fin')
  }

  const conflict = await Activity.findOne({
    event,
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
      }
    ]
  })

  if (conflict) throw new Error('Ya existe una actividad en ese horario')

  const activity = new Activity(data)
  await activity.save()
  return activity
}

export const getActivitiesByEvent = async (eventId: string) => {
  return Activity.find({ event: eventId }).sort({ startTime: 1 })
}

export const updateActivity = async (activityId: string, data: Partial<IActivity>) => {
  return Activity.findByIdAndUpdate(activityId, data, { new: true })
}

export const deleteActivity = async (activityId: string) => {
  return Activity.findByIdAndDelete(activityId)
}