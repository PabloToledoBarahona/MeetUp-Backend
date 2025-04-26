import Activity, { IActivity } from '../models/activity.model'

export const createActivity = async (data: Partial<IActivity>) => {
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