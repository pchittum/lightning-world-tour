global without sharing class DonutChartService {

	private static String valLabel = 'Amount';
	private static String itemLabel = 'Item';
	private static final String kTotalKey = 'total-all';
    private static final String kItemCount = 'item-count';
    private static final String kTotalItemCount = 'total-item-count';

	private static Map<String,AggHelper> OrdersOverNUnits = new Map<String,AggHelper>();
	private static Map<String,AggHelper> OrdersOverNValue = new Map<String,AggHelper>();
	private static Map<String,AggHelper> TopProductByUnits = new Map<String,AggHelper>();
	private static Map<String,AggHelper> TopProductsByRevenue = new Map<String,AggHelper>();

	private static Map<String,Decimal> stagingMapOUnits = new Map<String,Decimal>(); //stage order unit data
	private static Map<String,Decimal> stagingMapOValue = new Map<String,Decimal>(); //stage order value data
	private static Map<String,Decimal> stagingMapPUnits = new Map<String,Decimal>(); //stage product unit data
	private static Map<String,Decimal> stagingMapPValue = new Map<String,Decimal>(); //stage product value data

	static{
		List<OrderDetails__x> orderDeets = [SELECT Id, ExternalId, DisplayUrl, orderID__c, orderLine__c, product__c, quantity__c, unitPrice__c FROM OrderDetails__x];

		for (OrderDetails__x ox : orderDeets){
		    if (stagingMapOUnits.containsKey(ox.OrderID__c)){
		        stagingMapOUnits.put(ox.orderID__c, stagingMapOUnits.get(ox.orderID__c) + ox.quantity__c);
		        stagingMapOValue.put(ox.orderID__c, stagingMapOValue.get(ox.orderID__c) + ox.unitPrice__c);
		    } else {
		        stagingMapOUnits.put(ox.orderID__c,ox.quantity__c);
		        stagingMapOValue.put(ox.orderID__c,ox.unitPrice__c);
		    }

		    if (stagingMapPUnits.containsKey(ox.product__c)){
		        stagingMapPUnits.put(ox.product__c, stagingMapPUnits.get(ox.product__c) + ox.quantity__c);
		        stagingMapPValue.put(ox.product__c, stagingMapPValue.get(ox.product__c) + ox.unitPrice__c);
	    	} else {
		        stagingMapPUnits.put(ox.product__c,ox.quantity__c);
		        stagingMapPValue.put(ox.product__c,ox.unitPrice__c);
	    	}
		        
		}

		stagingMapOUnits = setTotal(stagingMapOUnits);
		stagingMapOValue = setTotal(stagingMapOValue);
		stagingMapPUnits = setTotal(stagingMapPUnits);
		stagingMapPValue = setTotal(stagingMapPValue);
		//System.debug(stagingMapOUnits);
		//System.debug(stagingMapOValue);
		//System.debug(stagingMapPUnits);
		//System.debug(stagingMapPValue);

        //System.debug(stagingMapOUnits.get(kTotalKey));
		//System.debug(stagingMapOValue.get(kTotalKey));
		
        //for (String key : stagingMapPUnits.keySet()){
        //    System.debug(key);
        //    System.debug(stagingMapPUnits.get(key));
        //    System.debug(stagingMapPValue.get(key));
        //}		

	}

    @RemoteAction
    public static Map<String,Decimal> getOrdersOverNUnitsRemote(Decimal n){
    	return getOrdersOverNUnits(n);
    }

    @AuraEnabled 
    public static Map<String,Decimal> getOrdersOverNUnits(Decimal n){
        valLabel = 'Order';
        itemLabel = 'Units';
        Integer orderCounter = 0;
        Integer bigOrderCounter = 0;
        Map<String,Decimal> retMap = new Map<String,Decimal>();
        
        //if the total has been calculated put in the return map and remove
        //so it is not counted in the for loop
        //if (stagingMapOUnits.containsKey(kTotalKey)) {
        //    retMap.put(kTotalKey,new AggHelper(valLabel, kTotalKey, itemLabel, stagingMapOUnits.get(kTotalKey)));
        //	stagingMapOUnits.remove(kTotalKey);
        //}
        
        for (String key: stagingMapOUnits.keySet()){
            if (stagingMapOUnits.get(key) > n){
                //retMap.put(key,new AggHelper(valLabel, key, itemLabel, stagingMapOUnits.get(key)));
                bigOrderCounter++;
            }
            orderCounter++;
        }
        
        retMap.put(kItemCount,(Decimal)bigOrderCounter);
        retMap.put(kTotalItemCount,(Decimal)orderCounter);
        System.debug(retMap);
        return retMap;
    }

    @AuraEnabled
    public static Map<String,Decimal> getOrdersOverNValue(Decimal n){
        valLabel = 'Order';
        itemLabel = 'Value';
        Integer orderCounter = 0;
        Integer bigOrderCounter = 0;
        Map<String,Decimal> retMap = new Map<String,Decimal>();
        
        //if the total has been calculated put in the return map and remove
        //so it is not counted in the for loop
        //if (stagingMapOUnits.containsKey(kTotalKey)) {
        //    retMap.put(kTotalKey,new AggHelper(valLabel, kTotalKey, itemLabel, stagingMapOUnits.get(kTotalKey)));
        //	stagingMapOUnits.remove(kTotalKey);
        //}
        
        for (String key: stagingMapOValue.keySet()){
            if (stagingMapOValue.get(key) > n){
                //retMap.put(key,new AggHelper(valLabel, key, itemLabel, stagingMapOUnits.get(key)));
                bigOrderCounter++;
            }
            orderCounter++;
        }
        
        retMap.put(kItemCount,(Decimal)bigOrderCounter);
        retMap.put(kTotalItemCount,(Decimal)orderCounter);
        System.debug(retMap);
        return retMap;
    }

	public static void testHelper(){
		System.debug('done');
	}

	private static Map<String,Decimal> setTotal(Map<String,Decimal> theMap){
		Decimal sum = 0;

		for (Decimal val : theMap.values()){
			sum += val;
		}

		theMap.put(kTotalKey,sum);

		return theMap;
	}

    @AuraEnabled
    public static Map<String,Decimal> getProductsOverNUnits(Decimal n){
        valLabel = 'Product';
        itemLabel = 'Units';
        Integer productCounter = 0;
        Integer bigProductCounter = 0;
        Map<String,Decimal> retMap = new Map<String,Decimal>();
        
        //if the total has been calculated put in the return map and remove
        //so it is not counted in the for loop
        //if (stagingMapOUnits.containsKey(kTotalKey)) {
        //    retMap.put(kTotalKey,new AggHelper(valLabel, kTotalKey, itemLabel, stagingMapOUnits.get(kTotalKey)));
        //	stagingMapOUnits.remove(kTotalKey);
        //}
        
        for (String key: stagingMapPUnits.keySet()){
            if (stagingMapPUnits.get(key) > n){
                //retMap.put(key,new AggHelper(valLabel, key, itemLabel, stagingMapOUnits.get(key)));
                bigProductCounter++;
            }
            productCounter++;
        }
        
        retMap.put(kItemCount,(Decimal)bigProductCounter);
        retMap.put(kTotalItemCount,(Decimal)productCounter);
        System.debug(retMap);
        return retMap;
    }

    @AuraEnabled
    public static Map<String,Decimal> getProductsOverNValue(Decimal n){
        valLabel = 'Product';
        itemLabel = 'Value';
        Integer productCounter = 0;
        Integer bigProductCounter = 0;
        Map<String,Decimal> retMap = new Map<String,Decimal>();
        
        //if the total has been calculated put in the return map and remove
        //so it is not counted in the for loop
        //if (stagingMapOUnits.containsKey(kTotalKey)) {
        //    retMap.put(kTotalKey,new AggHelper(valLabel, kTotalKey, itemLabel, stagingMapOUnits.get(kTotalKey)));
        //	stagingMapOUnits.remove(kTotalKey);
        //}
        
        for (String key: stagingMapPValue.keySet()){
            if (stagingMapPValue.get(key) > n){
                //retMap.put(key,new AggHelper(valLabel, key, itemLabel, stagingMapOUnits.get(key)));
                bigProductCounter++;
            }
            productCounter++;
        }
        
        retMap.put(kItemCount,(Decimal)bigProductCounter);
        retMap.put(kTotalItemCount,(Decimal)productCounter);
        System.debug(retMap);
        return retMap;
    }

    
global class AggHelper {
    public String NameLabel;
    public String Name;
    public String ValueLabel;
    public Decimal Value;
    
    public AggHelper(){
        this('','','',0);
    }
    public AggHelper(String nLabel, String n, String vLabel, Decimal v){
        this.NameLabel = nLabel;
        this.Name = n; 
        this.ValueLabel = vLabel;
        this.Value = v;
    }

    global Integer compareTo(Object compareTo) {
        AggHelper compareToAgg = (AggHelper)compareTo;
        if (Value == compareToAgg.Value) return 0;
        if (Value > compareToAgg.Value) return 1;
        return -1;
	}    
    
}

}