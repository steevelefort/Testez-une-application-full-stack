
export const mockSessionResponse = {
  "id": 1,
  "name": "Une session",
  "date": "2025-08-14",
  "teacher_id": 1,
  "description": "Ceci est un exemple de session",
  "users": [1, 2],
  "createdAt": "2025-08-14",
  "updatedAt": "2025-08-14"
}

export const mockTeacherResponse = {
  "id": 1,
  "lastName": "THIERCELIN",
  "firstName": "Hélène",
  "createdAt": "2025-08-14",
  "updatedAt": "2025-08-14"
}

export const mockTeachersResponse = [
  { ...mockTeacherResponse },
  { ...mockTeacherResponse, "id": 2 },
]

export const mockUser = {
  id: 1,
  username: 'userName',
  firstName: 'firstName',
  lastName: 'lastName',
  admin: true
}


