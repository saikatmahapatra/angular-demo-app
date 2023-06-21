import { environment } from "@env/environment";

export const AppConfig = {
    name: environment.name,
    production: environment.production,
    productName: environment.productName,
    copyrightInfo: environment.copyrightInfo,
    apiBaseUrl: environment.apiBaseUrl,
    useMockServer: environment.useMockServer,
    version: environment.version,
    timestamp:  '',
    maintenanceMode: false,
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
        getEvents: 'cms/getEvents',

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
        saveLeaveBalance: 'user/saveLeaveBalance',
        userInsight: 'user/userInsight',

        // Address
        getAddress: 'address/getAddress',
        addAddress: 'address/createAddress',
        updateAddress: 'address/updateAddress',
        deleteAddress: 'address/deleteAddress',


        // Academic
        academicFormData: 'academic/formData',
        getEducation: 'academic/getAcademicRecord',
        addEducation: 'academic/createAcademicRecord',
        updateEducation: 'academic/updateAcademicRecord',
        deleteEducation: 'academic/deleteAcademicRecord',

        // Work Experience
        experienceFormData: 'workexperience/formData',
        getExperience: 'workexperience/getExperience',
        addExperience: 'workexperience/createExperience',
        updateExperience: 'workexperience/updateExperience',
        deleteExperience: 'workexperience/deleteExperience',

        // Payroll
        payrollFormData: 'payroll/formData',
        getPayroll: 'payroll/getPayroll',
        addPayroll: 'payroll/createPayroll',
        updatePayroll: 'payroll/updatePayroll',
        deletePayroll: 'payroll/deletePayroll',

        // Emergency Contact
        emergencyContactFormData: 'contact/formData',
        getEmergencyContact: 'contact/getContact',
        addEmergencyContact: 'contact/createContact',
        updateEmergencyContact: 'contact/updateContact',
        deleteEmergencyContact: 'contact/deleteContact',

        // Timesheet
        timesheetFormData: 'timesheet/formData',
        getTimesheet: 'timesheet/getTimesheet',
        addTimesheet: 'timesheet/createTimesheet',
        updateTimesheet: 'timesheet/updateTimesheet',
        deleteTimesheet: 'timesheet/deleteTimesheet',
        timesheetReport: 'timesheet/getReport',

        // Project Timesheet
        projectDropdown: 'project/projectDropdown',
        getProject: 'project/getProject',
        addProject: 'project/createProject',
        updateProject: 'project/updateProject',
        deleteProject: 'project/deleteProject',
        timesheetChartData: 'timesheet/timesheetChartData',

        // Timesheet Project Tasks
        taskFormData: 'task/formData',
        getTask: 'task/getTask',
        addTask: 'task/createTask',
        updateTask: 'task/updateTask',
        deleteTask: 'task/deleteTask',

        // Leave Management
        getLeaves: 'leave/getLeave',
        applyLeave: 'leave/createLeave',
        updateLeave: 'leave/updateLeave',
        getLeaveFormData: 'leave/getLeaveFormData',
        getEmpLeaveBalance: 'leave/getEmpLeaveBalance',
        uploadLeaveData: 'leave/uploadLeaveData',

        //Settings
        getSettings: 'settings/getSiteSettings',
        updateSiteSettings: 'settings/updateSiteSettings'
    }
};