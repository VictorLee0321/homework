/**
 * Created by victorlee on 17-4-3.
 */

$(function() {
	if ($.cookie("clazz") != null) {
		$("#location").html($.cookie("clazz"));
		console.log('clazz_id is: ' + $.cookie("clazz").split(":")[0]);
		console.log('clazz_name is: ' + $.cookie("clazz").split(":")[1]);
		clazz_id = $.cookie("clazz").split(":")[0];
		loadCourse(clazz_id)
	} else {
		$("#locateModal").modal({
			backdrop: 'static',
			keyboard: false
		});
		//$("#closeLocate").hide();
	}
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

function uploadFile(/*student_id, student_name, clazz, course_name, exp_num, file*/) {
	var student_id = $("#fileName").text().split(".")[0].split("-")[0];
	var fileType = $("#fileName").text().split(".")[1];
	var task_id = $("#exp option:selected").text().split(":")[0];
	var fd = new FormData();
	fd.append("student_id", student_id);
	fd.append("task_id", task_id);
	/*fd.append("student_name", student_name);
	fd.append("clazz", clazz);
	fd.append("course_name", course_name);
	fd.append("exp_num", exp_num);*/
	fd.append("fileType", fileType);
	fd.append("file", document.getElementById('file').files[0]);
	createXMLHttpRequest();
	xhr.upload.addEventListener("progress", uploadProgress, false);
	xhr.addEventListener("load", uploadComplete, false);
	xhr.addEventListener("error", uploadFailed, false);
	xhr.addEventListener("abort", uploadCanceled, false);
	xhr.open("POST", "/uploadFile");
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

$(document).ready(function() {

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
		uploadFile();
	});

	$("#file").on("change", function() {
		file_name = this.value.split("\\").pop();
		$("#fileName").html(this.value.split("\\").pop());
		var task_id = $("#exp option:selected").text().split(":")[0];
		if (0 == task_id.length) {
			$("#tipsdiv").css('display', 'block');
			$("#tips").html('请选择正确作业');
			$("#btn_upload").attr('disabled', true);
			return false;
		}
		regex = /^\d+\-[\u4E00-\u9FA5]{1,5}\-/;
		if (regex.test(file_name)) {
			$("#tipsdiv").css('display', 'none');
			$("#btn_upload").attr('disabled', false);
			// check student info by file_name
			var name = $("#fileName").text().split(".")[0];
			var student_id = name.split("-")[0];
			var student_name = name.split("-")[1];
			var clazz_id = $("#location").text().split(":")[0];
			console.log('clazz_id in check anon student is: ' + clazz_id);
			$.ajax ({
				url : "/checkAnonStudent",
				type : "POST",
				dataType : "json",
				data : {"student_id":student_id, "student_name":student_name, "clazz_id":clazz_id},
				success : function(data) {
					console.log('checkAnonStudent return is: ' + data);
					if (1 == data) {
						$("#tipsdiv").css('display', 'block');
						$("#tips").html('学号姓名班别不匹配');
						$("#btn_upload").attr('disabled', true);
					} else if (0 == data) {
						console.log('has this student, check success!!!');
						$("#tipsdiv").css('display', 'none');
						$("#btn_upload").attr('disabled', false);
					}
				}
			});
		} else {
			$("#tipsdiv").css('display', 'block');
			$("#tips").html('请按格式正确命名');
			$("#btn_upload").attr('disabled', true);
		}
	});

    $("#province").change(function() {
		var province = $("#province option:selected").text();
		loadUniversity(province);
	});

    $("#university").change(function() {
        var province = $("#province option:selected").text();
		var university = $("#university option:selected").text();
		loadDepartment(province, university);
	});

	$("#department").change(function() {
	    var province = $("#province option:selected").text();
		var university = $("#university option:selected").text();
		var department = $("#department option:selected").text();
		loadMajor(province, university, department);
	});

	$("#major").change(function() {
	    var province = $("#province option:selected").text();
		var university = $("#university option:selected").text();
		var department = $("#department option:selected").text();
		var major = $("#major option:selected").text();
		loadClazz(province, university, department, major);
	});

	$("#clazz").change(function () {
		loadCourse($("#clazz option:selected").text().split(":")[0]);
    });

	$("#course").change(function () {
		loadTask($("#course option:selected").text().split(":")[0]);
    });

	$("#exp").change(function () {
		$("#fileName").html('上传文件名');
		$("#tipsdiv").css('display', 'none');
		$("#btn_upload").attr('disabled', false);
		$("#file").val("");
    });

	$("#btnLocate").click(function() {
	    var province = $("#province option:selected").text();
		var university = $("#university option:selected").text();
		var department = $("#department option:selected").text();
		var major = $("#major option:selected").text();
		var clazz = $("#clazz option:selected").text();
		if ("province" == province || "university" == university || "department" == department || "major" == major || "class" == clazz) {
			return false;
		}
		// setting cookie by java script should setting one by one
		$.cookie("province", province);
		$.cookie("university", university);
		$.cookie("department", department);
		$.cookie("major", major);
		$.cookie("clazz", clazz, {expires:30});
		$("#location").html(clazz);
		// loadCourse(university, clazz);
	});

	$("#btnRegister").click(function() {
		var account = $("#account").val();
		var studentID = $("#studentID").val();
		var type = $("#type option:selected").text();
		if ('学    生' == type) {
			type = 2
		} else {
			type = 1
		}
		var name = $("#name").val();
		var sex = $("#sex option:selected").text();
		if ('男' == sex) {
			sex = 1;
		} else {
			sex = 0;
		}
		var psw = $("#psw").val();
		var psw2 = $("#psw2").val();
		var email = $("#email").val();
		var email_code = $("#email_code").val();
		if ("" == account || "" == studentID || "" == name || "" == psw || "" == psw2 || "" == email || "" == email_code) {
			$("#check2psw").css('display', 'block');
			$("#check2psw").html('请完善注册信息');
			return false;
		}
		if (psw != psw2) {
			$("#check2psw").css('display', 'block');
			$("#check2psw").html('两次密码不一致');
			return false;
		}
		if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)) {
        	$("#check2psw").css('display', 'block');
			$("#check2psw").html('邮箱格式错误');
        	return false;
  		}
  		$("#check2psw").css('display', 'none');

		$.ajax ({
			url : "/register",
			type : "POST",
			dataType : "json",
			data : {"email":email, "account":account, "studentID":studentID, "type":type, "name":name, "sex":sex, "psw":psw, "email_code":email_code},
			success : function(data) {
				console.log('register return is: ' + data);
				if (0 == data) {
					alert('注册成功，请登录');
					$('#signupModal').modal('hide');
				} else if (1 == data) {
					alert('信息不匹配，请修正');
				} else if (2 == data) {
					alert('账号已被注册，请重新输入账号')
				} else if (3 == data) {
					alert('邮箱验证码错误，请重试')
				} else if (4 == data) {
					alert('邮箱未注册，请进行邮箱注册验证')
				}
			}
		});
		return false;
		//location = "http://victorlee.cn";
	});

	$("#sendCode").click(function () {
		// homework_victor@163.com
		// limingzhao
		// 13189504947
		var email = $("#email").val();
		if(!email.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/)) {
        	$("#check2psw").css('display', 'block');
			$("#check2psw").html('邮箱格式错误');
        	return false;
  		}

  		$.ajax ({
			url : "/sendEmailCode",
			type : "POST",
			dataType : "json",
			data : {"email":email},
			success : function(data) {
				// alert('email: ' + email + ' check code is: ' + data)
				console.log('email: ' + email + ' check code is: ' + data);
				if (data > 9) {
					alert('注册验证码已经发送到邮箱: ' + email + ',请注意查收！');
				} else {
					alert('此邮箱已注册，请使用新邮箱进行注册！');
				}
				countdown()
			}
		});
		return false
    });

	$("#signin").click(function() {
		// $("#check_psw_div").css('display', 'none');
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

});

var wait = 10;
function countdown() {
	if (0 == wait) {
		//o.removeAttribute("disabled");
		$("#sendCode").attr('disabled', false);
		$("#sendCode").html("发送邮箱验证码");
		wait = 10;
	} else {
		$("#sendCode").attr("disabled", true);
		$("#sendCode").html("重新发送验证码(" + wait + ")");
		wait--;
		setTimeout(function () {
			countdown();
        }, 1000)
	}
}

function loadUniversity(province) {
    $("#university").empty();
	$("#department").empty();
	$("#major").empty();
	$("#clazz").empty();
	$.ajax ({
		url : "/loadUniversity",
		type : "POST",
		dataType : "json",
		data : {"province":province},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var university = data[i].university;
				$("#university").append("<option value='" + university + "'>" + university + "</option>");
			}
			var province = $("#province option:selected").text();
			var university = $("#university option:selected").text();
			loadDepartment(province, university);
		}
	});
}

function loadDepartment(province, university) {
	$("#department").empty();
	$("#major").empty();
	$("#clazz").empty();
	$.ajax ({
		url : "/loadDepartment",
		type : "POST",
		dataType : "json",
		data : {"province":province, "university":university},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var department = data[i].department;
				$("#department").append("<option value='" + department + "'>" + department + "</option>");
			}
			var province = $("#province option:selected").text();
			var university = $("#university option:selected").text();
			var department = $("#department option:selected").text();
		    loadMajor(province, university, department);
		}
	});
}

function loadMajor(province, university, department) {
	$("#major").empty();
	$("#clazz").empty();
	$.ajax ({
		url : "/loadMajor",
		type : "POST",
		dataType : "json",
		data : {"province":province, "university":university, "department":department},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var major = data[i].major;
				$("#major").append("<option value='" + major + "'>" + major + "</option>");
			}
			var province = $("#province option:selected").text();
		    var university = $("#university option:selected").text();
	    	var department = $("#department option:selected").text();
	    	var major = $("#major option:selected").text();
	    	loadClazz(province, university, department, major);
		}
	});
}

function loadClazz(province, university, department, major) {
	$("#clazz").empty();
	$.ajax ({
		url : "/loadClazz",
		type : "POST",
		dataType : "json",
		data : {"province":province, "university":university, "department":department, "major":major},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var clazz = data[i].clazz_id + ":" + data[i].clazz_name;
				$("#clazz").append("<option value='" + clazz + "'>" + clazz + "</option>");
			}
			loadCourse($("#clazz option:selected").text().split(":")[0]);
		}
	});
}

function loadCourse(clazz_id) {
	$("#course").empty();
	$.ajax ({
		url : "/loadCourse",
		type : "POST",
		dataType : "json",
		data : {"clazz_id":clazz_id},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var course = data[i].course_id + ":" + data[i].course_name;
				$("#course").append("<option value='" + course + "'>" + course + "</option>");
			}
			loadTask($("#course option:selected").text().split(":")[0]);
		}
	});
}

function loadTask(course_id) {
	$("#exp").empty();
	$.ajax ({
		url : "/loadTask",
		type : "POST",
		dataType : "json",
		data : {"course_id":course_id},
		success : function(data) {
			for (var i = 0; i < data.length; i++) {
				var exp = data[i].task_id + ":" + data[i].task_name;
				$("#exp").append("<option value='" + exp + "'>" + exp + "</option>");
			}
		}
	});
	$("#fileName").html('上传文件名');
	$("#tipsdiv").css('display', 'none');
	$("#btn_upload").attr('disabled', false);
}