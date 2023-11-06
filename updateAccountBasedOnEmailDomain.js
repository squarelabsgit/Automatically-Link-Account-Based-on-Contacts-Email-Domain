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
