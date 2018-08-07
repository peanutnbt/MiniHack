
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


    //tạo delegate event input 
    $("#mainPlay table").on("input",".inputScore",function(){
        $.ajax({
            url:'/game/'+$("#mainPlay").attr("data-id"),
            type:'POST',
            data:$('#mainPlay').serialize(),
            success:function(body){
                if(body.success){
                    console.log("ok")
                }
                else{
                    alert("ERROR");
                }
            } ,
            error:function(body){
                alert("ERROR2")
            } 
        })
    })
    let number =parseInt($("#mainPlay").attr("data-RoundLength"))+1;//lấy length của round hiện tại
    $("#addRoundButton").on("click",function(e){
        e.preventDefault();
        $(".inputScore").removeAttr("name");   //sau khi click tạo dòng mới trên client, xóa hết attr name của input để về sau chỉ lấy value của input mới ở dòng 54-57
        $(".numberRound").removeAttr("name"); //xóa attribute tên là name của .numberRound, 
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
    })
    //neu de disable thi se ko post duoc len
    
    
})
