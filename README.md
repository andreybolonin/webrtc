* POST /api/login
* POST /api/logout
* POST /api/registration
* POST /api/call/start { call_meta, speciality/symptoms/doctor }
* POST /api/call/close
* GET /api/doctors/?:speciality ( by speciality)
* GET /api/specialities
* GET /api/symptoms
or POST /api/symptoms (autocomplete)


# Models: #

## Users ##
* firstname
* lastname
* birthday
* email
* phone
* password

## Doctors ##
* user_id
* speciality_id
* expirience / career_start_date 
* description
* rate (hrn)

## Patients ##
* user_id
* isNew (has one 5minutes call for free)
* allergy?

## Specialities ##
* name

## Symptoms ##
* speciality_id
* name

## Calls ##
* doctor_id
* patient_id
* datetime

## Messages(chat logs) ## 
* call_id
* user_id
* text
* datetime