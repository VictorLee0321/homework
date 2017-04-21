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

	$("#next_page").click(function() {
		var page_row = $("#tbody tr").length;
		if (page_row < 5)
			return false;
		var page_num = parseInt($("#page_num b").html()) + 1;
		var hw_type = $("#student_panel_heading").html();
		switch (hw_type) {
		case "未交作业":
			if (5 * (page_num - 2) + page_row == un_submit_homework.length)
				return false;
			showTBodyData(un_submit_homework, page_num);
			$("#page_num b").html(page_num);
			break;
		case "班级作业":
			if (5 * (page_num - 2) + page_row == class_homework.length)
				return false;
			showTBodyData(class_homework, page_num);
			$("#page_num b").html(page_num);
			break;
		case "超期作业":
			if (5 * (page_num - 2) + page_row == overtime_homework.length)
				return false;
			showTBodyData(overtime_homework, page_num);
			$("#page_num b").html(page_num);
			break;
		case "已交作业":
			if (5 * (page_num - 2) + page_row == submit_homework.length)
				return false;
			showTBodyData(submit_homework, page_num);
			$("#page_num b").html(page_num);
			break;
		}
	});

	$("#btn_overtime").click(function() {
		sort_click *= -1;
		$("#page_num b").html("1");
		var hw_type = $("#student_panel_heading").html();
		var page_num = 1;
		switch (hw_type) {
		case "未交作业":
			sortByTime(un_submit_homework);
			showTBodyData(un_submit_homework, page_num);
			break;
		case "班级作业":
			sortByTime(class_homework);
			showTBodyData(class_homework, page_num);
			break;
		case "超期作业":
			sortByTime(overtime_homework);
			showTBodyData(overtime_homework, page_num);
			break;
		case "已交作业":
			sortByTime(submit_homework);
			showTBodyData(submit_homework, page_num);
			break;
		}
	});

	$("#previous_page").click(function() {
		var page_num = parseInt($("#page_num b").html()) - 1;
		if (page_num < 1)
			return false;
		var hw_type = $("#student_panel_heading").html();
		switch (hw_type) {
		case "未交作业":
			showTBodyData(un_submit_homework, page_num);
			$("#page_num b").html(page_num);
			break;
		case "班级作业":
			showTBodyData(class_homework, page_num);
			$("#page_num b").html(page_num);
			break;
		case "超期作业":
			showTBodyData(overtime_homework, page_num);
			$("#page_num b").html(page_num);
			break;
		case "已交作业":
			showTBodyData(submit_homework, page_num);
			$("#page_num b").html(page_num);
			break;
		}
	});

	$("#btn_unsubmit_homework").click(function() {
		$("#page_num b").html("1");
//		var page_num = $("#page_num b").html();
//		console.log(un_submit_homework);
//		showTBodyData(un_submit_homework, page_num);
		if (null != un_submit_homework) {
			var page_num = $("#page_num b").html();
			showTBodyData(un_submit_homework, page_num);
		} else {
			getUnSubmitCourse();
		}
		$("#student_panel_heading").html("未交作业");
	});

	$("#btn_class_homework").click(function() {
		$("#page_num b").html("1");
		if (null != class_homework) {
			var page_num = $("#page_num b").html();
			showTBodyData(class_homework, page_num);
		} else {
			getClassHomework();
		}
//		console.log(class_homework);
		$("#student_panel_heading").html("班级作业");
	});

	$("#btn_overtime_homework").click(function() {
		$("#page_num b").html("1");
		/*var page_num = $("#page_num b").html();
//		console.log(un_submit_homework);
		showTBodyData(un_submit_homework, page_num);*/
//		console.log("click getOvertimeCourse3() function");
		if (null != overtime_homework) {
			var page_num = $("#page_num b").html();
			showTBodyData(overtime_homework, page_num);
		} else {
			getOvertimeCourse();
		}
		$("#student_panel_heading").html("超期作业");
//		console.log("already getOvertimeCourse3() function");
	});

	$("#btn_submited_homework").click(function() {
		$("#page_num b").html("1");
		if (null != submit_homework) {
			var page_num = $("#page_num b").html();
			showTBodyData(submit_homework, page_num);
		} else {
			getSubmitCourse();
		}
//		console.log(submit_homework);
		$("#student_panel_heading").html("已交作业");
	});

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

function getClassHomework() {
	var account = $.cookie("account");
	var student_id = $.cookie("student_id");
	var clazz_id = $.cookie("clazz_id");
	$.ajax ({
		url : "/student/getClassHomework",
//		async: false,
		type: "POST",
		dataType : "json",
		data : {"account":account, "student_id":student_id, "clazz_id":clazz_id},
		success : function(data) {
			// show data function for re use
			var page_num = $("#page_num b").html();
//			console.log(page_num);
//			console.log(data);
			class_homework = data;
//			console.log(class_homework);
			showTBodyData(class_homework, page_num);
			// old
			/*if (null != class_homework && null != submit_homework) {
				getUnSubmitCourse3();
			}*/
		}
	});
}

function getOvertimeCourse() {
	var account = $.cookie("account");
	var student_id = $.cookie("student_id");
	var clazz_id = $.cookie("clazz_id");
	$.ajax ({
		url : "/student/getOvertimeCourse",
//		async: false,
		type: "POST",
		dataType : "json",
		data : {"account":account, "student_id":student_id, "clazz_id":clazz_id},
		success : function(data) {
			// show data function for re use
			var page_num = $("#page_num b").html();
//			console.log(page_num);
//			console.log(data);
			overtime_homework = data;
//			console.log(overtime_homework);
			showTBodyData(overtime_homework, page_num);
		}
	});
}

function getSubmitCourse() {
	var account = $.cookie("account");
	var student_id = $.cookie("student_id");
	var clazz_id = $.cookie("clazz_id");
	$.ajax ({
		url : "/student/getSubmitCourse",
//		async: false,
		type : "POST",
		dataType : "json",
		data : {"account":account, "student_id":student_id, "clazz_id":clazz_id},
		success : function(data) {
			// show data function for re use
			var page_num = $("#page_num b").html();
//			console.log(page_num);
//			console.log(data);
			submit_homework = data;
//			console.log(submit_homework);
//			console.log(submit_homework);
			showTBodyData(submit_homework, page_num);
			// old
			/*if (null != class_homework && null != submit_homework) {
				getUnSubmitCourse3();
			}*/
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

var sort_click = 1;

function sortByTime(data) {
	data.sort(function(a, b) {
//		console.log(a.last_time);
//		console.log(b.last_time);
//		console.log(a.last_time > b.last_time);
		if (-1 == sort_click) {
			return a.last_time > b.last_time;;
		} else {
			return a.last_time < b.last_time;
		}
	});
}