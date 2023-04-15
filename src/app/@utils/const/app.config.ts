import { environment } from "@env/environment";

export const AppConfig = {
    name: environment.name,
    production: environment.production,
    title: environment.title,
    productName: environment.productName,
    copyrightInfo: environment.copyrightInfo,
    apiBaseUrl: environment.apiBaseUrl,
    useMockServer: environment.useMockServer,
    version: environment.version,
    apiUrl: {
        // Authentication, JWT Validation
        authenticate: 'auth/authenticate',
        validateToken: 'auth/validateToken',
        validateRolePermissions: 'auth/validateRolePermissions',
        checkEmail: 'auth/checkEmail',
        resetPassword: 'auth/resetPassword',

        // CMS
        dashboardStat: 'cms/getDashboardStat',
        getPosts: 'cms/getPosts',
        getHolidays: 'cms/getHolidays',
        addPost: 'cms/createPost',
        updatePost: 'cms/updatePost',
        deletePost: 'cms/deletePost',
        getContentCalendar: 'cms/getCalendar',
        addContentCalendar: 'cms/addCalendar',
        editContentCalendar: 'cms/editCalendar',
        deleteContentCalendar: 'cms/deleteCalendar',
        addHoliday: 'cms/addHoliday',
        updateHoliday: 'cms/updateHoliday',
        deleteHoliday: 'cms/deleteHoliday',

        // User
        getUsers: 'user/getUser',
        userFormData: 'user/userFormData',
        markAsRead: 'cms/markAsRead',
        addUser: 'user/createUser',
        userDetails: 'user/userDetails',
        getMyProfile: 'user/myProfile',
        changePassword: 'user/changePassword',
        userData: 'user/userData',
        updateUserData: 'user/updateUserData',
        updateUser: 'user/updateUser',
        updateUserStatus: 'user/updateUserStatus',
        userDropdown: 'user/userDropdown',
        searchUser: 'user/search',
        approvers: 'user/approvers',
        changeApprovers: 'user/changeApprovers',
        getEmployees: 'user/getEmp',
        getReportees: 'user/getReportees',

        // Address
        getAddress: 'address/getAddress',
        addAddress: 'address/createAddress',
        updateAddress: 'address/updateAddress',
        deleteAddress: 'address/deleteAddress',


        // Academic
        academicFormData: 'academic/formData',
        getEducation: 'academic/getEducation',
        addEducation: 'academic/createEducation',
        updateEducation: 'academic/updateEducation',
        deleteEducation: 'academic/deleteEducation',

        // Employment
        experienceFormData: 'employment/formData',
        getExperience: 'employment',
        addExperience: 'employment',
        updateExperience: 'employment',
        deleteExperience: 'employment',

        // Payroll
        payrollFormData: 'payroll/formData',
        getPayroll: 'payroll',
        addPayroll: 'payroll',
        updatePayroll: 'payroll',
        deletePayroll: 'payroll',

        // Emergency Contact
        emergencyContactFormData: 'contact/formData',
        getEmergencyContact: 'contact',
        addEmergencyContact: 'contact',
        updateEmergencyContact: 'contact',
        deleteEmergencyContact: 'contact',

        // Timesheet
        timesheetFormData: 'timesheet/formData',
        getTimesheet: 'timesheet',
        addTimesheet: 'timesheet',
        updateTimesheet: 'timesheet',
        deleteTimesheet: 'timesheet',
        timesheetReport: 'timesheet/report',

        // Project Timesheet
        projectDropdown: 'project/projectDropdown',
        getProject: 'project',
        addProject: 'project',
        updateProject: 'project',
        deleteProject: 'project',

        // Timesheet Project Tasks
        taskFormData: 'task/formData',
        getTask: 'task',
        addTask: 'task',
        updateTask: 'task',
        deleteTask: 'task',

        // Leave Management
        getLeaves: 'leave',
        updateLeave: 'leave/updateLeaveData',
        applyLeave: 'leave/apply',
        getLeaveData: 'leave/getLeaveData'
    }
};