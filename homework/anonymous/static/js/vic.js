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

});

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