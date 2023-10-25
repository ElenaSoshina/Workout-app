import { useMutation, useQueryClient } from '@tanstack/react-query'
import ExerciseLogService from '../../../../services/exercise/exercise-log.service.js'
import { useNavigate, useParams } from 'react-router-dom'

export const UseCompleteLog = () => {
	const { id } = useParams()

	const navigate = useNavigate()

	// const queryClient = useQueryClient()

	const {mutate, error: errorCompleted} = useMutation(
		['complete log'],
		body => ExerciseLogService.complete(id, body),
		{
		onSuccess: ({ data }) => {
			navigate(`/workout/${data.workoutLogId}`)
		}
		})
	return { completeLog: mutate, errorCompleted }
}
