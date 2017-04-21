/**
 * Created by victorlee on 17-4-21.
 */

$(function () {
    account = $.cookie("account");
    console.log("account in teacher.js is: " + account);
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
        $.cookie("teacher_id", null, {expires:30, path:"/"});
        location.href = '/';
    });

    $("#check_course").change(function() {
		var account = $.cookie("account");
		var teacher_id = $.cookie("teacher_id");
		var course_id = $("#check_course option:selected").val();
		cicosLoadExp(course_id);
		$("#check_status").val("0");
		$("#cicos_page_num b").html("1");
		$("#cicos_check_download").css("display", "inline-block");
		$("#cicos_send_all_email").css("display", "none");
	});

	$("#check_exp").change(function() {
		/*var account = $.cookie("account");
		var teacher_id = $.cookie("teacher_id");
		var course = $("#check_course option:selected").text();
		var exp = $("#check_exp option:selected").text();*/
		var task_id = $("#check_exp option:selected").val();
		cicosGetSubmitHomework(task_id);
		$("#check_status").val("0");
		$("#cicos_page_num b").html("1");
		$("#cicos_check_download").css("display", "inline-block");
		$("#cicos_send_all_email").css("display", "none");
	});

	$("#check_status").change(function() {
	    var task_id = $("#check_exp option:selected").val();
		var account = $.cookie("account");
		var teacher_id = $.cookie("teacher_id");
		var course = $("#check_course option:selected").text();
		var exp = $("#check_exp option:selected").text();
		var status = $("#check_status option:selected").text();
		$("#cicos_page_num b").html("1");
		switch (status) {
		case "已交":
			cicosGetSubmitHomework(task_id);
			$("#cicos_check_download").css("display", "inline-block");
			$("#cicos_send_all_email").css("display", "none");
			break;
		case "未交":
			cicosGetUnsubmitHomework(account, course, exp)
			$("#cicos_check_download").css("display", "none");
			$("#cicos_send_all_email").css("display", "inline-block");
			break;
		case "补交":
			cicosGetOvertimeHomework(account, course, exp);
			$("#cicos_check_download").css("display", "inline-block");
			$("#cicos_send_all_email").css("display", "none");
			break;
		}
	});

var cicos_submit_homework;
var cicos_un_submit_homework;
var cicos_overtime_homework;

	$("#cicos_next_page").click(function() {
		var page_row = $("#cicos_check_tbody tr").length;
		if (page_row < 10)
			return false;
		var page_num = parseInt($("#cicos_page_num b").html()) + 1;
		var status = $("#check_status option:selected").text();
		switch (status) {
		case "已交":
			if (10 * (page_num - 2) + page_row == cicos_submit_homework.length)
				return false;
			cicosShowTBodyData(cicos_submit_homework, page_num)
			$("#cicos_page_num b").html(page_num);
			break;
		case "未交":
			if (10 * (page_num - 2) + page_row == cicos_un_submit_homework.length)
				return false;
			cicosShowTBodyUnsubmitStudent(cicos_un_submit_homework, page_num)
			$("#cicos_page_num b").html(page_num);
			break;
		case "补交":
			if (10 * (page_num - 2) + page_row == cicos_overtime_homework.length)
				return false;
			cicosShowTBodyData(cicos_overtime_homework, page_num)
			$("#cicos_page_num b").html(page_num);
			break;
		}
	});

	$("#cicos_previous_page").click(function() {
		var page_num = parseInt($("#cicos_page_num b").html()) - 1;
		if (page_num < 1)
			return false;
		var status = $("#check_status option:selected").text();
		switch (status) {
		case "已交":
			cicosShowTBodyData(cicos_submit_homework, page_num)
			$("#cicos_page_num b").html(page_num);
			break;
		case "未交":
			cicosShowTBodyUnsubmitStudent(cicos_un_submit_homework, page_num)
			$("#cicos_page_num b").html(page_num);
			break;
		case "补交":
			cicosShowTBodyData(cicos_overtime_homework, page_num)
			$("#cicos_page_num b").html(page_num);
			break;
		}
	});

});

function updatePsw(account, old_psw, new_psw) {
	$.ajax ({
		url : "/teacher/updatePsw",
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

var teacher_id;

function writeLocation() {
    $.ajax ({
        url : "/teacher/loadTeacher",
        //async: false,
        type : "POST",
        dataType : "json",
        data : {"account":account},
        success : function(data) {
            console.log(data);
            $.cookie("teacher_id", data.teacher_id, {expires:30, path:"/"});
            var locate_display = data.teacher_id + ":" + data.teacher_name;
            $("#location").html(locate_display);
            //getUnSubmitCourse();
            teacher_id = $.cookie('teacher_id');
            cicosLoadCourse(teacher_id);
        }
    });
}

function cicosLoadCourse(teacher_id) {
	$("#check_course").empty();
	$.ajax ({
		url : "/teacher/cicosLoadCourse",
		type : "POST",
		dataType : "json",
		data : {"teacher_id":teacher_id},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var course = data[i];
				$("#check_course").append("<option value='" + course.course_id + "'>" + course.course_name + "</option>");
			}
			var course_name = $("#check_course option:selected").text();
			var course_id = $("#check_course option:selected").val();
			console.log(course_id + "_" + course_name);
			cicosLoadExp(course_id);
		}
	});
}

function cicosLoadExp(course_id) {
	$("#check_exp").empty();
	$.ajax ({
		url : "/teacher/cicosLoadExp",
		type : "POST",
		dataType : "json",
		data : {"course_id":course_id},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var exp = data[i];
				$("#check_exp").append("<option value='" + exp.task_id + "'>" + exp.task_name + "</option>");
			}
			var task_id = $("#check_exp option:selected").val();
			console.log('select task_id: ' + task_id);
			// show had submit homework status
			cicosGetSubmitHomework(task_id);
		}
	});
}

function cicosShowTBodyData(data, page_num) {
	$("#cicos_check_thead").empty();
	var rowHead = "<tr><th></th><th>文件名</th><th>下载</th></tr>";
	$("#cicos_check_thead").append(rowHead);
	$("#cicos_check_tbody").empty();
	for (var i = 10 * (page_num - 1); i < 10 * page_num && i < data.length; i++) {
		var rowData = data[i].file_path;
		var row = "<tr>";
		row += "<td><input type=\"checkbox\"></td>";
		row += "<td>" + rowData + "</td>";
		row += "<td><button type=\"button\" id=\"btn_down" + (i % 10 + 1) + "\" class=\"btn btn-xs\"><span class=\"glyphicon glyphicon-download\"></span></button></td>";
		row += "</tr>";
		$("#cicos_check_tbody").append(row);
	}
}

function cicosGetSubmitHomework(task_id) {
	$.ajax ({
		url : "/teacher/cicosGetSubmitHomework",
		type : "POST",
		dataType : "json",
		data : {"task_id":task_id},
		success : function(data) {
			var page_num = $("#cicos_page_num b").html();
			cicos_submit_homework = data;
			cicosShowTBodyData(cicos_submit_homework, page_num);
		}
	});
}

