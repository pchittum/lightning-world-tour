public with sharing class AccountViewEditService {

	@AuraEnabled
	public static Id getAnAccountId (){
		Account acct = [Select id from Account limit 1];
		return acct.Id;
	}


}