# Salesforce-Activity-Timeline
Custom Activity Timeline that allows multiple standard and custom objects, displaying of related fields on date, subject and description, and editing.

## Installation URL

## Version 1.21 - Bug Fixes
- Fixed Subject overflow bug
- Fixed runtime bug that sometimes caused one of the objects to not display
- Added ability where spaces in the design fields doesn't prevent the component from working

Production: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3K0000009BPM&isdtp=p1
Sandbox: https://test.salesforce.com/packaging/installPackage.apexp?p0=04t3K0000009BPM&isdtp=p1

## Version 1.1:
Fixed bug with date sorting when referencing a date field on a related object. Added more thorough testing for the apex class as well as execption catching to allow rendering of the component if there is query exception the backend (in the case of an invalid field). Added customizable icons.

Production: 	https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3K0000009BMr

Sandbox: 	https://test.salesforce.com/packaging/installPackage.apexp?p0=04t3K0000009BMr

### Version 1.1 API 53.0

Production: https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3K0000009BPC&isdtp=p1

Sandbox: https://test.salesforce.com/packaging/installPackage.apexp?p0=04t3K0000009BPC&isdtp=p1

## Version 1.0 **DEPRECATED**:
https://test.salesforce.com/packaging/installPackage.apexp?p0=04t3K0000009BMm

## Setup
1. Navigate to a Lightning Page
2. Drag and drop ActivityTimeline from the Custom Component section of the Component sidebar (on the left)
3. Enter a comma delimited list of object names, relationship fields, date fields, subject fields and description fields
4. Click Save
