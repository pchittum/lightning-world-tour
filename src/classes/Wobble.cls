public class Wobble {

	@AuraEnabled
	public static Wobble__c createWobble(DateTime start, Decimal startMS){
		Wobble__c w = new Wobble__c(Start__c=start, Start_Milliseconds__c=startMS);
		insert w;
		return w;
	}

	@AuraEnabled
	public static Wobble__c finishWobble(String recId, DateTime stop, Decimal stopMS){
		Wobble__c w = new Wobble__c(Stop__c=stop, Id=recId, Stop_Milliseconds__c=stopMS);
		update w;
		return w;
	}

	@AuraEnabled
	public static Measurements__c recordMeasurements(Decimal lr, Decimal fb, Decimal dir, String wobId){
		Measurements__c meas = new Measurements__c(Left_Right__c = lr, Front_Back__c = fb, Direction__c = dir, Wobble__c = wobId);
		insert meas;
		return meas;
	}

}