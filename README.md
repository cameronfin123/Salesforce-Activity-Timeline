# Salesforce-Activity-Timeline
Custom Activity Timeline that allows multiple standard and custom objects, editing, and displaying of related fields on date, subject and description.

![GitHub Logo](/images/Image1.png)
*(Activity Timeline on Account. Show related Opportunities by CloseDate, related Contacts by CreatedDate, and related Cases by ClosedDate with a custom icon)*

## Installation URL

## Version 2.0 - New Dev URL
- Transferring to development org

[Production](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t8c0000016cEb)

[Sandbox](https://test.salesforce.com/packaging/installPackage.apexp?p0=04t8c0000016cEb)

## Version 1.22 - Icon Feature + Bug Fixes
- Added Icon feature that allows customization of an objects icons in a list. Useful when displaying an object that doesn't have a tab (such as an objects Field History)
- Fixed Bug causing error when a Design field was left empty, even if it wasn't required
- Fixed Bug causing no objects to be rendered if no activity existed for one of the objects

[DEPRECATED Production](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3K0000009BQK&isdtp=p1)

[DEPRECATED Sandbox](https://test.salesforce.com/packaging/installPackage.apexp?p0=04t3K0000009BQK&isdtp=p1)

## Version 1.21 - Bug Fixes
- Fixed Subject overflow bug
- Fixed runtime bug that sometimes caused one of the objects to not display
- Added ability where spaces in the design fields doesn't prevent the component from working

[DEPRECATED Production](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3K0000009BPM&isdtp=p1)

[DEPRECATED Sandbox](https://test.salesforce.com/packaging/installPackage.apexp?p0=04t3K0000009BPM&isdtp=p1)

## Version 1.1:
Fixed bug with date sorting when referencing a date field on a related object. Added more thorough testing for the apex class as well as execption catching to allow rendering of the component if there is query exception the backend (in the case of an invalid field). Added customizable icons.

[DEPRECATED Production](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3K0000009BMr)

[DEPRECATED Sandbox](https://test.salesforce.com/packaging/installPackage.apexp?p0=04t3K0000009BMr)

### Version 1.1 API 53.0

[DEPRECATED Production](https://login.salesforce.com/packaging/installPackage.apexp?p0=04t3K0000009BPC&isdtp=p1)

[DEPRECATED Sandbox](https://test.salesforce.com/packaging/installPackage.apexp?p0=04t3K0000009BPC&isdtp=p1)

## Version 1.0 **DEPRECATED**:
[DEPRECATED Sandbox](https://test.salesforce.com/packaging/installPackage.apexp?p0=04t3K0000009BMm)

## Setup
1. Navigate to a Lightning Page
![GitHub Logo](/images/Image3.png)
2. Drag and drop ActivityTimeline from the Custom Component section of the Component sidebar (on the left)
![GitHub Logo](/images/Image4.png)
3. Enter a comma delimited list of object names, relationship fields, date fields, subject fields and description fields
![GitHub Logo](/images/Image2.png)
4. Click Save
