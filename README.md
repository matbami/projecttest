# projecttest
This is podcast management application 

This contains features including ability to 
Login/ sign up as user,and Admin.
While Admin can upload, View ,update and delete a podcast

Admin and user sign up POST. /signup.
{
Name: (string)required
email:(string)required
Password:(string)required
Role: Admin/user(default is user)
}

Admin/user login; POST  /login
{
Email: (string ) required
Password (string)  required
}
Upload podacst; POST  /create
{
Title: (string) required
Tag:(string) required
Description:(string) required
File: required
}
view all podcast. GET podcast/view
Update podcast PATCH podcast/:id
Delete Podcast DELETE podcast/:id
