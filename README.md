# Automatically Link Account Based on Contacts Email Domain

Initially, it is crucial to confirm the correct usage and formatting of the 'website' field in the Account record, as this field serves as our linking value. To facilitate user input and streamline the process, we plan to automate the formatting of this field. Users often copy and paste website URLs directly into the CRM, so the automation will ensure the desired format, which is 'example.com'. The function will eliminate any extraneous elements such as 'https://,' 'www.,' or additional pages and parameters from the website URL.

## Step 1:
Create a workflow that triggers on create or update of an Account where the website field is not empty and contains '/,www.,?'.

Assign the below function to the workflow and configure an argument of accountId set to the Account Record ID.

```js
accountMap = zoho.crm.getRecordById("Accounts", accountId);
website = accountMap.get("Website");
info website;
//
if(website.contains("//"))
{
	website = website.getSuffix("//");
}
if(website.contains("www."))
{
	website = website.getSuffix("www.");
}
if(website.contains("/"))
{
	website = website.getPrefix("/");
}
if(website.contains("?"))
{
	website = website.getPrefix("?");
}
info website;
//
updateMap = Map();
updateMap.put("Website",website);
updateResponse = zoho.crm.updateRecord("Accounts", accountId, updateMap);
info updateResponse;
```

## Step 2:
Create a workflow that triggers on create or edit of a Contact where the email field is not empty and the Account field is empty.

Assign the below function to the workflow and configure an argument of contactId set to the Contact Record ID.

```js
contactMap = zoho.crm.getRecordById("Contacts", contactId);
email = contactMap.get("Email");
emailDomain = email.getSuffix("@");
searchCriteria = "(Website:equals:" + emailDomain + ")";
searchResults = zoho.crm.searchRecords("Accounts", searchCriteria);
if(searchResults.size() == 1)
{
	accountMap = searchResults.get(0);
	accountId = accountMap.get("id");
	//
	updateMap = Map();
	updateMap.put("Account_Name",{"id":accountId});
	updateResponse = zoho.crm.updateRecord("Contacts", contactId, updateMap);
	info updateResponse;
}
```

Need help? Contact Us for assistance.
