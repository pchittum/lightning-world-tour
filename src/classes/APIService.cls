@RestResource(urlMapping='/ACIExample/*')
global class APIService {

	@HttpPost	
	global static AccountContact newAccountAndContact(AccountContact accountContactInput){
		Account acct = new Account(Name=accountContactInput.Company);
		Contact ct = new Contact(FirstName=accountContactInput.FirstName,LastName=accountContactInput.LastName);

		insert acct;

		ct.AccountId = acct.Id;

		insert ct;

		AccountContact insertedData = new AccountContact();
		insertedData.Company = acct.Name;
		insertedData.AccountId = acct.Id;
		insertedData.FirstName = ct.FirstName;
		insertedData.LastName = ct.LastName;
		insertedData.ContactId = ct.Id;

		return insertedData;
	}

	global class AccountContact {
		global String Company {get;set;}
		global String FirstName {get;set;}
		global String LastName {get;set;}
		global String AccountId {get;set;}
		global String ContactId {get;set;}
	} 
}