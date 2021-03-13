///////////////////////////////////////////////////////////////////////
///Скрипт выгружает веб интерфейс после вызова CreateCommentHeader()///
///и позволяет форматировать красивые заголовки комментарии примерно///
////////////////////////////вот такого вида////////////////////////////
//////////////////////////////////////////////////////////////Rigaard//
///////////////////////////////////////////////////////////11.03.2021//

///////////////////////////////////////////
///Инициалы внизу, можно оставить пустым///
//////////////////////////////////Rigaard//
var __authorInfo = "Rigaard";
////////////////////////////////////////////////////////////////////////////
//////////////////////////////Вид комментария///////////////////////////////
///(расширяет возможности использования в разных конфигурационных файлах)///
///////////////////////////////////////////////////////////////////Rigaard//
var __commentType = "/";

////////////////////////////////////////
///Вписать текущую дату в комментарий///
///////////////////////////////Rigaard//
////////////////////////////11.03.2021//
var __setDate = true;

///////////////////////////////
///ID динамических элементов///
//////////////////////Rigaard//
///////////////////11.03.2021//
var __headerInput = "headerInput";
var __headerOutput = "headerOutput";
var __formatComment = "formatComment";
var __copyComment = "copyComment";

//////////////////////////////////////////////////
///созддаем заголовоки для комментариев методов///
/////////////////////////////////////////Rigaard//
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

///////////////////////
///Форматируем текст///
//////////////Rigaard//
function CommentTextFormat(){
    var authorInfo = __authorInfo;
    var inputText = $("#" + __headerInput).val();
    $("#" + __headerOutput).val("");
    
    if(inputText.length < 3)    {
        return;
    }
    var inputRows = inputText.split("\n");
    var length = 0; //максимальная ширина блока
    
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
                result += "\n"; // новая строка
            }
            if(i === 0) { // первая строка
                for(var k = 0; k < length + 6; k++) {               
                    newRow += __commentType;
                }
            }
            else if (i === inputRows.length + 1){ // последняя строка
                    //добавляем автора
                    if(authorInfo.length > length) {// автор не влазит в строку, берем инициалы
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
        //Устанавливаем дату, если влезает в текущий блок
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

///////////////////////////////////////
///Скопировать результат из textarea///
//////////////////////////////Rigaard//
function CopyTextArea() {
    $("#" + __headerOutput).select();
    document.execCommand("copy");
}