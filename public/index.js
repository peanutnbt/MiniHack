
$(document).ready(function(){
    $("#formCreate").on("submit",function(){
        event.preventDefault();
        $.ajax({
            url:'/',
            type:'POST',
            data:$('#formCreate').serialize(),
            success:function(body){
                if(body.success){
                  // console.log(body.gameId)
                   window.location.href ="/game/" + body.gameId
                }
                else{
                    alert("ERROR");
                }
            } , 
            error:function(body){
                // console.log(body);
                alert("ERROR")
            } 
        })
    })
    //check ban dau
    if($("[name=score1]").val()!=""&&$("[name=score2]").val()!=""&&$("[name=score3]").val()!=""&&$("[name=score4]").val()!=""){
    }
    else{
        $("#addRoundButton").attr("disabled","disabled")
        $(".mainScore").append(`
            <div class="messageFill">Please fill all input</div>
        `)
    }

    var ajaxUpdate=()=>$.ajax({
        url:'/game/'+$("#mainPlay").attr("data-id"),
        type:'POST',
        data:$('#mainPlay').serialize(),
        success:function(body){
            if(body.success){
                $("#total1").text(body.sumA)
                $("#total2").text(body.sumB)
                $("#total3").text(body.sumC)
                $("#total4").text(body.sumD)
            }
            else{
                alert("ERROR");
            }
        } ,
        error:function(body){
            alert("ERROR2")
        } 
    })
    //tạo delegate event input 
    $("#mainPlay table").on("input",".inputScore",function(){
        $(".messageSuccess").remove()
        var input1=$("[name=score1]"),input2=$("[name=score2]"),input3=$("[name=score3]"),input4=$("[name=score4]")
        if(input1.val()!=""&&input2.val()!=""&&input3.val()!=""&&input4.val()!=""){//neu 4 cai duoc dien
            var sumOfRecord=parseInt(input1.val())+parseInt(input2.val())+parseInt(input3.val())+parseInt(input4.val())
            if(sumOfRecord==0){
                ajaxUpdate();
                $("#addRoundButton").removeAttr("disabled")
                $(".messageFill").remove()
                $(".messageSumErr").remove()
                input1.css("background-color", "")
                input2.css("background-color", "")
                input3.css("background-color", "")
                input4.css("background-color", "")
                $(".mainScore").append(`
                    <div class="messageSuccess">Update success Record</div>
                `)
                return;
            }
            else{
                $("#addRoundButton").attr("disabled","disabled")
                $(".messageFill").remove()
                $(".messageSumErr").remove()
                $(".mainScore").append(`
                    <div class="messageSumErr">Please input correct (sum of record equal zero)</div>
                `)
                input1.css("background-color", "yellow")
                input2.css("background-color", "yellow")
                input3.css("background-color", "yellow")
                input4.css("background-color", "yellow")
                return;
            }
            
        }
        ajaxUpdate();
        
    })
    let number =parseInt($("#mainPlay").attr("data-RoundLength"));//lấy length của round hiện tại
    $("#addRoundButton").on("click",function(e){
        $(".messageSuccess").remove()
        e.preventDefault();
        $("#addRoundButton").attr("disabled","disabled")
        $(".inputScore").removeAttr("name");   //sau khi click tạo dòng mới trên client, xóa hết attr name của input để về sau chỉ lấy value của input mới ở dòng 54-57
        $(".numberRound").removeAttr("name"); //xóa attribute tên là name của .numberRound, 
        $(".inputScore").attr("readonly","readonly")
        number++;//mỗi lần click tăng round lên ở trên client

        $(".tableScore tbody").append(`
            <tr class="round">
                <td>Round <input type="number" value="${number}" readonly name="numberOfRound" class="numberRound"></td>
                <td><input type="number" name="score1" class="inputScore"></td> 
                <td><input type="number" name="score2" class="inputScore"></td>
                <td><input type="number" name="score3" class="inputScore"></td>
                <td><input type="number" name="score4" class="inputScore"></td>
            </tr>
        `)
        $(".mainScore").append(`
            <div class="messageFill">Please fill all input</div>
        `)
    })
    //neu de disable thi se ko post duoc len
    
    
})
