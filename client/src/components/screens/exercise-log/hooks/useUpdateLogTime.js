import { useMutation, useQueryClient } from '@tanstack/react-query'
import ExerciseLogService from '../../../../services/exercise/exercise-log.service.js'
import { useParams } from 'react-router-dom'
import { UseCompleteLog } from './useCompleteLog.js'

export const UseUpdateLogTime = (times) => {
	const { id } = useParams()

	const queryClient = useQueryClient()

	const {completeLog, errorCompleted} = UseCompleteLog()

	const {mutate, error: errorChange} = useMutation(['update log time'],
		({timeId, body}) => ExerciseLogService.updateTime(timeId, body), {
		onSuccess: () => {
			queryClient.invalidateQueries(['get exercise log', id]).then(() => {
				const filteredTimes = times.filter(time => time.isCompleted)
				if (filteredTimes.length === times.length - 1) {
					completeLog({ isCompleted: true })
				}
			})

		}
		})
	return {updateTime: mutate, error: errorChange || errorCompleted}
}
