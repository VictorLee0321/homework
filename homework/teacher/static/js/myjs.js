/**
 * Created by Victor Lee on 2016/7/1.
 */

function getCookie(name) {
	var cookie = document.cookie;
	if (cookie.length > 0) {
		var start = cookie.indexOf(name + "=");
		if (-1 != start) {
			start = start + name.length + 1;
			var end =  cookie.indexOf(";", start);
			if (-1 == end) {
				end = cookie.length;
			}
			return unescape(cookie.substring(start, end));
		}
	}
	return "";
}

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

function uploadProgress(evt) {
	if (evt.lengthComputable) {
		// for slowly not * 100;
		var percentComplete = Math.round(evt.loaded * 99 / evt.total);
		document.getElementById('progressMain').style.display = 'block';
		document.getElementById('progressBar').style.width = percentComplete.toString()	+ '%';
	} else {
	}
}

function uploadComplete(evt) {
	/* This event is raised when the server send back a response */
	/* alert(evt.target.responseText); */
	document.getElementById('progressBar').style.width = '100%';
	document.getElementById('progressMain').style.display = 'none';
	/*document.getElementById('tipsdiv').style.display = 'block';
	document.getElementById('tips').innerHTML = '上传成功';*/
}

function uploadFailed(evt) {
	alert("There was an error attempting to upload the file.");
}

function uploadCanceled(evt) {
	alert("The upload has been canceled by the user or the browser dropped the connection.");
}

function uploadXlsFile(account, xls_file) {
	var fd = new FormData();
	fd.append("account", account);
	fd.append("xls_file", xls_file);
	createXMLHttpRequest();
	xhr.open("POST", "UploadXlsFile");
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
				} else {
					// 导入失败，请重试
					$("#xls_tips").html("有误,请重试");
					$("#xls_tips").css("color", "red");
				}
			}
		}
	};
}

function uploadFile(student_id, student_name, clazz, course_name, exp_num, file) {
	var fileType = $("#fileName").text().split(".")[1];
//  {"student_id":student_id,"student_name":student_name,"clazz":clazz,"course_name":course_name,"exp_num":exp_num,"file":file}
	var fd = new FormData();
//	console.log(student_id + student_name + clazz + course_name + exp_num + file);
	fd.append("student_id", student_id);
	fd.append("student_name", student_name);
	fd.append("clazz", clazz);
	fd.append("course_name", course_name);
	fd.append("exp_num", exp_num);
	fd.append("fileType", fileType);
//	console.log("in up load file function");
//	console.log(document.getElementById('file').files[0]);
	fd.append("file", document.getElementById('file').files[0]);
	createXMLHttpRequest();
	xhr.upload.addEventListener("progress", uploadProgress, false);
	xhr.addEventListener("load", uploadComplete, false);
	xhr.addEventListener("error", uploadFailed, false);
	xhr.addEventListener("abort", uploadCanceled, false);
	xhr.open("POST", "UploadFile");
//	xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	xhr.send(fd);
	xhr.onreadystatechange = function() {
		if (4 == xhr.readyState) {
			if (200 == xhr.status) {
				var responseText = xhr.responseText;
				if (0 == responseText) {
					$("#tipsdiv").css('display', 'block');
					$("#tips").css('color', 'lime');
					$("#tips").html('提交成功');
				} else if (1 == responseText) {
					$("#tipsdiv").css('display', 'block');
					$("#tips").css('color', 'violet');
					$("#tips").html('补交成功');
				} else {
					$("#tipsdiv").css('display', 'block');
					$("#tips").html('网络出错，请重传');
				}
			}
		}
	};
}

//old
/*function uploadFile(student_id, student_name, clazz, course_name, exp_num, file) {
	console.log("in up load file function");
	console.log(file);
	console.log(file['name']);
	var file_data = new FormData();
	file_data.append("file", document.getElementById('file').files[0]);
	console.log("file_data");
	console.log(file_data);
	var formData = new FormData($("#myform")[0]);
	console.log("formData");
	console.log(formData);
	$.ajax ({
		url : "UploadFile",
//		enctype : 'multipart/form-data',
		type : "POST",
//		data : {"student_id":student_id,"student_name":student_name,"clazz":clazz,"course_name":course_name,"exp_num":exp_num,"file":file},
		data : formData,
		cache : false,
		processData : false,
		contentType : false,
		success : function(data) {
			if (0 == data) {
				$("#tipsdiv").css('display', 'block');
				$("#tips").css('color', 'lime');
				$("#tips").html('提交成功');
			} else if (1 == data) {
				$("#tipsdiv").css('display', 'block');
				$("#tips").css('color', 'violet');
				$("#tips").html('补交成功');
			} else {
				$("#tipsdiv").css('display', 'block');
				$("#tips").html('网络出错，请重传');
			}
		}
	});
}*/

function updatePsw(account, old_psw, new_psw) {
	$.ajax ({
		url : "UpdatePsw",
		type : "POST",
		dataType : "text",
		data : {"account":account,"old_psw":old_psw,"new_psw":new_psw},
		success : function(data) {
			if (0 == data) {
				document.cookie = "password=" + escape(new_psw);
				$("#userModal").modal("hide");
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

// not use
/*function ClassHomework(course_name, exp_num, last_time) {
	this.course_name = course_name;
    this.exp_num = exp_num;
    this.last_time = last_time;
}*/

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
		var row = "<tr>";
		row += "<td><input type=\"checkbox\"></td>";
		row += "<td>" + rowData.course_name + "</td>";
		row += "<td>" + rowData.exp_num + "</td>";
		row += "<td>" + rowData.last_time + "</td>";
		row += "<td><button type=\"button\" id=\"td_upload" + (i % 5 + 1) + "\" class=\"btn btn-xs\"><span class=\"glyphicon glyphicon-upload\"></span></button></td>";
		row += "</tr>"
		$("#tbody").append(row);
	}
}

var class_homework;
var submit_homework;
var un_submit_homework;
var overtime_homework;

function getOvertimeCourse3() {
	var account = getCookie("account");
	$.ajax ({
		url : "GetOvertimeCourse3",
//		async: false,
		type: "POST",
		dataType : "json",
		data : {"account":account},
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

// old use now not use
/*function isSameCourse3(a, b) {
	if (a.course_name == b.course_name && a.exp_num == b.exp_num && a.last_time == b.last_time)
		return true;
	else
		return false;
}*/

// old
/*function getUnSubmitCourse3() {
	var arr1 = $.map(class_homework, function(obj) {
		return $.extend(true, {}, obj);
	});
	var arr2 = $.map(submit_homework, function(obj) {
		return $.extend(true, {}, obj);
	});
	var a, b;
	for (var i = arr1.length - 1; i >= 0; i--) {
	    a = arr1[i];
	    for (var j = arr2.length - 1; j >= 0; j--) {
	        b = arr2[j];
	        if (isSameCourse3(a, b)) {
	            arr1.splice(i, 1);
	            arr2.splice(j, 1);
	            break;
	        }
	    }
	}
	un_submit_homework = arr1;
	var page_num = $("#page_num b").html();
	showTBodyData(un_submit_homework, page_num);
	$("#student_panel_heading").html("未交作业");
}*/

function getUnSubmitCourse3() {
	var account = getCookie("account");
	$.ajax ({
		url : "GetUnsubmitCourse3",
		type: "POST",
		dataType : "json",
		data : {"account":account},
		success : function(data) {
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
	var account = getCookie("account");
	$.ajax ({
		url : "GetClassHomework",
//		async: false,
		type: "POST",
		dataType : "json",
		data : {"account":account},
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

// class_homework - submit_homework
function getSubmitCourse3() {
	var account = getCookie("account");
	$.ajax ({
		url : "GetSubmitCourse3",
//		async: false,
		type : "POST",
		dataType : "json",
		data : {"account":account},
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

var cicos_submit_homework;
var cicos_un_submit_homework;
var cicos_overtime_homework;

function cicosShowTBodyData(data, page_num) {
	$("#cicos_check_thead").empty();
	var rowHead = "<tr><th></th><th>文件名</th><th>下载</th></tr>";
	$("#cicos_check_thead").append(rowHead);
	$("#cicos_check_tbody").empty();
	for (var i = 10 * (page_num - 1); i < 10 * page_num && i < data.length; i++) {
		var rowData = data[i];
		var row = "<tr>";
		row += "<td><input type=\"checkbox\"></td>";
		row += "<td>" + rowData + "</td>";
		row += "<td><button type=\"button\" id=\"btn_down" + (i % 10 + 1) + "\" class=\"btn btn-xs\"><span class=\"glyphicon glyphicon-download\"></span></button></td>";
		row += "</tr>"
		$("#cicos_check_tbody").append(row);
	}
}

function cicosShowTBodyUnsubmitStudent(data, page_num) {
	$("#cicos_check_thead").empty();
	var rowHead = "<tr><th></th><th>学号</th><th>姓名</th><th>通知</th></tr>";
	$("#cicos_check_thead").append(rowHead);
	$("#cicos_check_tbody").empty();
	for (var i = 10 * (page_num - 1); i < 10 * page_num && i < data.length; i++) {
		var rowData = data[i];
		var row = "<tr>";
		row += "<td><input type=\"checkbox\"></td>";
		row += "<td>" + rowData.student_id + "</td>";
		row += "<td>" + rowData.student_name + "</td>";
		row += "<td><button type=\"button\" id=\"btn_down" + (i % 10 + 1) + "\" class=\"btn btn-xs\"><span class=\"glyphicon glyphicon-envelope\"></span></button></td>";
		row += "</tr>"
		$("#cicos_check_tbody").append(row);
	}
}

function cicosAddCourse(account, issue_course_name, issue_exp_num, issue_last_time) {
	$.ajax ({
		url : "CicosAddCourse",
		type : "POST",
		dataType : "text",
		data : {"account":account,"issue_course_name":issue_course_name,"issue_exp_num":issue_exp_num,"issue_last_time":issue_last_time},
		success : function(data) {
			if (0 == data) {
				$("#sure_add_tips_div").css("display", "block");
				$("#sure_add_tips").html("添加成功");
				$("#sure_add_tips").css("color", "green");
			} else {
				$("#sure_add_tips_div").css("display", "block");
				$("#sure_add_tips").html("添加失败，请重试");
				$("#sure_add_tips").css("color", "red");
			}
		}
	});
}

function cicosDownAllSubmitHomework(account, course, exp) {
	$.ajax ({
		url : "CicosDownAllSubmitHomework",
		type : "POST",
//		dataType : "json",
		data : {"account":account,"course":course,"exp":exp},
		success : function(data) {
			/*var page_num = $("#cicos_page_num b").html();
			cicos_overtime_homework = data;
			cicosShowTBodyData(cicos_overtime_homework, page_num);*/
			console.log("data recieve");
			console.log(data);
			window.location.href = "http://victorlee.cn/back_up_file/" + data;
			// pop sure download modal
			
		}
	});
}

function cicosGetOvertimeHomework(account, course, exp) {
	$.ajax ({
		url : "CicosGetOvertimeHomework",
		type : "POST",
		dataType : "json",
		data : {"account":account,"course":course,"exp":exp},
		success : function(data) {
			var page_num = $("#cicos_page_num b").html();
			cicos_overtime_homework = data;
			cicosShowTBodyData(cicos_overtime_homework, page_num);
		}
	});
}

function cicosGetUnsubmitHomework(account, course, exp) {
	$.ajax ({
		url : "CicosGetUnsubmitHomework",
		type : "POST",
		dataType : "json",
		data : {"account":account,"course":course,"exp":exp},
		success : function(data) {
			var page_num = $("#cicos_page_num b").html();
			cicos_un_submit_homework = data;
			cicosShowTBodyUnsubmitStudent(cicos_un_submit_homework, page_num);
		}
	});
}

function cicosGetSubmitHomework(account, course, exp) {
	$.ajax ({
		url : "CicosGetSubmitHomework",
		type : "POST",
		dataType : "json",
		data : {"account":account,"course":course,"exp":exp},
		success : function(data) {
			var page_num = $("#cicos_page_num b").html();
			cicos_submit_homework = data;
			cicosShowTBodyData(cicos_submit_homework, page_num);
		}
	});
}

function cicosLoadExp(account, course) {
	$("#check_exp").empty();
	$.ajax ({
		url : "CicosLoadExp",
		type : "POST",
		dataType : "json",
		data : {"account":account,"course":course},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var exp = data[i];
				$("#check_exp").append("<option value='" + exp + "'>" + exp + "</option>");
			}
			var exp = $("#check_exp option:selected").text();
			// show had submit homework status
			cicosGetSubmitHomework(account, course, exp);
		}
	});
}

function cicosLoadCourse(account) {
	$("#check_course").empty();
	$.ajax ({
		url : "CicosLoadCourse",
		type : "POST",
		dataType : "json",
		data : {"account":account},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var course = data[i];
				$("#check_course").append("<option value='" + course + "'>" + course + "</option>");
			}
			var course = $("#check_course option:selected").text();
			cicosLoadExp(account, course);
		}
	});
}

function checkUser(signin_account, signin_psw) {
	$.ajax ({
		url : "CheckUser",
		async: true,
		type : "POST",
		dataType : "text",
		data : {"account":signin_account,"password":signin_psw},
		success : function(data) {
			// ordinary
			if (data >= 0 && data <= 3) {
				document.cookie = "account=" + escape(signin_account);
				document.cookie = "password=" + escape(signin_psw);
				$("#signinModal").modal("hide");
				$("#signin").css("display","none");
				$("#signup").css("display","none");
				$("#locate").css("display","none");
				$("#main").css("display","none");
				$("#logout").css("display","inline-block");
				$("#user").css("display","inline-block");
				$("#user_account").html(signin_account);
			}
			// no same user
			if (0 == data) {
				// admin and cicos
				
			} else if (1 == data) {
				// admin
				
			} else if (2 == data) {
				// cicos
				document.cookie = "type=" + escape("cicos");
				// show self
				$("#afterCicosLogin").css("display","block");
				cicosLoadCourse(signin_account);
				// show check
				$("#div_check_homework").css("display", "block");
				// hide issue div
				$("#div_issue_homework").css("display", "none");
				// hide add student div
				$("#div_add_student").css("display", "none");
				// hide other
				$("#afterStudentLogin").css("display","none");
				
			} else if (3 == data) {
				// student
				document.cookie = "type=" + escape("student");
				// the same
				/*document.cookie = "account=" + escape(signin_account);
				document.cookie = "password=" + escape(signin_psw);
				$("#signinModal").modal("hide");
				$("#signin").css("display","none");
				$("#signup").css("display","none");
				$("#locate").css("display","none");
				$("#main").css("display","none");
				$("#logout").css("display","inline-block");
				$("#user").css("display","inline-block");
				$("#user_account").html(signin_account);*/
				// show student, hide others
				$("#afterStudentLogin").css("display","block");
				// old and now no use and now is new now parameter
//				getClassHomework(signin_account);
//				getSubmitCourse3(signin_account);
				getUnSubmitCourse3();
				// hide
				$("#afterCicosLogin").css("display","none");
			} else if (4 == data) {
				$("#check_psw_div").css('display', 'block');
				$("#check_psw").html("此账号尚未注册");
			} else {
				$("#check_psw_div").css('display', 'block');
				$("#check_psw").html("账号密码不匹配");
			}
		}
	});
}

function checkStudent(student_id, student_name) {
	$.ajax ({
		url : "CheckStudent",
		type : "POST",
		dataType : "text",
		data : {"student_id":student_id,"student_name":student_name},
		success : function(data) {
			if (0 == data) {
//				console.log("check student success");
				var clazz = getCookie("clazz");
				var course_name = $("#course option:selected").text();
				var exp_num = $("#exp option:selected").text();
				var file = document.getElementById('file').files[0];
//				var file = $("#file").val();
				/*var file = new FormData();
				file.append("file", document.getElementById('file').files[0]);*/
				/*console.log(file);
				console.log(file['name']);*/
				uploadFile(student_id, student_name, clazz, course_name, exp_num, file);
				
//				other ways
				/*var file2 = new FormData($("#file").get(0).files[0]);
				console.log(file2);*/
				/*var file3 = $("#file").val();
				console.log(file3);*/
			} else {
				$("#tipsdiv").css('display', 'block');
				$("#tips").html('学号姓名不匹配');
			}
		}
	});
}

// not use
function loadLastTime(university, clazz, course, exp) {
	$.ajax ({
		url : "GetLastTime",
		type : "POST",
		dataType : "text",
		data : {"university":university,"clazz":clazz,"course_name":course,"exp_num":exp},
		success : function(data) {
//			$("#location").html(data);
//			alert(data);
		}
	});
}

function loadExp(university, clazz, course) {
	$("#exp").empty();
	$.ajax ({
		url : "LoadExpNum",
		type : "POST",
		dataType : "json",
		data : {"university":university,"clazz":clazz,"course_name":course},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var exp = data[i];
				$("#exp").append("<option value='" + exp + "'>" + exp + "</option>");
			}
//			var exp = $("#exp option:selected").text();
//			loadLastTime(university, clazz, course, exp);
		}
	});
}

function loadCourse(university, clazz) {
	$("#course").empty();
	$.ajax ({
		url : "LoadCourseName",
		type : "POST",
		dataType : "json",
		data : {"university":university,"clazz":clazz},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var course = data[i];
				$("#course").append("<option value='" + course + "'>" + course + "</option>");
			}
			/*var university = $("#university option:selected").text();
			var clazz = $("#clazz option:selected").text();*/
			var cookie_university = getCookie("university");
			var cookie_clazz = getCookie("clazz");
			var course = $("#course option:selected").text();
			loadExp(cookie_university, cookie_clazz, course);
		}
	});
}

function loadClazz(university, department) {
	$("#clazz").empty();
	$.ajax ({
		url : "LoadClazz",
		type : "POST",
		dataType : "json",
		data : {"university":university,"department":department},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var clazz = data[i];
				$("#clazz").append("<option value='" + clazz + "'>" + clazz + "</option>");
			}
			if (document.cookie.length > 0) {
				var cookie_university = getCookie("university");
				var cookie_clazz = getCookie("clazz");
				loadCourse(cookie_university, cookie_clazz);
			} else { // can't reach here
				var university = $("#university option:selected").text();
				var clazz = $("#clazz option:selected").text();
				loadCourse(university, clazz);
			}
		}
	});
}

function loadDepartment(university) {
	$("#department").empty();
	$.ajax ({
		url : "LoadDepartment",
		type : "POST",
		dataType : "json",
		data : {"university":university},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var department = data[i];
				$("#department").append("<option value='" + department + "'>" + department + "</option>");
			}
			var university = $("#university option:selected").text();
			var department = $("#department option:selected").text();
			loadClazz(university, department);
		}
	});
}

function loadUniversity() {
	$("#university").empty();
	$("#department").empty();
	$("#clazz").empty();
	$.ajax ({
		url : "LoadUniversity",
		type : "POST",
		dataType : "json",
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var university = data[i];
				$("#university").append("<option value='" + university + "'>" + university + "</option>");
			}
			var university = $("#university option:selected").text();
			loadDepartment(university);
		}
	});
}

// disable F5
/*document.onkeydown = function(e){
	var ev = window.event || e;
    var code = ev.keyCode || ev.which;
    if (code == 116) {
        ev.keyCode ? ev.keyCode = 0 : ev.which = 0;
        cancelBubble = true;
        return false;
   }
}*/

$(function() {
	var cookie = document.cookie;
	if (cookie.length <= 0) {
		/*$("#locateModal").modal("show");*/
		$("#locateModal").modal({
			backdrop: 'static', 
			keyboard: false
		});
		$("#closeLocate").hide();
	} else {
		// if no user load clazz else load user
		var account = getCookie("account");
		var password = getCookie("password");
		if ("" != account && "" != password) {
			$("#signin").css("display","none");
			$("#signup").css("display","none");
			$("#locate").css("display","none");
			$("#main").css("display","none");
			$("#logout").css("display","inline-block");
			$("#user").css("display","inline-block");
			$("#user_account").html(account);
			// judge user type
			var type = getCookie("type");
			if ("student" == type) {
				$("#afterStudentLogin").css("display","block");
//				getClassHomework(signin_account);
//				getSubmitCourse3(signin_account);
				getUnSubmitCourse3();
				// hide others
				$("#afterCicosLogin").css("display","none");
			} else if ("cicos" == type) {
				cicosLoadCourse(account);
				$("#afterCicosLogin").css("display","block");
				$("#afterStudentLogin").css("display","none");
			}
		} else {
			var clazz = getCookie("clazz");
			$("#location").html(clazz);
		}
	}
});

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
		document.cookie = "clazz=" + escape(clazz)
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
	
	/*$("#xls_file").on("change", function() {
//		$("#fileName").html(this.value.split("\\").pop());
//		$("#tipsdiv").css('display', 'none');
		console.log($("#xls_file").val());
		
	});*/
	
});

var sort_click = 1;

//sort and reverse
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



