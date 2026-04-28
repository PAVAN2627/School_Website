
export const emailRegex = [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Email format is incorrect. Use a valid format such as name@example.com (e.g., jane.smith@gmail.com) .']


export const userRoles = {
    ADMIN : "Admin"
}

export const userRoleEnums = Object.values(userRoles)


export const TEMPORARY_TOKEN_EXPIRY =  15 * 60 * 1000;


export const announcementCategory = {
  GENERAL : "General",
  EXAM : "Exam",
  EVENT : "Event",
  HOLIDAY : "Holiday",
  URGENT : "Urgent"
}

export const announcementCategoryEnums = Object.values(announcementCategory)
