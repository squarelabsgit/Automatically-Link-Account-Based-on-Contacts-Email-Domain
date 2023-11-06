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
