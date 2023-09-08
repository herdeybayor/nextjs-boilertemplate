import $http from "./xhr"

export const APIVersion1GetCurrentUser = async () => $http.get(`/v1/users/get-current`).then((res) => res.data)
