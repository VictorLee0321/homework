/**
 * Created by victorlee on 17-4-15.
 */

$(function() {
    account = $.cookie("account");
    console.log("account in stu.js is: " + account);
    $("#signup").css('display','none');
    $("#signin").css('display','none');
    $("#logout").css('display', 'inline-block');
    $("#user").css("display","inline-block");
    $("#user_account").html(account);
    writeLocation();

    $("#btnChangePsw").click(function() {
		var old_psw = $("#old_psw").val();
		var new_psw = $("#new_psw").val();
		var new_psw2 = $("#new_psw2").val();
		if ("" != old_psw && "" != new_psw && "" != new_psw2) {
			if (new_psw2 != new_psw) {
				$("#change_psw_div").css("display","block");
				$("#change_psw").html("新的密码不一致");
				return false;
			} else {
				updatePsw(account, old_psw, new_psw);
				return false;
			}
		} else {
			return false;
		}
	});

    $("#user").click(function () {
        $("#change_psw_div").css("display","none");
    });
    
    $("#logout").click(function () {
        $.cookie("account", null, {expires:30, path:"/"});
        $.cookie("password", null, {expires:30, path:"/"});
        $.cookie("type", null, {expires:30, path:"/"});
        $.cookie("clazz_id", null, {expires:30, path:"/"});
        $.cookie("student_id", null, {expires:30, path:"/"});
        location.href = '/';
    });

    // test
    //getUnSubmitCourse();

});

var un_submit_homework;
var class_homework;
var overtime_homework;
var submit_homework;

function showTBodyData(data, page_num) {
	$("#tbody").empty();
	for (var i = 5 * (page_num - 1); i < 5 * page_num && i < data.length; i++) {
		/*<tr>
			<td><input type="checkbox"></td>
			<td>JAVA应用技术</td>
			<td>三</td>
			<td>2016-08-01 00:00:00</td>
			<td>
				<button type="button" id="btn_upload" class="btn btn-xs">
					<span class="glyphicon glyphicon-upload"></span>
				</button>
			</td>
		</tr>*/
		var rowData = data[i];
//		console.log(data);
		console.log(rowData);
		var row = "<tr>";
		row += "<td><input type=\"checkbox\"></td>";
		row += "<td>" + rowData.task_id + "</td>";
		row += "<td>" + rowData.course_task_name + "</td>";
		row += "<td>" + rowData.last_time + "</td>";
		row += "<td><button type=\"button\" id=\"td_upload" + (i % 5 + 1) + "\" class=\"btn btn-xs\"><span class=\"glyphicon glyphicon-upload\"></span></button></td>";
		row += "</tr>";
		$("#tbody").append(row);
	}
}

function getUnSubmitCourse() {
	var account = $.cookie("account");
	var student_id = $.cookie("student_id");
	var clazz_id = $.cookie("clazz_id");
	$.ajax ({
		url : "/student/getUnsubmitCourse",
		type: "POST",
		dataType : "json",
		data : {"account":account, "student_id":student_id, "clazz_id":clazz_id},
		success : function(data) {
		    console.log(data);
		    for (var i = 0; i < data[0].length; i++) {
                //console.log(data[i].fileds.pk);
                console.log(data[i].task_id);
                console.log(data[i].course_task_name);
                console.log(data[i].last_time);
			}
			// show data function for re use
			un_submit_homework = data;
			var page_num = $("#page_num b").html();
//			console.log(un_submit_homework);
//			showTBodyData(data, page_num);
			showTBodyData(un_submit_homework, page_num);
			$("#student_panel_heading").html("未交作业");
		}
	});
}

function updatePsw(account, old_psw, new_psw) {
	$.ajax ({
		url : "/student/updatePsw",
		type : "POST",
		dataType : "json",
		data : {"account":account,"old_psw":old_psw,"new_psw":new_psw},
		success : function(data) {
			if (0 == data) {
				$("#userModal").modal("hide");
				alert("密码修改成功");
			} else if (1 == data){
				$("#change_psw_div").css("display","block");
				$("#change_psw").html("旧密码输入错误");
			} else {
				$("#change_psw_div").css("display","block");
				$("#change_psw").html("网络故障请重试");
			}
		}
	});
}

function writeLocation() {
    $.ajax ({
        url : "/student/loadkUser",
        //async: false,
        type : "POST",
        dataType : "json",
        data : {"account":account},
        success : function(data) {
            console.log(data);
            var locate_display = data.clazz_name + ":" + data.stu_name;
            $.cookie("clazz_id", data.clazz_id, {expires:30, path:"/"});
            $.cookie("student_id", data.stu_id, {expires:30, path:"/"});
            $("#location").html(locate_display);
            getUnSubmitCourse();
        }
    });
}