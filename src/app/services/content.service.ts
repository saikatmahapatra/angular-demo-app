import { Injectable } from '@angular/core';

@Injectable()
export class ContentService {

  constructor() { }

  getCMSContent() {
    return [{
      "page": {
        "home": {
          "title": "Welcome To Angular 4 Project",
          "subtitle": "This is a sample subtitle"
        }
      },
      "gender": [
        { "val": "male", "txt": "Male" },
        { "val": "female", "txt": "Female" },
        { "val": "transgender", "txt": "Transgender" }
      ],
      "phoneType": [
        { "val": "m", "txt": "Mobile" },
        { "val": "w", "txt": "Work" },
        { "val": "r", "txt": "Home" }
      ],
      "indianStates": [
        {
          "key": "AN",
          "name": "Andaman and Nicobar Islands"
        },
        {
          "key": "AP",
          "name": "Andhra Pradesh"
        },
        {
          "key": "AR",
          "name": "Arunachal Pradesh"
        },
        {
          "key": "AS",
          "name": "Assam"
        },
        {
          "key": "BR",
          "name": "Bihar"
        },
        {
          "key": "CG",
          "name": "Chandigarh"
        },
        {
          "key": "CH",
          "name": "Chhattisgarh"
        },
        {
          "key": "DH",
          "name": "Dadra and Nagar Haveli"
        },
        {
          "key": "DD",
          "name": "Daman and Diu"
        },
        {
          "key": "DL",
          "name": "Delhi"
        },
        {
          "key": "GA",
          "name": "Goa"
        },
        {
          "key": "GJ",
          "name": "Gujarat"
        },
        {
          "key": "HR",
          "name": "Haryana"
        },
        {
          "key": "HP",
          "name": "Himachal Pradesh"
        },
        {
          "key": "JK",
          "name": "Jammu and Kashmir"
        },
        {
          "key": "JH",
          "name": "Jharkhand"
        },
        {
          "key": "KA",
          "name": "Karnataka"
        },
        {
          "key": "KL",
          "name": "Kerala"
        },
        {
          "key": "LD",
          "name": "Lakshadweep"
        },
        {
          "key": "MP",
          "name": "Madhya Pradesh"
        },
        {
          "key": "MH",
          "name": "Maharashtra"
        },
        {
          "key": "MN",
          "name": "Manipur"
        },
        {
          "key": "ML",
          "name": "Meghalaya"
        },
        {
          "key": "MZ",
          "name": "Mizoram"
        },
        {
          "key": "NL",
          "name": "Nagaland"
        },
        {
          "key": "OR",
          "name": "Odisha"
        },
        {
          "key": "PY",
          "name": "Puducherry"
        },
        {
          "key": "PB",
          "name": "Punjab"
        },
        {
          "key": "RJ",
          "name": "Rajasthan"
        },
        {
          "key": "SK",
          "name": "Sikkim"
        },
        {
          "key": "TN",
          "name": "Tamil Nadu"
        },
        {
          "key": "TS",
          "name": "Telangana"
        },
        {
          "key": "TR",
          "name": "Tripura"
        },
        {
          "key": "UK",
          "name": "Uttar Pradesh"
        },
        {
          "key": "UP",
          "name": "Uttarakhand"
        },
        {
          "key": "WB",
          "name": "West Bengal"
        }
      ],
      "preferredCity":[
        {"key":"kol","name":"Kolkata"},
        {"key":"chn","name":"Chennai"},
        {"key":"mum","name":"Mumbai"},
      ],
      "error": {
        "email": {
          "required": "The email address field is required.",
          "invalid": "Please enter a valid email address."
        },
        "firstName":{
          "required": "The first name field is required.",
          "minlength": "The first name must be minimum 3 characters in length.",
          "maxlength": "The first name should not be 12 characters in length."
        },
        "middleName":{          
          "minlength": "The middle initial should be 1 character in length.",
          "maxlength": "The middle initial should be 1 character in length."
        },
        "lastName":{
          "required": "The last name field is required.",
          "minlength": "The last name must be minimum 3 characters in length.",
          "maxlength": "The last name should not be 12 characters in length.",
        },
        "password":{
          "required": "The password field is required."
        },
        "confirmPassword":{
          "required": "The confirm password field is required."
        },
        "gender":{
          "required": "The gender field is required."
        },
        "terms":{
          "required": "The terms and condition acceptance is required."
        },
        "phoneNumber":{
          "required": "The phone number field is required.",
          "minlength": "The phone number should be a 10 digit a number.",
          "maxlength": "Please enter a 10 digit phone number."
        },
      },
    }];
  }
}
