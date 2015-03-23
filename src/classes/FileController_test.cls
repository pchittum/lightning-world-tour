@isTest 
public class FileController_test {
    
    @isTest
    public static void testFileUploader(){
        
        Account acctTest = new Account(name='test account');
        insert acctTest;
        
        String testFileStr = EncodingUtil.urlEncode('This is some text', 'UTF-8');

        Id acctId = acctTest.Id;

        Id attachmentId = FileController.saveTheFile(acctId,'thefile.txt',testFileStr,'text/plain');

        System.debug(attachmentId);
        
        Account retrievedAcct = [select Id, Name, (select Id, Name, ContentType from Attachments  ) from Account where Id =: acctId];
        
        for (Attachment a : retrievedAcct.Attachments){
            System.assert(a.Name == 'thefile.txt' && a.ContentType == 'text/plain','The attachment was not the one expected');
        }
        
    }
    
    @isTest
    public static void testFileBatcher(){
        
        Integer attachmentBodyLen = 0;
        Account acctTest = new Account(name='test account');
        insert acctTest;
        
        String testFileStr = EncodingUtil.urlEncode('This is some text', 'UTF-8');

        Id acctId = acctTest.Id;

        Id attachmentId = FileController.saveTheChunk(acctId,'thefile.txt',testFileStr,'text/plain','');

        System.debug(attachmentId);
        
        Account retrievedAcct = [select Id, Name, (select Id, Name, ContentType, BodyLength from Attachments  ) from Account where Id =: acctId];
        
        for (Attachment a : retrievedAcct.Attachments){
            System.assert(a.Name == 'thefile.txt' && a.ContentType == 'text/plain','The attachment was not the one expected');
            attachmentBodyLen = a.BodyLength;
        }
        
        attachmentId = FileController.saveTheChunk(acctId,'thefile.txt',testFileStr,'text/plain',attachmentId);
        
        retrievedAcct = [select Id, Name, (select Id, Name, ContentType, BodyLength from Attachments  ) from Account where Id =: acctId];

        for (Attachment a : retrievedAcct.Attachments){
            System.assert(a.Name == 'thefile.txt' && a.ContentType == 'text/plain','The attachment was not the one expected');
            System.assert(attachmentBodyLen < a.BodyLength, 'The body length was not doubled on saving the second chunk');
        }
        
    }
}