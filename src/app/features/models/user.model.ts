export class User {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public phoneNumber: string,
        public password: string,
        public confirmPassword: string,
        public city: string,
        public gender: string,
        public skills: any,
        public termsAccepted: boolean

    ) { }
}
