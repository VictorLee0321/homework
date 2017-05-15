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
	    console.log("task_id in check_status change function is: " + task_id);
	    var course_id = $("#check_course option:selected").val();
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
			cicosGetUnsubmitHomework(course_id, task_id);
			$("#cicos_check_download").css("display", "none");
			$("#cicos_send_all_email").css("display", "inline-block");
			break;
		case "补交":
			cicosGetOvertimeHomework(task_id);
			$("#cicos_check_download").css("display", "inline-block");
			$("#cicos_send_all_email").css("display", "none");
			break;
		}
	});

	$("#cicos_check_download").click(function () {
		var task_id = $("#check_exp option:selected").val();
		console.log('click all_download button and select task_id: ' + task_id);
		if (null == task_id) {
			console.log("select task_id is null");
			// null the table
			/*$("#cicos_check_thead").empty();
			var rowHead = "<tr><th></th><th>作业未选择</th><th></th></tr>";
			$("#cicos_check_thead").append(rowHead);
			$("#cicos_check_tbody").empty();*/
			return false;
		} else {
			console.log('click download all and task_id is:' + task_id);
			var status = $("#check_status option:selected").text();
			console.log("status is: " + status);
			var is_overtime = 0;
			if ("已交" == status) {
				console.log("status is 已交 is right and status is: " + status);
			} else {
				is_overtime = 1;
				console.log("status is 补交 and status is: " + status);
			}
			$.ajax ({
                url: "/teacher/cicos_check_download_all",
                type: "POST",
                //dataType: "text",
                data: {
                    "task_id": task_id,
                    "is_overtime": is_overtime
                },
                success: function (data) {
					alert(data);
					//window.location.href = data;
					//window.location.href = '/file_homework/23/201321314300-李明-007测试课程1-测试作业1.docx';
                }
            });
		}
	});


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

	$("#btn_check_homework").click(function() {
		//var account = getCookie("account");
		// set status had submit and page num is 1
		$("#check_status").val("0");
		$("#cicos_page_num b").html("1");
		//cicosLoadCourse(account);
		teacher_id = $.cookie('teacher_id');
        cicosLoadCourse(teacher_id);
		// show self div
		$("#div_check_homework").css("display", "block");
		$("#cicos_check_download").css("display", "inline-block");
		$("#cicos_send_all_email").css("display", "none");
		// hide others cicos div
        $("#div_issue_course").css("display", "none");
		$("#div_issue_homework").css("display", "none");
		$("#div_add_student").css("display", "none");
	});

	$("#btn_issue_homework").click(function() {
		// hide other and set var null
		cicos_submit_homework = null;
		cicos_un_submit_homework = null;
		cicos_overtime_homework = null;
		$("#div_check_homework").css("display", "none");
		$("#div_add_student").css("display", "none");
		$("#div_issue_course").css("display", "none");
		// show self
		$("#div_issue_homework").css("display", "block");
		$("#sure_add_tips_div").css("display", "none");
		teacherLoadCourse(teacher_id);
	});
	
	$("#btn_add_course").click(function () {

	    $("#div_check_homework").css("display", "none");
		$("#div_add_student").css("display", "none");
		$("#div_issue_homework").css("display", "none");
        // show self
        $("#div_issue_course").css("display", "block");
        $("#sure_add_course_tips_div").css("display", "none");
        teacherLoadClazz(teacher_id);
        
    });

	$("#btn_add_student").click(function() {
		// hide other and set var null
		$("#div_check_homework").css("display", "none");
		$("#div_issue_homework").css("display", "none");
		$("#div_issue_course").css("display", "none");
		// show self
		$("#xls_tips").html("");
		$("#div_add_student").css("display", "block");
	});
	
	$("#sure_add_course").click(function () {
        var add_course_name = $("#add_course_name").val();
        var clazz_id = $("#select_clazz option:selected").val();
        var teach_year = $("#teach_year").val();
        var term = $("#term option:selected").val();
        if ("" != add_course_name && "" != clazz_id && "" != teach_year && "" != term) {
            teacherAddCourse(teacher_id, add_course_name, clazz_id, teach_year, term);
        } else {
            return false;
        }

    });

	$("#sure_issue_course").click(function() {
		//var issue_course_name = $("#issue_course_name").val();
        var issue_course_id = $("#select_issue_course_name option:selected").val();
		var issue_task_name = $("#issue_exp_num").val();
		var issue_last_time = $("#issue_last_time").val();
		var begin_remind = $("#begin_remind").val();
		//var isNum = parseInt(issue_exp_num);
		if ("" != issue_last_time && "" != issue_task_name && "" != issue_course_id && "" != begin_remind) {
			cicosAddTask(teacher_id, issue_course_id, issue_task_name, issue_last_time, begin_remind);
		} else {
			return false;
		}
	});

	$("#datetimepicker4teach_year").datetimepicker({
	    minView: "month", //选择日期后，不会再跳转去选择时分秒
        language:  'zh-CN',
        format: 'yyyy-mm-dd',
        todayBtn:  1,
        autoclose: 1,
    });

	$(".date").datetimepicker({
//		format:yyyy-mm-dd,
		weekStart:1,
		todayBtn:1,
		autoclose:1,
		todayHighlight:1,
		startView:2,
		forceParse:0,
		showMeridian:1,
	});

	$("#xls_upload").click(function() {
		var xls_name = $("#xls_file").val();
		if ("" != xls_name) {
//			console.log(xls_name);
			//var account = getCookie("account");
			var xls_file = document.getElementById('xls_file').files[0];
			uploadXlsFile(teacher_id, xls_file);
		} else {
//			console.log("no select xls file");
			return false;
		}
	});

});

function createXMLHttpRequest() {
	if (window.XMLHttpRequest) {
		// Mozilla
		xhr = new XMLHttpRequest();
	} else {
		// IE
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e) {
				try {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e) {
				}
			}
		}
	}
}

function uploadXlsFile(teacher_id, xls_file) {
	var fd = new FormData();
	fd.append("teacher_id", teacher_id);
	fd.append("xls_file", xls_file);
	createXMLHttpRequest();
	xhr.open("POST", "uploadXlsFile");
	xhr.send(fd);
	xhr.onreadystatechange = function() {
		if (4 == xhr.readyState) {
			if (200 == xhr.status) {
				var responseText = xhr.responseText;
				if (0 == responseText) {
					// 导入成功，请查看
					$("#xls_tips").html("导入成功");
					$("#xls_tips").css("color", "green");
				} else if (1 == responseText) {
					$("#xls_tips").html("名单已存在");
					$("#xls_tips").css("color", "red");
				} else if (2 == responseText) {
					// 导入失败，请重试
					$("#xls_tips").html("班别有误,请重试");
					$("#xls_tips").css("color", "red");
				} else if (3 == responseText) {
					$("#xls_tips").html("有误,请重试");
					$("#xls_tips").css("color", "red");
				} else {
					$("#xls_tips").html("第" + (responseText - 3 + 1) + "行名单已经存在，此行以上名单已经导入，请重试!!!");
					$("#xls_tips").css("color", "red");
				}
			}
		}
	};
}

function teacherAddCourse(teacher_id, add_course_name, clazz_id, teach_year, term) {
    $.ajax ({
		url : "/teacher/teacherAddCourse",
		type : "POST",
		dataType : "text",
		data : {"teacher_id":teacher_id,"add_course_name":add_course_name,"clazz_id":clazz_id,"teach_year":teach_year,"term":term},
		success : function(data) {
			if (0 == data) {
				$("#sure_add_course_tips_div").css("display", "block");
				$("#sure_add_course_tips").html("添加成功");
				$("#sure_add_course_tips").css("color", "green");
			} else {
				$("#sure_add_course_tips_div").css("display", "block");
				$("#sure_add_course_tips").html("添加失败，课程名重复，请重试");
				$("#sure_add_course_tips").css("color", "red");
			}
		}
	});
}

function cicosAddTask(teacher_id, issue_course_id, issue_task_name, issue_last_time, begin_remind) {
	$.ajax ({
		url : "/teacher/cicosAddTask",
		type : "POST",
		dataType : "text",
		data : {"teacher_id":teacher_id,"issue_course_id":issue_course_id,"issue_task_name":issue_task_name,"issue_last_time":issue_last_time,"begin_remind":begin_remind},
		success : function(data) {
			if (0 == data) {
				$("#sure_add_tips_div").css("display", "block");
				$("#sure_add_tips").html("添加成功");
				$("#sure_add_tips").css("color", "green");
			} else {
				$("#sure_add_tips_div").css("display", "block");
				$("#sure_add_tips").html("添加失败，作业名重复，请重试");
				$("#sure_add_tips").css("color", "red");
			}
		}
	});
}

var cicos_submit_homework;
var cicos_un_submit_homework;
var cicos_overtime_homework;

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

function teacherLoadClazz(teacher_id) {
    $("#select_clazz").empty();
	$.ajax ({
		url : "/teacher/teacherLoadClazz",
		type : "POST",
		dataType : "json",
		data : {"teacher_id":teacher_id},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var clazz = data[i];
				$("#select_clazz").append("<option value='" + clazz.clazz_id + "'>" + clazz.clazz_name + "</option>");
			}
			//var course_name = $("#select_issue_course_name option:selected").text();
			//var course_id = $("#select_issue_course_name option:selected").val();
			//console.log('select_issue_course_id_name is: ' + course_id + "_" + course_name);
		}
	});
}

function teacherLoadCourse(teacher_id) {
	$("#select_issue_course_name").empty();
	$.ajax ({
		url : "/teacher/cicosLoadCourse",
		type : "POST",
		dataType : "json",
		data : {"teacher_id":teacher_id},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var course = data[i];
				$("#select_issue_course_name").append("<option value='" + course.course_id + "'>" + course.course_name + "</option>");
			}
			var course_name = $("#select_issue_course_name option:selected").text();
			var course_id = $("#select_issue_course_name option:selected").val();
			console.log('select_issue_course_id_name is: ' + course_id + "_" + course_name);
			//cicosLoadExp(course_id);
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
			if (null == task_id) {
				console.log("select task_id is null");
				// null the table
				$("#cicos_check_thead").empty();
				var rowHead = "<tr><th></th><th>作业未选择</th><th></th></tr>";
				$("#cicos_check_thead").append(rowHead);
				$("#cicos_check_tbody").empty();
				return false;
			}
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

function cicosGetOvertimeHomework(task_id) {
	$.ajax ({
		url : "teacher/cicosGetOvertimeHomework",
		type : "POST",
		dataType : "json",
		data : {"task_id":task_id},
		success : function(data) {
			var page_num = $("#cicos_page_num b").html();
			cicos_overtime_homework = data;
			cicosShowTBodyData(cicos_overtime_homework, page_num);
		}
	});
}

function cicosGetUnsubmitHomework(course_id, task_id) {
	$.ajax ({
		url : "/teacher/cicosGetUnsubmitHomework",
		type : "POST",
		dataType : "json",
		data : {"course_id":course_id,"task_id":task_id},
		success : function(data) {
			var page_num = $("#cicos_page_num b").html();
			cicos_un_submit_homework = data;
			cicosShowTBodyUnsubmitStudent(cicos_un_submit_homework, page_num);
		}
	});
}

function cicosShowTBodyUnsubmitStudent(data, page_num) {
	$("#cicos_check_thead").empty();
	var rowHead = "<tr><th></th><th>学号</th><th>姓名</th><th>班别</th><th>通知</th></tr>";
	$("#cicos_check_thead").append(rowHead);
	$("#cicos_check_tbody").empty();
	for (var i = 10 * (page_num - 1); i < 10 * page_num && i < data.length; i++) {
		var rowData = data[i];
		var row = "<tr>";
		row += "<td><input type=\"checkbox\"></td>";
		row += "<td>" + rowData.student_id + "</td>";
		row += "<td>" + rowData.student_name + "</td>";
		row += "<td>" + rowData.clazz_name + "</td>";
		row += "<td><button type=\"button\" id=\"btn_down" + (i % 10 + 1) + "\" class=\"btn btn-xs\"><span class=\"glyphicon glyphicon-envelope\"></span></button></td>";
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

