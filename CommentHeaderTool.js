/////////////////////////////////////////////////////////////////////////////
///the script loads the web interface after calling CreateCommentHeader ()///
////////////////and allows you to format nice comment headers////////////////
//////////////////////////////////like this//////////////////////////////////
////////////////////////////////////////////////////////////////////Rigaard//
/////////////////////////////////////////////////////////////////13.03.2021//

///////////////////////////////////////
///initials below, can be left blank///
//////////////////////////////Rigaard//
///////////////////////////13.03.2021//
var __authorInfo = "Rigaard";
////////////////////////////////////////////////////////
//////////////////////Comment type//////////////////////
///(expands the use in different configuration files)///
///////////////////////////////////////////////Rigaard//
////////////////////////////////////////////13.03.2021//
var __commentType = "/";

////////////////
///Add Date()///
///////Rigaard//
////13.03.2021//
var __setDate = true;

//////////////////
///Dinanmic IDs///
/////////Rigaard//
//////13.03.2021//
var __headerInput = "headerInput";
var __headerOutput = "headerOutput";
var __formatComment = "formatComment";
var __copyComment = "copyComment";

///////////////////////////
///create header comment///
//////////////////Rigaard//
///////////////13.03.2021//
function CreateCommentHeader(){
    var textarea = $("<textarea type=\"textarea\" id=\"" + __headerInput
                    + "\" rows=\"10\" cols=\"45\"/>");
    var textareaOutput = $("<textarea type=\"textarea\" id=\"" + __headerOutput
                    + "\" rows=\"10\" cols=\"45\"/>");
    var button = $("<button onclick=\"CommentTextFormat();\" id=\"" + __formatComment
                    + "\" >FormatComment</button>");
    var buttonCopy = $("<button onclick=\"CopyTextArea();\" id=\"" + __copyComment
                    + "\">Copy</button>");
    var br = "</br>";
    var inputDiv = $( "#scriptArea01" );
    inputDiv.append(textarea);
    inputDiv.append(br);
    inputDiv.append(button);
    inputDiv.append(br);
    inputDiv.append(textareaOutput);
    inputDiv.append(br);
    inputDiv.append(buttonCopy);
}

/////////////////
///Format text///
////////Rigaard//
/////13.03.2021//
function CommentTextFormat(){
    var authorInfo = __authorInfo;
    var inputText = $("#" + __headerInput).val();
    $("#" + __headerOutput).val("");
    
    if(inputText.length < 3)    {
        return;
    }
    var inputRows = inputText.split("\n");
    var length = 0; //max length
    
    $.each(inputRows, function(row){
              if(length < inputRows[row].length) {
                length=inputRows[row].length;
              }
           });
    var result = "";
    if(length > 0)
    {
        for(var i = 0; i < inputRows.length + 2; i++) {
            var newRow="";
            if(result.length > 0) {
                result += "\n"; // new row
            }
            if(i === 0) { // first row
                for(var k = 0; k < length + 6; k++) {               
                    newRow += __commentType;
                }
            }
            else if (i === inputRows.length + 1){ // last row
                    //Set author
                    if(authorInfo.length > length) {// author name length too long
                        authorInfo = authorInfo.substring(0,3);
                    }
                    newRow += authorInfo + __commentType + __commentType;
                    var newRowLength = newRow.length;
                    for(var k = 0; k < length - newRowLength + 6; k++) {               
                        newRow = __commentType + newRow;
                    }                     
            }
            else {
                var reverse = true;
                for(var k = 0; k < length - inputRows[i-1].length + 6; k++) {
                    if(newRow.length === 0){
                        newRow += inputRows[i-1];                        
                    }
                    if(reverse) {
                        newRow = newRow + __commentType;
                        reverse = false;
                    }
                    else {
                        newRow = __commentType + newRow;
                        reverse = true;
                    }
                }              
            }
            result += newRow;   
        }
        //Set date
            if(__setDate && length > 8) {
                var d = new Date();
                var month = d.getMonth()+1;
                var day = d.getDate();
                var currentDate = (day<10 ? '0' : '') + day + "." +
                                (month<10 ? '0' : '') + month + "." +
                                d.getFullYear();
                newRow = currentDate + __commentType + __commentType;
                var newRowLength = newRow.length;
                for(var k = 0; k < length - newRowLength + 6; k++) {               
                     newRow = __commentType + newRow;
                }
                result += "\n" + newRow;
            }
        $("#" + __headerOutput).val(result);
        CopyTextArea();
    }
}

//////////////////////
///Copy result from///
/////////////Rigaard//
//////////13.03.2021//
function CopyTextArea() {
    $("#" + __headerOutput).select();
    document.execCommand("copy");
}