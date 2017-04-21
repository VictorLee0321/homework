/**
 * Created by victorlee on 17-3-24.
 */

$(document).ready(function() {
	// if no user load university else no load
	var type = getCookie("type");
	if ("" == type) {
		loadUniversity();
	}

	$("#logout").click(function() {
		loadUniversity();
		// delete cookie
		document.cookie = "account=" + "";
		document.cookie = "password=" + "";
		document.cookie = "type=" + "";
		// delete student global var
		class_homework = null;
		submit_homework = null;
		un_submit_homework = null;
		overtime_homework = null;
		// delet cicos global var
		cicos_submit_homework = null;
		cicos_un_submit_homework = null;
		cicos_overtime_homework = null;
		// none display after login and display no login
		$("#signin").css("display","inline-block");
		$("#signup").css("display","inline-block");
		$("#locate").css("display","inline-block");
		$("#main").css("display","block");
		var clazz = getCookie("clazz");
		$("#location").html(clazz);
		// none these after......
		$("#logout").css("display","none");
		$("#user").css("display","none");
		// hide except id equal main
		$("#afterStudentLogin").css("display","none");
		$("#afterCicosLogin").css("display","none");
	});

	$("#file").on("change", function() {
		$("#fileName").html(this.value.split("\\").pop());
		$("#tipsdiv").css('display', 'none');
	});

	$("#university").change(function() {
		var university = $("#university option:selected").text();
		loadDepartment(university);
	});

	$("#department").change(function() {
		var university = $("#university option:selected").text();
		var department = $("#department option:selected").text();
		loadClazz(university, department);
	});

	/*$("#clazz").change(function() {
		var university = $("#university option:selected").text();
		var clazz = $("#clazz option:selected").text();
		loadCourse(university, clazz);
//		alert(clazz);
	});*/

	$("#course").change(function() {
		/*var university = $("#university option:selected").text();
		var clazz = $("#clazz option:selected").text();
		var course = $("#course option:selected").text();
		loadExp(university, clazz, course);*/
		var cookie_university = getCookie("university");
		var cookie_clazz = getCookie("clazz");
		var course = $("#course option:selected").text();
		loadExp(cookie_university, cookie_clazz, course);
	});

	$("#btnLocate").click(function() {
		// get the class info
		var university = $("#university option:selected").text();
		var department = $("#department option:selected").text();
		var clazz = $("#clazz option:selected").text();
		// return false if no select class info;
		if ("university" == university || "department" == department || "class" == clazz) {
			return false;
		}
		// setting cookie by java script should setting one by one
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + 365);
		document.cookie = "expires=" + exdate.toGMTString();
		document.cookie = "university=" + escape(university);
		document.cookie = "department=" + escape(department);
		document.cookie = "clazz=" + escape(clazz);
		$("#location").html(clazz);
		loadCourse(university, clazz);
	});

	$("#btn_upload").click(function() {
		if (($("#fileName").html() == '上传文件名') || ($("#fileName").html() == '')) {
			$("#tipsdiv").css('display', 'block');
			$("#tips").html('请选择上传文件');
			return false;
		}
		if ($("#file").get(0).files[0].size > 10 * 1024 * 1024) {
			$("#tipsdiv").css('display', 'block');
			$("#tips").html('请选择小于10M的单个文件');
			return false;
		}
		var name = $("#fileName").text().split(".")[0];
//		var fileType = $("#fileName").text().split(".")[1];
//		console.log(fileType);
		var student_id = name.split("-")[0];
		var student_name = name.split("-")[1];
		checkStudent(student_id, student_name);
	});

	$("#btnRegister").click(function() {
		// judge account and psw
		return false;
		location = "http://victorlee.cn";
	});

	$("#user").click(function() {
		$("#change_psw_div").css("display","none");
	});

	$("#signin").click(function() {
		$("#check_psw_div").css('display', 'none');
	});

	$("#btnLogin").click(function() {
		var signin_account = $("#signin_account").val();
		var signin_psw = $("#signin_psw").val();
		if ("" != signin_account && "" != signin_psw) {
			checkUser(signin_account, signin_psw);
			return false;
		} else {
			return false;
		}
	});



	$("#btnChangePsw").click(function() {
		var account = getCookie("account");
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

	$("#student_all_check").attr("disabled", true);
	$("#student_check_download").attr("disabled", true);

	$("#btn_unsubmit_homework").click(function() {
		$("#page_num b").html("1");
//		var page_num = $("#page_num b").html();
//		console.log(un_submit_homework);
//		showTBodyData(un_submit_homework, page_num);
		if (null != un_submit_homework) {
			var page_num = $("#page_num b").html();
			showTBodyData(un_submit_homework, page_num);
		} else {
			getUnSubmitCourse3();
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
			getOvertimeCourse3();
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
			getSubmitCourse3();
		}
//		console.log(submit_homework);
		$("#student_panel_heading").html("已交作业");
	});

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

	$("#check_course").change(function() {
		var account = getCookie("account");
		var course = $("#check_course option:selected").text();
		cicosLoadExp(account, course);
		$("#check_status").val("0");
		$("#cicos_page_num b").html("1");
		$("#cicos_check_download").css("display", "inline-block");
		$("#cicos_send_all_email").css("display", "none");
	});

	$("#check_exp").change(function() {
		var account = getCookie("account");
		var course = $("#check_course option:selected").text();
		var exp = $("#check_exp option:selected").text();
		cicosGetSubmitHomework(account, course, exp);
		$("#check_status").val("0");
		$("#cicos_page_num b").html("1");
		$("#cicos_check_download").css("display", "inline-block");
		$("#cicos_send_all_email").css("display", "none");
	});

	$("#check_status").change(function() {
		var account = getCookie("account");
		var course = $("#check_course option:selected").text();
		var exp = $("#check_exp option:selected").text();
		var status = $("#check_status option:selected").text();
		$("#cicos_page_num b").html("1");
		switch (status) {
		case "已交":
			cicosGetSubmitHomework(account, course, exp);
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

	/*var cicos_submit_homework;
	var cicos_un_submit_homework;
	var cicos_overtime_homework;*/

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

	$("#cicos_check_download").click(function() {
		var account = getCookie("account");
		var course = $("#check_course option:selected").text();
		var exp = $("#check_exp option:selected").text();
		var status = $("#check_status option:selected").text();
		switch (status) {
		case "已交":
			cicosDownAllSubmitHomework(account, course, exp);
			break;
//			can't down some
//		case "补交":
//			cicosDownOvertimeHomework(account, course, exp);
//			break;
		}
	});

	$("#btn_check_homework").click(function() {
		var account = getCookie("account");
		// set status had submit and page num is 1
		$("#check_status").val("0");
		$("#cicos_page_num b").html("1");
		cicosLoadCourse(account);
		// show self div
		$("#div_check_homework").css("display", "block");
		$("#cicos_check_download").css("display", "inline-block");
		$("#cicos_send_all_email").css("display", "none");
		// hide others cicos div
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
		// show self
		$("#div_issue_homework").css("display", "block");
		$("#sure_add_tips_div").css("display", "none");
	});

	$("#btn_add_student").click(function() {
		// hide other and set var null
		cicos_submit_homework = null;
		cicos_un_submit_homework = null;
		cicos_overtime_homework = null;
		$("#div_check_homework").css("display", "none");
		$("#div_issue_homework").css("display", "none");
		// show self
		$("#xls_tips").html("");
		$("#div_add_student").css("display", "block");
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

	$("#sure_issue_course").click(function() {
		var issue_course_name = $("#issue_course_name").val();
		var issue_exp_num = $("#issue_exp_num").val();
		var issue_last_time = $("#issue_last_time").val();
		var isNum = parseInt(issue_exp_num);
		if (!isNaN(isNum) && "" != issue_last_time && "" != issue_exp_num && "" != issue_course_name) {
			var account = getCookie("account");
			cicosAddCourse(account, issue_course_name, issue_exp_num, issue_last_time);
		} else {
			return false;
		}
	});

	$("#xls_upload").click(function() {
		var xls_name = $("#xls_file").val();
		if ("" != xls_name) {
//			console.log(xls_name);
			var account = getCookie("account");
			var xls_file = document.getElementById('xls_file').files[0];
			uploadXlsFile(account, xls_file);
		} else {
//			console.log("no select xls file");
			return false;
		}
	});

});
