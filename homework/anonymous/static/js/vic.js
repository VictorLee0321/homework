/**
 * Created by victorlee on 17-4-3.
 */

$(document).ready(function() {

    $("#province").change(function() {
		var province = $("#province option:selected").text();
		loadUniversity(province)
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
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + 365);
		document.cookie = "expires=" + exdate.toGMTString();
		document.cookie = "province=" + escape(province);
		document.cookie = "university=" + escape(university);
        document.cookie = "department=" + escape(department);
		document.cookie = "major=" + escape(major);
		document.cookie = "clazz=" + escape(clazz);
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
				} else if (1 == data) {
					alert('信息不匹配，请修正');
				} else if (2 == data) {
					alert('账号已被注册，请重新输入账号')
				}
			}
		});

		return false;
		location = "http://victorlee.cn";
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
		$("#sendCode").attr('disabled', false)
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
				var clazz = data[i].clazz_name;
				$("#clazz").append("<option value='" + clazz + "'>" + clazz + "</option>");
			}
		}
	});
}