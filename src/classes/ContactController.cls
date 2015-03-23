public with sharing class ContactController {

	@AuraEnabled
	public static List<Contact> findAll(){
		return [SELECT Id,Name,FirstName,LastName,Phone,Email FROM Contact ORDER BY LastName LIMIT 50];
	}

	@AuraEnabled
	public static List<Contact> findByName(String searchTerm){
		String nameSearch = '%' + searchTerm + '%';
		return [SELECT Id,Name,FirstName,LastName,Phone,Email FROM Contact WHERE Name LIKE : nameSearch ORDER BY LastName];
	}

	@AuraEnabled
	public static Contact findById(String idParam){
		return [SELECT Id,Name,FirstName,LastName,Phone,Email FROM Contact WHERE Id = : idParam];
	}

	@AuraEnabled
	public static Id saveContact(Contact c){
		Id ctId;
		upsert c;
		ctId = c.Id;
		return ctId;
	}

}