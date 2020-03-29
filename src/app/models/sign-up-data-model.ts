export class SignUpDataModel {
    id: number;
    email: string;
    name: {
        firstName: string,
        middleName: string,
        lastName: string
    };
    phone: {
        phoneNumber: number,
        phoneType: string
    };
    // finInfo: {
    //     monthlyMortgage: number,
    //     residenceType: string,
    //     totalAnualIncome: string
    // };
    // identification: {
    //     idNumber: string,
    //     idType: string
    // };
    // dateOfBirth: string;
    createPassword: {
        password: string,
        confirmPassword: string
    };
    gender: string;
    terms: boolean;

    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}
