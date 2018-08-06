
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
                  link=body.gameId
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

    // $(".inputScore").on("input",function(){
    //     $.ajax({
    //         url:'/game/'+$("#mainPlay").attr("data-id"),
    //         type:'POST',
    //         data:$('#mainPlay').serialize(),
    //         success:function(body){
    //             if(body.success){
    //               // console.log(body.gameId)
    //             }
    //             else{
    //                 // alert("ERROR");
    //             }
    //         } ,
    //         error:function(body){
    //             // console.log(body);
    //             // alert("ERROR")
    //         } 
    //     })
    // })
    let number= $("#mainPlay").attr("data")
    $("#addRoundButton").on("click",function(){     
        number++;
        $(".tableScore").append(`
            <tr class="round">
                <td>Round ${number}</td>
                <td><input type="number" name="score1" class="inputScore"></td> 
                <td><input type="number" name="score2" class="inputScore"></td>
                <td><input type="number" name="score3" class="inputScore"></td>
                <td><input type="number" name="score4" class="inputScore"></td>
            </tr>
        `)
    })
    
})